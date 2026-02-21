# CommitCraft

> GitHub 공개 저장소의 커밋/변경(diff)/README를 근거로 SPEC.md, ADR.md, 데모 스크립트, 체크리스트를 자동 생성하는 DocOps 에이전트 웹앱.

## 🚀 기능

- **커밋 기반 추출**: 공개 repo의 커밋, diff, README를 자동 수집
- **문서 자동 생성**: SPEC, ADR, 데모 스크립트, 체크리스트 4종을 AI로 생성
- **근거 기반**: 모든 생성물에 커밋 해시·파일 경로 등 Evidence를 표시
- **Judge Mode**: 해카톤 심사 관점의 개선 피드백 자동 제공
- **편집/Export**: 결과물을 편집하고 Copy/Download(.md) 가능
- **세션 관리**: 이전 생성 세션을 저장하고 재열람 가능

## 📖 사용 방법

1. **Repo URL 입력**: GitHub 공개 저장소 URL을 입력합니다.
2. **범위 선택**: 최근 N개 커밋 또는 base/head ref를 선택합니다.
3. **Generate**: AI가 소스를 분석하고 문서 4종 + Judge 피드백을 생성합니다.
4. **편집/Export**: 각 탭에서 결과물을 편집하고 Copy 또는 Download 합니다.

## 🛠 기술 스택

- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Lovable Cloud (Edge Functions, PostgreSQL, Secrets)
- **AI**: Lovable AI Gateway (Google Gemini)
- **Hosting**: Lovable

## ⚠️ 주의사항

- **공개(public) 저장소만 지원**합니다.
- 저작권이 있는 코드나 **개인정보가 포함된 저장소는 사용하지 마세요**.
- AI가 생성한 결과물은 반드시 **직접 검토 후 사용**하세요.
- GitHub API rate limit으로 인해 호출이 제한될 수 있습니다. PAT를 입력하면 완화됩니다.
- PAT는 서버로 전송되지만 저장되지 않으며, 현재 세션에서만 사용됩니다.

## 📜 출처 / 라이선스

- **UI 프레임워크**: [shadcn/ui](https://ui.shadcn.com/) (MIT License)
- **아이콘**: [Lucide](https://lucide.dev/) (ISC License)
- **AI**: Lovable AI Gateway
- **Backend**: Lovable Cloud

## 🏆 OKKY 바이브코딩 해커톤

- [공식 사이트](https://vibecoding.okky.kr/)
- [해커톤 저장소](https://github.com/okky-lab/vibe-coding-hackathon)
- [공정성 가이드](https://vibecoding.okky.kr/docs/fairness-guide)
- [행동강령](https://vibecoding.okky.kr/docs/code-of-conduct)
