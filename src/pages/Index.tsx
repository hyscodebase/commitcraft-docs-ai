import { Link } from "react-router-dom";
import { ArrowRight, GitBranch, FileText, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const features = [
  {
    icon: GitBranch,
    title: "커밋 기반 추출",
    desc: "공개 repo의 커밋, diff, README를 자동으로 수집합니다.",
  },
  {
    icon: FileText,
    title: "문서 자동 생성",
    desc: "SPEC, ADR, 데모 스크립트, 체크리스트를 한 번에 생성합니다.",
  },
  {
    icon: Sparkles,
    title: "근거 기반 AI",
    desc: "모든 생성물에 커밋 해시·파일 경로 등 Evidence를 첨부합니다.",
  },
  {
    icon: Shield,
    title: "Judge Mode",
    desc: "해카톤 심사 관점의 개선 피드백을 자동으로 제공합니다.",
  },
];

const SAMPLE_REPO = "https://github.com/facebook/react";

export default function Index() {
  return (
    <Layout>
      <section className="container py-20 md:py-32 text-center animate-fade-in">
        <span className="inline-block px-4 py-1.5 rounded-full border text-sm font-mono text-primary border-primary/30 bg-secondary mb-6">
          DocOps Agent for Vibe Coders
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          커밋에서{" "}
          <span className="text-primary">문서가</span>{" "}
          만들어진다
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          GitHub 공개 저장소의 변경 이력을 근거로 SPEC·ADR·데모 스크립트·
          체크리스트를 자동 생성하세요.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button asChild size="lg" className="gap-2">
            <Link to="/new">
              시작하기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={`/new?repo=${encodeURIComponent(SAMPLE_REPO)}`}>
              샘플로 체험
            </Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          ⚠ 데모는 공개 repo만 지원합니다
        </p>
      </section>

      <section className="container pb-20">
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <f.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
