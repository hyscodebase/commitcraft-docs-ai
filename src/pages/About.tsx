import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, Scale, ExternalLink, Target, Rocket } from "lucide-react";

const BASE_URL = "https://commitcraft-docs-ai.lovable.app";

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About — CommitCraft 프로젝트 소개</title>
        <meta name="description" content="CommitCraft는 GitHub 커밋 이력을 AI로 분석하여 해커톤·프로젝트 문서를 자동 생성하는 DocOps 에이전트입니다. 프로젝트 소개와 로드맵을 확인하세요." />
        <link rel="canonical" href={`${BASE_URL}/about`} />
      </Helmet>
      <div className="container max-w-2xl py-16 animate-fade-in space-y-8">
        <h1 className="text-3xl font-bold">About CommitCraft</h1>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            서비스 목적
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            CommitCraft는 &quot;바이브 코더(Vibe Coder)&quot;를 위한 DocOps 에이전트입니다.
            해커톤이나 사이드 프로젝트에서 코드는 열심히 짜지만 문서 작성에 시간을 쏟기 어려운 개발자를 위해,
            GitHub 커밋 이력을 AI가 분석하여 SPEC·ADR·데모 스크립트·체크리스트를 자동 생성합니다.
            모든 결과물에는 커밋 해시·파일 경로 등 근거(Evidence)가 첨부되어 투명성을 확보합니다.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            주의사항
          </h2>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
            <li>공개(public) 저장소만 지원합니다.</li>
            <li>저작권이 있는 코드나 개인정보가 포함된 저장소는 사용하지 마세요.</li>
            <li>AI가 생성한 결과물은 반드시 직접 검토 후 사용하세요.</li>
            <li>GitHub API rate limit으로 인해 호출이 제한될 수 있습니다.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            기술 스택 &amp; 출처
          </h2>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>Frontend: <span className="font-mono text-foreground">React + TypeScript + Tailwind CSS + shadcn/ui</span></li>
            <li>Backend: <span className="font-mono text-foreground">Lovable Cloud (Edge Functions, PostgreSQL)</span></li>
            <li>AI: <span className="font-mono text-foreground">Lovable AI Gateway (Google Gemini)</span></li>
            <li>아이콘: <span className="font-mono text-foreground">Lucide</span> (ISC License)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            향후 로드맵
          </h2>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
            <li>비공개 저장소 지원 (OAuth 기반)</li>
            <li>다국어(영어) 문서 생성</li>
            <li>PR 단위 분석 및 코드 리뷰 문서화</li>
            <li>팀 협업 기능 (공유 세션)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            관련 링크
          </h2>
          <ul className="text-sm space-y-1.5">
            <li>
              <a href="https://vibecoding.okky.kr/" target="_blank" rel="noreferrer" className="text-primary underline">
                OKKY 바이브코딩 해커톤
              </a>
            </li>
            <li>
              <a href="https://github.com/okky-lab/vibe-coding-hackathon" target="_blank" rel="noreferrer" className="text-primary underline">
                해커톤 저장소
              </a>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
