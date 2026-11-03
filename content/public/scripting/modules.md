---
name: Modules
label: 모듈과 조립
group: Scripting
order: 30
---

루프 블록은 모듈로 한 벌만, 루프마다 레시피로 조립.
폴더, 레시피와 모듈 형식, 조립 규칙, base와 블록 사이 이름, 작업 순서. 이관 기록은 08절에서 이동.
스크립트 모양과 이름 규칙은 [Conventions](conventions.md), Razor 함정은 [Razor](razor.md).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 모듈로 나누는 이유, 게임 안에서 스크립트를 이어 달리지 않는 이유 |
| [02](#02) | 폴더별 내용 |
| [03](#03) | 레시피 모양, 일회성 레시피, 블록 상자 내용, 블록 여러 개를 한 조건으로 묶는 그룹 |
| [04](#04) | 모듈 파일 하나의 모양 |
| [05](#05) | 조립기가 만드는 것과 막는 것 |
| [06](#06) | base 내용, 블록 사이에 주고받는 것 |
| [07](#07) | 값 변경, 블록 추가와 제거, 새 동작 추가 순서 |
| [08](#08) | 과거 이관 기록의 위치 |


루프별 인게임 검사는 [Open items](../questions/open-items.md#08) 08절의 검사 문서 색인.

::part[설계]

## <a id="01"></a>01 왜 모듈인가

**같은 블록이 루프마다 복사돼 있었음.**

- 2026-10-09 스탯 포션 판정 변경에 스크립트 8개 수정 필요
- 그중 skinning-enhanced에는 다른 루프에서 이미 고친 `elseif` 사슬 버그가 그대로 남음
- → 회복, 포션, 버프, 시약 같은 블록은 모듈로 한 벌만
- 레시피에는 블록 구성과 순서, 그 루프가 기본과 다르게 쓰는 설정만

**조립은 저장소에서.** Razor는 한 번에 스크립트 하나, 다른 스크립트를 켜면 지금 것이 멈춤. 함수 호출, include 없음.
게임 안에서 모듈 스크립트를 차례로 켜는 방식은 쓰지 않음. 이유:

- 패스마다 스크립트를 몇 번씩 새로 켜는 비용 미측정. 회복 지연 가능
- `script`가 돌아오는지 넘어가는지 확인되지 않았다
- Esc는 지금 모듈만 멈춤, 한 모듈의 오류가 사슬 전체를 조용히 끊음

조립 결과물은 예전과 같은 `.razor` 파일 하나. 게임과 핫키는 그대로.

**네 가지 원칙.**

1. 모듈 파일 하나 = 블록 하나. 모든 모듈이 같은 칸을 같은 순서로(04절)
2. 블록이 아닌 공용 바탕은 `module/base.razor` 한 파일. 모든 레시피의 첫 블록(06절)
3. 레시피는 블록마다 상자 하나. 상자 안은 조립기가 씀(블록이 하는 일, 바꾸는 설정의 설명, 기본값, 함께 읽는 블록). 값은 상자 밑. 사람은 바꿀 값과 이유만(03절)
4. 모듈과 레시피는 같은 모양. 설명은 `-` 상자 안, 설명을 받는 줄은 상자 밑에 이어 붙임(03절, 04절)

## <a id="02"></a>02 폴더

- `module/` 아래 폴더: 블록이 맡는 일로 분류. 쓰는 루프로 나누지 않음
- 모듈 이름 = 폴더와 파일 이름(`recovery/heal` = `module/recovery/heal.razor`)

| 자리 | 맡는 것 | 모듈 |
| --- | --- | --- |
| `module/base.razor` | 모든 루프와 루틴의 뼈대 | 공용 설정, 표준 대기, 경고 간격, 블록 사이 신호, 구조적 PvP 정지, 시작 4줄, 패스 끝 대기(06절) |
| `module/recovery/` | 살아남기 | `cure`(마비면 파우치, 독이면 포션이나 에이전트), `heal`, `bandage`, `light-heal`, `refresh`, `heal-first`(루틴 시작에 먼저 힐) |
| `module/magery/` | 공격 주문과 시약 | `reagents`(모든 마법 블록이 읽는 시약 표시와 서클별 마나), `rotation`(Mana Drain과 Curse, Grimoire 프록 넷, 그 사이 Energy Bolt), `flamestrike`(aspect 발동용) |
| `module/buff/` | 버프와 시작 방어 | `self-telekinesis`(시작 자기 TK), `spells`(Reactive Armor, Magic Reflection, 설정에 따라 Protection, Bless, Arch Protection, Spell Siphon용 자기 Magic Arrow), `potions`(Strength, Agility, Magic Resist), `food`(Food Satisfaction), `mushroom`(Magic Mushroom 먹기와 Create Food) |
| `module/bard/` | 바드 스킬 | `instrument`(악기 찾기와 점검), `disco`(대상마다 한 번, 설정에 따라 Virtuoso가 빠지면 다시), `peace`, `provo-picks`(별도 후보 입력), `provo`(등록 후보 가운데 풀린 둘씩 서로에게 프로보), `song`(적이 기억돼 있지 않은 이동 중 노래 셋을 차례로) |
| `module/necro/` | 네크로 핫바와 소환수 | `symbols`(핫바 열어 두기, Unholy Symbol 수 읽기), `summon-names`(소환수 이름 바꾸기), `resummon`(Vengeful Spirit 뒤 빠진 소환수 재소환, 마나가 낮으면 Wither, 오래된 소환수 교체), `burst`(Blood Oath, Corpse Skin, Evil Omen), `poison-strike`, `vampiric-embrace` |
| `module/tamer/` | 펫 스킬 | `herding`(목동 지팡이), `vet-kit`(나와 펫에게 수의사 키트) |
| `module/fight/` | 무기 전투 보조 | `target`(기억한 적), `weapon-swap`(스윙 바별 무기 슬롯), `remember-hands`(주문 전에 현재 손 장비 기록), `rearm`(기억한 장비 복구), `sword-codex`, `parry-codex`, `archery-codex`, `wrestling-codex`(자세와 피니셔, 고른 적 수로 전환), `weapon-ability`(Swords, Archery, Wrestling 코덱스의 능력, 사거리 설정) |
| `module/gather/` | 채집 | `lumberjacking`(Smart Harvest), `skinning`(칼질) |
| `module/pack/` | 무게, 보급 파우치와 루팅 백 | `gold-drop`, `leather`(가죽 → 루팅 백), `lumber`(Logs → Boards → 루팅 백), `scavenger`(스캐빈저 캐시 비우기), `pouches`(보급 파우치와 루팅 백 지정), `sorting`(백팩 아래쪽 더미와 트랩 파우치, 파우치 안 정리) |
| `module/escape/` | PK 피하기 | `tracking`(헌트 필터 설정과 Hunting 점검), `recall`(자동 리콜 한 번) |
| `module/restock/` | 집에서 하는 준비 | `house`(집 컨테이너, 금고, 비축함, 수리대, 재활용기, 선반), `tools`(바느질 키트와 감정 지팡이, 지팡이가 40회 이하면 예비 하나 더), `instrument`(마법 악기 하나), `runebook`(룬북 채우기) |
| `module/gear/` | 입은 장비 | `dress`(부위 기록, 사망 뒤 다시 입기), `cosmetic`(Razor `cosmetic` 목록 입히기), `aspect`(`[aspect` gump의 Activate를 매번 누름) |
| `recipe/<루프>-recipe.razor` | 루프나 루틴 하나 | 헤더, 도는 순서의 블록과 그 밑의 설정 변경, 이 루프만의 준비(03절) |
| `util/build-scripts.mjs` | 조립기 | 결과물 생성, 레시피 블록 칸 정리. `--settings`, `--new-module`, `--check`(05절) |
| `script/combat/*.razor`, `script/gather/*.razor`, `script/restock/loadout.razor`, `script/hotkey/regear.razor` | 결과물. 머리에 `Generated from` 줄 | 직접 수정 금지 |

- 레시피 이름의 `-recipe`: 편집기 탭에서 결과물과 구분. 확장자 `.razor`: 하이라이팅
- `module/`, `recipe/`는 저장소 루트. `script/`는 Razor Scripts 폴더에 링크 → 그 안에 두면 조각 파일이 스크립트 목록에 떠서 혼자 실행될 수 있음

::part[형식]

## <a id="03"></a>03 레시피

레시피와 모듈 모두 **상자**로 구성.

- 상자: `-` 줄 두 개 사이에 `# @` 줄, 빈 `#` 줄, 뒤를 설명하는 `#` 줄. 상자 밑에 그 설명을 받는 줄을 빈 줄 없이 이어 붙임
- 레시피의 큰 칸 네 개와 그룹 줄(아래)만 `=` 줄. 상자 사이는 빈 줄
- `# @` 줄: 조립기의 지시, Razor에게는 주석

| 부분 | 내용 |
| --- | --- |
| 맨 위의 `#` 주석 | 레시피를 고치는 사람용 메모. 결과물 제외 |
| `# @ output script/<폴더>/<루프>.razor` | 결과물 경로. 첫 상자 앞 |
| `# @ once` | 생략 가능. `# @ output` 바로 밑. 루프가 아닌 **일회성 스크립트**(loadout 같은 루틴). 03.A절 |
| `# @ header` 상자 | 밑에 결과물 맨 위 주석([Conventions](conventions.md#02.C) 02.C절). 핫키 줄은 조립기가 추가 |
| `# @ blocks` 상자 | 안에 쓰는 법 네 줄(조립기가 씀). 밑에 블록마다 상자 하나, 도는 순서대로. 이 순서가 setup 순서. 첫 블록은 늘 `# @ use base` |
| `# @ state`, `# @ setup` 상자 | 밑에 그 루프만의 상태와 루프 전 준비. 모듈 상태의 다른 시작값도. 생략 가능 |

**블록 하나 = 상자 하나.** 상자 안에 `# @ use` 줄과 설명, 상자 밑에 그 블록에서 바꾸는 설정의 `@setvar!` 줄.
바꾸는 설정이 없는 블록도 상자로 → 모든 블록이 같은 자리에 같은 것을 보여 줌.

- **상자 안은 조립기가 씀**
  - 모듈의 한 줄 요약. 루프 앞에서 한 번만 도는 블록이면 `Runs once, before the loop.` 루틴에서는 안 붙음
  - 이 루프가 바꾸는 설정마다 이름과 기본값, 모듈의 설명, 그 설정을 함께 읽는 다른 블록
  - → 모듈 파일을 열지 않아도 블록이 하는 일이 보임
- **사람이 쓰는 것은 세 가지**: `# @ use` 줄, `>` 줄, `@setvar!` 줄
  - `>` 줄을 상자 안 요약 밑에 → 그 루프만의 블록 메모. 설정 밑에 → 이 루프가 그 값을 쓰는 이유
- 새 설정: 아무 상자 밑에 `@setvar!` 한 줄, 이유는 바로 위 `#` 줄. 조립기가 설정을 주인 블록 상자 밑으로, 이유는 상자 안 `>` 줄로 옮김
- 상자 안의 다른 줄은 조립마다 다시 씀. 조립기 모양이 아닌 줄(`# 메모` 등)은 경고 후 삭제. 메모는 `>` 줄로
- 기본값과 같은 값은 `(default 120, the same value)`로 표시 → 일부러 못 박은 값인지, 지워도 되는 값인지 보임
- 모듈 설명이 바뀌면 다음 조립 때 레시피도 바뀜. 조립 없이 커밋하면 `--check`가 잡음

```
# ========================================================================================
# @ blocks
#
#   One box per block, in the order the blocks run, base first. The builder writes the box.
#   Yours are the "> " lines in it (a note on the block, or under a setting the reason for
#   its value) and the @setvar! lines under it. Write a new @setvar! line under any box, its
#   reason as a "#" line right above it: the builder moves both to the box it belongs to.
# ========================================================================================

# ----------------------------------------------------------------------------------------
# @ use base
#
#   The frame of every loop and routine. Every recipe lists it first.
#
#   warmode_is_manual (default 0)
#      Whose warmode it is.
#        0  ours: our casts ignore it
#        1  the player's manual control window: our casts and the food stand down while it
#           is on. Potions and bandages still go out
#      Read by recovery/cure, recovery/heal, recovery/light-heal, buff/spells, buff/food.
#      > Warmode is the player's: recovery casts and buffs stand down, potions still go out.
# ----------------------------------------------------------------------------------------
@setvar! config__warmode_is_manual 1

# ----------------------------------------------------------------------------------------
# @ use escape/tracking
#
#   Before the loop: reuses a confirmed Tracking hunt colour, or sets the filter once.
#   Runs once, before the loop.
# ----------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------
# @ use recovery/cure
#
#   The trapped pouch while paralyzed, else a cure potion or the Smart Heal/Cure agent.
# ----------------------------------------------------------------------------------------

...

# ----------------------------------------------------------------------------------------
# @ use recovery/heal
#
#   Heal potion at heal_hits, else Greater Heal at emergency_hits.
#
#   emergency_hits (default 35)
#      Missing hit points that cast Greater Heal when no heal potion went out on this
#      pass. Not below heal_hits.
#      > Bandages handle ordinary damage, so Greater Heal waits for 45.
# ----------------------------------------------------------------------------------------
@setvar! config__emergency_hits 45
```

- 결과물에는 설명 없음. CONFIG에는 모듈별 경로 상자와 이 루프의 값만. 설정이 하는 일과 바꾼 이유는 레시피와 모듈에서(05절)
- 블록 순서 = 루프 안 순서. `insysmsg`는 맞은 줄과 그보다 오래된 줄을 함께 소비 → Journal을 읽는 블록끼리는 순서 중요
  - lumberjack-enhanced: Tracking 줄을 먼저 읽도록 `magery/reagents`를 `escape/recall` 뒤에
  - skinning-enhanced: 칼질 응답 뒤에

**그룹: 블록 여러 개를 한 조건 밑에.** 블록마다 같은 조건을 따로 물으면 거짓인 패스에도 블록 수만큼 문장 비용([Razor](razor.md#06) 06절).
묶으면 한 번만 물음. 그룹 줄은 블록 상자 사이에, 조립기가 `=` 상자로 정리.

| 줄 | 결과물 |
| --- | --- |
| `# @ when 조건` | `if 조건`. 조건은 Razor 문법 그대로. 괄호가 없으니 and와 or 혼용 금지([Razor](razor.md#03) 03절) |
| `# @ otherwise` | `else`. `when` 안에서 한 번 |
| `# @ every interval__이름` | `if timer "timer__이름" >= interval__이름`과 `settimer "timer__이름" 0`. 시계 `timer__이름`은 조립기가 TIMER에 생성, 첫 패스에 준비됨 |
| `# @ end` | `endif`. 가장 안쪽의 열린 그룹을 닫음 |

- 그룹 안 블록은 단계마다 네 칸 들여쓰기, 배너 줄은 줄어든 폭에 맞춤. 그룹 중첩 가능
- 그룹이 막는 것은 블록의 loop 부분뿐. 선언과 setup은 늘 나감. base의 `end`는 그룹 밖 맨 끝
- 조건과 `every`의 이름도 블록 코드처럼 주인 모듈 탐색. `interval__housekeeping`은 base 소유
- **회복 블록은 모든 루프 레시피에서 한 그룹.** `recovery/cure`, `heal`, `bandage`, `light-heal`은 `# @ when paralyzed or poisoned or diffhits > 0` 안.
  루틴은 그룹이 없음 → `recovery/heal-first`는 그룹 밖
  - 이 조건 = 네 블록의 동작 조건 합(붕대는 HP가 1만 줄어도 시작) → 레시피가 기준값을 어떻게 바꾸든 맞음
  - 다치지 않은 패스는 블록 수만큼이 아닌 한 줄만 밟음. `recovery/refresh`는 기력 기준 → 그룹 밖
- 블록 안 시계와 그룹 시계는 겹침. 예: `every interval__housekeeping` 안의 `buff/food`는 5초마다 자기 60초 타이머 확인

```
# ========================================================================================
# @ when var__fighting = 1
# ========================================================================================

# ----------------------------------------------------------------------------------------
# @ use bard/disco
#
#   Discordance once per target, read off its label, then left alone for 30 seconds.
# ----------------------------------------------------------------------------------------

...

# ========================================================================================
# @ otherwise
# ========================================================================================

...

# ========================================================================================
# @ end
# ========================================================================================
```

### <a id="03.A"></a>03.A 일회성 레시피, `# @ once`

집에서 준비하는 loadout, 사망 뒤 장비를 다시 갖추는 regear처럼 한 번 돌고 끝나는 스크립트도 같은 모듈 형식으로 조립.

- 결과물: CONFIG, WAIT AND COOLDOWN, TIMER, STATE, 그리고 블록들의 `# @ setup`을 레시피 순서대로. MAIN LOOP 없음
- base도 첫 블록. 공용 설정, 기본 대기, PvP 정지, 시작 4줄은 그대로 쓰고 `loop`와 `end`만 빠짐
- 블록은 `# @ setup`만. `# @ loop`가 있는 블록, `when`과 `every` 그룹은 조립 정지
- 같은 블록을 여러 루틴이 함께 씀(정리, aspect 등) → 루틴끼리 코드를 복사하거나 스크립트를 넘겨 이어 달리지 않음
- 새 루틴 블록: `--new-module`의 틀은 루프용 → 만든 뒤 `# @ loop` 상자를 `# @ setup`으로 바꾸고 코드는 0칸 들여쓰기
- 루틴과 루프는 Razor 세션 변수를 같이 씀. 루틴이 base 설정을 기본값으로 되돌려도 루프는 Play할 때 자기 값을 다시 씀.
  루틴 사이에 남겨야 할 값(`gear/dress`의 부위)은 `if not varexist`로 감싼 상태


## <a id="04"></a>04 모듈

- 모든 모듈이 같은 모양. 맨 위 상자에 블록이 하는 일과 `# @ hotkeys`, 그 밑에 칸마다 상자 하나. 쓸 것 없는 칸은 생략
- **칸마다 담는 이름의 접두가 하나로 고정** → 접두만으로 이름의 칸과 결과물 자리가 정해짐

| 칸 | 상자 안 | 상자 밑 | 결과물 자리 |
| --- | --- | --- | --- |
| 맨 위 | 블록이 하는 일. 첫 줄은 86자 이내 한 줄 요약, 레시피와 `--settings`에 표시. `# @ hotkeys A, B` |   | 헤더의 `Hotkeys:` 줄 |
| `# @ config` | 설정마다 `#   이름`과 그 밑 `#      하는 일` | `config__` 기본값 | CONFIG |
| `# @ wait` | 같은 모양 | `wait__`, `interval__`, `cooldown__`. 모든 루프가 같은 값을 쓰는 내부 값 | WAIT AND COOLDOWN |
| `# @ timer` | 같은 모양. 설명 생략 가능 | 한 줄에 `timer__이름 시작값`. 시작값이 `interval__` 이름이면 첫 패스에 준비, `0`이면 한 주기 대기 | TIMER. `createtimer`와 첫 `settimer`는 조립기가 씀([Conventions](conventions.md#04) 04절) |
| `# @ state` | 같은 모양 | `var__` 선언. Play를 넘어 남길 것은 `if not varexist`로 감쌈 | STATE |
| `# @ setup`, `# @ loop`, `# @ end` | `# @` 줄만 | 코드. `loop`, `end`는 블록 배너로 시작([Conventions](conventions.md#02.B) 02.B절). 단계가 있는 블록은 단계마다 같은 모양의 배너 추가. `end`는 base만 | setup, MAIN LOOP, MAIN LOOP 끝 |

- 상자 안 항목 사이는 `#` 한 줄. 같은 설명을 나누는 이름(무기 슬롯 네 개 등)은 `#   이름, 이름`으로 한 항목. 글은 90자 안에서 줄바꿈
- 몇 가지 중 하나를 고르는 설정: 첫 줄에 고르는 대상, 선택지는 `값  뜻` 모양으로 한 줄에 하나. 켜고 끄는 설정: "1 keeps …"처럼 1이 하는 일 한 줄
- 칸이 선언하는 이름은 모두 설명, 설명에는 그 칸이 선언하는 이름만. 어긋나면 조립 정지. 상자 밑에 이어 붙인 줄 사이에 주석 금지

```
# ----------------------------------------------------------------------------------------
# Reactive Armor, then Magic Reflection, whenever one is missing.
#
# @ hotkeys > Interrupt
# ----------------------------------------------------------------------------------------


# ----------------------------------------------------------------------------------------
# @ config
#
#   config__use_reactive_armor
#      1 keeps Reactive Armor up.
#
#   config__use_magic_reflect
#      1 keeps Magic Reflection up.
#
#   config__mana_reactive_armor
#      Minimum current mana to start Reactive Armor.
#
#   config__mana_magic_reflect
#      Minimum current mana to start Magic Reflection.
#
#   config__buff_max_loss
#      Missing hit points at which buffs are not started, and cut mid cast.
#
#   config__buff_when_poisoned
#      Buffs while poisoned.
#        0  no: hold them back and cut one that is casting, so the cure goes first
#        1  yes
# ----------------------------------------------------------------------------------------
@setvar! config__use_reactive_armor 1
@setvar! config__use_magic_reflect 1
@setvar! config__mana_reactive_armor 4
@setvar! config__mana_magic_reflect 14
@setvar! config__buff_max_loss 35
@setvar! config__buff_when_poisoned 1


# ----------------------------------------------------------------------------------------
# @ loop
# ----------------------------------------------------------------------------------------
    # ------------------------------------------------------------------------------------
    # SELF BUFFS
    #
    # Reactive Armor, then Magic Reflection, whenever one is missing and the window is
    # free. Not started at config__buff_max_loss, and cut there mid cast so the next pass
    # can heal. With config__buff_when_poisoned 0 poison holds them back and cuts them
    # too, so the cure goes first. var__hold_casts lets another block keep the cast window
    # (a latched Recall). config__walk_guard and config__warmode_is_manual apply as for
    # the heal agents. The reflect bar is the server's recast lock after Reflect is used
    # up.
    # ------------------------------------------------------------------------------------
    ...
```

**이름 하나 = 모듈 하나 소유.** 저장소 전체에서 한 이름을 두 모듈이 선언하면 조립 정지 → "이 이름은 어디 것인가"의 답은 늘 파일 하나.

- 블록은 루프에 든 다른 모듈의 이름 사용 가능, 관계를 따로 적지 않음
- 조립기가 코드에서 이름을 읽어 주인 탐색, 주인 모듈이 레시피에 없으면 넣을 모듈을 알려 줌(05절)
- 블록 코드는 `config__`에 값을 넣지 않음. 기본값은 모듈의 `# @ config`, 변경은 레시피
- `wait__`, `interval__`, `cooldown__`은 모든 루프가 같은 값. 루프마다 달라야 하면 `config__` 설정으로 이동
- 블록 전체를 켜고 끄는 설정 없음. 레시피에 넣거나 빼면 됨. 설정은 블록 안의 선택에만(`use_resist_potion`, `skin_unowned` 등)
  - 예외 `use_bandages`: `recovery/light-heal`이 이 값을 보고 붕대 대신 나감
  - 예외 일회성 레시피(03.A절): 모두가 결과물 하나를 같이 씀 → 사람마다 다른 선택(룬북 채우기, 악기 등)은 블록 안의 켜고 끄는 설정으로

## <a id="05"></a>05 조립 규칙

1. **헤더**: 레시피 헤더 → 블록들이 선언한 핫키를 모은 `Hotkeys:` 줄 → "Generated from recipe/… by util/build-scripts.mjs" 줄
2. **순서**: CONFIG, WAIT AND COOLDOWN, TIMER, STATE, setup, MAIN LOOP. MAIN LOOP는 `while not dead`, 블록별 `loop`, base의 `end`, `endwhile`. 일회성 레시피는 setup에서 끝(03.A절)
   - 자리마다 base 먼저, 블록은 레시피 순서, 레시피가 마지막
   - 그룹은 loop 안에서 `if`, `else`, `endif`. `# @ every`의 시계는 TIMER 끝에 레시피 몫으로
   - 레시피 STATE가 뒤 → 모듈 상태에 다른 시작값 가능(pvp의 `var__fighting 1`)
3. **결과물에 설명 없음**: 큰 칸(CONFIG 등)은 Conventions의 배너 모양([Conventions](conventions.md#02.B) 02.B절)
   - 조각마다 출처 파일만 적은 상자(`# module/recovery/heal.razor`) 밑에 값과 코드
   - loop 안 블록은 배너의 줄과 제목만, 제목 오른쪽에 모듈 경로
   - 설정과 블록이 하는 일, 레시피의 변경 이유는 그 경로의 파일에서
   - 코드 사이 주석도 뺌. setup, loop, end, 레시피의 state와 setup 모두. 빈 줄도 정리: 두 줄 연속, 분기 첫 줄, 분기 끝 바로 앞은 뺌
   - 예외: 분기에 든 줄이 주석뿐이면 남김. 빈 분기를 만들지 않으려는 것(`if insysmsg`로 줄만 읽어 없애는 곳 등)
   - TIMER에는 timer마다 `createtimer`와 첫 `settimer`
4. **레시피 정리**: 조립마다 정리된 모양으로 다시 씀. 큰 칸마다 `=` 상자, 블록마다 `-` 상자, 설정은 주인 블록 상자 밑
5. **정지 조건**: 조립기가 멈추고 고칠 곳을 알려 줌
   - 블록이 쓰는 이름의 주인 모듈이 레시피에 없음. 예: "module/gather/skinning.razor uses timer__combat_target_grace from module/fight/target.razor. Add "# @ use fight/target""
   - 첫 블록이 `# @ use base`가 아님
   - 레시피의 설정이 어느 모듈에도 없거나, 레시피가 쓰지 않는 모듈의 것
   - 상자 밖 주석이 `@setvar!` 줄 바로 위에 있지 않음. 어느 설정의 이유인지 모른 채 지우지 않으려는 정지
   - 모듈 칸 상자가 선언한 이름을 빠뜨렸거나 선언하지 않은 이름을 설명. 또는 설명 줄이 `#   이름`, `#      설명` 모양이 아님
   - 두 모듈이 같은 이름 선언. 칸에 다른 접두의 이름. 블록이 `config__`에 값을 넣음
   - 결과물 주석에 `;`([Razor](razor.md#03) 03절)
   - 모듈 첫 줄 요약이 86자 초과. 레시피 상자에 한 줄로 보여야 함
   - 그룹 줄의 짝 불일치: `when` 밖의 `otherwise`, 열린 그룹 없는 `end`, 닫지 않은 그룹, `# @ use base` 앞의 그룹, 조건이나 이름이 빠진 `when`이나 `every`
6. **파일 쓰기**: 줄 끝 CRLF(`.gitattributes`). 바뀐 결과물과 레시피만 다시 씀
7. **검사**: `util/check.sh`를 인자 없이 돌리면 끝에 `node util/build-scripts.mjs --check`도 실행. 결과물 직접 수정, 모듈 설명 변경 후 미조립을 잡음

::part[base]

## <a id="06"></a>06 base와 블록끼리 주고받는 것

`module/base.razor`: 모든 레시피의 첫 블록. 정본은 그 파일, 아래는 무엇을 왜 거기 두었는지.

| 칸 | 내용 | 바꾸는 루프 |
| --- | --- | --- |
| `# @ config` | `chatty`, `sysmsg`: 출력 스위치 |   |
|   | `clear_at_start`: Play 시 시작 4줄 실행 여부([Conventions](conventions.md#02.D) 02.D절) | pvp가 0. 플레이어가 든 커서와 시전 보존 |
|   | `use_magery`, `use_potions`: 회복 블록과 버프 블록 여럿이 함께 보는 스위치 | dexxer-basic은 마법 0 |
|   | `walk_guard`: 1이면 우리 시전이 `walk` 바 동안 대기. 긴급선 Greater Heal은 예외 | pvp가 0. 싸움 중에는 기다릴 더 나은 때가 없음 |
|   | `warmode_is_manual`: 1이면 워모드가 플레이어의 조작 창. 우리 시전과 음식은 쉬고, 포션과 붕대는 나감. `recover_in_warmode`: 그때 회복 시전도 쉴지 | lumberjack-enhanced가 1. bard-necro-enhanced도 1, 회복은 계속(1) |
|   | `use_bandages`, `heal_skill_min`: 붕대 사용 여부. 못 쓰면 `recovery/light-heal`이 대신 | dexxer-basic, skinning-enhanced는 Healing 10 초과일 때만 붕대. bard-necro-enhanced는 붕대 안 씀 |
|   | `settle_first`: 1이면 패스 첫머리에서 아이템 큐와 시전 종료 대기. 시전을 봤으면 커서 응답까지 `wait__cast_cursor` 더 | bard-necro-enhanced가 1 |
| `# @ wait`, `# @ timer` | `wait__poll`, `wait__short`, 경고 간격 `interval__message`와 `timer__message`, 레시피 그룹 `# @ every`의 `interval__housekeeping`. 회복 에이전트 시전이 `casting`으로 보이기까지의 대기 `wait__cast_start`(1초), 폴링 상한 `wait__cast_limit`(6초), 둘의 기준 `timer__cast_start`. `casting`이 풀린 뒤 커서 응답까지 더 기다리는 `wait__cast_cursor`(0.5초) | 시전이 끝나고 커서가 찍히기 전에 붕대가 나가 Greater Heal이 사라짐, 인게임 확인됨 2026-11-01([Razor](razor.md#03) 03절) |
| `# @ state` | 블록 사이 신호 넷(아래 표) | pvp는 `var__fighting` 1 |
| `# @ setup`, `# @ loop`, `# @ end` | 구조적 PvP 정지(루프 앞, 패스 첫머리), 시작 4줄, `settle_first`, 패스 끝 `wait wait__poll` |   |

**신호 = 쓰는 블록이 없어도 읽는 블록은 돌아야 하는 값.** base가 중립값으로 선언, 쓰는 블록이 있는 루프에서만 값이 바뀜.
새 신호는 base의 `# @ state`와 이 표에 추가.

| 신호 | 쓰는 곳 | 읽는 곳 |
| --- | --- | --- |
| `var__fighting` | `fight/target`(기억한 적이 `target_range` 안이면 1), pvp 레시피(늘 1) | `buff/potions`, `buff/spells`의 Bless와 Arch Protection, `buff/mushroom`의 Create Food, `magery/flamestrike`, `fight/archery-codex`의 고른 적 세기, bard-necro-enhanced와 bard-archer-enhanced의 교전 그룹 |
| `var__hold_casts` | `escape/recall`(리콜 결정 시 1) | `buff/spells`, `necro/resummon` |
| `var__hold_gathering` | `escape/recall`(리콜 결정, 필요한 책 없음, 감지 리콜인데 Tracking이 사냥 중이 아니면 1) | `gather/lumberjacking`, `pack/lumber` |
| `var__hold_symbols` | `necro/resummon`(소환수가 빠지고 마나 20\~64면 1, 은행이 차면 0) | `necro/burst`, `necro/poison-strike`, `necro/vampiric-embrace` |

신호가 아닌 이름은 주인 모듈이 레시피에 있어야 사용 가능 → 아래 블록은 주인 모듈과 함께. 조립기가 코드에서 확인하는 관계.

- `magery/reagents`의 `var__regs_*`, 서클별 마나, `interrupt_to_heal`, `wait__cast` ← 회복 시전, `buff/spells`, `buff/mushroom`, 공격 주문(`magery/*`), `necro/resummon`
- `recovery/heal`의 `config__heal_hits` ← 다쳤을 때 쉬는 블록(`gather/*`, `pack/leather`, `escape/tracking`)
  - `emergency_hits` ← 시전 중에 끊는 공격 주문(`magery/*`), `necro/resummon`. `recovery/light-heal`의 `light_hits` ← `pack/lumber`
- `fight/target`의 `var__combat_target`과 사거리 ← `fight/parry-codex`, `fight/archery-codex`, `fight/weapon-ability`, `pack/leather`, 바드와 네크로와 공격 주문 블록, `bard/song`(적이 없을 때만 노래)
  - `var__keep_lasttarget` ← 자기를 찍거나 시전하기 전 `lastharmful`을 재확인하는 블록(`magery/flamestrike`, `necro/vampiric-embrace`)
  - `var__target_hold` ← `bard/provo`가 자기 용도로 찍은 몹을 적음. `fight/target`과 커서 중에 고르기를 받는 블록이 그 몹을 건너뜀
  - `gather/skinning`은 칼 커서를 든 동안 고른 적을 여기에 기록
- `escape/tracking`의 `var__tracking_*`와 `tracking_color` ← `escape/recall`
- `bard/instrument`의 `var__my_instrument`, `var__instrument_ok`, `wait__bard_target` ← `bard/disco`, `bard/peace`, `bard/provo`, `bard/song`
- `bard/provo-picks`의 `list__provo_candidates` ← `bard/provo`의 짝 선택, `fight/archery-codex`와 `fight/wrestling-codex`의 마릿수 판정. `var__provo_added` ← `bard/provo`의 탐색 대기 단축
- `necro/symbols`의 `list__necro_symbols`, `var__symbols_spent`, `interval__necro_action`, `wait__message`, `wait__ability_target` ← 네크로 능력 블록
  - `var__symbols_listed` ← `necro/resummon`. VS를 쓴 패스에 리스트를 비우고 다시 읽게 함
- `necro/summon-names`의 `config__summon_range` ← `necro/resummon`. 교체가 summon-names의 이름으로 놓으므로 둘은 함께
- `magery/rotation`의 순서 플래그 `var__opener_done`, `var__procs_done`, `var__proc_target` ← `necro/poison-strike`

::part[쓰는 법]

## <a id="07"></a>07 작업 순서

### <a id="07.A"></a>07.A 값을 바꿀 때

1. `node util/build-scripts.mjs --settings recipe/<루프>-recipe.razor`로 루프의 설정 전체 확인
   - 설정마다 현재 값, 하는 일, 읽는 블록, `module/…razor:줄`. 터미널에서 경로를 누르면 파일로 이동
2. 레시피에서 그 설정을 가진 블록 상자 밑에 `@setvar! config__이름 값` 한 줄, 바로 위 `#` 줄에 이유
   - 다른 상자 밑에 적어도 조립기가 주인 블록으로 옮김
3. `pnpm build`(`node util/build-scripts.mjs`): 설정이 주인 블록 밑으로, 설명 재작성, 결과물 재생성
   - `util/check.sh` 실행. 게임 반영은 [Workflow](../working/workflow.md#04.A) 04.A절의 실행 방식별 절차

- 기본값으로 되돌리기: 레시피에서 그 줄과 이유 삭제
- 모든 루프의 기본값 변경: 모듈의 `# @ config` 값 수정

<figure class="fx" data-fx="steps" id="fx-module-settings" aria-label="base의 walk_guard 기본값을 pvp 레시피가 바꾸고 조립 결과와 설정 조회에 반영하는 순서">
<div class="fx__stage">
<div class="fx-cols">
<div class="fx-box">
<p class="fx-label">module/base.razor</p>
<div class="fx-row"><code>walk_guard</code><span class="fx-chip" data-hl="1">기본 1</span></div>
</div>
<div class="fx-box">
<p class="fx-label">recipe/pvp-recipe.razor</p>
<div class="fx-swap"><span data-on="1">블록을 선택하고 이유를 기록</span><span data-on="2-" data-hl="2"><code>walk_guard 0</code></span></div>
</div>
<div class="fx-box">
<p class="fx-label">script/combat/pvp.razor</p>
<div class="fx-swap"><span data-on="-2">조립 전</span><span data-on="3-" data-hl="3"><code>config__walk_guard 0</code></span></div>
</div>
</div>
<div class="fx-box" data-hl="4">
<p class="fx-label">설정의 출처</p>
<div class="fx-swap">
<span data-on="-3">결과물의 한 줄에서 값의 주인과 변경 이유를 따라가기</span>
<span data-on="4-"><code>--settings</code> 조회: 현재 0, 기본 1. 소유 모듈, 읽는 블록, 레시피의 변경 이유까지 확인</span>
</div>
</div>
</div>
<ol class="fx__captions">
<li>공용 기본값의 주인은 base. 모든 루프에 같은 뜻의 설정을 한 번만 선언</li>
<li>pvp 레시피는 자기 루프의 값을 0으로 변경하고 그 이유를 기록. 공용 기본값은 유지</li>
<li>pnpm build가 레시피 값을 적용해 단일 Razor 결과물을 생성. 수정할 원본은 모듈과 레시피</li>
<li>--settings는 현재 값과 기본값, 소유 모듈, 읽는 블록, 변경 이유를 함께 조회. 결과물의 한 줄에서 원본으로 추적</li>
</ol>
<figcaption>2026-11-03 pvp 레시피의 --settings 출력 기준. 화면에서는 config__ 접두를 일부 생략. 설정 추적 예시이며 게임 실행 결과는 별도 확인</figcaption>
</figure>

### <a id="07.B"></a>07.B 블록을 넣거나 빼고, 새 동작을 더할 때

- 기존 블록 사용: 레시피 `# @ blocks`의 도는 순서 자리에 `# @ use <폴더>/<이름>` 한 줄. 설정은 기본값. 회복 블록은 회복 그룹 안(03절)
  - 필요한 모듈이 빠지면 조립기가 이름을 알려 줌
- 블록 끄기: 그 블록과 그 설정을 레시피에서 삭제. 다른 블록이 그 모듈의 이름을 쓰면 조립기가 알려 줌
- **모듈에 없는 동작은 결과물에 손으로 넣지 않음.** 다음 조립이 덮어씀
  - `node util/build-scripts.mjs --new-module <폴더>/<이름>`으로 빈 틀 생성 → 채움 → 레시피에 `# @ use`
  - 폴더는 블록이 맡는 일로(02절). 맞는 폴더가 없으면 새 관심사 → 폴더 먼저 생성
- 그 루프만 루프 앞에서 한 번 하는 짧은 준비(시작 메시지, 루트 파우치, 복귀 등록 등): 레시피의 `# @ setup`
- 한 루프에서만 다르게 돌게 하려면 복사 대신 모듈에 설정 추가. 기본값을 지금 동작으로 → 다른 루프는 그대로
- 블록 동작 변경 → 그 모듈을 쓰는 루프 전부 변경. 모듈, 레시피, 결과물을 한 커밋에
- Razor 편집기에서 결과물을 저장해 버렸으면 `--check`가 잡음. 바뀐 줄을 모듈이나 레시피로 옮기고 재생성


::part[기록]

## <a id="08"></a>08 이관 기록

현재 형식과 작업 순서는 위 03~07절. 2026-10-10의 전후 비교는 [Module Migration](../history/module-migration.md).

| 기존 절 | 이동한 기록 |
| --- | --- |
| <a id="08.A"></a>08.A | [처음 옮길 때](../history/module-migration.md#01.A) |
| <a id="08.B"></a>08.B | [다시 짠 것](../history/module-migration.md#01.B) |
| <a id="08.C"></a>08.C | [dexxer-basic](../history/module-migration.md#01.C) |
| <a id="08.D"></a>08.D | [bard-necro-enhanced](../history/module-migration.md#01.D) |
| <a id="08.E"></a>08.E | [tamer-mage-enhanced](../history/module-migration.md#01.E) |
| <a id="08.F"></a>08.F | [마무리 점검](../history/module-migration.md#01.F) |
| <a id="09"></a>09 | [아직 옮기지 않은 것](../history/module-migration.md#02) |
