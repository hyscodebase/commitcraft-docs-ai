import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, RefreshCw, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Artifact {
  id: string;
  type: string;
  content_md: string;
}

interface Source {
  id: string;
  kind: string;
  ref: string;
  url: string | null;
  content_excerpt: string | null;
}

const TAB_MAP: Record<string, string> = {
  spec: "SPEC",
  adr: "ADR",
  demo: "Demo Script",
  checklist: "Checklist",
  judge: "Judge",
};

export default function SessionDetail() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [editMap, setEditMap] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("spec");

  const load = useCallback(async () => {
    if (!id) return;
    const { data: session } = await supabase
      .from("sessions")
      .select("status, error_message")
      .eq("id", id)
      .single();
    if (session) {
      setStatus(session.status);
      setErrorMsg(session.error_message);
    }
    const { data: arts } = await supabase
      .from("artifacts")
      .select("id, type, content_md")
      .eq("session_id", id);
    if (arts) {
      setArtifacts(arts);
      const map: Record<string, string> = {};
      arts.forEach((a) => (map[a.type] = a.content_md));
      setEditMap(map);
    }
    const { data: srcs } = await supabase
      .from("sources")
      .select("id, kind, ref, url, content_excerpt")
      .eq("session_id", id);
    if (srcs) setSources(srcs);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  // Poll while in-progress
  useEffect(() => {
    if (status === "fetching" || status === "generating" || status === "created") {
      const interval = setInterval(load, 3000);
      return () => clearInterval(interval);
    }
  }, [status, load]);

  const handleCopy = (type: string) => {
    navigator.clipboard.writeText(editMap[type] ?? "");
    toast.success("클립보드에 복사됨");
  };

  const handleDownload = (type: string) => {
    const blob = new Blob([editMap[type] ?? ""], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.toUpperCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async (type: string) => {
    const art = artifacts.find((a) => a.type === type);
    if (!art) return;
    await supabase.from("artifacts").update({ content_md: editMap[type] }).eq("id", art.id);
    toast.success("저장됨");
  };

  const handleRetry = async () => {
    if (!id) return;
    setStatus("generating");
    const res = await supabase.functions.invoke("generate_doc_pack", { body: { session_id: id } });
    if (res.error) {
      toast.error("재생성 실패");
      setStatus("error");
    } else {
      load();
    }
  };

  const artTypes = Object.keys(TAB_MAP);
  const isLoading = status === "fetching" || status === "generating" || status === "created" || status === "loading";

  return (
    <Layout>
      <div className="container max-w-4xl py-10 animate-fade-in">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">세션 결과</h1>
            <Badge variant={status === "done" ? "default" : status === "error" ? "destructive" : "secondary"}>
              {status}
            </Badge>
          </div>
          {status === "error" && (
            <Button variant="outline" size="sm" onClick={handleRetry} className="gap-1">
              <RefreshCw className="h-4 w-4" /> 재시도
            </Button>
          )}
        </div>

        {errorMsg && <p className="text-destructive text-sm mb-4">{errorMsg}</p>}

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex-wrap">
              {artTypes.map((t) => (
                <TabsTrigger key={t} value={t} disabled={!editMap[t]}>
                  {TAB_MAP[t]}
                </TabsTrigger>
              ))}
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
            </TabsList>

            {artTypes.map((t) => (
              <TabsContent key={t} value={t}>
                <Textarea
                  className="font-mono text-sm min-h-[400px] mb-3"
                  value={editMap[t] ?? ""}
                  onChange={(e) => setEditMap((m) => ({ ...m, [t]: e.target.value }))}
                />
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => handleCopy(t)} className="gap-1">
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDownload(t)} className="gap-1">
                    <Download className="h-3.5 w-3.5" /> Download .md
                  </Button>
                  <Button size="sm" onClick={() => handleSave(t)}>저장</Button>
                </div>
              </TabsContent>
            ))}

            <TabsContent value="evidence">
              <div className="space-y-2">
                {sources.length === 0 ? (
                  <p className="text-muted-foreground text-sm">수집된 근거가 없습니다.</p>
                ) : (
                  sources.map((s) => (
                    <div key={s.id} className="rounded-lg border p-3 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">{s.kind}</Badge>
                        <span className="font-mono text-xs truncate">{s.ref}</span>
                        {s.url && (
                          <a href={s.url} target="_blank" rel="noreferrer" className="text-primary ml-auto">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      {s.content_excerpt && (
                        <pre className="text-xs text-muted-foreground whitespace-pre-wrap max-h-32 overflow-auto">
                          {s.content_excerpt.slice(0, 500)}
                        </pre>
                      )}
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
