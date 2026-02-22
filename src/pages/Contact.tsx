import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { Mail, Clock, HelpCircle } from "lucide-react";

const BASE_URL = "https://commitcraft-docs-ai.lovable.app";

export default function Contact() {
  return (
    <Layout>
      <Helmet>
        <title>문의하기 — CommitCraft</title>
        <meta name="description" content="CommitCraft에 대한 문의, 버그 제보, 기능 제안은 이메일로 연락해 주세요. 평일 기준 48시간 이내 답변을 드립니다." />
        <link rel="canonical" href={`${BASE_URL}/contact`} />
      </Helmet>
      <div className="container max-w-2xl py-16 animate-fade-in space-y-10">
        <header>
          <h1 className="text-3xl font-bold mb-2">문의하기</h1>
          <p className="text-muted-foreground">CommitCraft 사용 중 궁금한 점이나 개선 의견을 알려주세요.</p>
        </header>

        <section className="space-y-6">
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold mb-1">이메일 문의</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  아래 이메일로 문의 내용을 보내주시면 확인 후 답변드리겠습니다.
                </p>
                <a href="mailto:commitcraft.help@gmail.com" className="text-primary underline text-sm font-mono">
                  commitcraft.help@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold mb-1">응답 안내</h2>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• 문의 접수 후 평일 기준 <strong>48시간 이내</strong>에 답변을 드립니다.</li>
                  <li>• 주말/공휴일에는 응답이 지연될 수 있습니다.</li>
                  <li>• 긴급한 버그 제보는 제목에 <code className="bg-muted px-1 rounded">[BUG]</code>를 붙여주세요.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h2 className="font-semibold mb-1">지원 범위</h2>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• 서비스 사용법 안내 및 기능 관련 질문</li>
                  <li>• 버그 제보 및 오류 해결 지원</li>
                  <li>• 기능 개선 제안 및 피드백</li>
                  <li>• 개인정보 관련 문의 (삭제 요청 등)</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  ※ 코드 작성 대행, 특정 프로젝트 컨설팅 등은 지원 범위에 포함되지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
