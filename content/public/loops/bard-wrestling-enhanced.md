---
name: Bard Wrestling Enhanced
label: bard-wrestling-enhanced 루프
group: Loops
order: 50
---

Bard Wrestling 사냥 루프의 블록 순서, 자동 자세 선택, 코덱스 요청과 재확인.
캐릭터 배분은 [Bard Wrestling](../templates/bard-wrestling.md), 공통 규칙은 [Combat](../mechanics/combat.md), 바딩은 [Barding](../mechanics/barding.md).
레시피는 [bard-wrestling-enhanced-recipe.razor](https://github.com/nomeehej/uoo/blob/master/recipe/bard-wrestling-enhanced-recipe.razor).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 바드 아처에서 가져온 블록과 실행 순서 |
| [02](#02) | Monkey, Crab, Spider 자동 선택과 전환 지연 |
| [03](#03) | 피니셔, Brawl, Parry Codex, 무기 재장착 |
| [04](#04) | 실행과 확인 범위 |

인게임 확인 항목은 [Open items](../questions/open-items.md#19) 19절.

## <a id="01"></a>01 블록과 순서

기준 루프는 [Bard Archer Enhanced](bard-archer-enhanced.md). 회복과 바딩 정책은 그 문서 01절, Virtuoso 유지는 03절과 동일.
아처리 블록 대신 Wrestling과 Parry Codex, Brawl 사용.

| 순서 | 블록 | 이 루프의 선택 |
| --- | --- | --- |
| 입력 | `bard/provo-picks` | 기존 Z, Q, Shift+Space 입력과 후보 목록 |
| 회복 | `recovery/cure`, `heal`, `bandage`, `light-heal` | 코덱스 라벨 요청보다 먼저 회복 |
| 장비와 대상 | `fight/rearm`, `fight/target` | Scroll 재장착, 기존 바딩 대상 기억 |
| 코덱스 | `fight/wrestling-codex`, `fight/parry-codex` | 바딩 시전 대기 전에 자세 판단 |
| 공용 관리 | `magery/reagents`, 기존 하우스키핑과 포션 | 기존 바드 아처 정책 |
| 바딩 | `bard/provo`, `disco`, `peace` | Provo, Disco, Peace 순서와 Virtuoso 갱신 |
| 능력 | `fight/weapon-ability` | 교전 중 Scroll 장착과 인접 대상 확인 후 Brawl 요청 |
| 이동과 버프 | `bard/song`, `buff/spells` | 기존 이동 중 노래와 자기 버프 |

- 대상 선택과 실제 공격은 손. `V`로 공격 시작, 루프에 `attack` 명령 없음
- `target_range` 10칸은 바딩 교전 범위. Spider 판정과 능력 요청 범위는 1칸
- warmode는 기존 수동 창. 바딩, 노래, 버프, 음식 정지. 회복, 코덱스, 재장착, 능력 요청은 계속
- 재활용 후 복귀 등록은 `Play Script: combat\bard-wrestling-enhanced`

## <a id="02"></a>02 자동 자세

서버의 자세 효과와 초기화 규칙은 [Combat](../mechanics/combat.md#02.G) 02.G절과 [Wrestling 위키](https://wiki.uooutlands.com/Wrestling).
아래 숫자는 게임의 고정 수치가 아닌 이 루프의 설정값.

| 우선순위 | 조건 | 선택 |
| --- | --- | --- |
| 1 | 내 HP 손실 45 이상 | Crab. 긴급 상태 고정 |
| 2 | 현재 대상과 추가 등록 몹이 모두 내 1칸 안, 살아 있고 서로 다른 대상 | Spider |
| 3 | 그 외 | Monkey |

- Crab 해제: HP 손실 30 이하인 상태를 관찰하기 시작한 뒤 5초 유지. 중간에 30 초과면 처음부터 다시 관찰
- 마릿수는 2초마다 조사. 현재 대상과 `list__provo_candidates`를 중복 없이 검사
- 현재 대상이 1칸 밖이면 추가 후보끼리 붙어 있어도 Spider 진입 불가
- 마지막 다수전 관찰 뒤 6초 유지. 그동안 실제 추가 타격 대상이 없을 수 있음
- 자세 요청 뒤 다른 공격 자세로 바꾸기까지 최소 8초. 긴급 Crab 진입은 유지 시간과 라벨 재시도 간격을 한 번 우회
- 바딩 스킬의 Barding Break만으로 자세 변경 없음. 실제 HP 손실과 주변 등록 대상 수로 판단
- 몹 HP, 실제 AR, 명중률, 콤보 카운터 사용 없음. Dragon과 Crane의 자동 선택 규칙 없음
- Parry Codex 자세 선택은 별도. Wrestling 자세를 자주 돌려 방어 버프를 유지하는 방식 없음

#### 라벨과 토글

- 자세와 피니셔는 코덱스 라벨에 현재 선택 하나가 보일 때만 변경
- 명령 뒤 3초 이상 지나 라벨 재확인. 원하는 상태면 추가 명령 없음, 다른 상태가 확인되면 재시도
- 같은 자세의 실패 요청 재시도는 8초 유지 시간의 예외. 새 자세 선택과 구분
- 평소 30초마다 선택 캐시 재확인. 손으로 바꾼 선택도 자동 정책에 맞춰 복구
- 라벨 응답이 없으면 재시도. 자세 이름이 없거나 둘 이상이면 `[ wrestling stance, off ]`, 피니셔도 모호하면 `[ wrestling finisher, off ]`
- 모호한 선택은 그 Play 동안 자동 변경 중단. 다른 선택의 관리는 계속
- 실제 라벨 형식, 슬롯 번호, 서버 명령 수락은 확인되지 않았다

## <a id="03"></a>03 무기와 두 코덱스

| 항목 | 기본값 | 판단 |
| --- | --- | --- |
| 무기 재장착 | Martial Arts Scroll `22187`, `rearm_follow_hands` 1 | 직접 바꾼 장비 쌍을 기억, 빈손과 백팩 검색으로 복구 |
| Wrestling 피니셔 | Chi Thrust | 선택 유지. 발동 구간은 게임이 처리 |
| 무기 능력 | Wrestling 슬롯 1, Brawl | 인접한 살아 있는 대상과 Scroll 장착 확인 |
| Parry 기본 자세 | Testudo | 최대 랭크 기준 |
| Parry 상태 이상 자세 | Warding | 독, Bleed, Disease가 있고 기억한 대상이 2칸 밖일 때 |
| Parry 피니셔 | Last Stand | 큰 피해에 대비한 선택 |

- Brawl 요청 간격은 기존 `fight/weapon-ability`의 60초. Arms Lore 없는 배분 기준
- 요청 직후 타이머 초기화는 실제 발동이나 게이지 충전의 증거가 아님. 서버 거절과 다음 명중까지의 대기로 사용 시점이 늦어질 수 있음
- Scroll이 백팩에만 있거나 다른 무기를 들면 능력 요청 없음. 시전, 타깃 커서, 아이템 큐, 은신 중에도 보류
- Haymaker와 Takedown은 공유 게이지의 다른 선택. 몹 HP를 추정해 마무리용으로 자동 전환하지 않음
- Parry도 자세와 피니셔를 독립 관리. 요청 뒤 재확인과 30초 정기 재동기화 모두 두 선택에 적용
- Parry 자세 라벨이 모호하면 `[ parry stance, off ]`, 피니셔가 모호하면 `[ parry finisher, off ]`. 해당 선택만 그 Play 동안 중단
- Parry 라벨 응답 누락은 재시도. 수동 타깃 커서, 시전, 아이템 큐, 은신 중에는 라벨 조회와 전환 요청 보류
- 원거리 여부는 기억한 대상 기준. 화면의 다른 몹에게서 오는 피해 종류까지 판별하는 기능 없음
- Mirror는 자동 감지 규칙 없음. 주문 시전자와 피해 종류를 판별했다고 가정하지 않음

무기 graphic은 [Item list](../game/item-list.md#29) 29절, Parry 효과는 [Combat](../mechanics/combat.md#03.B) 03.B절.

## <a id="04"></a>04 실행과 확인

1. 무기와 Wrestling, Parrying 코덱스를 백팩에 준비. 처음에는 Scroll을 직접 장착
2. 코덱스에서 자세 하나와 피니셔 하나 활성화. 이후 루프가 자동 정책에 맞게 선택
3. `combat\bard-wrestling-enhanced`를 실행하고 Z 또는 Q로 대상 선택, V로 공격
4. 코덱스, 다수전, 회복, 재장착 검사는 [Open items](../questions/open-items.md#19) 19절

- 결과물 수정 대신 모듈과 레시피 수정 후 `pnpm build`
- 시험은 Scripts 탭에서 리로드 후 Play. 핫키 실행은 클라이언트 완전 재시작 뒤 사용([Workflow](../working/workflow.md#04.A) 04.A절)
- 기존 bard 프로필의 F1 바인딩은 자동 변경 없음. 새 루프 이름으로 직접 바인딩 필요
- `util/wrestling-codex.test.mjs`는 모듈의 실제 조건과 명령 추적 검사. Razor 스코프, 네트워크, 콤보와 피해량 검증 아님
- 실제 사냥 DPS, 서버 슬롯 명령, 장착과 방어 효과는 확인되지 않았다
