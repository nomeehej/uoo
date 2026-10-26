---
name: Combat
label: 전투 메커니즘
group: Mechanics
order: 50
---

방어구와 마나 재생, 근접 무기, 붕대, 스탯 포션, Parrying, Resisting Spells, Tracking의 서버 규칙.
PvP 자체의 규칙(Heat of Battle, 명중률, TK)은 [PvP](../game/pvp.md), 템플릿별 선택은 각 템플릿 문서.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 방어구 재질별 자연 마나 재생 |
| [02](#02) | 맨손과 레슬링의 반격력. 보조 피해 상한, 스윙 간격, 붕대, 스탯 포션, 방어구 AR, PvM 무기와 코덱스, Hamstring |
| [03](#03) | 패링으로 막는 것과 못 막는 것 |
| [04](#04) | Resist의 주문 감소량, PvM 흡수와 Spell Siphon |
| [05](#05) | PK 조기 발견 |
| [06](#06) | 자주 틀렸던 생각 |
| [07](#07) | 출처 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

::part[회복]

## <a id="01"></a>01 방어구와 자연 마나 재생

> "The baseline Mana Regen rate is 1 mana restored every 2 seconds (i.e., 0.5 mana per second)." -- Meditation
> "The minimum Mana Regen rate is 1 mana restored every 8 seconds (i.e., 0.125 mana per second)." -- Meditation
> "A player's Total Armor Meditation Penalty is equal to the combined Meditation Penalties of all armor worn" -- Meditation
> "Which would result in a (2 \* 16.3%) = -32.6% effect on their Mana Regen rate." -- Meditation, 스터디드 한 벌과 플레이트 고짓의 예

- [Meditation](https://wiki.uooutlands.com/Meditation) 기본 재생: 2초에 1마나
- 부위 하나의 페널티 = 부위 비율 × 재질 비율. 입은 부위의 합계 × 2 = 재생 감소율
  - 부위: 가슴 35%, 다리 22%, 팔 15%, 머리 14%, 장갑 7%, 목 7%, 방패 35%([Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons))
  - 재질: 가죽 0%, 스터디드 10%, 본 25%, 링 50%, 체인 75%, 플레이트 100%
- Leather = 방어구에 의한 재생 감소 없음. 재생 가산은 아님
- Meditation 0, 가죽, 다른 보정 없음 → 이론상 30초에 15, 60초에 30마나

방패 없이 한 재질로 여섯 부위를 입은 한 벌. 간격은 아래 나누기 식, Meditation 0.

| 한 벌 | 페널티 합계 | 재생 감소 | 1마나 간격 | 120초 재생 |
| --- | --- | --- | --- | --- |
| 가죽 | 0% | 0% | 2초 | 60 |
| 스터디드 | 10% | 20% | 2.4초 | 50 |
| 본 | 25% | 50% | 3초 | 40 |
| 링 | 50% | 100% | 4초 | 30 |
| 체인 | 75% | 150% | 5초 | 24 |
| 플레이트 | 100% | 200% | 6초 | 20 |

- 감소율을 재생에서 빼는지 나누는지는 위키 문장만으로 안 정해짐. 빼면 링 한 벌부터 0 → 최저점 8초
- [outlandsbutler.com](https://www.outlandsbutler.com/) 장비 계산은 나누기: `1마나 간격 = 2초 × (1 + 감소율)`. 체인 한 벌 5초, 플레이트 한 벌 6초. 2026-10-21 사용자 화면
- 위키가 한 벌 효과를 −100%, −150%, −200%로 따로 적는 것과 맞는 쪽은 나누기 → 이 표도 나누기. 실제 간격은 확인되지 않았다
  - 확인 방법: 체인 한 벌, 음식 버프 없이 마나 10이 차는 시간. 나누기면 50초, 빼기면 80초
- 나누기면 갑옷만으로는 최저점(8초)에 닿지 않음. 플레이트 한 벌이 6초
- Butler는 음식 버프의 재생 +25%를 곱함(체인 0.2 → 0.25마나/초). 위키 근거는 확인되지 않았다
- 수동 Meditation 성공 상태 유지는 가정하지 않음. 이동, 행동, 피격으로 끊기는 능동 명상을 추격 중 유지한다고 보지 않음
- 마나가 가득 찬 동안의 재생은 쌓이지 않음. 시전 비용, 시점, 장비 변경에 따라 실제 남는 마나는 다름
- 최대 마나 ≠ 현재 마나. INT 45에서 Earth Elemental의 50마나 비용은 스크롤 성공률 보정으로 해결 불가
- 버프로 늘어난 최대치 ≠ 현재 마나 회복. 템플릿 적용은 [Lumberjack PvP](../templates/lumberjack-pvp.md#04) 04절

::part[근접]

## <a id="02"></a>02 근접 반격력

**맨손은 PvP 데미지 1\~4 → 반격력 없음.** 레슬링으로 싸우려면 레슬링 무기 필요.

> "Unarmed Wrestling base damage against players is 1-4" -- Wrestling
> "Damage from Wrestling Weapons in PvP will scale based on the player's Raw Dex stat as a % (without any adjustments for Dex bonuses or penalties from Potions, Bless, Weaken, other effects)" --
> Wrestling
> "Wrestling Weapons can be disarmed, which will result in the player dealing standard "Unarmed" 1-2 damage during that time" -- Wrestling
> "Wrestling Weapons will now be considered a Paired Weapon for the purposes of Weapon Setup bonuses" --
> [2026-05-30 패치](https://forums.uooutlands.com/index.php?threads/patch-notes-for-may-30-2026-mini-expansion-and-ossuary-4.6235/)

위키 무기표의 Grinding (Light)와 검술 양손 대표군. 스태미나 100, 추가 공속 보너스 없는 기본값.
DPS는 모두 명중, 대상 AR 0 기준. 손 장비 셋업, 스킬, 재질, Aspect, 코덱스 보정은 제외.

> "base Sec/Swing is calculated with 100 stamina" -- [Swing Speed](https://wiki.uooutlands.com/Swing_Speed), 2026-10-27 위키 확인

| 계열 | 스윙 간격(초) | 데미지 | 평균 | DPS | 무기 |
| --- | --- | --- | --- | --- | --- |
| Wrestling | 1.67 | 13\~31 | 22 | **13.17** | Martial Manual, Cestus, Fistblade |
| Swordsmanship, 1H Light | 1.56 | 13\~23 | 18 | 11.54 | Longswords, Broadsword, Viking Sword, Norse Axe |
| Swordsmanship, 2H Medium | 1.97 | 17\~32 | 24.5 | 12.44 | Battle Axe, Double Axe, Executioner's Axe 등 |
| Swordsmanship, 2H Burst | 3.00 | 21\~46 | 33.5 | 11.17 | Halberd, Bardiche, Zweihander, Great Axe |
| Mace Fighting | 1.63 | 12\~24 | 18 | 11.04 | Mace, Maul, War Mace, Flanged Mace, Flail |
| Throwing | 1.88 | 14\~24 | 19 | 10.11 | Throwing Dagger, Throwing Star |
| Archery | 2.21 | 13\~25 | 19 | 8.6 | Bow, Hunting Bow, Recurve Bow |

- 레슬링 무기의 PvP 데미지는 **raw Dex 비례.** raw Dex 100이면 100%, 50이면 50%. 포션이나 Bless로 올린 Dex는 제외
- 레슬링 무기를 들면 방패 불가. 패링은 무기 자체로(03절)
- 무장 해제 중 데미지: 원문 "Unarmed" 1-2. 플레이어 상대 맨손 1\~4와 어느 쪽이 맞는지는 확인되지 않았다
- Wrestling 개별 위키의 옛 양손 피해 +20%, Speed 50은 위 패치 전 값. 현행 Speed 45, Paired 셋업 공속 +10%. 양손 근접 피해 +25%와 중복 적용하지 않음

### <a id="02.A"></a>02.A 보조 피해 상한과 도끼

> "Total of 20% Damage Bonus from all Supplemental skills" / "Total of 10% Damage Bonus from all Supplemental skills" —
> [PvP Damage Cap](https://wiki.uooutlands.com/PvP_Damage_Cap)

- 근접 보조 피해 상한 20%, 주문 보조 피해 상한 10%. **Tactics와 Anatomy는 근접 상한 밖, Eval은 주문 상한 밖**
- 보조 스킬의 PvP 기본 비율: 스킬 100당 10%. 스킬마다 정한 무기나 주문 조건 필요
- PvP Damage Cap 표: Lumberjacking 보너스는 **도끼만**, Mining 보너스는 메이스 계열만
- Swordsmanship이라고 모두 도끼는 아님. Katana와 Halberd는 Lumberjacking 보너스 대상 아님
- 디스코드의 "arguably it should be all swords"는 의견일 뿐, 현재 적용 범위 아님

> "(-50% + (Tactics Skill / 200))" — [Tactics](https://wiki.uooutlands.com/Tactics)

- Tactics 0\~100의 기본 무기 피해 조정식. 80은 -10%, 100은 0% → 80에서 100으로 올리면 기본 피해 10%p 회복
- 최종 피해가 정확히 10% 늘어난다는 뜻은 아님

> "Base Weapon Damage \* (20% \* (Anatomy Skill / 100))" — [Anatomy](https://wiki.uooutlands.com/Anatomy)

- Anatomy 80이면 기본 무기 피해 +16%, 100이면 +20%. Anatomy만으로 붕대 회복 대체 불가

### <a id="02.B"></a>02.B 현재 스태미나와 무기 교체

> "15000 / (Current Stamina (max 100) + 100) \* Weapon Speed)" —
> [Swing Speed](https://wiki.uooutlands.com/Swing_Speed)

- 원문 식의 괄호 불일치. 같은 페이지 무기표에 맞춘 식: `스윙 간격 = 15000 / ((min(현재 스태미나, 100) + 100) × 무기 Speed)`초
- PvP는 현재 스태미나와 무기 Speed만. PvM의 Aspect나 스킬 공속 보너스 없음
- 현재 스태미나가 간격을 정함 → 맞아서 줄어든 스태미나만큼 느려짐. Speed 20 무기는 스태미나 100에서 3.75초, 60에서 4.69초
- [Quick Switch](https://wiki.uooutlands.com/Combat_Overview)의 기준은 마지막 장착이 아닌 마지막 스윙
- 빠른 무기로 바꾸면 마지막 스윙부터 빠른 무기 간격, 느린 무기로 바꾸면 느린 무기 간격
- 무기별 별도 타이머로 중간에 공짜 한 대를 끼우는 구조 아님

> "increases the amount of stamina the wearer will lose when taking damage" / "A player's Total Stamina Fatigue Penalty is their (Total Armor Meditation Penalty / 2)." —
> [Armor & Weapons의 Stamina Fatigue Penalties](https://wiki.uooutlands.com/Armor_%26_Weapons)

- 방어구가 무거울수록 맞을 때 스태미나를 더 잃음. 위키 식이면 체인 한 벌 37.5%, 플레이트 한 벌 50%(페널티 합계는 01절)
- Butler 화면은 절반이 아닌 합계 그대로(체인 75%, 플레이트 100%). 위키 본문의 체인 예시(80%)도 표와 다름 → 실제 값은 확인되지 않았다

### <a id="02.C"></a>02.C 붕대의 회복량과 시간

> "Bandaging time is 15 - (5 \* (dex - 25) / 75) seconds" — [Healing](https://wiki.uooutlands.com/Healing)

- 자기 붕대 시간은 DEX 100까지만 감소. 식의 DEX는 버프 반영값, 스윙 계산의 현재 스태미나와는 다름

> "Random Value of 40 to 60" — [Healing의 회복식](https://wiki.uooutlands.com/Healing)

- 회복식: `(Healing / 100) × (40~60) × (1 + 0.2 × Anatomy / 100)`
- 슬립 하나마다 회복량 2% 감소. 아래 범위는 슬립, 다른 보정, 정수 반올림 제외

| Healing | Anatomy | 회복량 | 평균 |
| --- | --- | --- | --- |
| 80 | 0 | 32\~48 | 40 |
| 80 | 80 | 37.12\~55.68 | 46.4 |
| 100 | 80 | 46.4\~69.6 | 58 |
| 80 | 100 | 38.4\~57.6 | 48 |

- 붕대 해독: Healing과 Anatomy 각 60 이상. 부활 시도: 각 80 이상
- PvP에서 독 상태로 붕대를 쓰면 PvM처럼 해독과 HP 회복을 함께 한다고 계산하지 않음
  ([Heal through Poison](https://wiki.uooutlands.com/Combat_Overview))

> "Chance to resurrect with less than 100 Healing scales from 24% with 80 Healing skill to 62% with 99 Healing skill." /
> "Players with 100 Healing and 80 Anatomy skill will always have 100% chance to resurrect their target with bandages." —
> [Healing](https://wiki.uooutlands.com/Healing)

> "Bandaging another target takes 5-7.5 seconds, scaled based on Healer's Dexterity (capped at 100 Dexterity)" — [Healing](https://wiki.uooutlands.com/Healing)

- 붕대 부활 확률: Healing 80에서 24%, 99에서 62%, 100이면 늘 성공. 사이 값의 식은 위키에 없음
- 남에게 붕대: 5\~7.5초, DEX 100에서 5초. 부활에 걸리는 시간은 위키에 없음

### <a id="02.D"></a>02.D 스탯 포션과 Bless

> "Increases max strength/hp by 20" / "Increases max dexterity/stamina by 20" —
> [Alchemy의 Greater Strength와 Greater Agility](https://wiki.uooutlands.com/Alchemy)

- Greater Strength: STR과 최대 HP +20. Greater Agility: DEX와 최대 스태미나 +20
- [Bless](https://wiki.uooutlands.com/Template:SpellCircles)의 스탯 보정식 `11 × Magery / 100` → Magery 80이면 8.8
- **포션과 안 겹침.** 힘, 민첩 포션이 걸린 동안 Bless는 STR, DEX를 더 올리지 않음 → 남는 것은 INT(최대 마나). 인게임 확인됨 2026-10-21
- 실제 정수 처리는 확인되지 않았다
- 버프 바로는 포션 판별 불가. 위키 [BuffIcons](https://wiki.uooutlands.com/Template:BuffIcons)는 같은 아이콘을 `Strength Spell / Potion`, `Agility Spell / Potion`으로 표기
- 인게임 확인됨 2026-10-09: Magery 100 Bless는 `Your strength/dexterity/intelligence has changed by 11`, 버프 바에 `Strength`, `Agility`, `Cunning`
- 스탯 포션 버프 이름에도 Potion 없음 → `findbuff 'Strength'`로 보면 내 Bless든 아군 Bless든 걸린 동안 포션을 안 마심
- 포션 루프는 스탯 값으로 판정. Greater 포션을 마신 값(기본 + 20)을 `config__str_potion`, `config__dex_potion`에 두고, 그보다 낮으면 마심
- Bless와 Strength, Agility 주문은 식상 Magery 100에서 11, 120에서도 13.2 → 그 선 아래
- Razor 스크립트는 덧셈 불가 → 기본값이 아닌 기준선을 기록([Razor](../scripting/razor.md#05) 05절)
- 포션마다 재시도 간격. 스탯은 마신 뒤 한 왕복 늦게 오르고, Curse, Weaken, Clumsy는 포션 효과 중에도 스탯을 선 아래로 누름
- 간격이 없으면 거절될 마시기가 패스마다 회복 포션과 같은 아이템 큐로 나감
- 셋을 보는 검사는 교전 중 5초에 한 번(`interval__potion_check`). 다른 패스는 조건 한 줄
- Razor 행동 큐는 Object Delay마다 한 병만 보냄([Razor](../scripting/razor.md#03) 03절의 `queued`) → 마신 패스는 검사 시계를 준비 상태로, 다음 빈 패스가 다음 병. 셋이 다 빠졌으면 큐가 비는 대로 연달아
- 교전 밖에서는 시계를 되돌리지 않음 → 교전 첫 패스가 바로 검사
- Magic Resist 포션은 제 아이콘 `Magic Resist Potion`으로 판정(인게임 확인됨 2026-10-09)
- INT 45에 Bless: 정수 처리 전 최대치 53.8(56 아님). Bless 자체도 9마나
- 최대치 증가 시 현재 마나 증가량은 별도 측정 필요 → 시전 직후 현재 마나 53.8을 약속하지 않음

### <a id="02.E"></a>02.E 방어구를 반영한 근접 계산 예시의 전제

> "Minimum Amount: (.333% \* (Total Armor Value))" / "Maximum Amount: (.666% \* (Total Armor Value))" —
> [Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons)

- 위 공식상 물리 피해 감소 범위: `AR × 0.333%`부터 `AR × 0.666%`. AR 50이면 16.65\~33.30% 감소, 0.667\~0.8335 남음
- 위키의 AR 50 설명은 16.5\~33%로 축약. 여기서는 인용 계수 그대로, 서버 정수 처리는 제외
- 기본 무기 피해에 Tactics, Anatomy, 해당 보조 피해를 적용한 뒤 이 비율로 비교
- Parry, Reactive Armor, 무기 품질, 마법 옵션, 추가 효과, 정수 처리는 별도 조건
- 피해 중간값에 명중률을 곱해도, 접근 실패와 이동 시간을 반영한 실전 DPS는 아님

NPC 판매 방어구의 부위별 AR. [Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons)의 표.

| 부위 | 가죽 | 스터디드 | 본 | 링 | 체인 | 플레이트 |
| --- | --- | --- | --- | --- | --- | --- |
| 가슴 | 9 | 11 | 12 | 14 | 16 | 18 |
| 다리 | 6 | 7 | 8 | 9 | 10 | 11 |
| 팔 | 4 | 5 | 5 | 6 | 7 | 8 |
| 장갑 | 2 | 2 | 2 | 3 | 3 | 4 |
| 목 | 2 | 2 | 2 | 3 | 3 | 4 |
| 머리 | 4 | 4 | 5 | 6 | 6 | 7 |
| 방패 | 4 | 5 | 6 | 7 | 8 | 9 |
| 방패 뺀 여섯 부위 합 | 27 | 31 | 34 | 41 | 45 | 52 |

- 위키의 한 벌 Base Armor(25, 30, 35, 40, 45, 50)와 표의 합이 조금 다름. 이유는 위키에 없음
- AR은 부위 비율 없이 그대로 더함. 부위 비율은 마나 페널티(01절)에만
- 마법과 제작 보정: Defense +20%, GM과 Guarding +40%, Hardening +60%, Fortification +80%, Invulnerability +100%. 부서진 방어구는 AR 50% 감소

### <a id="02.F"></a>02.F PvM 근접 무기와 코덱스

무기 스킬과 Tactics 각 80이면 해당 무기 코덱스 사용 가능. 요구값은 printed 스킬, 장비 보너스 제외.
[Weapon and Parry Codex](https://wiki.uooutlands.com/Weapon_and_Parry_Codex), 2026-10-27 위키 확인.

> "All skill requirements are based on the player's printed skill" -- Weapon and Parry Codex

| 계열 | 크리처 상대 무기 특수 효과 | 코덱스로 보완하는 것 | 한손 무기 예 |
| --- | --- | --- | --- |
| Swordsmanship | Lacerate로 무기 특수 확률 증가, Bleed로 지속 피해 | Aggressive는 명중, 공속, 무기 특수 확률. Warrior는 명중, 방어, 피해 | Katana, Viking Sword |
| Mace Fighting | Pierce로 대상 방어구 감소 | Aggressive는 피해, Sunder는 Pierce와 피해 강화. Wild Swing은 명중을 낮추고 피해 증가 | War Mace, Hammerpick |
| Fencing | Cripple로 대상 방어율 감소, 받는 독과 질병 피해 증가 | Aggressive는 공속, Blackguard는 자체 질병, Fang은 독 바른 무기의 피해 증가 | Kryss, Warfork |

> "Increases Accuracy, Attack Speed, and Weapon Special Chance by 1.5% per rank" -- [Swordsmanship](https://wiki.uooutlands.com/Swordsmanship), Aggressive

- Swordsmanship Aggressive 7랭크: 명중, 공속, 무기 특수 확률 각각 +10.5%. 장비에서 이미 충분히 얻은 명중과 공속은 상한 확인 필요

> "Increases Pierce effects by an additional 5 Armor reduction per rank, and increases Damage by 4% per rank" -- [Mace Fighting](https://wiki.uooutlands.com/Mace_Fighting), Sunder

- Sunder는 Pierce가 걸렸을 때의 방어구 감소 강화. 스탠스 선택만으로 Pierce 상시 유지 보장은 아님

> "Target's Defense is reduced by 6% per Cripple stack" -- [Fencing](https://wiki.uooutlands.com/Fencing)

- Poisoning 0도 Cripple과 Blackguard 사용 가능. 독 전용 효과와 구분 필요
- 위 표는 2026-10-27 위키 규칙 비교. 특정 장비, 코덱스 랭크, 몬스터에서의 DPS 순위는 확인되지 않았다

#### 검술 무기군의 지속 피해

- 기본값은 02절 첫 표. 위키 표기 DPS 기준 2H Medium이 1H Light보다 약 7.8%, 2H Burst보다 약 11.4% 높음
- 위 차이는 기본 평타 비교. 최종 사냥 DPS나 처치 시간 차이 아님
- 1H와 2H의 셋업 보너스는 03.B절. 서로 다른 명중과 피해 보너스를 빼고 실제 격차를 7.8%로 고정하지 않음
- 같은 공속 보너스를 받으면 0.5초 간격 하한에 닿기 전까지 기본 평타 순위 유지

> "based on the weapon's printed Average Damage" -- [Weapon and Parry Codex](https://wiki.uooutlands.com/Weapon_and_Parry_Codex), 피니셔 피해 보정

- 피니셔는 발동 확률에 무기 속도 보정, 피해에는 무기 평균 피해에 따른 별도 보정. 큰 한 방만으로 2H Burst가 유리하다고 단정 불가
- 출혈은 타격 피해에 비례하지만 1H는 더 자주 공격. 한 번의 출혈 크기와 시간당 출혈 피해 구분 필요
- 최종 비교는 같은 재질, 코덱스, 버프, 몬스터에서 명중률과 평타, 출혈, 피니셔, Aspect 프록을 함께 반영. 인게임 DPS는 확인되지 않았다

#### 양손 무기와 Lyric

- Swordsmanship의 양손 중간 속도군: Battle Axe, Double Axe 등. 느린 군: Halberd, Zweihander 등
- Macing의 양손 중간 속도군: Quarter Staff, Black Staff 등. Fencing은 Short Spear, Pitchfork
- 도끼도 Swordsmanship 계열. Lumberjacking은 추가 피해 스킬, 도끼 사용 조건 아님

> "10% + 2% per player Lyric Tier Level" -- [Lyric Aspect](https://wiki.uooutlands.com/Lyric_Aspect), Melee Accuracy Bonus
> "scales with weapon speed" -- 같은 문서의 Aspect Special Chance

- Lyric 15 무기 명중 보너스 +40%. 실제 명중은 무기 스킬, 대상 방어 스킬, 재질, 코덱스와 다른 보너스까지 합쳐 판단
- Aspect 프록 확률은 무기 속도에 따라 보정. 빠른 무기가 공격 횟수 비율만큼 Lyric 프록도 더 낸다고 계산하지 않음
- Swordsmanship의 무기 특수 확률과 Lyric Aspect 프록 확률은 별도 항목
- 근거: 각 무기 위키의 무기표와 Lyric Aspect, 2026-10-27 확인

### <a id="02.G"></a>02.G 무방패 최대 코덱스 비교

각 무기 스킬과 Tactics 80, 모든 자세 7랭크, 피니셔 5티어, 능력 해금 완료를 놓은 비교.
스킬 80이 모든 무기의 명중 100%를 보장한다는 뜻은 아님.

> "Player's can only have one stance active for each codex" -- [Weapon and Parry Codex](https://wiki.uooutlands.com/Weapon_and_Parry_Codex)

- 무기마다 자세 하나와 피니셔 하나. 모든 자세의 이득을 동시에 더하지 않음
- 능력도 공용 게이지 하나. Arms Lore 0이면 기본 충전 60초, 15초 버프의 상시 적용 불가
- 무방패 기본 패링 장비: 양손 또는 Paired 무기. 일반 한손 무기와 빈 보조손은 기본 패링 불가
- Parry Codex 경험치는 양손 또는 방패 장비 조건. 한손과 빈 보조손에서도 코덱스 피해 저항만 적용되는지는 확인되지 않았다
- [Parry Dagger](https://wiki.uooutlands.com/Parry_Dagger)는 Shield item 취급. 별도 방패 예외로 구분

| 무기군 | 최대 성장에서 함께 비교할 공격 효과 | 단일 대상 피니셔와 능력 후보 | 무방패 패링 |
| --- | --- | --- | --- |
| [Dual Wielding](https://wiki.uooutlands.com/Dual_Wielding) | Shank 측후면 피해 +28%, 공속 +14%. Aggressive 특수 확률 +28%p | 측후면 Coup de Grace, Knave. 정면 En Garde, Knightly | Paired 가능 |
| [Wrestling](https://wiki.uooutlands.com/Wrestling) | Monkey의 연속 명중 콤보. 고방어 대상 Dragon의 AR 28 무시 | Chi Thrust. 마무리 Haymaker, 명중과 공속 Brawl, 특수타 Takedown | Paired 가능 |
| [Fencing](https://wiki.uooutlands.com/Fencing) | Blackguard 28% 확률로 200% 질병 피해, 20초 분산. Aggressive 공속 +17.5% | Assassinate 또는 Flurry. Swiftstrikes, 명중 충분 시 Gambit | 양손 가능 |
| [Swordsmanship](https://wiki.uooutlands.com/Swordsmanship) | 02.F절 Aggressive와 출혈, Flaying 비교 | Execute 또는 Bleed Out. Spinslash, Rend, Chop | 양손 가능 |
| [Mace Fighting](https://wiki.uooutlands.com/Mace_Fighting) | Sunder로 Pierce 25에서 60으로 강화. Aggressive 피해 +49% | Pierce 중 Shatter, 없으면 Pulverize. Pummel, Smash | 양손 가능 |
| [Throwing](https://wiki.uooutlands.com/Throwing) | Torrent의 공속 누적. Reaper는 주변 둘에게 각각 56% 추가 | 정지 대상 Hunter. 근접 거리 Clash, 이동 Blitz, 원거리 Hail Mary | 전부 한손, 빈 보조손이면 불가 |
| [Archery](https://wiki.uooutlands.com/Archery) | Arcane의 명중과 피해 +21%. 다수는 Incendiary | Pincushion. 정지 Full Draw, 즉시 Repeater | 양손 활 가능 |
| [Fishing](https://wiki.uooutlands.com/Fishing) | 육상 사용 가능. Snipe의 명중 +21%, 특수 확률 +14%p | 육상 단일 Run Through, Scourge | 양손 가능 |
| [Arcane](https://wiki.uooutlands.com/Arcane) | 최근 60초 내 바딩 시 Codex 자세, 피니셔, 능력 비활성화 | 바딩 유지 빌드의 비교 대상에서 제외 | 별도 스킬 요건도 필요 |

#### Paired의 즉시 피해와 초기화

> "Damage increased by 2% per rank and Attack Speed increased by 1% per rank" -- [Dual Wielding](https://wiki.uooutlands.com/Dual_Wielding), Shank

- Shank의 표 값은 측후면 두 배 보정 포함. 측후면 Coup de Grace는 400%에 400% 추가, Knave는 15초간 피해 +35%
- Paired는 02절의 현행 셋업 보너스. Shank가 콤보처럼 빗나감이나 대상 변경에 초기화되지는 않음
- Dual Norse Axes, 현재 스태미나 100, Anatomy 80, 음식 공속 5%, Shank 측후면이면 총 공속 33%, 간격 약 1.169초
  `15000 / (200 x 43) x (1 - 0.33)`. 다른 공속 보너스와 명중률, 피해량은 별도
- Wrestling의 기본 콤보는 같은 대상에 3연속 명중, 해당 타격 피해 +50%. Monkey는 4연속 명중과 추가 보너스 사용

> "Combo Strikes now require 4 hits, but receive an additional Damage bonus of 30% per rank" -- [Wrestling](https://wiki.uooutlands.com/Wrestling), Monkey

- Monkey 7랭크의 추가 보너스 210%. 기본 콤보 50%와 더한 해당 타격 보너스는 260%로 해석
- 빗나감, 대상 변경, 5초 공격 공백, 자세 변경으로 콤보 초기화. 실제 피해 합산 단계는 확인되지 않았다
- Stagger가 Monkey의 모든 콤보나 Lyric Aspect 프록을 강화한다고 계산하지 않음

> "15% \* (Wrestling Skill / 100)" -- [Wrestling](https://wiki.uooutlands.com/Wrestling), PvM Mana Refund

- Wrestling 80은 PvM 시전 마나 반환 확률 +12%. 빈손이나 주문서를 들고 시전할 때도 근접 방어 스킬로 사용
- 콤보 유지와 방어 전환은 별도 판단. Parry Codex와 Wrestling Codex는 다른 자세 선택, 레슬링 자세를 바꾸면 위 초기화 규칙 적용
- 서로 다른 레슬링 자세의 피해, 회복, 방어 효과가 전환 뒤 모두 남는다고 가정하지 않음

#### 지속 피해와 미공개 계산

> "200% Damage spread out over 20 seconds" -- [Fencing](https://wiki.uooutlands.com/Fencing), Blackguard

- 질병과 출혈은 개별 적용분 중첩. 죽기 전 해결되지 않은 틱과 몬스터의 Special Resistance는 손실
- Blackguard의 `28% x 200% = 56%`는 질병 전량 해결, 저항 0의 기대 추가 피해. 실제 사냥 DPS +56%라는 뜻은 아님
- 최초 타격에 적용한 Discordance와 피해 보정은 출혈, 질병, 피니셔 같은 2차 피해에 다시 곱하지 않음
- 피니셔의 정확한 평균 피해 정규화 함수와 일부 능력의 속도별 누적 공식은 공개 자료에서 확인되지 않았다
- 일반 근접 피해 보너스는 가산. 새 콤보와 특수타가 들어가는 세부 단계는 미확인 → 이 문서만으로 전 계열의 확정 DPS 순위 계산 불가
- 근거: [2026-05-30 패치](https://forums.uooutlands.com/index.php?threads/patch-notes-for-may-30-2026-mini-expansion-and-ossuary-4.6235/),
  [피해 해결 규칙](https://wiki.uooutlands.com/Armor_%26_Weapons#Damage_Resolution),
  [2026-08-11 패치](https://uooutlands.com/news/patch-new-treasure-resource-map-system-codex-loadouts-more/). 2026-10-27 확인

### <a id="02.H"></a>02.H PvM Hamstring

**Wrestling 80과 Anatomy 80이면 추가 스킬 없이 Hamstring 시도 자격 충족.**
공격 무기 스킬 80과 보조 목록의 두 스킬 조건을 동시에 충족하는 구성.
보조 목록과 공통 재사용 대기, 토글 명령은 [PvP](../game/pvp.md#03) 03절.

- 현재 9개 스킬을 각 80으로 둔 템플릿에서 Fencing 80과 Anatomy 80만으로는 보조 스킬 두 개 조건 미충족
- Tactics, Parrying, Healing은 그 보조 목록에 없음. 스킬 합계나 코덱스 해금 여부와 별개

> "Entangled for 6 seconds (cannot move, but may still do melee attacks, spells, and abilities)" -- [Hamstring](https://wiki.uooutlands.com/Hamstring), PvM

- 몬스터에게 성공하면 6초 이동 불가. 근접 공격, 주문, 능력 사용은 계속 가능
- Peacemaking이나 Hinder의 행동 봉쇄와 구별. Barding Break 중 추격 차단과 거리 확보에는 유용, 공격 자체를 멈추는 대체 피스는 아님
- 직접 피해 증가 효과는 명시되지 않음. 공격 유지와 회복 구간 확보의 이득으로 판단
- 위키 기준 2026-10-27 확인. Barding Break 중 실제 사용과 콤보 병행은 확인되지 않았다

::part[스킬]

## <a id="03"></a>03 Parrying

**PvP 주문은 패링 불가.** 크리처 주문은 패링 가능(03.B절). 메이지 PK 상대로는 피격 스태미나 감소 효과.
근접 PK나 무기 든 하이브리드 상대로는 Parrying 80 방패가 근접 데미지를 기대값 30% 감소.

> "Players may parry melee attacks with shields, two-handed weapons, paired weapons (wrestling/dual wielding) and parry daggers."
> "Chance to parry a melee attack is (50% \* (Parrying Skill / 100))"
> "Successfully parrying an attack from another player or creature will reduce its damage by 75%"
> "Successfully parrying an attack from another player, while wielding a two-handed weapon, will reduce its damage by only 50% however"
> "You cannot parry spells in PVP"
> "Provides a (50% \* (Effective Parry Skill / 100)) reduction to Stamina losses that occur due to taking damage"

| Parrying | 근접을 막을 확률 | 막으면 | 맞을 때 잃는 스태미나 |
| --- | --- | --- | --- |
| 80 | 40% | -75%(양손 무기면 -50%) | -40% |
| 100 | 50% | 같음 | -50% |

- 레슬링 무기는 무기표에 **2H** 표기 → PvP 패링 감소가 -50%로 줄어드는지는 확인되지 않았다

PvP 근접 데미지 기대 감소 = 막을 확률 × 감소율.

| Parrying | 방패, paired 무기 | 양손 무기 |
| --- | --- | --- |
| 80 | `40% x 75% =` **30%** | `40% x 50% =` 20% |
| 100 | `50% x 75% =` **37.5%** | `50% x 50% =` 25% |

### <a id="03.A"></a>03.A 패리 메이지가 있는 이유

목적은 주문 방어가 아니라 **근접 방어와 방패 착용**.

> "Players with both 80 Magery and 80 Parrying or greater may cast spells and meditate with a shield (meditation rate will still be affected by the shield's meditation penalty)" -- Parrying
> "Armor rating provided from shields is (50% \* Shield Base AR) + (50% \* Shield Base AR \* (Parrying Skill / 100))" -- Parrying
> "Hits from a Macing-skill weapon against another player have a (100% \* (Damage / 50)) chance to cause the player to lose 5 Stamina" -- Mace Fighting
> "Dexterity Penalties have been removed from armor and shields and replaced with a Stamina Fatigue Penalty that increases the amount of stamina the player loses when taking damage" -- Armor &
> Weapons

- 메이지는 **Magery 80과 Parrying 80이 모두 있어야 방패를 든 채 시전.** 방패 AR: Parrying 0이면 Base AR의 절반, 100이면 전부
- PvP: 덱서의 근접 방어, 피격 스태미나 감소. 스태미나 0이면 걷기(Hamstring 원문 "reduced to 0 Stamina ... forcing them to walk")
- PvM: 역할이 더 많음. 크리처 주문 패링(`25% x (Parrying / 100)`, -75%), Taunt, Parry Codex
- Parry Codex에는 Mirror("reduces Spell Damage taken by 6% per rank") 같은 스탠스. 단 Codex 문서는 PvM 분류, XP도 크리처 처치로만 → **PvP 적용 여부 미기재**
- 위키 메이지 템플릿 페이지에 패리 메이지 없음. Parry Codex를 요구하는 메이지는 New Player 페이지의 Arcane Mage 하나

### <a id="03.B"></a>03.B PvM과 Parry Codex

- Parry Codex 요구: printed Parrying 80, Tactics 또는 Wrestling 80. 백팩에 코덱스 필요
- 무기 코덱스 요구는 02.F절. Tactics 80이면 무기와 패링 코덱스의 공통 조건 충족, Arms Lore는 사용 조건 아님
- 양손 무기나 방패 착용 시 패링 코덱스 경험치 획득. Archery도 선택 가능한 [Basic Dexxer](https://wiki.uooutlands.com/TemplatesDexxer)에 Parrying과 Parry Codex 포함
- 방패나 양손 무기로 패링 가능 → Parrying을 골랐다고 근접 무기 전환이 필수는 아님
- 80은 사용 조건 충족값. 스킬을 올리면 패링 확률과 피격 스태미나 감소도 증가(03절)

크리처 주문 패링은 03.A절 공식. Parrying 80이면 `25% x 0.8 = 20%` 확률, 발동한 주문의 피해 -75%.
코덱스와 다른 보정을 제외한 평균 감소는 `20% x 75% = 15%`, 매번 75% 감소는 아님.

- Mirror는 주문, Warding은 독, 출혈, 질병 피해에 맞춘 자세. 한 번에 하나만 활성화
- Mirror를 Defensive Barding이나 printed Resist와 같은 효과로 취급하지 않음. Resist의 별도 PvM 효과는 04.A절
- 근거: [Parrying](https://wiki.uooutlands.com/Parrying), [Weapon and Parry Codex](https://wiki.uooutlands.com/Weapon_and_Parry_Codex), 2026-10-27 위키 확인. 인게임 효과는 확인되지 않았다

#### 양손 무기의 PvM 패링

- 크리처 근접 공격을 패링하면 방패와 양손 무기 모두 피해 -75%. 양손의 -50% 예외는 다른 플레이어의 공격에만 적용
- Parrying 80 양손도 PvM 근접 패링 기대 감소 30%. 방패의 추가 AR과 장비 셋업 보너스는 별도
- PvM 셋업 보너스: 한손 근접과 방패는 명중 +10%, 피해 저항 +10%. 양손 근접은 근접 피해 +25%
- 위 셋업은 축복되지 않은 무기 기준. 최종 DPS가 그대로 25% 증가한다는 뜻은 아님

#### Parry Codex 7랭크

> "Increases Damage Resistance by 2% per rank and reduces Spell Damage taken by 6% per rank" -- [Parrying](https://wiki.uooutlands.com/Parrying), Mirror

| 자세 | 7랭크 효과 | 조건 |
| --- | --- | --- |
| Mirror | 피해 저항 +14%, 받는 주문 피해 -42% | 주문 대응 |
| Warding | 피해 저항 +14%, 받는 독, 출혈, 질병 틱 피해 -42% | 상태 이상 대응 |
| Testudo | 피해 저항 +21%, 대상 정면이면 +42% | 대상의 정면 위치 필요 |
| Bulwark | 피해 저항 +35% | 3초 이상 제자리 유지 |

- 동시에 하나만 활성화. Mirror의 두 감소 항목을 단순 합산해 56%로 계산하지 않음
- Parrying 80은 사용 조건, 위 표는 코덱스 7랭크 효과. 스킬만 80으로 바꾼 즉시 얻는 수치 아님
- Parry Codex의 피해 저항은 방어 효과. 사냥 DPS 향상은 회복과 후퇴 감소로 공격 시간이 늘어나는 경우에 판단

## <a id="04"></a>04 Resisting Spells

**Resist는 PvP에서도 주문 데미지 감소(80이면 10\~30%).** Curse, Poison 같은 비데미지 주문도 가끔 막음, 서클이 높을수록 확률 하락.

> "Spell damage taken is reduced by a minimum of (12.5% \* (Magic Resist Skill / 100)) (PvM/PvP)"
> "Spell damage taken is reduced by a maximum of (37.5% \* (Magic Resist Skill / 100)) (PvM/PvP)"
> "The chance to resist any hostile spell with a non-damaging effect such as Curse or Poison is ((40% - (Spell Circle \* 5%)) \* (Magic Resist Skill / 100))"

위키 표 발췌. 서클 칸 = 비데미지 주문 저항 확률.

| Resist | 데미지 감소 | 1서클 | 2서클 | 3서클 | 4서클 | 5서클 | 6서클 | 7서클 | 8서클 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 80 | 10\~30% | 28% | 24% | N/A | 16% | 12% | 8% | 4% | N/A |
| 100 | 12.5\~37.5% | 35% | 30% | N/A | 20% | 15% | 10% | 5% | N/A |

- 서클(위키 Magery 주문표): Weaken 1, **Poison과 Telekinesis 3**, Curse 4, Paralyze 5, **Energy Bolt와 Explosion 6**, Mana Vampire 7
- 위키 표는 3서클 N/A, 본문은 3서클 Poison을 예로 듦 → 불일치. 확인되지 않았다
- Discordance, Peacemaking, Provocation 80, 80, 80 바드: **Defensive Barding이 켜지면 100 행, Heat of Battle 중이면 printed 행**.
  2020 패치의 `/ 3` 공식이라면 켜져 있어도 80 행([Barding](barding.md#02.I) 02.I절)

### <a id="04.A"></a>04.A PvM 흡수와 Spell Siphon

Resist 80을 빼면 일반 주문 감소 외에 다음 PvM 효과도 없어짐.
근거: [Resisting Spells](https://wiki.uooutlands.com/Resisting_Spells), 2026-10-27 위키 확인.

> "25% \* (Magic Resist Skill / 100)" -- Spell Absorption 확률
> "10% \* (Effective Magic Resist Skill / 100)" -- Spell Siphon 보너스

- Spell Absorption: Resist 80이면 크리처 주문 20% 확률로 흡수, 그 주문 피해 -75%
- Spell Siphon: Resist 80 기준 공속, 마나 반환 확률, 피해 저항 각각 +8%. 크리처 상대로만 적용
- 크리처와 환경 피해에 의한 시전 방해 회피도 Resist의 효과. 제거하면 함께 잃음
- Defensive Barding은 일반 PvM에서 발동하지 않고 Resist의 고유 PvM 보너스도 주지 않음([Barding](barding.md#02.I) 02.I절)
- Parrying의 크리처 주문 패링과 Resist의 Spell Absorption은 별도 효과. Resist 제거를 단순 중복 제거로 계산하지 않음

## <a id="05"></a>05 Tracking

**Tracking: PK를 먼저 보고 회피.** Tracking 80이면 판정 성공 시 야외 84타일, 던전 42타일 안의 숨지 않은 대상 표시.

> "A downside of Bard Templates is clear lack to fight back Pks / Griefers. Through Defensive Barding they are tough to kill but lack the offensive to fight back." -- TemplatesBard
> "Consider squeezing 80-100 Tracking into a template to passively track hostile players (PK's) so you can avoid them." -- TemplatesBard
> "On a successful tracking attempt, players can see a list of non-hidden targets within (20 + (80 \* (Tracking Skill / 100))) tiles"
> "Inside dungeons, this tracking distance is halved (20 + (80 \* (Tracking Skill / 100))) / 2 tiles"
> "Increases Effective Barding skill by (10 \* (Tracking Skill / 100))"
> "When attacking any creature add Base Weapon Damage \* (25% \* (Tracking Skill / 100)) supplemental bonus damage per weapon hit."
> "When attacking any player, add Base Weapon Damage \* (10% \* (Tracking Skill / 100)) supplemental bonus damage per weapon hit"

| Tracking | 탐지 거리, 야외 | 탐지 거리, 던전 | Effective Barding | 무기 딜, PvM | 무기 딜, PvP |
| --- | --- | --- | --- | --- | --- |
| 80 | 84 | 42타일 | +8 | +20% | +8% |
| 100 | 100 | 50타일 | +10 | +25% | +10% |

- 바드의 Effective Barding 보너스, Hunting이 바드 스킬 쿨에 끼치는 영향: [Bard Necro](../templates/bard-necro.md#04.E) 04.E절
- Tracking은 주문 데미지 보조 스킬이기도 함. 위키 예시는 Tracking 100을 +10%로 계산([PvP](../game/pvp.md#05) 05절)
- Hamstring 요구조건 두 번째 줄 목록에도 포함([PvP](../game/pvp.md#03) 03절)
- Hunting 모드 코드: `escape/tracking` 모듈. lumberjack-enhanced와 tamer-mage-enhanced 루프가 사용
- `config__tracking_color`: 1(기본값) murderer players, 2 회색 criminal, 3 주황 enemy, 4 셋 모두
- 옛 `script/archive/mining.razor`와 `script/archive/lumberjack.razor`는 `track_only_red_players` 하나로 murderer players와 all hostile players 중 선택

### <a id="05.A"></a>05.A Hunting 모드

**딜과 바딩 보너스는 Hunting 없이도 적용.** Hunting은 PK 조기 발견에만 필요.

> "Players can activate and deactivate a "Hunting" mode from the Tracking window to automatically make Tracking skill checks at various intervals (still requiring the normal 5 second skill cooldown)
> against a specific type of player/creature"
> "Players will always receive their bonuses to Damage and Barding Skill from the Tracking skill even if they are not currently Hunting"
> "Tracking success chance is (100% \* (Tracking Skill / 100))"

- 판정 한 번의 성공률: Tracking 80이면 80%
- **Hunting 자동 판정도 5초 스킬 쿨 사용.** 서버 스킬 게이트는 하나뿐([Barding](barding.md#01.J) 01.J절) → 다른 스킬과 충돌 가능
- 판정 빈도: Hunt Frequency. "New When No Arrow", "New When No Target"은 화살표가 없을 때만 판정
- 주변에 Murderer가 없으면 화살표도 없음 → 계속 판정

::part[기록]

## <a id="06"></a>06 자주 틀렸던 것

| 틀린 생각 | 사실 |
| --- | --- |
| 패링으로 PK 주문 방어 | **불가.** "You cannot parry spells in PVP". 패리 메이지의 목적은 근접 방어와 방패 시전(03절) |
| 레슬링 무기 데미지 4\~13 | **13\~31, 평균 22.** 무기표의 DiceMax(4)와 MinDmg(13) 칸을 데미지로 잘못 읽은 값(02절) |

## <a id="07"></a>07 참고 링크

- [Wrestling](https://wiki.uooutlands.com/Wrestling), [Mace Fighting](https://wiki.uooutlands.com/Mace_Fighting) -- 명중 공식, 레슬링 무기
- [Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons) -- 무기표, 명중 보너스 상한
- [Swing Speed](https://wiki.uooutlands.com/Swing_Speed) -- 기본 무기 피해와 간격, 공속 식
- [Arcane Staff](https://wiki.uooutlands.com/Arcane_Staff)
- [Alchemy](https://wiki.uooutlands.com/Alchemy) -- Sticky Potions, 포션 보너스
- [Meditation](https://wiki.uooutlands.com/Meditation)
- [Parrying](https://wiki.uooutlands.com/Parrying)
- [Swordsmanship](https://wiki.uooutlands.com/Swordsmanship), [Fencing](https://wiki.uooutlands.com/Fencing) -- PvM 무기 특수 효과와 코덱스
- [Weapon and Parry Codex](https://wiki.uooutlands.com/Weapon_and_Parry_Codex) -- 사용 조건, 경험치, 자세
- [Resisting Spells](https://wiki.uooutlands.com/Resisting_Spells)
- [Tracking](https://wiki.uooutlands.com/Tracking)
- [TemplatesBard](https://wiki.uooutlands.com/TemplatesBard)
