---
name: Archery
label: 아처리 메커니즘
group: Mechanics
order: 40
---

아처리 무기와 사격 간격, 코덱스 자세와 피니셔, 무기 능력, PvP에서 빠지는 것의 서버 규칙.
이 템플릿이 고른 것은 각 표의 판단 열과 [Bard Archer](../templates/bard-archer.md), 루프의 전환 규칙은 [Bard Archer Enhanced](../loops/bard-archer-enhanced.md).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 무기와 사격 간격. Rampart Crossbow, 사거리, 2H와 1H, 간격 식 |
| [02](#02) | 자세. 다섯 자세의 값과 판단, Hinder와 Maiming |
| [03](#03) | 피니셔. 문턱과 확률, Ricochet과 Pincushion |
| [04](#04) | 무기 능력. 세 능력의 15초 피해 비교 |
| [05](#05) | PvP에서 빠지는 것 |
| [06](#06) | 출처 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

::part[무기]

## <a id="01"></a>01 무기와 사격 간격

- Rampart Crossbow: [Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons) 무기표의 "(2H) Heavy Crossbow, Rampart Crossbow, Great Bow" 줄. 스윙당 3.75초, 피해 17\~45, 평균 31
- 사거리: 석궁과 Great Bow 8칸, 활 10칸([Archery](https://wiki.uooutlands.com/Archery))
- 손: Rampart Crossbow, Heavy Crossbow, 활 넷은 2H. Crossbow, Balestra, Pistol Crossbow는 1H([Archery](https://wiki.uooutlands.com/Archery) 무기표).
  Razor의 `lefthand`가 2H 레이어. `fight/rearm`은 들고 있던 레이어를 기억해 손을 가름. graphic 31186, Item Data 인게임 확인 2026-10-21([Item list](../game/item-list.md) Archery)
- 간격 식: [Melee](melee.md#02) 02절. 스태미나 100에서 3.75초. 맞아서 스태미나가 줄면 느려짐

> "Increases Swing Speed by (5% \* (Anatomy Skill / 100))" -- Archery
> "Ranged weapons (excluding Ocean Weapons) have a flat .5 second stationary delay requiring players, regardless of their Dexterity, to stay in place before firing." -- Armor & Weapons

- 공격 속도 보너스는 모두 더함([Swing Speed](https://wiki.uooutlands.com/Swing_Speed)). Anatomy 80 4%, Resisting Spells 80 8%, 음식 5% → 17%.
  인게임 확인됨 2026-10-23(Player Stats Profile)
- 스태미나 100에서 3.75 × 0.83 = 3.11초. **15초에 4.8발.** 음식이 없으면 12%, 3.30초
- DEX 100(포션) → 스태미나 최대 100. 간격 식의 상한
- PvM은 쏘기 전 0.5초 서 있어야 함

::part[코덱스]

## <a id="02"></a>02 자세

| 자세 | 랭크당 | 7랭크 | 판단 |
| --- | --- | --- | --- |
| Arcane | 정확도와 피해 3% | +21%, +21% | **기본.** 조건 없이 매 발 |
| Fowling | 피해 2%, 쏜 뒤 5초 피해 저항 4% | +14%, 저항 +28% | **다쳤을 때.** 잃은 HP 45 초과에서 켜고 30 미만에서 끔 |
| Incendiary | 피해의 10%를 2칸 안 무작위 적에게 | 70% | **여러 마리일 때.** 판정은 [Bard Archer Enhanced](../loops/bard-archer-enhanced.md#02) 02절 |
| Longshot | 사거리 (랭크 / 2) 올림, 피해 3% | +4칸, +21% | 안 씀. 8칸으로 충분 |
| Maiming | Hinder 지속 10%, Overpowered Hinder 피해 10% | +70%, +70% | 안 씀. 아래 |

- 출처: [Archery](https://wiki.uooutlands.com/Archery)의 Codex Stances
- Fowling 기준은 `fight/archery-codex` 모듈 기본값. Sword Defensive도 같은 기준. 2026-10-21 사용자 선택, 인게임 효과는 확인되지 않았다
- Incendiary: 프로보로 붙어 싸우는 짝이 대상 옆에 있으면 Arcane의 21%보다 큼. 대상 옆에 적이 없으면 손해

Hinder와 Maiming.

> "Increases Damage by 100% and Hinders target (prevents all movement, casting, melee attacks) for 4-8 seconds." -- Archery
> "Hinder effect duration scales based on weapon speed (slower archery weapons have longer effect duration)" -- Archery
> "any new Hinder effects attempting to be applied will instead result in a damage bonus" -- Archery, Hinder가 끝난 뒤의 면역 동안

- 특수 공격은 무기와 무관하게 공격당 10%. 1H와 2H 화면 모두 `Weapon Special Chance` 10%, 인게임 확인됨 2026-10-23
- Arms Lore 없음 → 3.11초 간격, 모두 명중 가정 시 평균 31초에 한 번
- 시전 봉쇄 비율: Hinder 최대 8초 → 최대 22%. Maiming(+70%) 13.6초 → 최대 38%
- Peace가 걸린 몹은 이미 못 움직이고 못 침. 프로보 짝을 묶으면 서로 못 싸움
- Peace 중에도 주문을 쓰는 몹이 있음. 인게임 확인됨 2026-10-21 → 시전 몹이 많은 던전용으로 설정만 열어 둠(`archery_stance_main` 5)

## <a id="03"></a>03 피니셔

> "Weapon Finisher Threshold: 25% \* (Finisher Tier / 5)" -- Weapon and Parry Codex
> "(10%) + (10% \* (Anatomy Skill/100))" -- Weapon and Parry Codex, 피니셔 확률
> "Players can only trigger a single Finisher on each mob (i.e. an infinite cooldown)." -- Weapon and Parry Codex

- 5티어 → 대상 HP 25% 이하에서, 확률 18%. 무기 속도 보정이 더 붙음, 식은 위키에 없음
- 화면의 `Weapon Finisher Chance`: Speed 28 1H 37.29%, Speed 20 2H 52.20%. 인게임 확인됨 2026-10-23
  - 비율 1.40 = 사격 간격 비율 → 초당 발동은 무기와 무관. 피해는 무기 피해 비례라 느린 무기가 큼
  - `Aspect Special Chance`도 같은 비율(2.49%, 3.48%)
- Ricochet: 대상 350%, 대상 6칸 안 다른 적 최대 둘에 350%씩. Pincushion: 대상에 100% 여섯 번 = 600%

| 상황 | 피니셔 | 이유 |
| --- | --- | --- |
| 한 마리 | Pincushion | 대상에 600% > 350% |
| 여러 마리 | Ricochet | 대상 350%와 다른 적에 최대 700% |

- 보스는 일정 시간마다 다시 터짐. 위키의 두 문장(`120 - (12 × 티어)`초, 60초)이 5티어에서는 같은 60초

## <a id="04"></a>04 무기 능력

> "For next 15 seconds damage increased by 35% and can fire while moving" -- Skirmish
> "For next 15 seconds damage increased by 50%, but must be stationary for 3 seconds to fire" -- Full Draw
> "If not currently stealthed, immediately makes 3 hits, each inflicting 75% weapon damage (scaled by weapon speed)" -- Repeater
> "All Weapon Abilities for the player share the same weapon ability cooldown." -- Weapon and Parry Codex

- 세 능력이 게이지 하나. Arms Lore 없으면 60초
- 요청은 토글이 아님. 게이지가 차면 한 번 요청, 다음 명중에 나감. 인게임 확인됨 2026-10-22
- 15초에 4.8발(01절) 기준

| 능력 | 15초 동안 더하는 피해 |
| --- | --- |
| Full Draw | 4.8발 × 50% = 240%. 모두 명중하고 15초 내내 서 있을 때 |
| Repeater | 3 × 75% = **225%**. 즉시 |
| Skirmish | 4.8발 × 35% = 168% |

- **Repeater.** Full Draw와 15%p 차이는 15초 내내 서서 모두 맞힐 때만. 대상이 중간에 죽거나 한 발 움직이면 Repeater가 앞섬
- 스태미나가 줄어 발 수가 줄면 Full Draw만 줄어듦
- Full Draw는 사격 직후에 켜면 5발(250%)이지만 루프는 손으로 쏘는 박자에 못 맞춤
- Repeater의 무기 속도 보정 식은 위키에 없음 → 일반 사격 한 발과 비교 필요
- 1H 석궁(Speed 28)이었다면 2.68 × 0.83 = 2.22초, 15초에 6.7발 → Full Draw 337%가 나음

## <a id="05"></a>05 PvP에서 빠지는 것

- 코덱스, Mastery Chain, Aspect는 PvP에서 꺼짐. 인게임 확인됨 2026-10-21 → 자세, 피니셔 판단은 PvM 전용
- 아처리 특수 공격(Hinder)은 몹에만, 보조 무기 스킬 보너스는 PvM 25%, Combat 05%([Archery](https://wiki.uooutlands.com/Archery))
- PvP의 정지 대기는 DEX로 줄어듦: DEX 25 이하 1.0초, 100 이상 0.5초

> "A player with 63 Dex must remain stationary for 0.75 seconds." -- Archery

- Healer's Codex도 몹 상대로만([Bard Archer](../templates/bard-archer.md#01.B) 01.B절)
- PK를 만나면 F4 `combat/pvp`. 이 루프는 구조적 PvP에서 멈춤([Modules](../scripting/modules.md#06) 06절)

::part[기록]

## <a id="06"></a>06 출처

- [Archery](https://wiki.uooutlands.com/Archery): 자세, 피니셔, 능력, Hinder, 사거리, PvP 차이
- [Weapon and Parry Codex](https://wiki.uooutlands.com/Weapon_and_Parry_Codex): 피니셔 문턱과 확률, 능력 게이지
- [Commands](https://wiki.uooutlands.com/Commands): `[ArcheryAmmunition`, `[ArcheryFinisher`, `[WeaponAbility`
- [Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons): 무기표, 정지 대기, AR, 마나 페널티, 스태미나 피로
