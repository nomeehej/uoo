---
name: PvP Loop
label: 공통 pvp 루프
group: Loops
order: 40
---

PvP 시작 시 켜는 공통 자기관리 루프 `combat/pvp`의 설계. 서버 규칙은 [PvP](../game/pvp.md).
템플릿별 설정은 [Bard Necro](../templates/bard-necro.md#04.F) 04.F절과 [Lumberjack PvP](../templates/lumberjack-pvp.md#08) 08절, 인게임 확인은 [Open items](../questions/open-items.md#10) 10절.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 수동 공격과 자동 자기관리의 경계, 버전 기록, 입력 규칙, 설정, 루프 골격, 비용과 타이머, 싸움 전 붕대 미리 쓰기, 기억한 무기 재장착, 상태 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

## <a id="01"></a>01 수동 공격과 공통 자기관리 루프

[combat/pvp.razor](https://github.com/nomeehej/uoo/blob/master/script/combat/pvp.razor): PvP 시작 시 켜는 공통 자기관리 루프.

- 공격은 전부 수동. 상대에게 쓰는 TK, Magic Arrow와 Harm, Explosion과 Energy Bolt, 폭발 포션, 소환수 공격, Hamstring, 상대 지정, 근접 공격 요청
- 상대의 serial, 색, 거리, 사망 여부 조회 없음. PvP 핫키는 `Play Script: combat\pvp`
- 자동: 시작 때 자기 TK 한 번, 파우치, 포션, 붕대, 회복 에이전트, Reactive Armor와 Reflect와 Protection, 스탯 포션, 기억한 손 장비 복구. 수동 시전이나 커서는 끊지 않음
- 현재 본문은 인게임에서 확인되지 않았다

현재 v10. 판별 변경:

- 2026-10-08 v6: bard-necro-enhanced, lumberjack-enhanced와 같은 모양으로 재작성
  - v5는 위에서 고른 번호를 변수에 담고 아래 실행부가 다시 읽음 → 그 사이 상태 변화 가능
  - v6의 블록은 각자 현재 상태를 읽고 즉시 행동, 다음 블록에 결정을 넘기지 않음
  - 삭제: v5의 긴급 수동 주문 중단, 6초 시전 대기와 `[ cast, check ]` 정지, 준비 동작의 5초 주기, 주문의 이동 가드, 재시도 타이머 8개
- 2026-10-09 v7: Strength와 Agility 포션을 버프 대신 STR과 DEX 값으로 판정, 포션마다 5초 재시도 간격([Combat](../mechanics/combat.md#02.D) 02.D절)
- 2026-10-10 v8: 가벼운 Heal을 붕대 옵션과 별도로 `use_light_heal`로. 붕대를 못 쓰면 옵션과 무관하게 대신 사용
- 2026-10-10 v9: `recipe/pvp-recipe.razor`로 조립. 동작은 v8과 같음([Modules](../scripting/modules.md#08) 08절). 수정은 모듈과 레시피에서
- 2026-10-27 v10: 첫 빈 시전 창에서 자기 TK 한 번, RA와 Reflect와 Protection 유지. 그래픽과 스윙 슬롯 선택 대신 `fight/rearm`으로 손에 들었던 장비 복구

#### 입력 규칙

[PvP](../game/pvp.md#05.B) 05.B절 Combat Overview 원문 기준.

- 포션과 파우치: 즉시 쓰는 아이템 → 시전 중에도 사용, `casting` 미확인
- 프리캐스트 커서를 든 채 마시면 그 주문 취소 → 포션은 커서를 든 동안 대기
- 붕대도 대기. 붕대의 대상 커서가 들고 있던 커서를 밀어냄
- 자기 TK, 회복 에이전트, RA, Reflect, Protection: 시전과 커서가 없을 때만 시작. TK는 요청 뒤 적대 또는 중립 커서, Protection은 우호 또는 중립 커서를 자기에게 처리
- 이 포크의 TK 커서 종류는 확인되지 않았다. 이미 들고 있던 커서는 종류와 관계없이 보존하며, 자동 시전 중 새 수동 입력과의 소유권은 인게임 확인 필요
- TK와 버프는 이동 중에도 시도. Protection도 RA와 Reflect처럼 `warmode_is_manual`을 따르므로 기본 pvp 설정에서는 워모드 중 시전
- 루프가 끊는 시전은 루프가 건 RA와 Reflect와 Protection뿐. 잃은 HP가 긴급 기준(`buff_max_loss`)에 닿으면 `> Interrupt` → 다음 패스에 회복
- Razor 행동 큐가 찼거나 은신 중이면 행동 없음. 마비 파우치만 예외

#### 설정

- 아래 이름은 `config__` 접두 생략. 템플릿별 프리셋 없음
- 값 변경: `recipe/pvp-recipe.razor`에서 그 설정을 가진 블록의 `# @ use` 줄 아래에 새 값 → 재조립([Modules](../scripting/modules.md#07.A) 07.A절)
- 옵션끼리 덮어쓰지 않음. Magery와 붕대는 따로 끌 수 있음. 무기 복구는 `fight/remember-hands`와 `fight/rearm`, 시작 자기 TK는 `buff/self-telekinesis` 블록
- 기능을 끄려면 해당 블록과 그 설정을 레시피에서 제거([Modules](../scripting/modules.md#07.B) 07.B절)
- 전체 설정과 기본값: `node util/build-scripts.mjs --settings recipe/pvp-recipe.razor`. 아래 표는 자주 보는 것

| 옵션 | 기본값 | 효과 |
| --- | --- | --- |
| `clear_at_start` | 0 | Play 시 시작 4줄 생략. 들고 있던 수동 커서와 시전 유지([Conventions](../scripting/conventions.md#02.D) 02.D절) |
| `use_magery` | 1 | 시작 자기 TK, 회복 에이전트, 버프, 시약 읽기 |
| `use_bandages` | 1 | Healing이 있고 피해나 독이면 붕대 |
| `use_light_heal` | 0 | 붕대와 함께 `light_hits`부터 가벼운 Heal. 붕대 불가(`use_bandages` 0, Healing 없음, 붕대 없음)면 값과 무관하게 대신 사용. `use_magery` 1 필요 |
| `use_potions` | 1 | 회복 포션, Refresh, 스탯 포션 |
| `use_resist_potion` | 1 | Magic Resist 포션 |
| `str_potion` | 120 | Greater Strength 포션을 마신 STR(기본 + 20). STR이 그보다 낮으면 Strength 포션. 0이면 끔 |
| `dex_potion` | 100 | Greater Agility 포션을 마신 DEX(기본 + 20). DEX가 그보다 낮으면 Agility 포션. 0이면 끔 |
| `walk_guard` | 0 | base 공용 설정. pvp는 걷는 중에도 시전([Modules](../scripting/modules.md#06) 06절) |
| `warmode_is_manual` | 0 | base 공용 설정. pvp는 워모드 무시 |
| `buff_max_loss` | 35 | 잃은 HP가 이 값 이상이면 버프 시작 안 함, 시전 중이면 끊음. `emergency_hits`를 바꾸면 함께 조정 |
| `buff_when_poisoned` | 1 | 독 상태에서도 버프 |
| `use_reactive_armor` | 1 | 빠지면 시전과 커서가 없을 때 즉시 재시전. 이동 가드 없음 |
| `use_magic_reflect` | 1 | Reflect도 같은 방식 |
| `use_protection` | 1 | Protection이 빠지면 재시전. 이동과 워모드 허용 |
| `use_bless`, `use_arch_protection` | 0 | 두 주문은 사용하지 않음 |
| `heal_hits` | 35 | 잃은 HP가 이 값 이상이면 힐 포션 |
| `emergency_hits` | 35 | 포션 불가 시 Greater Heal, 버프 정지 기준. `heal_hits`보다 낮게 두지 않음 |
| `light_hits` | 15 | 가벼운 Heal 기준(`use_light_heal`) |
| `refresh_stam` | 15 | 현재 STA가 이 값 이하면 Refresh |
| `mana_cure` | 6 | Cure 에이전트 시작 최소 현재 마나 |
| `mana_greater_heal` | 11 | Greater Heal 에이전트 시작 최소 현재 마나 |
| `mana_heal` | 4 | Heal 에이전트 시작 최소 현재 마나 |
| `mana_reactive_armor` | 4 | Reactive Armor 시작 최소 현재 마나 |
| `mana_magic_reflect` | 14 | Reflect 시작 최소 현재 마나 |
| `mana_protection` | 6 | Protection 시작 최소 현재 마나 |
| `mana_3rd` | 9 | 시작 자기 TK의 최소 현재 마나. [Magery](https://wiki.uooutlands.com/Magery)의 3서클 비용, 2026-10-26 확인 |
| `rearm_graphic` | 0 | 기억한 장비가 없을 때 그래픽으로 대체 무기를 찾지 않음 |
| `rearm_follow_hands` | 1 | 시작과 새 장비 관찰 때 현재 양손 구성을 채택. 반대 손의 예전 장비를 다시 꺼내지 않음 |
| `chatty` | 1 | 선택 오버헤드 |
| `sysmsg` | 1 | 시작 시 판 번호, 에이전트와 버프 시전, 장착 요청을 Journal에 기록 |

- `str_potion`, `dex_potion`: 공유 루프 → 실행 캐릭터의 기본 스탯에 맞춤. 기본값은 STR 100, DEX 80 기준([Combat](../mechanics/combat.md#02.D) 02.D절)
- `heal_hits`, `emergency_hits`, `light_hits`: 모두 최대 HP에서 잃은 양. 최대 HP 120이면 기본 기준은 현재 HP 85 이하
- 최소 마나는 공격이나 이동용 예비 마나를 자동으로 남기지 않음. 예비 20을 남기려면 Greater Heal 최소값 11 → 31처럼 각 값 조정
- `buff/spells` 모듈의 `use_spell_siphon`: 이 루프에서 기본값 0 유지(아래 "싸움 전 붕대 미리 쓰기")

#### 루프 골격

1. 명령이 막혀 있으면 정지. 시작 준비와 각 패스의 REMEMBER HANDS에서 현재 양손을 기록. 새 무기를 자동 주문보다 먼저 기억
2. OPENING TELEKINESIS: 첫 빈 시전 창에서 자기 TK 한 번. 전체 시약 조회보다 먼저 Bloodmoss와 Mandrake Root만 확인([Magery](https://wiki.uooutlands.com/Magery), 2026-10-26 확인)
3. REAGENTS: 10초마다, 또는 `More reagents are needed` 거절 직후 시약 8가지 읽기 → 주문별 플래그
4. 회복 블록은 `paralyzed or poisoned or diffhits > 0` 한 줄 아래. 다치지 않은 패스는 그 한 줄만
5. CURE: 마비면 트랩 파우치. 마비 아니고 독이면 Cure 포션. 포션이 하나라도 있으면 에이전트 생략, 없거나 꺼져 있으면 Smart Heal/Cure 에이전트
6. HEAL: 잃은 HP가 힐 포션 기준 이상이면 포션. 이 패스에 포션이 안 나갔고 긴급 기준 이상이면 Greater Heal/Cure 에이전트
7. BANDAGE, LIGHT HEAL, REFRESH 순서. 진행 중인 붕대는 재시작 안 함. 가벼운 Heal: 붕대 불가 시 대신, `use_light_heal` 1이면 붕대와 함께
8. STAT POTIONS: Strength와 Agility는 STR과 DEX가 기준선 아래면 5초에 한 번. Resist는 버프가 빠지면 즉시. 한 포션이 떨어져도 나머지는 계속
9. SELF BUFFS: RA → Reflect → Protection 순서, 한 패스에 하나씩. 빠지면 긴급 기준 아래에서 즉시
10. REARM: 시전, 커서, 행동 큐가 없을 때 비어 있는 손에 기억한 장비 복구

- 시작 자기 TK: `teleki, me` 바가 이미 돌면 생략. 바를 스크립트에서 시작하거나 자기 TK 성공 신호로 쓰지 않음([PvP](../game/pvp.md#04.D) 04.D절)
- 수동 시전이나 커서, 행동 큐, 은신, 마비, 자원 부족이면 시작 TK는 보류. 조건이 풀리면 시도하며, 요청 후에는 성공 여부와 무관하게 같은 Play에서 반복하지 않음
- 시전 방해나 이동으로 시작 TK가 실패했다면 수동으로 사용. 반복 유지나 재시도 타이머는 없음

- 힐 포션: `heal pot` 바가 돌면 라벨 생략, 바가 0일 때 포션의 `next usable` 라벨 확인
- 포션을 마신 패스는 Greater Heal 생략. 다음 패스에도 긴급 기준 이상이면 그때 Greater Heal
- 붕대 시작 ≠ 즉시 HP 회복
- 사람이 시전하는 동안: 포션은 나감, 에이전트, 버프, 붕대, 장착은 대기. 사람이 커서를 든 동안: 마비 파우치만
- 긴급 기준에 닿아도 수동 입력은 끊지 않음. 시전 종료나 커서 해제 뒤 다음 패스에 회복
- 중립 아이템 커서도 같은 커서로 보고 대기

#### 비용과 타이머

- `findtype`이 가장 비싼 명령([Razor](../scripting/razor.md#06) 06절) → 시약은 패스마다 찾지 않고 REAGENTS 플래그를 읽음
- 포션은 필요한 블록 안에서만 찾음. 스탯 포션 셋은 교전 중 5초 검사에서만, 마신 다음 패스는 바로([Combat](../mechanics/combat.md#02.D) 02.D절)
  - Strength와 Agility는 스탯이 기준선 아래일 때 5초에 한 번, Resist는 버프가 빠졌을 때만
- 시작 TK의 시약 조회는 요청 전 두 종류만. 요청하거나 활성 TK 바를 확인한 뒤에는 생략
- REMEMBER HANDS는 패스 시작 때 손에 장비가 있으면 양손을 읽음. 자동 주문으로 새 무기가 내려가기 전에 선택을 기억하기 위한 비용
- REARM은 `interval__equip_retry`(2초)마다 양손을 확인. 기억한 손이 비었는지는 패스마다 읽고, 그때는 주기를 기다리지 않고 확인
- 재장착 요청 간격은 `timer__equip_sent`(2초). 손 전체 조회는 `timer__equip`으로 제한. Strength와 Agility 재시도는 `timer__str_potion`, `timer__agi_potion`(5초)
- 저주를 받으면 포션 효과 중에도 스탯이 기준선 아래 → 다른 신호로는 거절될 마시기를 못 막음([Combat](../mechanics/combat.md#02.D) 02.D절)
- 나머지 중복 요청은 행동 큐(`queued`), `bandaging`, `findbuff`, 포션 라벨, `heal pot` 바가 막음
- 에이전트는 제 시전이 끝날 때까지 폴링 → 끝난 뒤에도 잃은 HP가 남으면 즉시 재시전
- 그 밖의 타이머: 반복 경고 방지 `timer__message`(3초), 시약 주기 `timer__reagents`(10초). 모두 Play마다 준비 상태로 시작

#### 싸움 전 붕대 미리 쓰기

- 붕대가 끝나 HP가 가득 차면 현재 루프는 다음 붕대를 시작하지 않음
- 사용자가 나에게 Magic Arrow를 한 번 쏴서 피해를 만든 뒤 커서를 놓으면 다음 붕대 조건 성립
- → 교전 전에 붕대 종료 시점을 앞당김. 첫 피해 뒤 붕대 시작과는 다른 수동 준비
- HP가 가득 찬 상태의 Bandage Self를 서버가 받는지는 아직 확인되지 않았다
- HP가 가득 찼을 때 자기 Magic Arrow를 자동 반복하는 분기는 없음. 진행 중인 붕대 재시작, 마나 낭비, 수동 공격 입력과의 충돌 회피
- Spell Siphon용 자기 Magic Arrow와 버섯 옵션은 v5에서 제거.
  [Spell Siphon은 크리처 상대 보너스](https://wiki.uooutlands.com/Resisting_Spells),
  [버섯은 PvP 플래그 중 섭취 불가](https://uooutlands.com/news/patch-march-5-wizards-grimoire-new-player-rental-credit-deeds-society-job-updates/)
- Resist 포션은 던전 몹과 펫 상대용 옵션. 적 플레이어 주문 감소로 계산하지 않음

#### 기억한 무기 재장착

- 시작 준비와 `fight/remember-hands`가 주문 전에 양손 레이어를 읽어 serial을 기억. `fight/rearm`은 복구를 담당. 같은 그래픽의 여분으로 교체하지 않음
- 손이 비면 기억한 serial을 백팩에서 찾아 `lift`와 `drop self <손>`으로 요청. `dress`나 무기 공격 핫키는 사용하지 않음
- `rearm_follow_hands` 1: 양손을 먼저 읽고, 새 장비가 보이면 그때 양손 구성을 새로 기억. 빈 반대 손의 이전 기억은 비워 1H와 2H 사이 수동 교체를 되돌리지 않음
- 시작 때 장비가 보이면 그 구성을 채택. 양손이 비어 있으면 Stop과 Play 사이의 기억을 유지. 클라이언트를 재시작한 뒤에는 쓸 무기를 먼저 들고 시작
- 손과 백팩 어디에도 없는 장비는 잊음. 현재 든 방패와 한손 무기는 함께 기억
- 기본 `rearm_graphic` 0: 처음부터 빈손이고 기억한 장비도 없으면 대체 무기를 찾지 않음
- 장착 중인 손은 유지. 빈 손만 복구하며, 시전 중이거나 타겟 커서, 행동 큐, 은신이 있으면 기다림
- 스윙 바와 무기 슬롯은 사용하지 않음. 두 도끼 사이 선택과 공격 요청은 수동
- 장착 요청은 성공이나 명중 증거가 아님. 손 장비와 Journal의 `Rearm:` 줄을 함께 확인

#### 상태

| 상태 | 뜻 |
| --- | --- |
| `var__self_telekinesis_pending` | 시작 자기 TK 요청이 남으면 1. Play마다 1로 시작, 활성 TK 바 확인 또는 시전 요청 후 0 |
| `var__has_black_pearl`, `var__has_bloodmoss`, `var__has_garlic`, `var__has_ginseng`, `var__has_mandrake`, `var__has_nightshade`, `var__has_ash`, `var__has_silk` | REAGENTS가 읽은 시약 8가지 보유 여부 |
| `var__regs_cure`, `var__regs_heal`, `var__regs_greater_heal`, `var__regs_reactive_armor`, `var__regs_magic_reflect`, `var__regs_protection` | 그 주문의 시약이 모두 있으면 1. 이 루프의 시전 블록이 읽고 REAGENTS만 씀 |
| `var__heal_potion_out` | HEAL 블록 내부용. 이 패스에 힐 포션이 나갔으면 1 |
| `var__rearm_left`, `var__rearm_right` | 양손에서 마지막으로 관찰한 serial. Play를 넘어 유지 |
| `var__rearm_due`, `var__rearm_sent` | 이번 패스에 손을 읽을지, 장착 요청을 이미 하나 보냈는지 |
| `var__rearm_seen_left`, `var__rearm_seen_right` | 장착 요청 전에 읽은 현재 양손의 serial. 빈 손은 0 |
| `var__rearm_pending` | 그래픽 검색 후보. 기본 pvp 설정에서는 사용하지 않음 |

- 정적 검사는 Outlands 서버나 실제 커서 처리를 입증하지 않음
- 구조화 PvP나 팩션에서 명령이 막히면 `[ script, blocked ]` 후 정지
- 반영 방법과 인게임 확인: [Open items](../questions/open-items.md#10) 10절
