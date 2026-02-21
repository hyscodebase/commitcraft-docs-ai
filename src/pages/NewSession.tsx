import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Mode = "recent" | "compare";

export default function NewSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [repoUrl, setRepoUrl] = useState(searchParams.get("repo") ?? "");
  const [pat, setPat] = useState("");
  const [mode, setMode] = useState<Mode>("recent");
  const [n, setN] = useState(5);
  const [baseRef, setBaseRef] = useState("");
  const [headRef, setHeadRef] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const isValidUrl = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+/.test(repoUrl.trim());

  const handleGenerate = async () => {
    if (!isValidUrl) {
      toast.error("유효한 GitHub repo URL을 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create project
      const repoName = repoUrl.replace("https://github.com/", "").replace(/\/$/, "");
      const { data: project, error: pe } = await supabase
        .from("projects")
        .insert({ name: repoName, repo_url: repoUrl.trim() })
        .select("id")
        .single();
      if (pe || !project) throw pe;

      // 2. Create session
      const sessionPayload: any = {
        project_id: project.id,
        status: "created",
      };
      if (mode === "recent") {
        sessionPayload.recent_commits_n = n;
      } else {
        sessionPayload.base_ref = baseRef;
        sessionPayload.head_ref = headRef;
      }
      const { data: session, error: se } = await supabase
        .from("sessions")
        .insert(sessionPayload)
        .select("id")
        .single();
      if (se || !session) throw se;

      // 3. Call fetch_github_context
      const fetchBody: any = {
        session_id: session.id,
        repo_url: repoUrl.trim(),
      };
      if (mode === "recent") fetchBody.recent_commits_n = n;
      else {
        fetchBody.base_ref = baseRef;
        fetchBody.head_ref = headRef;
      }
      if (pat) fetchBody.pat = pat;

      const { error: fe } = await supabase.functions.invoke("fetch_github_context", { body: fetchBody });
      if (fe) throw fe;

      // 4. Call generate_doc_pack
      const { error: ge } = await supabase.functions.invoke("generate_doc_pack", { body: { session_id: session.id } });
      if (ge) throw ge;

      navigate(`/sessions/${session.id}`);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message ?? "생성 실패. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-lg py-16 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">새 세션</h1>

        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="repo">GitHub Repository URL</Label>
              <Input
                id="repo"
                placeholder="https://github.com/owner/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              {repoUrl && !isValidUrl && (
                <p className="text-destructive text-xs">올바른 GitHub URL을 입력하세요.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pat">GitHub PAT (선택, 현재 세션만 사용)</Label>
              <Input
                id="pat"
                type="password"
                placeholder="ghp_..."
                value={pat}
                onChange={(e) => setPat(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">저장되지 않으며 rate limit 완화에만 사용됩니다.</p>
            </div>

            <Button onClick={() => setStep(2)} disabled={!isValidUrl}>
              다음: 범위 선택
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Label>최근 N개 커밋</Label>
              <Switch checked={mode === "compare"} onCheckedChange={(v) => setMode(v ? "compare" : "recent")} />
              <Label>base/head 비교</Label>
            </div>

            {mode === "recent" ? (
              <div className="space-y-2">
                <Label>커밋 수: {n}</Label>
                <Slider min={1} max={20} step={1} value={[n]} onValueChange={([v]) => setN(v)} />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label>Base ref (브랜치/태그/해시)</Label>
                  <Input value={baseRef} onChange={(e) => setBaseRef(e.target.value)} placeholder="main" />
                </div>
                <div className="space-y-1">
                  <Label>Head ref</Label>
                  <Input value={headRef} onChange={(e) => setHeadRef(e.target.value)} placeholder="feature-branch" />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>이전</Button>
              <Button onClick={handleGenerate} disabled={loading || (mode === "compare" && (!baseRef || !headRef))}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-1" /> 생성 중...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
