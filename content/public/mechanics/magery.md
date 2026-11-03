---
name: Magery
label: 매저리 메커니즘
group: Mechanics
order: 30
---

Magery 프록과 Grimoire 전제, 시전 성공률, 시전과 적중 시점, 프리캐스트, PvM 시전 보호.
PvP의 주문 싸움은 [PvP Magery](../game/pvp-magery.md).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 프록 메시지, Energy Bolt 회수, Grimoire 전제 |
| [02](#02) | 시전 시간, 프리캐스트, 성공률, PvM 시전 보호, 적중 지연 |
| [03](#03) | 자주 틀렸던 생각 |
| [04](#04) | 출처 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

## <a id="01"></a>01 Magery 프록은 게임 메시지로 확인

`cooldowns.xml`에 이미 있음. **15초를 자체 `timer__`로 세지 않음.**

| 항목 | 프록 발동 | 다시 준비됨 |
| --- | --- | --- |
| `magic arrow` | "magic arrow activated" | "cast a wizardry magic arrow spell again" |
| `harm` | "harm activated" | "cast a wizardry harm spell again" |
| `lightning` | "lightning spell hinders" | "cast a wizardry lightning spell again" |
| `fireball` | "fireball activated" | "cast a wizardry fireball spell again" |

- 바 길이 15초(인게임 관찰). 준비 문장이 오면 바가 0 → 길이가 조금 틀려도 문장이 보정
- Lightning 프록은 `Wizardry lightning activated.`와 `Your lightning spell hinders your target.` 둘 다 뜸(인게임 확인됨 2026-09-28)
- 지금 트리거인 힌더 줄로 충분. 발동 줄로 바꾸려면 `lightning activated`가 아닌 `Wizardry lightning activated`. 짧은 쪽은 `chain lightning activated`에도 걸림
- 스크립트는 `cooldown "magic arrow" = 0`처럼 바로 읽음

**`Energy Bolt`는 쿨다운 항목 불필요.** 15초 창이 없는 순수 필러. 단, 마나 회수에 조건.

> "Damage increased by (6% / 18% / 30%). Player recovers (3 / 9 / 15) mana **if target is killed within next 5 seconds**" -- Wizard's Grimoire, Energy Bolt
> "Inflicts an additional (7%, 21%, 35%) of final spell damage to target over 15 seconds" -- Wizard's Grimoire, Flamestrike

- 회수 마나는 Grimoire T1, T2, T3에서 **3, 9, 15**. 이 캐릭터는 Energy Bolt에 5점(T3) → 15([Bard Necro](../templates/bard-necro.md#02.A) 02.A절)
- 15마나는 **볼트 적중 뒤 5초 안에 대상이 죽을 때만.** 잡몹 마무리 시 실제 비용 5, 체력 큰 몹은 20 그대로
- 이전 판의 "조건 없는 상시 효과"는 오류. [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.D) 01.D절 마나 예산도 이 조건으로 수정

### <a id="01.A"></a>01.A Wizard's Grimoire의 전제

> "Players must have at least 80 Magery skill and at least 80 Meditation or 80 Eval Int skill to benefit from the Wizard's Grimoire" -- Wizard's Grimoire

## <a id="02"></a>02 시전 시간

| 서클 | 시전 | 서클 | 시전 |
| --- | --- | --- | --- |
| 1 | 0.50초 | 5 | 1.50초 |
| 2 | 0.75초 | 6 | 1.75초 |
| 3 | 1.00초 | 7 | 2.00초 |
| 4 | 1.25초 | 8 | 2.50초 |

> "Casting recovery time is **0.2 seconds**" -- 시전 사이 고정 딜레이. 인게임 확인됨

- 소환 주문은 이 표 밖. [Item list](../game/item-list.md#19) 19절 기준 서클과 무관하게 모두 6.00초([Necromancy](necromancy.md#01.A) 01.A절)
- **시약과 마나는 대상을 찍을 때 검사와 소모**(인게임 확인됨 2026-09-28). 시약이 없어도 시전은 끝까지, 커서도 뜸
- 대상을 찍는 순간 캐릭터 이름으로 `More reagents are needed for this spell.` → 실패. 마나는 그때까지 그대로. 인게임 확인됨 2026-09-28

### <a id="02.A"></a>02.A 프리캐스트 커서와 아이템

시전이 끝나면 커서가 뜨고, 커서를 찍기 전에 아이템을 쓰면 주문이 사라짐.

> "Attempting to drink a potion once the precast is complete will cancel the spell." -- Combat Overview, Precasting
> "A spell cast must complete before you attempt to arm your weapon or it will be interrupted." -- Combat Overview, Precasting

- 붕대도 같음. Greater Heal 커서가 뜬 채 Bandage Self → 붕대 커서가 주문 커서를 덮어 Greater Heal 소멸, `Your concentration is disturbed` 줄 없음. 인게임 확인됨 2026-11-01
- 시전 중에는 포션은 안 끊기고 장착은 끊김(위키 같은 절). 붕대의 시전 중 효과는 확인되지 않았다
- Razor의 `casting`은 시전이 끝나면 풀리고 커서는 그 뒤에 옴 → 그 틈에는 `not casting and not targetexists`가 참. 스크립트 대응은 [Razor](../scripting/razor.md#03) 03절

### <a id="02.B"></a>02.B 시전 성공률과 스크롤

기준: [Magery](https://wiki.uooutlands.com/Magery), [주문표](https://wiki.uooutlands.com/Template:SpellCircles). 시전 성공률과 시전 중 인터럽트는 별개.

> "Casting a spell from a scroll increases a player's Effective Magery skill by 20 (effective Magery only affects casting chance)" — Magery

- 100% 성공: 6서클까지 Magery 80, 7서클 90, 8서클 100. Magery 80으로 8서클 스크롤을 쓰면 성공 판정은 100
- 스크롤의 성공 보정 ≠ 실제 Magery 100의 피해량이나 회복량. Greater Heal: Magery 80에서 32\~40, 100에서 40\~50

### <a id="02.C"></a>02.C PvM 시전 보호

> "Provides players with a (Effective Magic Resist Skill / 100%)) chance to avoid Spell Interruption from Creature/Environment Damage" -- Resisting Spells
> "Players will have an (Effective Inscription Skill / 100%)) chance to avoid Spell Interruption from Creature/Environment Damage" -- Inscription

- 크리처 공격에 시전이 안 끊길 확률이 Resist와 Inscription에 같은 꼴로 존재. 합산 여부는 확인되지 않았다. **Resist 100이면 이것만으로 100%**
- 바드의 Defensive Barding은 PvM 보너스 없음 → printed Resist로만
- 소환수 공격이 "Creature/Environment Damage"에 드는지는 [PvP](../game/pvp.md#06.A) 06.A절

### <a id="02.D"></a>02.D 시전과 적중 지연

> "damage delay of 0.5 seconds" — [Energy Bolt](https://wiki.uooutlands.com/Template:SpellCircles)

| 주문 | 기본 시전 | 피해 지연 |
| --- | --- | --- |
| Magic Arrow | 0.5초 | 0.5초 |
| Harm | 0.75초 | 0.05초 |
| Explosion | 1.75초 | 2.5초 |
| Energy Bolt | 1.75초 | 0.5초 |

기준: [Magery 주문표](https://wiki.uooutlands.com/Magery), [SpellCircles](https://wiki.uooutlands.com/Template:SpellCircles).
기본 시전과 주문 사이 회복은 02절. 실제 적중은 거리, 시야, 반사, 시전 실패와 취소도 함께 확인.

::part[기록]

## <a id="03"></a>03 자주 틀렸던 것

| 틀린 생각 | 사실 |
| --- | --- |
| 프록 15초는 타이머로 셈 | **게임이 메시지로 알려 줌.** `cooldown "magic arrow"` 같은 바를 읽음 |
| 시약이 없으면 시전이 시작 안 됨 | **시전은 끝까지, 대상을 찍을 때 실패.** 마나도 그때 소모(02절) |
| Energy Bolt는 시전마다 15마나 회수 | **5초 안에 대상이 죽을 때만.** 잡몹에서만 실제 비용 5 |
| 시전이 끝나면 커서가 떠 있는 한 주문은 안전 | **커서를 찍기 전에 붕대, 포션, 장착을 쓰면 주문이 사라짐.** 붕대는 끊김 줄도 없음(02.A절) |

## <a id="04"></a>04 참고 링크

- [Magery](https://wiki.uooutlands.com/Magery)
- [Wizard's Grimoire](https://wiki.uooutlands.com/Wizard%27s_Grimoire)
- [Combat Overview](https://wiki.uooutlands.com/Combat_Overview), Precasting
- [Inscription](https://wiki.uooutlands.com/Inscription), [Resisting Spells](https://wiki.uooutlands.com/Resisting_Spells)
- [SpellCircles](https://wiki.uooutlands.com/Template:SpellCircles)
