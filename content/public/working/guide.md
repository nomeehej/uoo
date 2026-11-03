---
name: Guide
label: 읽는 목적별 문서 안내
group: How we work
order: 10
---

지금 하려는 일에서 시작해 필요한 정본으로 이동. 문서 전체의 범위는 [Workflow](workflow.md#00.A) 00.A절.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 캐릭터와 루프에 맞는 문서 고르기 |
| [02](#02) | 사용 중 생긴 문제 찾기 |
| [03](#03) | 설정, 블록, 문서 수정 |
| [04](#04) | 근거, 인게임 검사, 남은 질문과 기록 |

## <a id="01"></a>01 캐릭터와 루프

캐릭터 구성은 Templates, 실제 실행 순서는 Loops, 상황별 통과 기준은 Verification.

| 대상 | 캐릭터 구성 | 실행 설계 | 인게임 검사 |
| --- | --- | --- | --- |
| Bard Necro | [Bard Necro](../templates/bard-necro.md) | [Bard Necro Enhanced](../loops/bard-necro-enhanced.md) | [Bard Necro Checks](../verification/bard-necro.md) |
| Bard Archer | [Bard Archer](../templates/bard-archer.md) | [Bard Archer Enhanced](../loops/bard-archer-enhanced.md) | [Bard Archer Checks](../verification/bard-archer.md) |
| Bard Wrestling | [Bard Wrestling](../templates/bard-wrestling.md) | [Bard Wrestling Enhanced](../loops/bard-wrestling-enhanced.md) | [Bard Wrestling Checks](../verification/bard-wrestling.md) |
| 벌목과 PvP | [Lumberjack PvP](../templates/lumberjack-pvp.md) | [Lumberjack Enhanced](../loops/lumberjack-enhanced.md) | [Lumberjack Checks](../verification/lumberjack.md) |
| 공통 PvP 자기관리 | [Bard Necro 설정](../templates/bard-necro.md#04.F), [Lumberjack PvP 설정](../templates/lumberjack-pvp.md#08) | [PvP Loop](../loops/pvp.md) | [PvP Checks](../verification/pvp.md) |

다른 스크립트는 [스크립트 목록](https://github.com/nomeehej/uoo/blob/master/script/README.md),
검사 문서는 [Open items](../questions/open-items.md#08) 08절의 색인.
바드 네크로의 소환수 구현은 [Bard Necro Summons](../loops/bard-necro-summons.md).

## <a id="02"></a>02 사용 중 문제

| 증상이나 찾는 것 | 먼저 읽을 곳 |
| --- | --- |
| 수정했는데 핫키가 예전 동작 실행 | [Workflow](workflow.md#04.A) 04.A절의 스크립트 캐시와 반영 방법 |
| 클라이언트 종료 뒤 설정이 되돌아옴 | [Workflow](workflow.md#04.C) 04.C절 |
| 프리캐스트가 사라지거나 커서가 남음 | [Magery](../mechanics/magery.md#02.A) 02.A절, [PvP Loop](../loops/pvp.md#02) 02절 |
| 쿨다운 바가 없거나 값이 이상함 | [Overheads](../scripting/overheads.md#06.B) 06.B절. 바딩의 구체적인 모델은 [Barding](../mechanics/barding.md#01.E) 01.E절 |
| 서버 문장에 대응하는 머리 위 알림 찾기 | [Profile Messages](../scripting/profile-messages.md#01) 01절 |
| Reflect 제거와 인터럽트가 헷갈림 | [PvP Magery](../game/pvp-magery.md#04.A) 04.A절 |
| 고른 대상과 자동 프로보 대상이 섞임 | [Barding](../mechanics/barding.md#03.A) 03.A절, [Provocation Checks](../verification/provocation.md) |
| Razor 오류나 alias 범위 문제 | [Razor](../scripting/razor.md#03) 03절의 확인된 함정 |
| 무기 피해와 코덱스 효과를 비교 | [Melee](../mechanics/melee.md), 방어 스킬은 [Combat](../mechanics/combat.md) |
| 감정과 재활용 뒤 복귀를 확인 | [Recycle Checks](../verification/recycle.md) |

## <a id="03"></a>03 수정할 때

| 하려는 일 | 정본 |
| --- | --- |
| 루프의 설정값 변경 | [Modules](../scripting/modules.md#07.A) 07.A절 |
| 블록 추가, 제거, 새 동작 작성 | [Modules](../scripting/modules.md#07.B) 07.B절 |
| 프로필과 스크립트의 알림 경로 선택 | [Overheads](../scripting/overheads.md#01.B) 01.B절 |
| 새 문서 추가, 문서 이동 | [Writing](writing.md#02) 02절과 [08절](writing.md#08) |
| 흐름도나 단계형 FX 작성 | [Writing](writing.md#09) 09절 |
| 게임에 반영하고 확인 | [Workflow](workflow.md#04) 04절 |

## <a id="04"></a>04 근거와 남은 확인

| 찾는 것 | 위치 |
| --- | --- |
| 게임 숫자의 근거와 확인 날짜 표기 | [Workflow](workflow.md#01.C) 01.C절 |
| 실제 게임에서 재현할 절차와 통과 기준 | [검사 문서 색인](../questions/open-items.md#08) |
| 답이 필요한 질문과 보류한 일 | [Open items](../questions/open-items.md) |
| 과거 모듈 이관의 전후 비교 | [Module Migration](../history/module-migration.md) |
| 검사와 설계 변경의 날짜별 경과 | [Verification History](../history/verification.md) |
