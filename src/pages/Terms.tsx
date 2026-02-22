import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://commitcraft-docs-ai.lovable.app";

export default function Terms() {
  return (
    <Layout>
      <Helmet>
        <title>이용약관 — CommitCraft</title>
        <meta name="description" content="CommitCraft 이용약관: 서비스 제공 범위, 면책 조항, 금지 행위, 지적재산권, 약관 변경 등에 관한 안내입니다." />
        <link rel="canonical" href={`${BASE_URL}/terms`} />
      </Helmet>
      <div className="container max-w-3xl py-16 animate-fade-in prose prose-sm dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-1">이용약관</h1>
        <p className="text-muted-foreground text-sm mb-8">최종 수정일: 2025년 6월 22일</p>

        <p className="text-sm text-muted-foreground mb-6">
          본 약관은 CommitCraft(이하 &quot;서비스&quot;) 이용에 관한 기본 사항을 규정하기 위한 <strong>템플릿</strong>입니다.
          실제 운영에 맞게 수정·보완하여 사용하세요. 법률 자문을 대체하지 않습니다.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">제1조 (목적)</h2>
        <p className="text-sm text-muted-foreground">
          본 약관은 CommitCraft가 제공하는 GitHub 커밋 기반 문서 자동 생성 서비스의 이용 조건 및 절차, 운영자와 이용자 간의 권리·의무·책임 사항을 규정합니다.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">제2조 (서비스 내용)</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
          <li>GitHub 공개 저장소의 커밋·diff·README 분석</li>
          <li>SPEC, ADR, 데모 스크립트, 체크리스트, Judge 피드백 자동 생성</li>
          <li>생성 결과 편집, 복사, 다운로드 기능</li>
          <li>세션 기록 저장 및 재열람 기능</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">제3조 (이용자 의무)</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
          <li>본인이 접근 권한을 가진 공개 저장소만 분석해야 합니다.</li>
          <li>저작권이 있는 코드나 개인정보가 포함된 저장소의 분석을 삼가야 합니다.</li>
          <li>서비스를 악의적으로 남용(과도한 API 호출, 자동화된 대량 요청 등)해서는 안 됩니다.</li>
          <li>타인의 권리를 침해하거나 관련 법령에 위반하는 목적으로 서비스를 이용해서는 안 됩니다.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">제4조 (금지 행위)</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>타인의 개인정보를 무단으로 수집·이용하는 행위</li>
          <li>서비스를 이용하여 불법적인 행위를 하거나 이를 조장하는 행위</li>
          <li>서비스의 보안 취약점을 악용하는 행위</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">제5조 (면책 조항)</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
          <li>AI가 생성한 문서의 정확성, 완전성, 적합성에 대해 보증하지 않습니다.</li>
          <li>생성된 결과물을 사용하여 발생한 손해에 대해 운영자는 책임을 지지 않습니다.</li>
          <li>GitHub API rate limit 또는 외부 서비스 장애로 인한 서비스 중단에 대해 운영자는 책임을 지지 않습니다.</li>
          <li>서비스는 "있는 그대로(as-is)" 제공됩니다.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">제6조 (지적재산권)</h2>
        <p className="text-sm text-muted-foreground">
          서비스의 UI, 로고, 디자인 등에 대한 지적재산권은 운영자에게 있습니다.
          사용자가 입력한 저장소 데이터 및 생성된 문서의 저작권은 해당 저장소 소유자에게 귀속됩니다.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">제7조 (약관 변경)</h2>
        <p className="text-sm text-muted-foreground">
          본 약관은 서비스 운영 상황에 따라 변경될 수 있으며, 변경 시 이 페이지를 통해 고지합니다.
          변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">제8조 (준거법 및 관할)</h2>
        <p className="text-sm text-muted-foreground">
          본 약관의 해석 및 적용에 관하여는 대한민국 법률을 준거법으로 합니다.
          서비스 이용과 관련하여 분쟁이 발생한 경우, 운영자 소재지를 관할하는 법원을 제1심 관할 법원으로 합니다.
        </p>
      </div>
    </Layout>
  );
}
