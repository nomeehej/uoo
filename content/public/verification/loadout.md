---
name: Loadout Checks
label: 보급과 장비 인게임 확인
group: Verification
order: 80
---

보급과 장비 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |
| [02](#02) | 변경 경과의 위치 |

## <a id="01"></a>01 검사와 통과 기준

모듈과 일회성 레시피 구조는 [Modules](../scripting/modules.md#03.A) 03.A절, 동작 설명은 각 모듈 머리 주석.

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| regear 표시 | Razor를 다시 켬 | Scripts 탭에 `hotkey\regear`. Alt+0이 regear로 바뀜(summoner, default 프로필) | 확인되지 않았다 |
| loadout 차단 | loadout Play | `[ script, blocked ]`는 구조적 PvP에서만. 시작 4줄(clearall 등)은 전과 같음 | 확인되지 않았다 |
| loadout, 스크롤 없음 | 귀환 스크롤이 떨어진 채 loadout | aspect까지 돎. 전에는 `stop`으로 끝남 | 확인되지 않았다 |
| 룬북 리필 끔 | `config__use_runebook_refill` 0 | 스크롤 상자를 묻지 않음 | 확인되지 않았다 |
| 귀환 직후 룬북 리필 | 귀환 직후 loadout | 룬북 리필이 돎. 상자를 연 뒤 스크롤이 보일 때까지 최대 2초 대기. 전에는 0.2초 만에 `[ recall scroll, out ]`이 뜰 수 있었음 | 확인되지 않았다 |
| 가구와 보급 상자 | 가구와 보급 상자를 염 | 0.6초(`wait__long`) 대기 뒤 금고, 저장소, 수리대, 선반, 리사이클러를 다시 묻지 않음. 다시 물으면 이 대기를 늘림 | 확인되지 않았다 |
| aspect 다시 켜기 | 죽고 시체를 먹은 뒤 regear | 옷을 다 입고 정리한 뒤 `[aspect` gump가 열리고, 방어구와 손 순서로 Activate가 두 번씩 눌린 뒤 닫힘 | 확인되지 않았다 |
| aspect Journal | 위와 같음 | Journal에 `... aspect activated.` 둘, Essence 10 감소 | 확인되지 않았다 |
| aspect 일부 조각 | 방어구 몇 조각만 벗었다 낀 채 regear | 모든 조각이 다시 켜짐 | 확인되지 않았다 |
| aspect gump 안 열림 | gump가 안 열림 | `[ aspect, miss ]`, Journal에 `Aspect: the [aspect gump did not open.` | 확인되지 않았다 |
| Show Only Unlocked | gump가 Show Only Unlocked 목록으로 열림 | 버튼 102로 줄 화면에 돌아가 누름. 참고 스크립트의 처리 | 확인되지 않았다 |
| 먼저 힐 | 다친 채 regear | 붕대, 힐 포션, Greater Heal을 각자 쓸 수 있을 때마다 겹쳐 써서 HP 가득(`heal_first_until` 0)까지 | 확인되지 않았다 |
| 먼저 힐, Magery 없음 | Magery가 없거나 마나가 모자람 | 붕대와 포션만. 포션이 쿨다운 중이면 기다림 | 확인되지 않았다 |
| 먼저 힐, 쓸 것 없음 | 쓸 것이 하나도 없음 | 바로 옷 입기로 | 확인되지 않았다 |
| 먼저 힐, 시간 초과 | 20초(`wait__heal_first`) 안에 못 채움 | 옷 입기로, 감던 붕대는 계속 | 확인되지 않았다 |
| 먼저 힐, 시약 없음 | 시약 없이 regear | Greater Heal은 한 번만 시도. 끝나고 남은 Greater Heal 커서는 취소 | 확인되지 않았다 |
| 정리 | regear | 백팩 아래쪽에 새첼, 보급 파우치, 루팅 백, 트랩 파우치가 loadout 때처럼 쌓이고, 보급품이 보급 파우치로 | 확인되지 않았다 |
| 파우치 못 가져옴 | 시체에서 보급 파우치나 루팅 백을 못 가져옴 | 묻지 않고 `[ supplies, out ]`, `[ loot bag, out ]`(`pouches_ask` 0) | 확인되지 않았다 |
| 보급 파우치 없음 | 보급 파우치 없이 regear | 보급품은 백팩에 그대로, aspect까지 계속. 다음 loadout에서 새 파우치를 고름 | 확인되지 않았다 |

#### 메모

- regear 순서: 먼저 힐(`recovery/heal-first`), 옷(`gear/dress`, `gear/cosmetic`), 정리(`pack/pouches`, `pack/sorting`), aspect(`gear/aspect`)
- loadout과 regear는 같은 `gear/aspect` 블록을 씀
- aspect 근거: [Aspect Mastery](https://wiki.uooutlands.com/Aspect_Mastery). 켤 때마다 Arcane Essence 5, 죽으면 장비의 aspect가 풀림
- Activate 버튼 번호와 이유는 `module/gear/aspect.razor` 머리 주석

## <a id="02"></a>02 변경 경과

날짜별 기록은 [Verification History](../history/verification.md#08) 08절.
