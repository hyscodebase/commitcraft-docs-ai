import { Link } from "react-router-dom";
import { ArrowRight, GitBranch, FileText, Sparkles, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const BASE_URL = "https://commitcraft-docs-ai.lovable.app";

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
  {
    icon: CheckCircle,
    title: "편집 & 내보내기",
    desc: "생성된 문서를 직접 편집하고 Copy 또는 .md 파일로 다운로드합니다.",
  },
];

const steps = [
  { num: "1", title: "Repo URL 입력", desc: "GitHub 공개 저장소 URL을 입력합니다." },
  { num: "2", title: "범위 선택", desc: "최근 N개 커밋 또는 base/head ref를 선택합니다." },
  { num: "3", title: "Generate", desc: "AI가 소스를 분석하고 문서 5종을 생성합니다." },
  { num: "4", title: "편집 & Export", desc: "결과를 편집하고 Copy/Download 합니다." },
];

const sampleOutput = `## SPEC — 프로젝트 명세서 (일부 예시)

**프로젝트**: facebook/react  
**분석 범위**: 최근 5개 커밋  

### 주요 변경 사항
- \`reconciler\`: Fiber 트리 재조정 로직 최적화 (commit: a1b2c3d)
- \`hooks\`: useTransition 타임아웃 기본값 변경 (commit: e4f5g6h)

### 기술 스택
React 19, TypeScript, Rollup, Jest
`;

const SAMPLE_REPO = "https://github.com/facebook/react";

const homeFaqs = [
  { q: "무료인가요?", a: "네, 무료로 사용할 수 있습니다. GitHub API rate limit만 적용됩니다." },
  { q: "비공개 저장소도 되나요?", a: "현재 공개 저장소만 지원합니다." },
  { q: "어떤 문서를 생성하나요?", a: "SPEC, ADR, Demo Script, Checklist, Judge 피드백 총 5종입니다." },
];

export default function Index() {
  return (
    <Layout>
      <Helmet>
        <title>CommitCraft — GitHub 커밋 기반 문서 자동 생성 DocOps 에이전트</title>
        <meta name="description" content="GitHub 공개 저장소의 커밋·diff·README를 AI가 분석하여 SPEC, ADR, 데모 스크립트, 체크리스트를 자동 생성합니다. 해커톤 준비에 최적화된 DocOps 도구." />
        <link rel="canonical" href={`${BASE_URL}/`} />
      </Helmet>

      {/* Hero */}
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

      {/* Features */}
      <section className="container pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">주요 기능</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
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

      {/* How it works */}
      <section className="bg-secondary/30 py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">사용 방법</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-4 items-start rounded-xl border bg-card p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample output */}
      <section className="container py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-6">생성 결과 예시</h2>
        <div className="rounded-xl border bg-card p-6">
          <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">{sampleOutput}</pre>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          ※ 위 예시는 실제 생성 결과의 일부를 요약한 것입니다.
        </p>
      </section>

      {/* Mini FAQ */}
      <section className="bg-secondary/30 py-16">
        <div className="container max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">자주 묻는 질문</h2>
          <div className="space-y-4">
            {homeFaqs.map((f, i) => (
              <div key={i} className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-sm mb-1">{f.q}</p>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link to="/faq" className="text-primary underline text-sm">더 많은 질문 보기 →</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">지금 바로 시작하세요</h2>
        <p className="text-muted-foreground mb-6">GitHub 저장소 URL 하나만 있으면 됩니다.</p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/new">
            문서 생성하기 <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </Layout>
  );
}
