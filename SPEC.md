# 기능적 요구사항 정의서 (FRD) — CommitCraft

> 버전: 1.0 (MVP)  
> 작성일: 2025-02-21  
> 상태: 초안

---

## 1. 목적

GitHub 공개 저장소의 커밋/변경/README 정보를 근거로 SPEC, ADR, 데모 스크립트, 체크리스트를 자동 생성하여 바이브 코딩의 문서화 병목을 해소한다.

## 2. 범위

### 포함
- 공개 GitHub 저장소 분석
- 커밋 기반 다단계 문서 생성 (SPEC/ADR/Demo/Checklist/Judge)
- 세션 저장 및 재열람
- 결과물 편집 및 Export

### 제외
- 비공개 저장소 지원 (PAT로 일부 완화)
- 사용자 인증/로그인
- 실시간 협업 편집

## 3. 기능 요구사항

### FR-001: GitHub 저장소 URL 입력
- **설명**: 사용자가 GitHub 공개 저장소 URL을 입력
- **입력**: `https://github.com/{owner}/{repo}` 형식의 URL
- **출력**: URL 유효성 검증 결과
- **오류**: 잘못된 URL 포맷 시 즉시 에러 메시지 표시

### FR-002: 범위 선택
- **설명**: 분석할 커밋 범위를 지정
- **입력**: 최근 N개 커밋(1~20) 또는 base/head ref
- **출력**: 선택된 범위 설정
- **오류**: 유효하지 않은 ref 입력 시 에러 메시지

### FR-003: GitHub 데이터 수집
- **설명**: Edge Function으로 GitHub API 호출하여 소스 수집
- **입력**: repo URL, 범위, (선택) PAT
- **출력**: repo 메타, README, 커밋, diff, 파일 발췌
- **오류**: rate limit 시 PAT 입력 권장, README 없으면 스킵

### FR-004: AI 문서 생성
- **설명**: 수집된 소스를 기반으로 5종 문서 생성
- **입력**: session_id (sources 참조)
- **출력**: SPEC, ADR, Demo Script, Checklist, Judge
- **오류**: AI 호출 실패 시 error 상태 + 재시도 버튼

### FR-005: 결과물 편집/Export
- **설명**: 각 탭에서 Markdown 편집, Copy, Download 가능
- **입력**: 편집된 Markdown 텍스트
- **출력**: 저장된 artifact / 클립보드 복사 / .md 파일

### FR-006: 세션 관리
- **설명**: 이전 생성 세션을 목록 조회/상세 조회
- **입력**: 없음 (자동 목록)
- **출력**: 세션 리스트, 상세 결과 화면

### FR-007: 샘플 체험
- **설명**: Landing에서 URL 없이 미리 채워진 샘플 repo로 바로 체험
- **입력**: 버튼 클릭
- **출력**: /new 페이지로 이동 (repo URL 프리셋)

## 4. 비기능 요구사항

### NFR-001: 해카톤 데모 안정성
- 네트워크 오류 시 명확한 에러 메시지 + 재시도 옵션
- 최소 1개 공개 repo로 전체 플로우 성공 가능

### NFR-002: 반응형 UI
- 모바일에서도 최소한 작동 가능

### NFR-003: 보안
- API 키/토큰은 Edge Function에서만 사용
- PAT는 저장하지 않고 세션 내 임시 사용

## 5. Acceptance Criteria
- [ ] 공개 repo URL 입력 → 범위 선택 → Generate → 4종+Judge 결과 확인 가능
- [ ] 결과물 Copy/Download 동작
- [ ] 세션 저장 및 재열람 가능
- [ ] 에러 시 명확한 메시지 표시

## Evidence
- 이 문서는 프로젝트 초기 요구사항 분석을 기반으로 작성됨
