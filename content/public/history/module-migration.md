---
name: Module Migration
label: 모듈 이관 기록
group: History
order: 10
---

2026-10-10 모듈 이관과 재구성의 기록. 표의 전후 값은 당시 버전 기준.
현재 형식과 작업 순서는 [Modules](../scripting/modules.md).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 2026-10-10 이관과 재구성 |
| [02](#02) | 아직 옮기지 않은 것 |

## <a id="01"></a>01 2026-10-10 기록

### <a id="01.A"></a>01.A 처음 옮길 때

**pvp(v9): 동작 동일.**

- 처음에는 블록을 그대로 잘라 옮김 → 루프가 글자까지 같음
- 공용 스위치 추가 후에도 pvp 설정값으로 늘 참인 감싸기 조건을 걷어 내면 원래 루프와 문장 동일
- 그 설정값: `walk_guard` 0, `warmode_is_manual` 0, `buff_when_poisoned` 1, `heal_skill_min` 0, `buff_max_loss` 35(= `emergency_hits`)

**skinning-enhanced(v11), lumberjack-enhanced(v17): 회복, 포션, 버프, 시약이 pvp와 같은 블록으로.**

- 두 루프만의 블록(전투 대상, 도끼, 골드, codex, 무기 능력, 칼질, 가죽, Tracking 설정, 자동 리콜, 벌목)은 경고 타이머 이름을 `timer__message`로 바꾼 것 외 글자까지 동일
- 손실선, 마나, Refresh 기준 같은 값은 레시피 설정으로 유지. 바뀐 동작:

| 항목 | 전 | 지금 |
| --- | --- | --- |
| 회복 주문 선택 | 위에서 `var__heal_spell` 선택, 아래 SELF AGENT가 시전 | 큐어, 힐, 가벼운 Heal 블록이 각자 현재 상태를 읽고 바로 시전 |
| 재시도 타이머 | 큐어 포션, 힐 포션, Refresh 1초, 붕대 1.2초, 회복 주문 2.5초, 버프 3초(lumberjack은 10초) | 없음. 행동 큐, `bandaging`, `findbuff`, 포션 라벨과 바가 반복 방지 |
| Greater Heal | 손실 45부터 포션과 같은 패스에도 가능 | 그 패스에 힐 포션이 안 나갔을 때만 |
| 붕대 | 우리 시전 중 대기 | 시전 중에도 나감(pvp와 같은 입력 규칙) |
| 포션 사용 방법 | skinning은 `findtype` 후 `dclick` | `Drink Cure` 같은 Razor 핫키 |
| 경고 | 두 루프 모두 `[ refresh, out ]`, skinning은 힐 포션 쿨 라벨과 `[ str, out ]`, `[ agi, out ]`, `[ resist, out ]`도 | pvp처럼 안 띄움. 큐어 포션, 힐 포션, 붕대 없음 경고는 유지 |
| 블록 순서 | 큐어 → 붕대 → 힐 포션 → 회복 주문 → Refresh | 큐어 → 힐(포션, Greater Heal) → 붕대 → 가벼운 Heal → Refresh |
| Refresh(skinning) | 스태미나 60 미만 | 60 이하 |
| 버프를 끊는 선(lumberjack) | 15 미만에서 시작, 35에서 끊음 | 15에서 시작 안 함, 15에서 끊음 |
| Journal 문구(skinning) | `Heal agent: …`, `Buff cast: …` | `Agent: …`, `Buff: …`. lumberjack은 이 줄이 새로 생김 |

- 레시피를 `-recipe.razor`로 바꾸고 기본과 다른 설정만 적으면서, 루프마다 다르던 내부 값 두 개를 모듈 값으로 통일
  - skinning-enhanced 경고 간격: 2.7초 → 3초
  - 두 채집 루프의 시약 확인: 30초 → 10초

### <a id="01.B"></a>01.B 다시 짠 것

**다시 짠 이유**

- 레시피 설정 줄만으로는 설정의 역할, 읽는 모듈을 알 수 없고 그 파일로 찾아갈 길도 없었음
- 모듈에 설정 한두 개만 든 것(`core/output`, `core/switches`), 대기 값만 든 것(`core/wait`, `core/message`), 블록이 섞여 있었음
- `needs`, `after`, `ready`를 손으로 적어야 했고, 폴더도 core, gather, combat처럼 쓰는 루프로 나뉨

| 항목 | 전 | 지금 |
| --- | --- | --- |
| 폴더 | `core/`, `combat/`, `gather/`(쓰는 루프로) | `recovery/`, `buff/`, `fight/`, `gather/`, `pack/`, `escape/`(맡는 일로), 그리고 `base.razor` |
| 공용 모듈 | `core/output`, `switches`, `wait`, `message`, `start`, `pvp-stop`, `pass-wait` | `base.razor` 하나. 시작 4줄은 `config__clear_at_start`가 결정 |
| 모듈 사이 관계 | `# @ needs`, `# @ after`를 손으로 | 조립기가 코드의 이름으로 탐색 |
| 타이머 | `# @ timer`에 `createtimer` 묶음, `# @ ready`에 `settimer` | `# @ timer`에 `timer__이름 시작값` 한 줄 |
| 모듈의 설정 칸 | `# @ settings` | `# @ config`. 설정마다 설명 필수 |
| 레시피 설정 | `# @ config` 칸에 값과 이유만 | 블록마다 상자 하나. 조립기가 상자 안에 설명, 기본값, 함께 읽는 블록, 값은 상자 밑. `# @ use base`가 첫 블록 |
| 모양 | 칸과 항목이 붙어 있고, 이름마다 바로 위에 주석 | 블록과 칸마다 `-` 상자(레시피 큰 칸은 `=`). 설명은 상자 안, 이름은 상자 밑. 선택지는 한 줄에 하나, 글은 90자 안. 레시피 블록에 모듈 요약. 결과물도 같은 모양 |
| 블록 켜고 끄기 설정 | `use_weapon`, `use_sword_codex`, `use_parry_codex`, `use_weapon_ability`, `use_skinning`, `use_gold_drop`, `pack_leather`, `pack_lumber`, `use_tracking`, `auto_recall`, `use_stat_potions` | 삭제. 레시피에 넣으면 켜짐, 빼면 꺼짐 |
| codex와 무기 능력의 슬롯 번호 | `sword_stance_warrior 4`처럼 바꿀 일 없는 설정 18개 | 위키 순서의 숫자를 코드에, 고르는 설정(`sword_stance_main` 등)의 설명에 번호표 |
| 이름 | `config__weapon_graphic`(도끼), `wait__long`, `wait__target`, 두 codex가 같이 쓰던 `cooldown__stance_*` | `config__axe_graphic`, `wait__gold_drop`, `wait__tracking_gump`, `interval__sword_*`와 `interval__parry_*` |

**pvp(v9), skinning-enhanced(v11): 동작 동일.** 루프 문장 차이는 셋: 늘 1이던 켜고 끄기 조건 삭제, 슬롯 상수가 숫자로, 이름 변경.
pvp 결과물에서는 시작 4줄이 `if config__clear_at_start = 1` 안, pvp의 값은 0.

**lumberjack-enhanced: v18.** 5초 housekeeping 시계(`var__housekeeping_pass`) 삭제로 동작 변경.

| 항목 | v17 | v18 |
| --- | --- | --- |
| 책, Tracking, 무게 점검 | housekeeping 시계(5초) | `escape/recall`의 자기 시계 `interval__recall_check`(5초) |
| 음식 | housekeeping 패스에서, 손실이 `light_hits` 미만이고 독, 워모드, 리콜 결정이 없을 때 | skinning과 같은 `buff/food`. 패스마다 60초 타이머와 Food Satisfaction 확인, 워모드에서는 쉼(`warmode_is_manual` 1). 손실, 독, 리콜 결정은 안 봄 |
| 목재 정리 | housekeeping 패스에서, 리콜 결정이 없을 때 | 패스마다 120초 타이머 확인. `var__hold_gathering` 1이면 쉼 |
| 채집이 기다리는 것 | 리콜 결정은 장착과 채집 모두 차단, 책 없음과 Hunting 아님은 채집만 차단 | 셋 다 `var__hold_gathering` 하나로 장착과 채집 함께 차단 |
| 시작 메시지 | `v17 loaded: auto recall=…, tracking color=…` | `v18 loaded: tracking color=…` |

인게임 확인 항목: [Lumberjack Checks](../verification/lumberjack.md#01) 01절에 추가.

### <a id="01.C"></a>01.C dexxer-basic

- 같은 날 `combat/dexxer-basic`을 `recipe/dexxer-basic-recipe.razor`로 이동. 블록은 모두 기존 모듈
- 새로 만든 것: 30초마다 `Clear Scavenger Cache`를 누르는 `pack/scavenger`
- 옛 값은 레시피 설정으로: Healing 10 초과일 때 붕대, 스태미나 5 미만에서 Refresh, 골드 500씩, 마법 끔

| 항목 | 전 | 지금 |
| --- | --- | --- |
| 힐 포션 | HP 65 이하 | 잃은 HP 35 이상(`heal_hits`). 최대 HP 100이면 같음 |
| 음식 | 패스마다 Food Satisfaction 확인 후 먹음 | 60초마다 확인(`buff/food`) |
| 포션 쓰기 | `findtype` 후 `dclick` | `Drink Cure` 같은 Razor 핫키 |
| 경고 | Refresh나 스탯 포션이 없을 때도 | 큐어 포션, 힐 포션, 붕대, 주머니가 없을 때만 |
| 스탯 포션 | 코드는 있었지만 꺼짐(`var_use_potion 0`) | 넣지 않음. 쓰려면 `buff/potions`와 `fight/target` 추가 |
| 패스 첫머리 | `queued`와 시전 종료까지 대기 | 블록마다 `queued`와 시전을 보고 비켜 감 |

### <a id="01.D"></a>01.D bard-necro-enhanced

- 같은 날 `combat/bard-necro-enhanced`도 `recipe/bard-necro-enhanced-recipe.razor`로 이동
- 이 루프는 하우스키핑 틱, 교전 분기, 이동 분기로 패스를 나눔 → 블록을 그대로 늘어놓기 불가. 구조는 레시피 그룹([Modules](../scripting/modules.md#03) 03절)으로
  - 생존 네 블록: 다른 레시피와 같은 `# @ when paralyzed or poisoned or diffhits > 0` 안
  - 하우스키핑: `# @ every interval__housekeeping` 안
  - 교전과 이동: `# @ when var__fighting = 1`과 `# @ otherwise`
- 바드, 네크로, 공격 주문 블록은 새 모듈로([Modules](../scripting/modules.md#02) 02절의 `bard/`, `necro/`, `magery/`, `buff/mushroom`). 코드는 원본과 같고 이름만 지금 규칙
  - `cooldown__` 간격 → `interval__`. `wait__target` → 바드의 `wait__bard_target`, 네크로의 `wait__ability_target`
  - `wait__long` → `wait__instrument_pick`, 핫바 대기 → `wait__hotbar_gump`
- 생존, 전투 대상, 시약, 음식, 스탯 포션, 골드, Refresh, 셀프 버프는 다른 루프와 같은 공용 모듈
  - 원본에만 있던 동작은 공용 모듈의 설정으로 추가(`settle_first`, `recover_in_warmode`, heal pot 바 시작)
- Herding은 꺼져 있었음 → `tamer/herding`은 만들기만, 레시피에는 없음. 테이머 스킬이라 `tamer/`
  - 켜고 끄는 설정 `use_herding`, `name_summons` 삭제
- 소환수 이름: 내 이름을 닮은 이름 셋 → 종류를 알아볼 수 있는 이름(`leech`, `mumi` 등). 무엇이 나와 있는지 체력바로 보려는 목적
  - 종류 단어와 한 글자만 다른 이름까지 서버가 거절

| 항목 | 전 | 지금 |
| --- | --- | --- |
| 힐 간격 | 두 힐 사이 1.2초, Greater Heal 재시도 2.5초 타이머 | 삭제. 힐 포션은 heal pot 바와 라벨로 차단, Greater Heal은 그 패스에 포션이 안 나갔을 때(`recovery/heal`) |
| 독에 걸린 채 다쳤을 때 | Smart Heal/Cure가 독과 HP 모두 담당 | 큐어 먼저. 힐 포션과 Greater Heal은 독이 풀릴 때까지 대기 |
| 가벼운 Heal | 잃은 HP 15 초과 35 미만 | 15 이상, 위 한계 없음(`recovery/light-heal`) |
| 셀프 버프 | 잃은 HP와 무관하게 시전 | 잃은 HP 35 이상이면 시작 안 함, 시전 중이면 끊음(`buff_max_loss`) |
| Spell Siphon | RA, Reflect와 같은 `elseif` 사슬의 셋째 갈래. 자기를 찍기 전 lasttarget 재확인 | `buff/spells` 사슬의 마지막 갈래(`use_spell_siphon`). 순서 동일. 한 시간에 한 번이라 lasttarget 재확인 없음 |
| 스탯 포션 | 10초마다 셋 확인, 없으면 경고. 민첩 기준선 120 | 하우스키핑 5초 안에서 포션마다 5초 재시도. 없어도 경고 없음. 민첩 기준선은 이 템플릿의 DEX 25 + 20인 45(인게임 확인됨) |
| Refresh | 없으면 경고 | 경고 없음 |
| 골드 | 하우스키핑마다 무게 밑으로 내려갈 때까지 반복 | 하우스키핑마다 한 번(`pack/gold-drop`) |
| 음식 | 워모드와 무관 | 워모드에서는 쉼(`warmode_is_manual` 1) |
| 버섯 먹기 | 이동 중에만, 걷기 바와 시전 대기 | 교전 중에도 마나 55 이하면 먹음. 포션처럼 커서만 대기. Create Food는 그대로 이동 중에만 |
| 시약 읽기 | 30초마다 | 10초마다(`interval__reagents`) |
| 경고 간격 | 2초 | 3초(base의 `interval__message`) |
| 전투 대상 | lasttarget이 무엇이든 받음 | 모바일 serial만(`fight/target`) |
| Disco가 기억한 대상 | 하우스키핑에서 30초 뒤 잊음 | 교전 패스마다 `bard/disco` 첫머리에서 확인. 교전 패스에 문장 하나 증가 |
| 패스 | 시작에 queued와 시전 대기 | 같음(`settle_first` 1). 끝에 `wait wait__poll` 0.1초, 구조적 PvP에서 정지(base) |
| Journal | 안 씀 | 다른 루프처럼 `config__sysmsg` 1로 진단 줄 |

인게임 확인 항목: [Bard Necro Checks](../verification/bard-necro.md#01) 01절에 추가.

### <a id="01.E"></a>01.E tamer-mage-enhanced

- 같은 날 archive의 `tamer-mage-enhanced`(v5)를 `recipe/tamer-mage-enhanced-recipe.razor`로 이동, 결과물은 `script/combat/`로 복귀(v6)
- 새 모듈: `tamer/vet-kit`, `magery/flamestrike`. 나머지는 공용 모듈 확장
  - `magery/reagents`가 Bless, Arch Protection, Flamestrike 시약도 읽음
  - `buff/spells`에 Bless와 Arch Protection 갈래 추가. 기본은 꺼짐(`use_bless`, `use_arch_protection`), tamer 레시피만 켬
  - Hunting 점검을 `escape/recall`에서 `escape/tracking`으로 이동 → 리콜 없는 tamer도 같은 경고
- 켜고 끄는 설정(`use_vet_kit`, `use_flamestrike`, `use_stat_potions`, `use_gold_drop`, `use_tracking`) 삭제. 레시피에 넣으면 켜짐
  - 가벼운 Heal은 기본 꺼짐이었음 → `recovery/light-heal` 미포함

| 항목 | 전 | 지금 |
| --- | --- | --- |
| Bless와 Arch Protection | 기억한 적이 없을 때 | 교전 중이 아닐 때(`var__fighting` 0). 적이 10칸 밖이면 시전 |
| 버프 끊기 | 잃은 HP 35(`emergency_hits`) | 같은 35, `buff_max_loss` 기준 |
| Flamestrike 끊기 | 늘 끊음 | `interrupt_to_heal` 기준(기본 1). 끊으면 `[ flamestrike, cut ]`. 대상에 쏜 뒤 대기 0.3초(`wait__cast`) |
| 시약 읽기 | 30초마다, 패스 맨 앞 | 10초마다, 수의사 키트 뒤. 키트의 Journal 줄을 먼저 읽게 함 |
| 힐 포션 | 마신 뒤 바 안 켬 | heal pot 바 켬(`recovery/heal`) |
| 음식 | 시전 중에도 먹음 | 시전 종료 후 먹음 |
| 골드 | 떨군 뒤 0.2초 | 1초(`wait__gold_drop`), `[ gold, dropped ]` |
| 전투 대상 | lasttarget이 무엇이든 받음 | 모바일 serial만(`fight/target`) |

인게임 확인 항목: [Tamer Mage Checks](../verification/tamer-mage.md#01) 01절.

### <a id="01.F"></a>01.F 마무리 점검에서 합친 모듈

- 같은 날 모든 루프 이동 후 재검토: 따로 쓸 수 없거나 너무 작아 나눌 이유가 없는 모듈 넷 → 합쳐서 43개 → 38개
- 결과물 코드는 Spell Siphon 외 동일

| 합친 것 | 결과 | 이유 |
| --- | --- | --- |
| `necro/hotbar` | `necro/symbols` | 같은 gump를 열고 읽는 한 가지 일. 핫바 확인을 심볼 사슬의 마지막 갈래(수를 못 읽었을 때) 안에 → 수를 읽는 패스는 문장 추가 없음. 전에는 하우스키핑 5초마다 한 줄 |
| `magery/spell-siphon` | `buff/spells`의 마지막 갈래(`use_spell_siphon`) | RA와 Reflect 뒤에 서려고 `var__buff_cast` 플래그를 주고받았는데, `elseif` 사슬 하나면 순서가 저절로 지켜짐. 플래그와 패스마다의 한 줄 삭제. 한 시간에 한 번인 화살이라 자기를 찍기 전 lasttarget 재확인 없음 |
| `recovery/pouch` | `recovery/cure` | 코드 9줄, 모든 레시피에서 cure 바로 앞. 마비면 파우치, 아니면 독 확인(`if`와 `elseif`) |
| `magery/opener`, `proc-core`, `filler` | `magery/rotation` | 프록은 Curse를(`var__opener_done`), Energy Bolt는 프록을(`var__procs_done`) 기다림 → 하나만 따로 쓸 수 없음. 단계별 배너는 유지 |

합치지 않은 것:

- `fight/rearm`과 `fight/weapon-swap`: 비슷해 보이지만 앞은 패스마다 `lhandempty`, `rhandempty`만 보고 2초마다 손을 읽음, 뒤는 패스마다 두 손을 읽는 PvP용 → 비용이 다름
- `bard/disco`와 `bard/peace`, 두 codex: 주고받는 것이 없는 독립 블록
- `recovery/refresh`와 `buff/food`: 작지만 맡는 일이 다름

## <a id="02"></a>02 아직 옮기지 않은 것

- `script/archive/`: 쓰지 않는 스크립트라 옮기지 않음
