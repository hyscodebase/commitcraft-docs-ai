import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://commitcraft-docs-ai.lovable.app";

export default function Privacy() {
  return (
    <Layout>
      <Helmet>
        <title>개인정보처리방침 — CommitCraft</title>
        <meta name="description" content="CommitCraft 개인정보처리방침: 수집하는 정보, 쿠키 및 광고 기술 사용, 제3자 제공, 이용자 권리 등을 안내합니다." />
        <link rel="canonical" href={`${BASE_URL}/privacy`} />
      </Helmet>
      <div className="container max-w-3xl py-16 animate-fade-in prose prose-sm dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-1">개인정보처리방침</h1>
        <p className="text-muted-foreground text-sm mb-8">최종 수정일: 2025년 6월 22일</p>

        <p className="text-sm text-muted-foreground mb-6">
          본 문서는 CommitCraft(이하 &quot;서비스&quot;)의 개인정보 처리에 관한 사항을 안내하기 위한 <strong>템플릿</strong>입니다.
          실제 운영 환경에 맞게 내용을 수정·보완하여 사용하시기 바랍니다. 본 문서는 법률 자문을 대체하지 않습니다.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. 수집하는 정보</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
          <li><strong>서비스 이용 정보</strong>: 사용자가 입력하는 GitHub 저장소 URL, 선택한 분석 범위(커밋 수, ref) 등</li>
          <li><strong>자동 수집 정보</strong>: IP 주소, 브라우저 유형, 운영체제, 접속 시간, 페이지 조회 기록 등</li>
          <li><strong>GitHub PAT</strong>: 사용자가 선택적으로 입력하며, 현재 세션의 API 호출에만 일시 사용되고 서버에 영구 저장하지 않습니다.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. 쿠키 및 광고 기술 사용</h2>
        <p className="text-sm text-muted-foreground">
          본 서비스는 <strong>Google AdSense</strong> 광고 서비스를 사용합니다. 이에 따라 Google 및 제3자 광고 네트워크가
          사용자의 브라우저에 <strong>쿠키(Cookie)</strong>, <strong>웹 비콘(Web Beacon)</strong>, 또는 유사한 기술을 사용하여
          사용자의 관심사에 기반한 광고를 표시할 수 있습니다.
        </p>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5 mt-3">
          <li>Google을 포함한 <strong>제3자 업체가 쿠키를 읽거나 새로운 쿠키를 설정</strong>할 수 있습니다.</li>
          <li>수집되는 정보에는 IP 주소, 기기 식별자, 브라우저 정보 등이 포함될 수 있습니다.</li>
          <li>사용자는 브라우저 설정을 통해 쿠키 사용을 거부하거나 삭제할 수 있습니다. 다만, 일부 서비스 기능이 제한될 수 있습니다.</li>
          <li>
            Google의 광고 및 데이터 수집 방식에 대한 자세한 내용은{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline font-semibold"
            >
              Google이 파트너 사이트의 정보를 사용하는 방식
            </a>
            을 참고하세요.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. 정보의 이용 목적</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
          <li>서비스 제공 및 기능 개선</li>
          <li>사용 통계 분석 및 서비스 안정성 확보</li>
          <li>광고 서비스 운영 (Google AdSense)</li>
          <li>사용자 문의 응대</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. 제3자 제공</h2>
        <p className="text-sm text-muted-foreground">
          본 서비스는 원칙적으로 사용자의 개인정보를 외부에 제공하지 않습니다. 다만, 위 2항에 기술된 바와 같이
          Google AdSense를 통해 광고 관련 정보가 Google 및 제3자 광고 네트워크에 전달될 수 있습니다.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. 정보 보유 기간</h2>
        <p className="text-sm text-muted-foreground">
          세션 기록(분석 결과)은 서비스 운영 기간 동안 보관됩니다. 사용자가 삭제를 요청하면 합리적 기간 내에 처리합니다.
          GitHub PAT는 세션 종료 시 즉시 폐기됩니다.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. 이용자의 권리</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1.5">
          <li>자신의 데이터 열람, 수정, 삭제를 요청할 수 있습니다.</li>
          <li>쿠키 사용을 거부할 수 있습니다 (브라우저 설정).</li>
          <li>개인정보 관련 문의: <a href="mailto:commitcraft.help@gmail.com" className="text-primary underline">commitcraft.help@gmail.com</a></li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. 방침 변경 안내</h2>
        <p className="text-sm text-muted-foreground">
          본 개인정보처리방침은 관련 법률 및 서비스 변경에 따라 수정될 수 있습니다. 변경 사항은 이 페이지를 통해 고지합니다.
        </p>
      </div>
    </Layout>
  );
}
