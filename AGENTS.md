# AGENTS.md — CommitCraft

> 목적: LLM에게 요청한 작업과 결과물의 요약 로그 (해커톤 투명성용)

---

## Tools Used

| Tool | 용도 |
|------|------|
| Lovable AI (Builder) | 프로젝트 전체 코드 생성, UI/UX 구현 |
| Lovable Cloud | DB(PostgreSQL), Edge Functions, Secrets 관리 |
| Lovable AI Gateway (Gemini) | 문서 생성 AI 파이프라인 (앱 내 기능) |
| GitHub API | 공개 저장소 데이터 수집 |

## Key Prompts Summary

1. **프로젝트 생성 요청**: CommitCraft MVP 전체 명세 제공 → Lovable AI Builder가 DB 스키마, Edge Functions, 프론트엔드 전체 구현
2. **문서 생성 시스템 프롬프트**: "문서 자동 생성 에이전트"로서 소스 기반으로만 문서를 생성하고, 근거에 없는 내용은 Assumptions에 표시하도록 지시
3. **산출물별 프롬프트**: SPEC/ADR/Demo/Checklist/Judge 각각에 대한 구조화된 템플릿 프롬프트

> ※ 민감정보(API 키, 토큰 등)는 프롬프트에 포함되지 않음

## Major Decisions

- → ADR.md 참조
- ADR-001: Lovable Cloud 선택
- ADR-002: Session + Artifacts 데이터 모델
- ADR-003: 다단계 AI 파이프라인
- ADR-004: Public Repo 우선 + 선택적 PAT

## Known Limitations

- 비공개 저장소는 지원하지 않음
- GitHub API rate limit(인증 없이 60회/시간)으로 대규모 분석 제한
- AI 생성물의 정확성은 보장되지 않으며 반드시 검토 필요
- 사용자 인증/로그인 미구현 (MVP 범위)
- PAT는 저장하지 않아 매 세션마다 재입력 필요
