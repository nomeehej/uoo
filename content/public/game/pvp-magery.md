---
name: PvP Magery
label: 주문전, 반사와 마나
group: Game reference
order: 20
---

플레이어 상대 주문전의 인터럽트, 피해, Reflect, 포션과 마나, 이동 쿨.
Heat of Battle, 명중률, TK와 소환수의 PvP 규칙은 [PvP](pvp.md).
공통 시전 성공률과 프리캐스트, 적중 지연은 [Magery](../mechanics/magery.md).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 서클별 인터럽트 |
| [02](#02) | 주문 피해와 보조 스킬 |
| [03](#03) | 레슬링과 시전 |
| [04](#04) | Reflect와 Inscription |
| [05](#05) | Alchemy와 포션 |
| [06](#06) | 마나와 프리캐스트 |
| [07](#07) | Teleport와 Rope |
| [08](#08) | 출처 |

::part[주문전]

## <a id="01"></a>01 서클별 인터럽트

메이지 계열 템플릿의 PvP 숫자. **4서클 이상 해로운 주문은 상대 시전을 언제나 끊음.
1서클은 첫 발만 끊고 그 뒤 5초 동안 불가.**

> "All hostile spells from 4th, 5th, 6th, 7th, and 8th circles will interrupt other players 100% of the time" -- Magery
> "Casting a hostile 1st circle spell against another player will at first have an interrupt chance of 100%" -- Magery
> "Afterwards, a 5 second window starts where all subsequent 1st circle hostile spells against the target have a 0% interrupt chance" -- Magery

| 해로운 주문 | 상대 시전을 끊는 확률 |
| --- | --- |
| 1서클 | 첫 발 100%. 그 뒤 5초 동안 같은 대상에게 1서클은 0% |
| 2서클, 3서클 | 1서클과 같은 규칙. 5초 창은 서클마다 따로 |
| 4\~8서클 | **언제나 100%** |

## <a id="02"></a>02 주문 피해

> "PvP - Deals ((28 to 36) \* (Magery / 100) \* (.75 + (.375 \* (Eval Int / 100)))) damage to target player" -- Energy Bolt, Explosion 공통
> "Modifies base spell damage against players by (0.75 + (0.375 \* (Eval/100)))" -- Evaluating Intelligence
> "There is a 10% spell damage cap on supplemental skills (Tracking, Camping, Inscription, etc)" -- Evaluating Intelligence

| Eval | PvP 배율 | Energy Bolt와 Explosion, Magery 100 |
| --- | --- | --- |
| 0 | x0.75 | 21\~27 |
| 80 | x1.05 | 29.4\~37.8 |
| 100 | x1.125 | 31.5\~40.5 |

- 주문의 적중 지연은 [Magery](../mechanics/magery.md#02.D) 02.D절

### <a id="02.A"></a>02.A 보조 스킬의 합산

> "Instead, having the Necromancy skill during PvP will provide the player with a (10% \* (Necromancy Skill / 100)) Supplemental PvP Spell Damage bonus" -- Necromancy
> "However, you could have 100 Evaluating Intelligence and 100 Tracking and gain 22.5% spell damage increase" -- Evaluating Intelligence

- 위키 예시: Eval 100의 +12.5%와 Tracking 100의 +10%를 합쳐 +22.5%
- 아래 표는 그 예시를 따른 보너스 비교. Magery와 Resist까지 넣은 모든 조합의 적용 순서를 입증한 피해식은 아님

| 구성 | Eval 배율 | 보조 스킬 (상한 10%) | PvP 주문 합계 |
| --- | --- | --- | --- |
| Bard Necro (Eval 80, Necro 100) | +5% | +10% (Necromancy) | **+15%** |
| Bard Mage (Eval 100, 보조 없음) | +12.5% | 0 | +12.5% |
| Bard Mage (Eval 100, Inscription 120, 스크롤 시전) | +12.5% | +10% (Inscription, 스크롤만) | +22.5% |

## <a id="03"></a>03 레슬링과 시전

- 메이지는 근접 한 대에 시전 끊김([PvP](pvp.md#02.E) 02.E절)
- 바드는 도주할 때만 Defensive Barding이 레슬링을 채움([Bard Necro](../templates/bard-necro.md#04.D) 04.D절)
- printed 레슬링 0이면 무기 100 PK의 근접은 **100%** 명중, 한 대마다 시전 끊김

> "Wrestling will provide a (15% \* (Wrestling Skill / 100)) Mana Refund chance when casting spells" -- Wrestling (PvM)

- 이 마나 환급은 PvM 전용. Defensive Barding이 채운 레슬링에는 미적용([Barding](../mechanics/barding.md#02.I) 02.I절)

## <a id="04"></a>04 Magic Reflection과 Inscription

> "PvP - Has a (35% \* (Inscription / 100)) chance to stay active and reflect a single additional spell before being nullified" -- Magery (Magic Reflection)
> "Will at most ever reflect 2 spells during PvP" -- Magery (Magic Reflection)
> "Players using a scroll to cast a spell will receive a (10% \* (Inscription Skill / 100)) damage bonus against other players (PvP Spell Supplemental Damage Cap 10%)" -- Inscription
> "Increases certain spell's buff durations. Normal duration is 2 minutes and are increased by (400% \* (Inscription Skill / 100)), including:" -- Inscription (Protection, Arch Protection, Bless,
> Invisibility)

- Inscription 120 → Reflect가 한 번 더 남을 확률 42%, 스크롤 주문은 보조 피해 상한 10%
- 버프 지속시간과 Reactive Armor는 PvM 전용으로 보지 않음
- [Magery](https://wiki.uooutlands.com/Magery)의 Reactive Armor: 물리 피해 `20% + 5% × Inscription / 100` 감소, 정해진 총 방어량을 다 쓰면 종료
- 근접 계산 예시에서는 이 효과의 반영 여부를 따로 표기

### <a id="04.A"></a>04.A Reflect 제거와 인터럽트

04절 Reflection 규칙상 Inscription이 있는 상대는 첫 주문 뒤에도 Reflect 유지 가능.
**Magic Arrow 한 번만으로 마나가 많이 드는 Explosion을 바로 던지지 않음.**

> "when staying up, will look and sound as if the player recast Magic Reflect on himself/herself" —
> [Inscription](https://wiki.uooutlands.com/Inscription)

- 첫 반사 뒤에도 Reflect가 남으면 다시 건 것 같은 모습과 소리(공식 설명). 공격자에게 `sysmsg`가 온다는 보장은 아님
- [2026 PvP 패치](https://uooutlands.com/news/the-pvp-patch-has-arrived/): PvP 플래그 중 Reflect 재시전 제한 60초
- 위키의 옛 30초 설명은 현재 PvP에 쓰지 않음. 타이머 시작 시점은 패치 문구만으로 미확정 → 실측 대상
- 공격자에게 "상대 Reflect 소진"을 확정하는 시스템 메시지는 확인되지 않았다. 상대 Journal 문구와 내 Journal 문구를 구분
- [PvP](pvp.md#04.C) 04.C절 Harm 실험의 Spell Siphon과 피해 표시는 상대 Reflect 소진의 전용 신호 아님. 한 발 반사 뒤에도 Inscription으로 남을 수 있음
- `findbuff "Magic Reflection"`은 내 버프만 읽음, 상대 상태와 무관. 상대 HP 감소도 다른 피해가 섞이면 확정 신호 아님
- 같은 Reflect 한 번이 반사할 수 있는 주문 두 발이 실제로 처리됐다면 소진 추론 가능. 시전 실패, 취소, 시야 차단, 재시전 Reflect는 따로 처리
- Magic Arrow 두 번으로 Reflect를 확인하는 것 ≠ 상대 시전을 두 번 끊는 것. 낮은 서클의 인터럽트 제한은 아래

> "Players Flagged in PvP will now have a 60 second cooldown before they can recast Magic Reflect" —
> [The PvP Patch Has Arrived!](https://uooutlands.com/news/the-pvp-patch-has-arrived/)

- [Magery의 Spell Interrupts](https://wiki.uooutlands.com/Magery): 1, 2, 3서클의 창을 따로 설명. 같은 서클을 제한 창 안에 다시 쓰면 창도 재시작 → Magic Arrow 연사는 안정적인 연속 인터럽트가 아님
- Magic Arrow, Harm, Fireball 연계는 서로 다른 서클. Lightning은 4서클
- 인터럽트 100%라도 **주문이 들어가는 순간 상대가 시전 중이어야** 효과. 거리, 시야, 반사, 피해 지연도 고려

## <a id="05"></a>05 Alchemy와 포션

> "Increases Explosion Potion damage by (50% \* (Alchemy Skill / 100))" -- Alchemy
> "Increases Healing Potion effectiveness by (25% \* (Alchemy Skill / 100))" -- Alchemy
> "Increases Cure Potion chances by (12.5% \* (Alchemy Skill / 100))" -- Alchemy
> "In PvP the base damage range is 15-25, scaled with a player's alchemy skill" -- Alchemy (Greater Explosion)

- Alchemy 80 → 폭발 포션 +40%, 힐 포션 +20%, 큐어 포션 +10%. Greater Explosion 쿨다운 15초(위키 포션표)
- +40%를 기본 15\~25에 곱하면 Greater Explosion PvP 데미지: Alchemy 80에서 21\~35, 100에서 22.5\~37.5

## <a id="06"></a>06 마나와 프리캐스트

> "The baseline Mana Regen rate is 1 mana restored every 2 seconds (i.e., 0.5 mana per second)." -- Meditation
> "The Mana Regen rate is increased by (100% \* (Meditation skill / 100))" -- Meditation

- Meditation 0이면 기본 재생 초당 0.5. 주문 연사엔 부족. 근접과 붕대 위주의 지구력은 별도 계산. 방어구 조건은 [Combat](../mechanics/combat.md#01) 01절

시전 성공률과 스크롤 보정은 [Magery](../mechanics/magery.md#02.B) 02.B절.

- Eval은 02절의 기본 주문 배율. Eval 0은 0.75, 80은 1.05. 보조 주문 보너스 상한을 채워도 Eval은 유효

| 주문 | 기본 마나 | 용도 |
| --- | --- | --- |
| Magic Arrow | 4 | 상태 확인, 저마나 견제와 인터럽트 |
| Harm | 6 | 저마나 견제와 인터럽트 |
| Fireball | 9 | 견제와 인터럽트 |
| Lightning | 11 | 견제와 인터럽트 |
| Telekinesis | 9 | TK 선택([PvP](pvp.md#04.B) 04.B절) |
| Teleport | 9 | 위치 조절 |
| Greater Heal | 11 | 회복 |
| Paralyze | 14 | 구속 |
| Explosion | 20 | 폭딜 |
| Energy Bolt | 20 | 폭딜 |
| Earth Elemental | 50 | 소환 직후 전투 마나 예산은 별도 |

포션 투척은 주문 마나 없음.

| 짧은 주문 | 거리 조건 |
| --- | --- |
| Magic Arrow | 반사돼도 낮은 피해를 감수하는 견제. Reflect 소진의 확정 신호 아님 |
| Harm | 기본 PvP 피해가 거리에 따라 감소. 0\~2타일 9\~13, 3\~4타일 4\~6, 5타일 이상 2\~3 |

- 시전 시작 가능 거리 ≠ 시전 뒤 대상 지정 가능 거리. 모든 주문의 최대 사거리가 12타일이라는 근거는 확인되지 않았다

기본 시전 시간과 피해 지연은 [Magery](../mechanics/magery.md#02.D) 02.D절.
Harm과 Magic Arrow의 시전 시간을 같게 계산하지 않음.
이 값만으로 움직이는 상대에게 무기 명중까지 넣은 확정 콤보 시간을 만들지 않음.
프리캐스트와 아이템의 충돌은 [Magery](../mechanics/magery.md#02.A) 02.A절, 실제 입력 보호 검사는 [PvP Checks](../verification/pvp.md#01) 01절.

## <a id="07"></a>07 Teleport와 Rope의 공유 쿨

> "will apply a 15 second cooldown to both the Teleport Spell and Adventurer Rope usage" —
> [Adventurer's Rope](https://wiki.uooutlands.com/Adventurer%27s_Rope)

| PvP 플래그 중 행동 | 다음 Teleport와 Rope에 모두 걸리는 쿨 |
| --- | --- |
| Teleport 사용 | 15초 |
| Rope로 타겟 지정 | 2분 |

- Rope 더블클릭 → 1초 행동 구속, 타겟 커서가 열린 동안 근접 스윙도 정지
- Teleport 직후 Rope로 공유 쿨 회피 불가. Rope 금지는 아니나 이후 이동 수단을 오래 잠그는 비용

::part[기록]

## <a id="08"></a>08 참고 링크

- [Magery](https://wiki.uooutlands.com/Magery), [주문표](https://wiki.uooutlands.com/Template:SpellCircles)
- [Evaluating Intelligence](https://wiki.uooutlands.com/Evaluating_Intelligence)
- [Inscription](https://wiki.uooutlands.com/Inscription), [Alchemy](https://wiki.uooutlands.com/Alchemy)
- [Combat Overview](https://wiki.uooutlands.com/Combat_Overview)
- [Adventurer's Rope](https://wiki.uooutlands.com/Adventurer%27s_Rope)
- [The PvP Patch Has Arrived!](https://uooutlands.com/news/the-pvp-patch-has-arrived/)
