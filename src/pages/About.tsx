import Layout from "@/components/Layout";
import { AlertTriangle, Scale, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container max-w-2xl py-16 animate-fade-in space-y-8">
        <h1 className="text-3xl font-bold">About CommitCraft</h1>

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
            출처 / 라이선스
          </h2>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>UI: <span className="font-mono text-foreground">shadcn/ui</span> (MIT)</li>
            <li>아이콘: <span className="font-mono text-foreground">Lucide</span> (ISC)</li>
            <li>AI: Lovable AI Gateway (Gemini)</li>
            <li>Backend: Lovable Cloud</li>
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
