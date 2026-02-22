import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BASE_URL = "https://commitcraft-docs-ai.lovable.app";

const faqs = [
  {
    q: "CommitCraft는 무료인가요?",
    a: "네, CommitCraft는 무료로 사용할 수 있습니다. 다만 GitHub API rate limit(인증 없이 시간당 60회)이 적용되므로, 대규모 분석 시에는 GitHub PAT를 입력하는 것을 권장합니다.",
  },
  {
    q: "비공개(private) 저장소도 분석할 수 있나요?",
    a: "현재 CommitCraft는 공개(public) 저장소만 지원합니다. 비공개 저장소는 GitHub API 인증 범위의 제약으로 인해 분석할 수 없습니다.",
  },
  {
    q: "GitHub PAT는 안전하게 처리되나요?",
    a: "PAT는 현재 세션의 API 호출에만 일시적으로 사용되며, 서버에 영구 저장되지 않습니다. 세션 종료 후에는 PAT 정보가 폐기됩니다.",
  },
  {
    q: "어떤 종류의 문서를 생성하나요?",
    a: "SPEC(기능 명세서), ADR(아키텍처 결정 기록), Demo Script(시연 스크립트), Checklist(점검 목록), Judge(심사 피드백) 총 5종의 문서를 자동 생성합니다.",
  },
  {
    q: "AI가 생성한 문서의 정확도는 어느 정도인가요?",
    a: "AI는 커밋 메시지, diff, README 등 실제 소스를 근거로 문서를 작성하지만, 100% 정확성을 보장하지 않습니다. 모든 생성물에는 근거(Evidence)가 첨부되어 있으므로, 이를 참고하여 직접 검토하시기 바랍니다.",
  },
  {
    q: "한 번에 분석할 수 있는 커밋 수에 제한이 있나요?",
    a: "최대 20개 커밋까지 선택할 수 있습니다. 최적의 결과를 위해서는 5~10개 커밋을 권장합니다. 너무 많은 커밋을 선택하면 요약이 추상적일 수 있습니다.",
  },
  {
    q: "생성된 문서를 편집하거나 내보낼 수 있나요?",
    a: "네, 각 결과 탭에서 직접 편집할 수 있으며, Copy(클립보드 복사) 또는 Download(.md 파일) 버튼으로 내보낼 수 있습니다. 편집한 내용은 '저장' 버튼으로 서버에 반영됩니다.",
  },
  {
    q: "이전 세션 결과를 다시 볼 수 있나요?",
    a: "네, 상단 메뉴의 'Sessions'에서 이전에 생성한 모든 세션 기록을 확인할 수 있습니다. 각 세션을 클릭하면 결과를 다시 열람하고 편집할 수 있습니다.",
  },
  {
    q: "GitHub API rate limit에 걸렸을 때 어떻게 하나요?",
    a: "GitHub PAT(Personal Access Token)를 입력하면 시간당 5,000회까지 API를 호출할 수 있습니다. PAT는 GitHub Settings > Developer settings > Personal access tokens에서 발급할 수 있으며, public_repo 권한만 있으면 충분합니다.",
  },
  {
    q: "어떤 기술 스택으로 만들어졌나요?",
    a: "프론트엔드는 React + TypeScript + Tailwind CSS + shadcn/ui, 백엔드는 Lovable Cloud(Edge Functions, PostgreSQL), AI는 Lovable AI Gateway(Google Gemini)를 사용합니다.",
  },
];

export default function FAQ() {
  return (
    <Layout>
      <Helmet>
        <title>자주 묻는 질문 (FAQ) — CommitCraft</title>
        <meta name="description" content="CommitCraft 자주 묻는 질문: 무료 여부, 비공개 저장소 지원, PAT 보안, 문서 종류, AI 정확도 등 사용자가 궁금해하는 10가지 질문과 답변입니다." />
        <link rel="canonical" href={`${BASE_URL}/faq`} />
      </Helmet>
      <div className="container max-w-3xl py-16 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">자주 묻는 질문</h1>
        <p className="text-muted-foreground mb-8">CommitCraft 사용에 대해 자주 묻는 질문을 모았습니다.</p>

        <Accordion type="multiple" className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left text-sm font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
