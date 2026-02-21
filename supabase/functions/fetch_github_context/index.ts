import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GITHUB_API = "https://api.github.com";

function parseRepo(url: string) {
  const m = url.match(/github\.com\/([\w.\-]+)\/([\w.\-]+)/);
  if (!m) throw new Error("Invalid GitHub URL");
  return { owner: m[1], repo: m[2] };
}

async function ghFetch(path: string, pat?: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "CommitCraft",
  };
  const token = pat || Deno.env.get("GITHUB_TOKEN");
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${GITHUB_API}${path}`, { headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub API ${res.status}: ${txt.slice(0, 200)}`);
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { session_id, repo_url, recent_commits_n, base_ref, head_ref, pat } = await req.json();

    const sb = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await sb.from("sessions").update({ status: "fetching" }).eq("id", session_id);

    const { owner, repo } = parseRepo(repo_url);
    const sources: any[] = [];

    // 1. Repo meta
    try {
      const meta = await ghFetch(`/repos/${owner}/${repo}`, pat);
      sources.push({
        session_id,
        kind: "repo",
        ref: `${owner}/${repo}`,
        url: meta.html_url,
        content_excerpt: JSON.stringify({
          description: meta.description,
          language: meta.language,
          default_branch: meta.default_branch,
          topics: meta.topics,
          stars: meta.stargazers_count,
        }).slice(0, 3000),
      });
    } catch (e) {
      console.error("Repo meta error:", e);
    }

    // 2. README
    try {
      const readme = await ghFetch(`/repos/${owner}/${repo}/readme`, pat);
      const content = atob(readme.content.replace(/\n/g, ""));
      sources.push({
        session_id,
        kind: "readme",
        ref: readme.path,
        url: readme.html_url,
        content_excerpt: content.slice(0, 10000),
      });
    } catch (e) {
      console.error("README not found, skipping");
    }

    // 3. Commits or Compare
    if (base_ref && head_ref) {
      try {
        const compare = await ghFetch(`/repos/${owner}/${repo}/compare/${base_ref}...${head_ref}`, pat);
        sources.push({
          session_id,
          kind: "diff",
          ref: `${base_ref}...${head_ref}`,
          url: compare.html_url,
          content_excerpt: JSON.stringify(
            (compare.commits || []).slice(0, 20).map((c: any) => ({
              sha: c.sha?.slice(0, 7),
              message: c.commit?.message?.slice(0, 200),
              author: c.commit?.author?.name,
            }))
          ).slice(0, 10000),
        });
        // Changed files
        const files = (compare.files || []).slice(0, 30);
        for (const f of files) {
          sources.push({
            session_id,
            kind: "file",
            ref: f.filename,
            url: f.blob_url,
            content_excerpt: (f.patch || "").slice(0, 3000),
          });
        }
      } catch (e) {
        console.error("Compare failed, falling back to recent commits");
        // fallback
        const commits = await ghFetch(`/repos/${owner}/${repo}/commits?per_page=5`, pat);
        for (const c of commits) {
          sources.push({
            session_id,
            kind: "commits",
            ref: c.sha?.slice(0, 7),
            url: c.html_url,
            content_excerpt: c.commit?.message?.slice(0, 1000),
          });
        }
      }
    } else {
      const count = recent_commits_n || 5;
      const commits = await ghFetch(`/repos/${owner}/${repo}/commits?per_page=${count}`, pat);
      for (const c of commits) {
        sources.push({
          session_id,
          kind: "commits",
          ref: c.sha?.slice(0, 7),
          url: c.html_url,
          content_excerpt: c.commit?.message?.slice(0, 1000),
        });
      }
      // Get diff for each commit (top 5 only to limit)
      for (const c of commits.slice(0, 5)) {
        try {
          const detail = await ghFetch(`/repos/${owner}/${repo}/commits/${c.sha}`, pat);
          const files = (detail.files || []).slice(0, 10);
          for (const f of files) {
            sources.push({
              session_id,
              kind: "file",
              ref: f.filename,
              url: f.blob_url,
              content_excerpt: (f.patch || "").slice(0, 2000),
            });
          }
        } catch (e) {
          console.error("Commit detail error:", e);
        }
      }
    }

    // Save sources
    if (sources.length > 0) {
      await sb.from("sources").insert(sources);
    }

    await sb.from("sessions").update({ status: "generating" }).eq("id", session_id);

    return new Response(JSON.stringify({ ok: true, sources_count: sources.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("fetch_github_context error:", e);

    // Try to update session status
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
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
