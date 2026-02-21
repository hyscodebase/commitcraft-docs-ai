import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface SessionRow {
  id: string;
  created_at: string;
  status: string;
  recent_commits_n: number | null;
  base_ref: string | null;
  head_ref: string | null;
  projects: { repo_url: string; name: string } | null;
}

const statusColor: Record<string, string> = {
  done: "bg-primary text-primary-foreground",
  error: "bg-destructive text-destructive-foreground",
  generating: "bg-warning text-foreground",
  fetching: "bg-info text-primary-foreground",
  created: "bg-muted text-muted-foreground",
};

export default function Sessions() {
  const [rows, setRows] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("sessions")
      .select("id, created_at, status, recent_commits_n, base_ref, head_ref, projects(repo_url, name)")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setRows((data as any) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="container max-w-3xl py-16 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">세션 기록</h1>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
          </div>
        ) : rows.length === 0 ? (
          <p className="text-muted-foreground">아직 세션이 없습니다. <Link to="/new" className="text-primary underline">새로 생성</Link>해 보세요.</p>
        ) : (
          <div className="space-y-3">
            {rows.map((s) => (
              <Link
                key={s.id}
                to={`/sessions/${s.id}`}
                className="block rounded-xl border bg-card p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-mono text-sm truncate max-w-md">
                      {(s.projects as any)?.repo_url ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(s.created_at).toLocaleString("ko-KR")}
                      {s.recent_commits_n ? ` · 최근 ${s.recent_commits_n}개 커밋` : ""}
                      {s.base_ref && s.head_ref ? ` · ${s.base_ref}...${s.head_ref}` : ""}
                    </p>
                  </div>
                  <Badge className={statusColor[s.status] ?? statusColor.created}>
                    {s.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
