import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a document generation agent for software projects.
You generate documentation ONLY based on the provided sources (README, commits, diffs, file excerpts).
Rules:
- If something is not evidenced by sources, put it under "Assumptions" section.
- Include an "Evidence" section at the end of each document listing source commit hashes, file paths, and URLs.
- Output ONLY valid Markdown.
- Write in Korean unless the source is clearly English-only.
- Be concise and structured.`;

function buildArtifactPrompt(type: string, contextBundle: string): string {
  const templates: Record<string, string> = {
    spec: `Based on the following project sources, generate a "기능적 요구사항 정의서 (FRD)".

Include:
- 제목: 기능적 요구사항 정의서 (FRD) — [Project Name]
- 목적 / 범위 (포함/제외)
- 기능 요구사항 (FR-001, FR-002...) each with: 설명, 입력/출력, 오류/예외
- 비기능 요구사항 (NFR-001...) including "해카톤 데모 안정성"
- Acceptance Criteria
- Assumptions (things not evidenced by sources)
- Evidence (source commits/files/links used)

Sources:
${contextBundle}`,
    adr: `Based on the following project sources, generate an "아키텍처 의사결정 기록 (ADR)".

Include at least 4 ADR entries. Each ADR:
- 제목
- 배경 (Context)
- 결정 (Decision)
- 근거 (Rationale)
- 결과 (Consequences)

Suggested topics: Tech stack choice, Data model design, AI pipeline approach, Public repo first approach.
End with Evidence section.

Sources:
${contextBundle}`,
    demo: `Based on the following project sources, generate a "데모 스크립트" (2-3 minute timeline).

Format: 0:00~2:30 timeline with exact screen flows.
Include: what to show, what to say, transitions.
End with "다음 확장" (2-3 future improvements).
End with Evidence section.

Sources:
${contextBundle}`,
    checklist: `Based on the following project sources, generate a "체크리스트".

Include:
- 누락 가능성 / 리스크 (hallucination, rate limits, copyright)
- 개선 액션 items with P0/P1/P2 priority
- "대회 제출 체크" section: SPEC/ADR/AGENTS/README/배포 URL/출처
End with Evidence section.

Sources:
${contextBundle}`,
    judge: `Based on the following project sources, generate "Judge Mode" feedback.

Evaluate from hackathon judge perspective:
- 실용성 (Practicality)
- 완성도 (Completeness)
- AI 활용 (AI Usage)
- UX
- 차별성 (Differentiation)

For each: current state assessment + improvement suggestion.
No exaggeration. Be specific about what's possible/risky.
End with "Top 3 Next Actions".
End with Evidence section.

Sources:
${contextBundle}`,
  };
  return templates[type] || templates.spec;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { session_id } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await sb.from("sessions").update({ status: "generating" }).eq("id", session_id);

    // Load sources
    const { data: sources } = await sb
      .from("sources")
      .select("kind, ref, url, content_excerpt")
      .eq("session_id", session_id);

    if (!sources || sources.length === 0) {
      throw new Error("No sources found for this session");
    }

    // Build context bundle (truncated for token limits)
    const contextBundle = sources
      .map((s) => `[${s.kind}] ${s.ref}${s.url ? ` (${s.url})` : ""}\n${(s.content_excerpt || "").slice(0, 2000)}`)
      .join("\n---\n")
      .slice(0, 30000);

    // Generate artifacts sequentially
    const types = ["spec", "adr", "demo", "checklist", "judge"];
    const artifacts: any[] = [];

    for (const type of types) {
      const userPrompt = buildArtifactPrompt(type, contextBundle);

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("AI rate limit exceeded. Please try again later.");
        }
        if (response.status === 402) {
          throw new Error("AI credits exhausted. Please add credits.");
        }
        const errText = await response.text();
        console.error(`AI error for ${type}:`, response.status, errText.slice(0, 200));
        throw new Error(`AI generation failed for ${type}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || `# ${type}\n\nGeneration failed.`;

      artifacts.push({
        session_id,
        type,
        content_md: content,
      });
    }

    // Save all artifacts
    // First delete existing ones for this session
    await sb.from("artifacts").delete().eq("session_id", session_id);
    await sb.from("artifacts").insert(artifacts);

    await sb.from("sessions").update({ status: "done" }).eq("id", session_id);

    return new Response(JSON.stringify({ ok: true, artifacts_count: artifacts.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("generate_doc_pack error:", e);

    try {
      const body = await req.clone().json().catch(() => ({}));
      if (body.session_id) {
        const sb = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await sb.from("sessions").update({ status: "error", error_message: e.message?.slice(0, 500) }).eq("id", body.session_id);
      }
    } catch (_) {}

    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
