---
name: Verification History
label: 인게임 검사 변경 기록
group: History
order: 20
---

검사 문서에서 분리한 날짜별 수정 경과. 아래 버전은 해당 날짜의 기록. 현재 동작의 근거는 각 설계 문서와 검사 목록.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | PvP 자동화 전 실험 |
| [02](#02) | 벌목 루프 인게임 확인 |
| [03](#03) | 공통 pvp 인게임 확인 |
| [04](#04) | 칼질 루프 인게임 확인 |
| [05](#05) | 테이머 메이지 인게임 확인 |
| [06](#06) | 감정과 분류 인게임 확인 |
| [07](#07) | 바드 네크로 인게임 확인 |
| [08](#08) | 보급과 장비 인게임 확인 |
| [11](#11) | 테이머 아처 인게임 확인 |

## <a id="01"></a>01 PvP 자동화 전 실험

현재 검사: [PvP Experiments](../verification/pvp-experiments.md).

- 2026-10-04 bard-necro-pvp에서 공통 바 기반 자동 점화 블록 삭제. 실제 포션은 손으로 투척
- 2026-10-05 공격을 수동으로 전환, 상대 조회와 자동 공격을 루프에서 삭제
- v5: 보통의 수동 입력을 기다리고, 긴급 회복이 준비되면 수동 주문을 끊었음([PvP Loop](../loops/pvp.md))
- v6: 수동 입력 중단 삭제([01절](../verification/pvp.md#01))

## <a id="02"></a>02 벌목 루프 인게임 확인

현재 검사: [Lumberjack Checks](../verification/lumberjack.md).

- **v10** 2026-10-05: 장착 판정을 실제 왼손 슬롯과 저장한 도끼 serial의 일치로 변경.
  목재 가공과 파우치 이동을 housekeeping에 묶음. 책, Hunting, 무게 점검은 housekeeping 주기 사용,
  리콜 결과를 확인하지 않는 5초 안내 타이머와 그 상태는 삭제
  - 도끼 장착에는 책, Hunting, 무게 준비 불필요. 도구 사용, 커서 대기, 자기 타깃은 같은 채집 블록에서 처리, 별도 pending 상태 없음
- v11 당시 실행 순서: 생존, 자동 리콜, 채집, 자기 버프, housekeeping. 목록과 foreach를 작업 예산과 횟수 제한으로 교체
  - 집 문과 Stockpile의 설정, 선택, 동작, 타이머 삭제, housekeeping을 루프 끝으로 이동
- **v12**: 채집 직전 네 겹 허용 조건 → 차단 조건 사슬 하나.
  채집과 목재 정리의 주기 조건을 이웃한 다른 `and` 조건과 합쳐 허용 경로의 명령문 수 감소.
  Journal 진단은 새 `config__sysmsg`로 분리, 목재 큐가 비어 있으면 대기 반복 진입 없음.
  새 상태나 타이머 없음. 명령문 비용 근거는 [Razor](../scripting/razor.md#06) 06절
- **v13**: v12 실행 화면에서 `BEGIN` 뒤 `convert`만 이어지고 다음 단계로 안 간다는 보고. 인게임 확인됨 2026-10-05.
  CE 원본의 명령 단위 제어 흐름 재현 결과, `if` 안의 `break`는 현재 범위를 한 단계만 제거.
  안쪽 반복문 범위가 남아 바깥 `for 2`가 첫 진입으로 판정하고 index를 0으로 되돌리는 경로 존재.
  그래서 Logs 단계와 작업 타이머가 거듭 초기화되어 Boards 단계와 END에 도달 못 함.
  v13은 목재 검색과 큐 대기를 종료 조건이 있는 `while`로 바꿔 이 블록의 `break`와 `continue` 제거.
  앞서의 Python 모의 검사는 재귀 반복이라 범위 정리 차이를 놓침.
  CE 흐름 재현 시 옛 본문은 반복, 새 본문은 END와 범위 정리까지 완료. Outlands 내부 구현이 CE와 같다는 확인은 아님.
  이후 사용자 Journal에서 v13의 가공, 이동 요청, END와 채집 응답 확인. 인게임 확인됨 2026-10-05.
  단, 두 번의 정리에서 같은 Boards serial이 이동 대상으로 거듭 기록, 사용자가 일부 미이동 보고
- **v14**: 파우치 소속 검사 전에 ignore하던 순서 수정. 공식 문서상 ignore는 검색 제외 → 판별은 ignore 전에.
  직접 serial 검색에 대한 적용은 [Razor](../scripting/razor.md#03) 03절에서 별도 확인.
  지금 포크에서 이 순서가 같은 묶음 반복 이동의 실제 원인인지는 아직 확인되지 않았다.
  근거와 재확인 범위는 [Razor](../scripting/razor.md#03) 03절과 [Lumberjack Checks](../verification/lumberjack.md#01) 01절
  - 검색의 ignore 적용과 미적용 두 경우 모두 병합과 다음 주기 재시도까지 모의 검사
  - 이미 파우치에 보관한 Boards를 건너뛰고 나머지를 move request로 기록
- v15: 자원 없음 뒤 2초 재시도
- 2026-10-10 v17: 모듈 조립으로 회복, 버프, 시약을 pvp와 같은 모듈로 교체([Module Migration](module-migration.md#01) 01절)
- **v18** 2026-10-10: 모듈을 관심사별 폴더로 재분할하며 housekeeping 주기 삭제([Module Migration](module-migration.md#01) 01절).
  리콜 블록이 자기 5초 주기로 책, Hunting, 무게 점검, 음식(`buff/food`)과 목재 정리(`pack/lumber`)는 각자의 타이머를 패스마다 확인.
  리콜 결정, 책 없음, Hunting 없음은 리콜 블록이 패스마다 `var__hold_gathering` 하나로 통합, 채집과 목재 정리는 그 값만 읽음.
  `config__auto_recall`, `use_tracking`, `pack_lumber` 삭제. 블록을 끄려면 레시피에서 그 블록 제외.
  음식은 skinning-enhanced와 같은 블록 → 다쳤거나 독이거나 리콜 결정 중에도 먹음. 워모드에서는 `warmode_is_manual` 1이라 안 먹음
- 2026-10-10 `[ track, check ]`를 `escape/tracking`이 띄우기 시작

## <a id="03"></a>03 공통 pvp 인게임 확인

현재 검사: [PvP Checks](../verification/pvp.md).

- 2026-10-05: `combat/pvp.razor`로 자기관리 통합, 예전 PvP 파일 둘 삭제
- 2026-10-06 **v5**: 회복 선택, 긴급 수동 주문 중단, 자기관리 실행, 무기 장착 순서. GH와 긴급 중단 기준을 손실 35로 통일, 시폰과 버섯 자동화, 양손과 슬롯 상태 삭제
- 2026-10-08 **v6**: 각 블록이 지금 상태를 읽고 바로 행동하는 구조로 재작성. 회복 주문은 에이전트, 버프는 빠지면 바로 시전, 스탯 포션은 켜 둔 동안 유지.
  수동 입력 중단, 주문의 이동 가드, 6초 시전 대기와 `[ cast, check ]` 정지, 재시도 타이머 삭제. 시약은 10초마다, 또는 시약 거절 직후 읽음
- 2026-10-09 **v7**: Strength 포션, Agility 포션을 버프 대신 STR과 DEX 값으로 판정. 아군 Bless가 같은 아이콘을 띄워 포션을 막았음([Combat](../mechanics/combat.md#02.D) 02.D절)
- 2026-10-10 **v8**: 가벼운 Heal을 붕대 옆에서도 쓸지 `config__use_light_heal`로 결정(기본 0). 붕대를 못 쓰면 옵션과 무관하게 대신 나감
- 2026-10-10 **v9**: 모듈 조립. 동작은 v8과 같음([Module Migration](module-migration.md#01) 01절)

- 2026-10-27 v10: 첫 빈 시전 창에서 자기 TK 한 번, RA와 Reflect와 Protection 유지. 그래픽과 스윙 슬롯 선택 대신 `fight/rearm`으로 손에 들었던 장비 복구

#### v6 설계 배경

- v5는 위에서 고른 번호를 변수에 담고 아래 실행부가 다시 읽음 → 그 사이 상태 변화 가능
- v6의 블록은 각자 현재 상태를 읽고 즉시 행동, 다음 블록에 결정을 넘기지 않음
- 삭제: v5의 긴급 수동 주문 중단, 6초 시전 대기와 `[ cast, check ]` 정지, 준비 동작의 5초 주기, 주문의 이동 가드, 재시도 타이머 8개

## <a id="04"></a>04 칼질 루프 인게임 확인

현재 검사: [Skinning Checks](../verification/skinning.md).

- 2026-10-06 `gather/skinning-enhanced.razor` 생성
- **v5**: 복원 삭제, 기억한 적이 없을 때만 칼질. 거절이 보이면 5분 동안 회색 시체만
- **v6**: sword codex 이름에 `sword_` 접두, 칼질 결과와 범죄 행위 거절을 프로필 오버헤드로 이관. 같은 날 오버헤드 팔레트 채도 하향([Overheads](../scripting/overheads.md#05) 05절)
- **v7**: 직접 지정 전 라벨을 읽어 "corpse"가 있고 "remains"가 없는 시체만. 그래도 범죄 판정이면 그 Play 동안 직접 지정 끔
- 2026-10-09 **v9**: 힘 포션과 민첩 포션을 버프 대신 STR과 DEX 값으로 판정([Combat](../mechanics/combat.md#02.D) 02.D절), 세 스탯 포션을 따로 판정.
  v8은 `elseif` 사슬이라 힘 포션이 떨어지면 민첩과 저항 포션까지 막힘
- 2026-10-10 **v10**: 가벼운 Heal을 붕대 옆에서도 쓸지 `config__use_light_heal`로 결정(기본 0). 붕대를 못 쓸 때 대신 나가는 것은 그대로
- 2026-10-10 **v11**: 모듈 조립. 회복, 포션, 버프, 시약을 pvp와 같은 core 블록으로. 바뀐 동작은 [Module Migration](module-migration.md#01) 01절
- 2026-10-21 `fight/axe`를 `fight/rearm`으로 이름 변경

## <a id="05"></a>05 테이머 메이지 인게임 확인

현재 검사: [Tamer Mage Checks](../verification/tamer-mage.md).

- 2026-10-09 v1: `combat/tamer-mage-enhanced.razor` 생성
- v2: `Strength`와 `Agility`가 스탯 포션과 겹침 → Bless를 `Cunning`으로, Arch Protection을 `Protection`으로 판정, 시전 시각 타이머 삭제
- 포션은 스탯 값으로 판정. 포션을 마신 값(기본 + 20)을 `config__str_potion`과 `config__dex_potion`에, 그보다 낮으면 마심
- 거절된 마시기가 회복 포션과 같은 아이템 큐를 패스마다 차지하지 않도록 5초 재시도 간격
- v3: 펫 지정과 거리 확인 삭제, 키트를 셀프 붕대로
- v4: 프로필 오버헤드의 `You begin using veterinary supplies`, `You finish using veterinary supplies`로 키트 진행 구간 파악
- v4: 진행 중 재사용 없음, 재사용하면 진행 중 치료 취소. 피가 1이라도 빠지면 바로, 풀피면 끝난 직후와 거절 2초 뒤에 펫용으로
- v5: 가벼운 Heal 에이전트를 `config__use_light_heal`로 켜고 끔, 기본 끔. 너무 잦다는 사용자 의견 → 회복은 키트, 힐 포션, GH만
- v5: 독일 때 큐어 포션이 없으면 쓰는 `Smart Heal/Cure`는 그대로
- 2026-10-10 사용자가 지금 안 쓴다고 해서 `script/archive/`로 옮김. 같은 날 레시피 조립과 함께 `script/combat/`으로 복귀
- 2026-10-20 걷는 중 Greater Heal이 안 나감 → 긴급선 Greater Heal만 이동 가드 없음

## <a id="06"></a>06 감정과 분류 인게임 확인

현재 검사: [Recycle Checks](../verification/recycle.md).

- 2026-10-21 검색 범위 축소, 보관 위치 통합, 고정 대기 제거. 처리 실패도 공통 정리 뒤 루프 복귀
- 2026-11-02 감정과 분류를 두 단계로. 완드 뒤 라벨 재조회와 `wait__label` 제거, 라벨 조회는 아이템당 두 번. Container ID wand와 Item ID 스킬은 쓰지 않음(사용자 결정, 비용과 횟수)

## <a id="07"></a>07 바드 네크로 인게임 확인

현재 검사: [Bard Necro Checks](../verification/bard-necro.md).

- 2026-10-10 `combat/bard-necro-enhanced`를 레시피 조립으로 전환. 바드, 네크로, 공격 주문 블록의 코드는 그대로
- 2026-10-10 종류 단어와 한 글자 차이도 막는 것으로 보고 모든 이름을 두 글자 이상 떨어뜨림(`leech`, `vampa`, `wicca` 등)
- 2026-10-13 `wicca`를 `wichy`로 교체
- 2026-10-18 재소환과 교체 추가
- 2026-10-20 노래 검사 추가
- 2026-10-21 악기 복구 추가, 아처와 네크로 공통
- 2026-10-21 프로보와 마지막 대상 검사 추가

## <a id="08"></a>08 보급과 장비 인게임 확인

현재 검사: [Loadout Checks](../verification/loadout.md).

- 2026-10-19 추가. 같은 날 loadout과 regear(옛 dress)를 모듈과 일회성 레시피로 옮김
- 2026-10-19 옛 `hotkey/aspect` 삭제. 두 루틴 안의 `gear/aspect` 블록이 대신함
- 2026-10-19 `gear/aspect`를 `[aspect` gump의 Activate 버튼으로 바꿈. 기억 없이 매번 누름

## <a id="11"></a>11 테이머 아처 인게임 확인

현재 검사: [Tamer Archer Checks](../verification/tamer-archer.md).

- 2026-10-21 추가. 사용자 요청으로 뺀 것: `escape/tracking`, `recovery/bandage`, `bard/provo-picks`, `fight/archery-codex`, `buff/mushroom`, `magery/flamestrike`, Bless, Arch Protection
