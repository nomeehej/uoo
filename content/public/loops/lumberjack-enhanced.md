---
name: Lumberjack Enhanced
label: lumberjack-enhanced 루프
group: Loops
order: 30
---

벌목 루프 `gather/lumberjack-enhanced`의 설계. 템플릿의 판단은 [Lumberjack PvP](../templates/lumberjack-pvp.md).
인게임 확인은 [Open items](../questions/open-items.md#09) 09절.

대상: `script/gather/lumberjack-enhanced.razor`. 옛 `lumberjack.razor`는 구버전 보존(2026-10-10부터 `script/archive/`).
채집 루프와 PvP 자기관리 루프는 핫키를 따로 두고 수동 전환. 자동 공격과 자동 PvP 전환 없음.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 실행 흐름. 초기화, 블록 순서, 리콜, 메시지 표시, 정적 검증 |
| [02](#02) | 채집 근거. Smart Harvest, 도끼 장착, 확인 상태, 바뀐 경위, 이동 뒤 60초 채집 제한 |
| [03](#03) | 기본값과 상태. 설정, 채집을 미루는 조건, Tracking 필터 색, 상태와 타이머, 메시지 순서, 버전 기록 |
| [04](#04) | 실행 준비. Tracking 창, Home 룬, 핫키, 루팅 백, 쿨다운 바, 확인 상태와 반영 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

## <a id="01"></a>01 실행 흐름

1. 설정, 타이머, 상태 초기화. 레시피에 `escape/tracking`이 있고 Tracking 스킬이 있으면 시작 시 Tracking 준비.
   같은 클라이언트 세션에서 확인한 색으로 Hunting이 켜져 있으면 그대로 재사용.
   첫 실행은 지금 창의 색을 읽고, 바꿀 때만 Hunting을 끈 뒤 필터 전환. 리콜 설정과 무관, 기본 필터 red
2. 루프는 마비 해제, 해독, 붕대, 포션, 주문 회복 먼저.
   그 뒤 생존, 자동 리콜, 시약, Hatchet 확인과 Smart Harvest, 자기 버프, 음식, 목재 정리 순서.
   v18부터 음식과 목재 정리는 housekeeping 주기 없이 각자의 타이머를 패스마다 확인. 집 문과 Stockpile 기능 삭제.
   블록 이름과 순서의 정본은 `recipe/lumberjack-enhanced-recipe.razor`, 모듈 구성은 [Modules](../scripting/modules.md#02) 02절
3. 생존 바로 뒤 `RECALL`(`escape/recall`)이 리콜 관련 일을 한곳에서 처리. Tracking 감지, 책, 무게, 요청, 실패 응답.
   자동 리콜을 안 쓰려면 레시피에서 이 블록을 빼고 재조립 → 감지나 책 때문에 채집이나 자기 버프를 멈추지 않음
4. 리콜이 필요해지면 같은 패스부터 채집, 목재 정리, 준비 버프 보류, 회복은 계속. v18부터 음식은 리콜 결정과 무관하게 먹음.
   `RecallCharge Home`은 실제 Recall 주문 요청. Moongate 동작 없음.
   요청은 실행마다 한 번, 명령 전송 = 도착 아님. 싸우려면 사용자가 PvP 스크립트로 전환
5. 서버가 보내는 Tracking, 저장, 채집 결과와 채집 거절 안내는 프로필 오버헤드가 표시.
   리콜 전송 뒤의 실제 거절 문구는 같은 리콜 블록이 안내.
   시약 부족 메시지는 리콜 감지 뒤에 읽고, 같은 패스에서 시약 재확인
6. `util/check.sh script/gather/lumberjack-enhanced.razor`, `node util/check-docs.mjs`, `git diff --check` 실행,
   두 프로필의 XML과 오버헤드 변경 범위 확인. [Open items](../questions/open-items.md#09) 09절의 인게임 확인 항목은 이 정적 검증과 별개

## <a id="02"></a>02 채집 근거

> Lumberjacking always uses Smart Harvest

- [공식 Lumberjacking 문서](https://wiki.uooutlands.com/Lumberjacking): 장착한 Hatchet 더블클릭 → 주변 나무 채집
- [공식 Smart Harvest 문서](https://wiki.uooutlands.com/Smart_Harvest): 도구 사용 뒤 자신이나 상태바를 타깃하는 경로

#### 지금 동작

- 손의 Hatchet 확인 → `Use item in hand`, 커서 대기, `Target Self` 순서로 채집. 이미 수동으로 연 커서가 있으면 새 채집 시작 안 함
- 빈손: `lhandempty` 먼저 확인 → 저장한 `var__my_hatchet`을 백팩에서 찾아 `lift`, `drop self lefthand`로 장착.
  Hatchet은 Outlands 무기표에서 2H("(2H) Axe, Battle Axe, … Two-Handed Axe, Hatchet" -- [Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons)) → Razor의 `lefthand`가 맞는 레이어
  방식은 [bard-mace](https://github.com/nomeehej/uoo/blob/master/script/archive/bard-mace.razor)를 따름
- 장착 다음 시도에서는 `findlayer self lefthand`의 serial이 저장한 도끼와 같을 때만 사용.
  검색 성공이나 장착 요청만으로 실제 장착으로 보지 않음
- 다른 왼손 장비만 비움, 오른손 무기는 수동 장비 핫키 담당
- 주변 나무는 Smart Harvest가 선택 → 나무별 검색 없음
- 공식 문구만으로는 요청 한 번이 나무가 다할 때까지 계속 도는지 확정 불가. 기본 재시도는 커서 처리 뒤 4초
- 주변 채집 자원 없음 응답 → 다음 시도만 2초 뒤(v15). 그다음 요청부터 기본 간격 복귀.
  이 응답은 Tracking과 리콜 감지 뒤에 읽음. 대기 중에도 회복 루프, 수동 입력 차단, 리콜 차단 조건은 그대로

Hatchet은 [공식 무기 표](https://wiki.uooutlands.com/Template:SwordsWeaponClass)에서 2H.
[UO의 양손 장비 레이어는 0x02](https://github.com/ServUO/ServUO/blob/pub57/Server/Item.cs),
[Razor의 이름은 LeftHand](https://github.com/markdwags/Razor/blob/master/Razor/Core/Item.cs).

#### 확인 상태

- v8 기본 채집: 사용자가 정상 작동 보고. 인게임 확인됨 2026-10-05
- v13 END와 그 뒤 채집 응답: 사용자 Journal에서 확인. 인게임 확인됨 2026-10-05
- v10 빈손 장착과 serial 확인 경로: 아직 확인되지 않았다
- 목재 이동 전체 완료 여부, v14 파우치 제외: 아직 확인되지 않았다

#### 바뀐 경위

- v4: 도구 사용 뒤 커서만 남는 화면 보고. v5에서 옛 `lumberjack.razor`의 `Use item in hand`, 커서 대기, `Target Self` 순서 도입
- v7: 이 클라이언트에서 `dress serial` 실패 보고 → `lift`, `drop self lefthand`로 장착, 다음 시도에서 손 재확인
- v9: 빈손인데 백팩 Hatchet을 장착하지 않는다는 사용자 보고. 인게임 확인됨 2026-10-05.
  `findtype … self`의 실제 검색 범위나 실패한 가드까지는 미확인 → `lefthand` 문법 오류로 단정하지 않음
- v10: 지금의 `lhandempty` 확인과 serial 비교 경로 도입

> they will have a 60 second delay before they can attempt to Harvest again

- 같은 문서: Recall, Moongate, Hike 뒤 채집 제한 60초, Teleport와 Rope에도 적용. **60초는 확인된 서버 규칙**
- 단, 스크립트가 이동 성공 시각이나 서버 잔여 시간을 읽을 수 있는지는 별개
- 이동 거절 안내는 두 프로필이 `[ harvest, wait ]`로 표시, 스크립트의 별도 조회 없음
- 4초는 채집 명령 재시도 간격일 뿐, 서버 60초 제한을 줄이거나 대신하지 않음
- 거절 안내 시점부터 60초를 새로 세는 타이머 없음. 매핑은 [Overheads](../scripting/overheads.md#07) 07절

## <a id="03"></a>03 기본값과 상태

구조 요점:

- 도끼 상태는 `var__my_hatchet` 하나, 장착 여부의 equipped 플래그 없음.
  장착 판정 = 실제 왼손 슬롯 serial과 저장한 도끼 serial의 일치. 오른손 제어 없음
- 도구 사용, 커서 대기, 자기 타깃은 채집 블록 하나에서 완료. v8 경로와 pending 없는 구조 유지
- 목재 가공과 파우치 이동에도 별도 처리 단계나 pending 상태 없음
- Tracking 시작 설정과 자동 리콜 판정은 분리 유지
- 채집 허용 캐시나 숫자 단계 대신 실제 정지 조건과 리콜 상태의 뜻을 코드에 직접 기록
- 변수 이름은 공통 접두 `config__`, `var__`, `timer__`
- 클라이언트에 옛 session 변수나 persistent 변수 값이 남아 있어도 이 스크립트는 읽지 않음

#### 설정

- **`config__chatty`, `config__sysmsg`**: 각 1. chatty = 선택 가능한 스크립트 오버헤드, sysmsg = Journal 진단(시작 버전, 리콜 원인, 도끼 장착 요청, 목재 정리).
  따로 끌 수 있음. 부족과 차단 경고, 프로필이 표시하는 서버 사건은 둘 다 꺼도 남음
- **`escape/recall` 블록**(v17까지 `config__auto_recall`): 레시피의 `#@ use escape/recall`.
  빼고 조립하면 감지 메시지, Hunting 점검, 책, 여유 무게, 실패 응답 조회 전부 없음.
  `var__hold_gathering`을 세우는 블록도 없어서 책이나 Hunting 때문에 채집 보류 없음.
  시작 시 Tracking 설정과 프로필 화면 표시는 남음. 가까운 red 때문에 채집이나 자기 회복을 멈추지 않음
- **`config__recall_on_detection`, `tracking_color`, `show_tracking`**: 1, 1, 0. 시작 설정은 레시피의 `escape/tracking`(v17까지 `use_tracking`).
  Tracking 스킬 0이면 건너뜀. 색 값: 1 red, 2 grey, 3 orange, 4 세 그룹 전체. 설정은 시작 시 한 번.
  감지 리콜은 `recall_on_detection` 1이고 Hunting을 확인한 경우에만. 적 발견 → 다음 패스부터 채집과 준비 버프 보류, 리콜 요청
- **`config__recall_at_any_distance`**: 0. 기본은 기존처럼 1\~45 steps 분기에서 리콜 필요 여부 기록.
  1이면 준비된 필터의 발견 문구만으로 리콜 요청. 화면 알림은 프로필 담당
- **`config__recall_on_weight`, `weight_remaining`, `require_runebook`**: 1, 10, 1. 리콜 블록이 있으면 남은 무게 10 이하에서 리콜 필요 기록.
  책 보유 여부는 5초 주기 캐시. 마지막 설정 = 책이 없을 때 채집 보류 여부.
  0이어도 실제 리콜에는 책 필요. 책 검사는 충전량이나 Home 룬 유무까지 보지 않음
- **`config__heal_hits`, `emergency_hits`, `light_hits`, `use_light_heal`**: 잃은 HP 35, 45, 15와 0.
  평소 붕대, 35부터 힐 포션, 45부터 Greater Heal 보조. 붕대를 못 쓰면 15부터 Smart Heal/Cure 대체 시도.
  v16부터 `use_light_heal` 1이면 붕대와 병행. 독이면 Cure 포션과 해독 주문 먼저.
  v17부터 이 회복은 pvp와 같은 `recovery/` 모듈([Modules](../scripting/modules.md#02) 02절). 워모드의 회복 주문 정지 규칙은 `warmode_is_manual` 1로 유지
- **`config__use_reactive_armor`, `use_magic_reflect`**: 각 1. 리콜 불필요하고 안전할 때 마나 24, 34부터 각각 시전.
  시작 마나는 레시피의 `config__mana_reactive_armor`, `config__mana_magic_reflect`.
  준비 버프 뒤에도 GH와 Teleport 마나 예산 20을 남기려는 값. 근거는 [Item list](../game/item-list.md#19) 19절과 [Lumberjack PvP](../templates/lumberjack-pvp.md#04) 04절
- **`config__use_potions`**: 1. 독, 피해, 스태미나에 Cure, Heal, Refresh 포션. 리콜 준비용 Strength와 Agility 포션과 그 옵션은 삭제
- **`pack/lumber` 블록**(v17까지 `config__pack_lumber`): 레시피의 `#@ use pack/lumber`. Logs 가공과 Boards 루팅 백 이동을 한 묶음으로.
  빼고 조립하면 정리 없음. `loadout`에서 고른 `global__my_loot_bag` 재사용, 없거나 백팩에 없으면 시작 시 루팅 백 선택.
  2026-10-19까지는 보급품과 같은 파우치(`global__my_looting_pouch`).
  나눈 이유는 [pack/pouches](https://github.com/nomeehej/uoo/blob/master/module/pack/pouches.razor), 배치는 [pack/sorting](https://github.com/nomeehej/uoo/blob/master/module/pack/sorting.razor)
  Logs 7133, Boards 7127은 [Item list](../game/item-list.md#15) 15절 값, 색 구분 없음.
  가공은 [공식 Lumberjacking 문서](https://wiki.uooutlands.com/Lumberjacking)의 Logs 더블클릭 경로

- 짧게 적은 설정 이름도 실제 파일에서는 모두 `config__` 접두
- 나머지 설정: 스태미나 15 이하의 Refresh, 출력 빈도. Hatchet 하나로 채집, 예비 수량 검사 없음

#### 채집을 미루는 조건

- 빈손 장착은 남은 무게를 기다리지 않음. v18부터 `var__hold_gathering` 1이면 장착과 채집 함께 보류
- `var__hold_gathering` 1이 되는 경우: 리콜 결정, 책 필수인데 없음, 감지 리콜인데 Hunting 없음
- 회복과 수동 입력 가드도 장착과 채집에 함께 적용. 리콜 블록이 없어도 실제 남은 무게 0 이하면 채집 보류
- 채집 직전 `if / elseif / else` 사슬로 정지 사유를 차례로 확인. 손의 도끼, 남은 무게, 수동 입력 중 하나라도 준비 안 되면 보류
- 책과 Hunting 조건은 v18부터 이 사슬에서 제외. 리콜 블록이 패스마다 리콜 결정과 함께 `var__hold_gathering` 하나로 합치고, 채집 블록은 맨 앞 조건에서 그 값만 읽음
- 차단 조건을 모두 통과하면 도구 사용, 커서 대기, 자기 타깃을 같은 블록에서 처리
- `require_runebook` 0이면 책 조건, `recall_on_detection` 0이거나 Tracking 스킬 0이면 Hunting 조건 건너뜀. 리콜 블록을 빼면 둘 다 없음
- 건강, 남은 무게, 수동 입력 조건은 이와 별도로 통과 필요
- `and`만 이어진 조건은 합칠 수 있음. `or` 예외까지 한 줄에 섞지 않음. 이 포크에서 괄호를 쓴 확인된 선례 없음
- CE 원본은 섞인 논리 연산을 왼쪽부터 평가([CE Interpreter의 EvaluateLogicalExpression](https://github.com/markdwags/Razor/blob/master/Razor/Scripts/Engine/Interpreter.cs)).
  Outlands에서 연산자 우선순위를 새로 검증한 것은 아님. 채집 가능 여부를 저장하는 상태는 없음

#### Tracking 필터 색

- red = Tracking의 Murderer Players, grey = Criminal Players, orange = Enemy Players
- grey는 범죄자 필터 이름일 뿐, 회색 대상 전부를 따로 검색하는 기능 아님
- 전체 선택 = 서버의 All Hostile Players 필터. grey와 orange 확인 문장의 서버 일치 여부는 인게임 확인 대상
- 추적 화면 표시는 [Overheads](../scripting/overheads.md#07) 07절의 프로필 매핑

#### 상태와 타이머

- **`var__recall_needed`**: 0 = 채집 계속, 1 = 리콜 필요. 감지나 여유 무게 부족으로 1이 되면 재실행 전까지 유지.
  1이면 리콜 블록이 같은 패스에 `var__hold_casts`와 `var__hold_gathering`을 1로 두어 준비 버프, 채집, 목재 정리 정지
- **`var__recall_sent`**: 0 = 미전송, 1 = RecallCharge 전송. 회복 루프가 도는 동안 같은 요청과 리콜용 재검색 차단.
  실패해도 1 유지, 새 요청은 재실행 필요. 명령 전송 = 도착 아님
- **`var__recall_book_available`**: 리콜 책 보유 캐시. 초기값 0을 첫 패스의 채집 전 점검이 갱신, 이후 리콜 블록의 5초 점검 주기.
  책 필수인데 0이면 `var__hold_gathering`이 채집 정지. 요청 직전 책 재확인.
  그때 책이 없으면 캐시를 0으로 바꾸고 다음 점검까지 검색 보류
- **`var__tracking_filter_confirmed`, `tracking_hunting_active`, `tracking_button_answered`**: 설정 색의 서버 확인 여부, 최근 확인한 Hunting의 켜짐 여부, 지금 필터 버튼의 응답 여부.
  필터와 버튼 상태는 시작 설정용. 루프의 Hunting 점검은 감지 리콜이 켜져 있고 아직 리콜 미결정일 때만.
  감지 리콜인데 Hunting이 아니면 리콜 블록이 `var__hold_gathering`으로 채집 정지
- **`var__tracking_setup_color`**: 같은 클라이언트 세션에서 확인한 색 값. Hunting이 켜져 있고 config 색과 같으면 시작 설정 재사용.
  버프만으로는 색을 알 수 없음 → 첫 실행은 창이나 서버 응답으로 확인. 필터를 수동으로 바꿨으면 Hunting을 끈 상태로 재실행.
  클라이언트 종료 시 캐시 소멸
- **`wait__harvest_target`**: 3000ms. 손 도구 핫키 직후 `waitfortarget`으로 커서를 기다리는 한도.
  같은 채집 블록에서 중립 커서를 `target self`로 처리 → 대기 중 다른 자동 행동 끼어들기 없음.
  도구 큐가 남아도 자기 타깃 생략 안 함. 새 수동 시전, 숨기, warmode, 다른 종류의 커서는 처리 안 함.
  시간 초과로 커서가 없으면 자기 타깃 미전송, 다음 시도 간격은 이 블록 종료 뒤부터 계산
- **`var__recall_check_due`, `regs_*`, 시약별 보유 변수**: 이번 패스가 리콜 블록 5초 점검 차례인지, 주문별 시약 조합.
  v18에서 housekeeping 주기(`var__housekeeping_pass`) 삭제. 리콜의 책, Hunting, 무게 점검은 이 값으로 채집 전에, 음식과 목재 정리는 루프 끝에서 각자의 타이머로.
  시약은 `magery/reagents`가 10초마다, 부족 안내를 읽은 즉시 재확인. 그 블록은 자동 리콜 뒤 → Tracking 줄을 먼저 읽음
- **`interval__harvest_retry`, `interval__harvest_out_retry`, `var__harvest_retry`**: 기본 재시도 4000ms, 주변 자원 없음 응답 뒤 재시도 2000ms.
  `var__harvest_retry` = 다음 시도에 쓸 간격. 처음과 각 시도 직후는 기본값, 자원 없음 응답을 읽으면 짧은 값.
  응답을 읽은 시각에 기존 `timer__harvest`를 0으로 되돌리고 새 간격과 비교. 별도 타이머나 2초짜리 wait 없음.
  수확 성공, 실패, 여행 제한, 채집 불가 응답은 기본 간격 유지. 이 새 경로는 아직 인게임에서 확인되지 않았다
- **`var__my_hatchet`, `wait__equip`**: 고른 도끼 serial 하나, 장착 뒤 1000ms 대기. 초기값 0, Stop과 Play 사이에 재사용.
  왼손이 비었는데 캐시한 도끼가 백팩에 없으면 3907, 3908로 재검색. 이 graphic 검색은 도끼 찾기 전용.
  이미 든 도끼가 캐시와 다르면 라벨을 한 번 읽고 그 serial 저장. 다른 왼손 도구면 비우고 다음 시도에서 도끼 장착.
  새 타이머 없음, 기존 `timer__harvest`로 장착 재시도와 채집을 함께 조절.
  장착 뒤 손 슬롯 serial 재확인, 캐시나 요청만으로 성공 표시 안 함
- **`var__hold_casts`, `var__hold_gathering`**: `module/base.razor`가 0으로 선언하는 블록 사이 신호([Modules](../scripting/modules.md#06) 06절).
  리콜 결정 시 리콜 블록이 `var__hold_casts`를 1로 → 자기 버프 정지.
  `var__hold_gathering`은 리콜 결정, 책 없음, Hunting 없음에서 1 → 채집과 목재 정리 정지.
  v17에서 `var__bandage_available`, `heal_spell`, `buff_cast` 삭제. 회복 블록마다 지금 상태를 읽고 바로 시전
- **`timer__recall_check`, `interval__recall_check`**: 5000ms. v18에서 housekeeping 주기 대신 리콜 블록이 쓰는 점검 주기.
  리콜 책과 무게는 명령 전송 전까지 점검. Hunting 상태는 2026-10-10부터 `escape/tracking`이 자기 5초 시계(`interval__tracking_check`)로 읽고, 리콜 블록은 결과만 확인.
  Tracking 메시지는 준비 상태면 패스마다 확인, 무게 판정보다 먼저
- **`interval__pack_lumber`, `timer__pack_lumber`, `wait__lumber_item`**: 120000ms마다 정리. 180000ms로 바꾸면 3분.
  v18부터 housekeeping 대기 없이 패스마다 이 타이머 확인. 첫 정리도 이 주기가 지난 뒤.
  입력이 비고 회복이 필요 없을 때 시작, 묶음마다 사용이나 이동 뒤 500ms 대기.
  작업 중에는 같은 타이머로 단계별 시간 계산, 정리 완료 시 0으로 되돌려 다음 2분 계산.
  가공이나 이동에 실패한 묶음과 남은 묶음은 다음 주기에 재시도. 루팅 백이 없을 때도 이 주기로 제한
- **`wait__lumber_batch`, `var__lumber_graphic`, `global__my_loot_bag`**: 요청 사이마다 확인하는 단계별 작업 예산 2500ms, 지금 검색하는 graphic, 로드아웃과 공유하는 영속 루팅 백
  - graphic 순서 7133 Logs, 7127 Boards, 색 필터 없음. `findtype graphic backpack`에서 hue를 빼므로 같은 graphic의 모든 목재 색이 대상
  - 검색은 시간, 입력, 대상 존재 조건으로 끝나는 `while`. `for 2`는 가공과 이동 두 단계를 같은 본문으로 처리.
    `for`가 `while`보다 빠르다는 뜻 아님. 임시 스택 목록과 `foreach`는 삭제
  - v14부터 파우치 소속 먼저 확인 → 이미 넣은 Boards는 요청 없이 건너뜀.
    판별하거나 요청한 serial은 ignore → 같은 단계에서 실패한 묶음 재선택 없음.
    단계 시작과 끝에 clearignore → 영구 제외 아님. 실패한 묶음은 다음 2분 주기에 재시도
  - Boards는 가공 뒤 지금 인벤토리에서 검색. 변환과 병합 전 serial 재사용 없음
  - 별도 pending, 처리 단계 플래그, 타이머 없음. 단계 시작과 요청마다 큐가 남아 있으면 예산 안에서 대기.
    큐 대기와 검색은 조건이 거짓이 되면 정상 종료
  - 목재 블록에 break, continue, 별도 125회 검색 반복 없음. 다음 요청 전 회복, 수동 입력, 큐, 파우치, 예산 확인
  - 남은 다른 색의 Logs는 색 구분이 아니라 작업 예산 때문에 다음 주기로 넘어갈 수 있음
  - `lift`와 `drop`은 붙여서 처리. 예산은 명령마다의 대기를 포함한 절대 실행 시간 상한 아님.
    [CE lift 문서](https://www.razorce.com/guide/commands/#lift)에는 별도 기본 대기 한도 기재
- **리콜 응답 안내**: 전송 뒤 실제 서버 거절 메시지만 확인. 5초 경과 안내와 그 반복을 막는 상태 없음.
  도착 여부와 남은 채집 제한 시간 추정 없음, 거절이나 응답 지연 뒤에도 채집 자동 재개 없음
- **채집 조건과 나머지 타이머**: 채집 블록은 `var__hold_gathering`, 실제 무게 한도, 건강, 수동 입력 조건을 읽음.
  리콜 필요 여부, 책, Hunting은 리콜 블록이 그 값으로 통합. 회복, 버프, 채집 재시도, 시약과 음식 주기는 각자 유지.
  서버 저장 상태는 별도 관리 없음

- 짧게 적은 상태 이름도 실제로는 `var__` 접두
- 주기는 클라이언트의 재시도 값, 서버 잔여 시간 측정값 아님

#### 메시지를 읽는 순서

- 회복과 버프 대기는 기존 `casting`과 횟수를 정한 반복으로 처리, 끊김 메시지 별도 소비 없음
- 메인 루프는 Tracking 감지보다 앞에서 메시지를 소비하지 않음
- 시작 설정에서 Hunting을 멈추고 필터를 확인한 뒤 `clearsysmsg`로 앞선 필터와 중간 필터 메시지 비움
- 리콜 감지는 채집 전에 읽음 → 경보 발견 시 같은 패스의 채집과 정리 보류
- 채집의 3초 커서 대기나 목재 정리 중 새 경보는 다음 패스에서 읽음. 그 동작 중 계속 감지하는 것 아님
- 시약 부족은 리콜 감지 뒤에 읽고, 같은 패스에서 시약 재확인
- 목재는 가공과 이동 요청 사이마다 회복, 수동 입력, 큐 상태 재확인
- 단계별 시간 예산 종료 시 남은 목재는 다음 정리 주기로, 생존과 채집 점검으로 복귀

#### 목재 정리 뒤 채집이 멈춘 보고

- 2026-10-05 사용자 보고: 목재 가공과 파우치 이동 성공 뒤 다른 Logs가 남고 채집 정지
- 화면에 가공 성공 문구 있음, `Script Error`와 줄 번호는 확인되지 않았다
- Play 상태라는 보고만으로 오류 위치 확정 안 함
- 옛 코드: 스택을 모두 처리할 때까지 메인 루프로 복귀 안 함, `queued`가 남으면 다음 스택부터 처리 중단 조건 존재

v15부터 sysmsg 기록 순서: `Lumber pack BEGIN`, 가공과 `Lumber skip`과 `Lumber move request`, `Lumber pack END`.

- `skip: … already in pouch`: 기존 Boards를 들어 올리지 않았다는 판별 기록
- `move request`: lift와 drop 직전의 요청 기록. 서버의 이동이나 병합 보증 아님
- 같은 hue의 새 Boards가 기존 묶음에 합쳐지면 원래 파우치 묶음 serial이 남을 수 있음 → 요청한 serial 소멸 = 실패로 단정하지 않음
- 기존 파우치 묶음 자체를 다시 옮겨 합치는 로직 없음. 실제 병합 결과, 용량, 서버 응답은 인벤토리에서 확인

END 뒤에도 채집이 보류되면 큐와 커서 안내, 리콜과 책과 Hunting 조건을 함께 확인. 남은 확인은 [Open items](../questions/open-items.md#09) 09절.

#### 버전 기록

- **v10** 2026-10-05: 장착 판정을 실제 왼손 슬롯과 저장한 도끼 serial의 일치로 변경.
  목재 가공과 파우치 이동을 housekeeping에 묶음. 책, Hunting, 무게 점검은 housekeeping 주기 사용,
  리콜 결과를 확인하지 않는 5초 안내 타이머와 그 상태는 삭제
- **v11**: 집 문과 Stockpile의 설정, 선택, 동작, 타이머 삭제, housekeeping을 루프 끝으로 이동
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
  근거와 재확인 범위는 [Razor](../scripting/razor.md#03) 03절과 [Open items](../questions/open-items.md#09) 09절
- **v18** 2026-10-10: 모듈을 관심사별 폴더로 재분할하며 housekeeping 주기 삭제([Modules](../scripting/modules.md#08) 08절).
  리콜 블록이 자기 5초 주기로 책, Hunting, 무게 점검, 음식(`buff/food`)과 목재 정리(`pack/lumber`)는 각자의 타이머를 패스마다 확인.
  리콜 결정, 책 없음, Hunting 없음은 리콜 블록이 패스마다 `var__hold_gathering` 하나로 통합, 채집과 목재 정리는 그 값만 읽음.
  `config__auto_recall`, `use_tracking`, `pack_lumber` 삭제. 블록을 끄려면 레시피에서 그 블록 제외.
  음식은 skinning-enhanced와 같은 블록 → 다쳤거나 독이거나 리콜 결정 중에도 먹음. 워모드에서는 `warmode_is_manual` 1이라 안 먹음

## <a id="04"></a>04 실행 준비

1. Tracking 감지 리콜을 쓰면 Tracking 창의 Hunt Frequency를 **Always Get Closest**로.
   스크립트는 대상 필터만 맞추고 추적 빈도 모드는 그대로. 모드별 차이는 [Tracking 문서](https://wiki.uooutlands.com/Tracking)의 Hunting 항목
2. 레시피가 `escape/recall`을 쓰면 충전한 책에 `Home` 룬 준비.
   룬 이름이 다르면 `module/escape/recall.razor`의 `say "[RecallCharge Home"` 한 줄 수정 → `pnpm build`.
   명령의 뜻은 [공식 Commands 문서](https://wiki.uooutlands.com/Commands)의 RecallCharge 항목
3. Hatchet, 붕대, 시약, 포션 준비, 이 캐릭터에서 다음 핫키 동작 확인.
   `Use item in hand`, `Bandage Self`, 각 Drink 핫키, `> Smart Heal/Cure Self`, `> Greater Heal/Cure Self`, `> Interrupt`, `Cancel Current Target`
4. 백팩 안에 루팅 백(bag 3702) 준비. 미지정이거나 백팩에 없으면 시작 시 `[ loot bag, pick ]`, 한 번 선택.
   이미 `loadout`으로 정했으면 그 값 사용. 실행 중 루팅 백이 없으면 `[ loot bag, out ]` 후 정리 건너뜀
5. 이 캐릭터의 `heal pot`, `walk`, `reflect` 바 확인.
   없는 바는 0으로 보임 → 이동 차단과 Reflect 재시전 제한 미준수. 설정 변경은 별도 작업

상황별 기대 동작과 실패 판정: [Open items](../questions/open-items.md#09) 09절

#### 확인 상태와 반영

- Heat of Battle 이동 제한 정본은 [PvP](../game/pvp.md#01) 01절
- 2026-10-05 확인한 공식 문서는 Recall도 차단한다고 설명. 이번 변경은 버프를 보고 미리 막던 스크립트 동작의 삭제일 뿐, 서버의 Recall 허용 판정 아님
- 정적 검사로는 게임 응답과 커서 소유권 증명 불가. 위 동작은 아직 인게임에서 확인되지 않았다
- 후속 확인은 [Open items](../questions/open-items.md#09) 09절
- 반영은 [Workflow](../working/workflow.md#04.A) 04.A절. Scripts 탭 Reload all scripts 뒤 Play로 반복 확인, 외부 파일 수정 뒤 핫키 실행이면 클라이언트 재시작
- 게임 종료 뒤 `git status --short`로 Razor가 덮어쓴 파일 확인
