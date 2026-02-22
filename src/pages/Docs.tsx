import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { BookOpen, Lightbulb, AlertTriangle, Terminal } from "lucide-react";

const BASE_URL = "https://commitcraft-docs-ai.lovable.app";

export default function Docs() {
  return (
    <Layout>
      <Helmet>
        <title>사용 가이드 — CommitCraft</title>
        <meta name="description" content="CommitCraft 사용 가이드: GitHub 저장소에서 SPEC, ADR, 데모 스크립트, 체크리스트를 자동 생성하는 방법을 단계별로 안내합니다." />
        <link rel="canonical" href={`${BASE_URL}/docs`} />
      </Helmet>
      <div className="container max-w-3xl py-16 animate-fade-in space-y-12">
        <header>
          <h1 className="text-3xl font-bold mb-2">사용 가이드</h1>
          <p className="text-muted-foreground">CommitCraft의 핵심 기능과 활용법을 알아보세요.</p>
        </header>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            1. 세션 생성하기
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            CommitCraft는 GitHub 공개 저장소의 커밋 이력을 분석하여 문서를 자동 생성합니다. 새 세션을 만들려면 아래 단계를 따르세요.
          </p>
          <ol className="list-decimal pl-6 text-sm text-muted-foreground space-y-2">
            <li><strong>Repository URL 입력</strong> — <code className="bg-muted px-1 rounded">https://github.com/owner/repo</code> 형식으로 공개 저장소 URL을 입력합니다.</li>
            <li><strong>PAT 입력 (선택)</strong> — GitHub Personal Access Token을 입력하면 API rate limit이 완화됩니다. PAT는 서버에 저장되지 않습니다.</li>
            <li><strong>범위 선택</strong> — "최근 N개 커밋" 또는 "base/head 비교" 모드 중 하나를 선택합니다.</li>
            <li><strong>Generate 클릭</strong> — AI가 커밋·diff·README를 수집하고, SPEC·ADR·데모 스크립트·체크리스트·Judge 피드백을 생성합니다.</li>
          </ol>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            2. 생성 결과 활용하기
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            세션이 완료되면 5가지 탭으로 구성된 결과 화면을 볼 수 있습니다.
          </p>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
            <li><strong>SPEC</strong> — 기능 명세서. 프로젝트의 목적, 기능 목록, 기술 스택 등을 요약합니다.</li>
            <li><strong>ADR</strong> — 아키텍처 결정 기록. 주요 기술 결정과 근거를 문서화합니다.</li>
            <li><strong>Demo Script</strong> — 발표/시연용 스크립트. 실제 데모 순서를 안내합니다.</li>
            <li><strong>Checklist</strong> — 프로젝트 완성도 점검 목록입니다.</li>
            <li><strong>Judge</strong> — 해커톤 심사 관점의 피드백과 개선 제안을 제공합니다.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            각 탭에서 내용을 직접 편집할 수 있으며, <strong>Copy</strong> 또는 <strong>Download (.md)</strong> 버튼으로 내보낼 수 있습니다. 편집 후 <strong>저장</strong> 버튼을 누르면 서버에 반영됩니다.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            3. 팁 &amp; 모범 사례
          </h2>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
            <li>커밋 수가 5~10개일 때 가장 정확한 결과를 얻을 수 있습니다. 20개 이상이면 요약이 다소 추상적일 수 있습니다.</li>
            <li>커밋 메시지가 상세할수록(예: Conventional Commits 형식) AI 분석의 정확도가 올라갑니다.</li>
            <li>비공개 저장소는 지원하지 않습니다. 공개 저장소만 URL을 입력하세요.</li>
            <li>생성된 문서는 AI 기반이므로, 최종 사용 전 반드시 내용을 검토하세요.</li>
            <li>PAT를 입력하면 시간당 5,000회까지 GitHub API를 호출할 수 있어 대규모 저장소 분석에 유리합니다.</li>
          </ul>
        </section>

        {/* Section 4 — 실제 사용 예시 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            4. 주의사항
          </h2>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
            <li>GitHub API rate limit: 인증 없이 시간당 60회, PAT 사용 시 시간당 5,000회까지 가능합니다.</li>
            <li>저작권이 있는 코드나 개인정보가 포함된 저장소는 분석하지 마세요.</li>
            <li>AI 생성 결과는 참고용이며, 법적 또는 공식 문서로 사용하기 전에 검증이 필요합니다.</li>
            <li>세션 기록은 서버에 저장되며, 이후 "Sessions" 메뉴에서 언제든 재열람할 수 있습니다.</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
