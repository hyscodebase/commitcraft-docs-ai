# 아키텍처 의사결정 기록 (ADR) — CommitCraft

> 버전: 1.0  
> 작성일: 2025-02-21

---

## ADR-001: Lovable Cloud 선택

### 배경
해커톤에서 빠른 프로토타이핑이 필요하며, DB/Auth/Edge Functions/Storage를 통합 제공하는 플랫폼이 요구됨.

### 결정
Lovable Cloud를 사용하여 PostgreSQL DB, Edge Functions, Secrets 관리를 통합 구현.

### 근거
- 별도 계정/설정 없이 즉시 사용 가능
- Edge Functions로 서버사이드 로직(GitHub API, LLM 호출) 구현
- Secrets 관리로 API 키 보안 확보

### 결과
- 빠른 MVP 구현 가능
- 플랫폼 종속성 증가 (수용 가능한 트레이드오프)

---

## ADR-002: Session + Artifacts 데이터 모델

### 배경
생성 결과물의 재현성과 재열람이 필요하며, 근거(sources)와 산출물(artifacts)의 관계를 명확히 추적해야 함.

### 결정
`projects → sessions → sources/artifacts` 4테이블 구조 채택.

### 근거
- sessions에 상태 관리(created/fetching/generating/done/error)
- sources로 근거 데이터를 세션별로 분리 저장
- artifacts로 5종 산출물을 타입별 관리
- 세션 단위 재열람/재생성 지원

### 결과
- 데이터 무결성 확보
- 세션 기록 완전 보존

---

## ADR-003: 다단계 AI 파이프라인

### 배경
단순 챗봇이 아닌, 추출→생성→검증의 다단계 파이프라인이 요구됨.

### 결정
1단계: `fetch_github_context`로 GitHub API 데이터 수집 → sources 저장  
2단계: `generate_doc_pack`으로 sources 기반 5종 문서 순차 생성

### 근거
- 수집과 생성을 분리하여 실패 시 부분 재시도 가능
- 소스 데이터를 DB에 영속화하여 재현성 확보
- Evidence 섹션으로 환각 방지

### 결과
- 2회 Edge Function 호출 필요 (수용 가능)
- 근거 기반 생성으로 신뢰도 향상

---

## ADR-004: Public Repo 우선 + 선택적 PAT

### 배경
보안과 사용성의 균형이 필요. 공개 repo는 인증 없이 접근 가능하지만 rate limit 존재.

### 결정
- 기본: 인증 없이 공개 repo만 지원
- 선택: 사용자가 PAT를 입력하면 rate limit 완화
- PAT는 저장하지 않고 세션 내 임시 사용

### 근거
- MVP에서 인증 시스템 불필요
- PAT를 저장하지 않아 보안 리스크 최소화
- 사용자에게 명확한 안내 제공

### 결과
- 비공개 repo는 지원 불가
- rate limit 발생 시 사용자 불편 가능 (PAT로 완화)

---

## Evidence
- 이 문서는 프로젝트 초기 아키텍처 설계를 기반으로 작성됨
- Lovable Cloud 문서: https://docs.lovable.dev/features/cloud
