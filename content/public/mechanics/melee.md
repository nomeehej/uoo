---
name: Melee
label: 근접 무기와 코덱스
group: Mechanics
order: 60
---

근접 피해, 현재 스태미나와 스윙, 방어구 계산, PvM 무기와 코덱스 비교.
붕대와 스탯 포션, Parrying, Resist와 Tracking은 [Combat](combat.md). PvP 명중률은 [PvP](../game/pvp.md#02) 02절.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 근접 반격력과 보조 피해 상한 |
| [02](#02) | 현재 스태미나와 무기 교체 |
| [03](#03) | 방어구 계산의 전제 |
| [04](#04) | PvM 무기와 코덱스 |
| [05](#05) | 무방패 최대 코덱스 비교 |
| [06](#06) | PvM Hamstring |
| [07](#07) | 자주 틀렸던 것과 출처 |

::part[근접]

## <a id="01"></a>01 근접 반격력

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
- 레슬링 무기를 들면 방패 불가. 패링은 무기 자체로([Combat](combat.md#03) 03절)
- 무장 해제 중 데미지: 원문 "Unarmed" 1-2. 플레이어 상대 맨손 1\~4와 어느 쪽이 맞는지는 확인되지 않았다
- Wrestling 개별 위키의 옛 양손 피해 +20%, Speed 50은 위 패치 전 값. 현행 Speed 45, Paired 셋업 공속 +10%. 양손 근접 피해 +25%와 중복 적용하지 않음


### <a id="01.A"></a>01.A 보조 피해 상한과 도끼

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

## <a id="02"></a>02 현재 스태미나와 무기 교체

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

- 방어구가 무거울수록 맞을 때 스태미나를 더 잃음. 위키 식이면 체인 한 벌 37.5%, 플레이트 한 벌 50%(페널티 합계는 [Combat](combat.md#01) 01절)
- Butler 화면은 절반이 아닌 합계 그대로(체인 75%, 플레이트 100%). 위키 본문의 체인 예시(80%)도 표와 다름 → 실제 값은 확인되지 않았다

## <a id="03"></a>03 방어구를 반영한 근접 계산

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
- AR은 부위 비율 없이 그대로 더함. 부위 비율은 마나 페널티([Combat](combat.md#01) 01절)에만
- 마법과 제작 보정: Defense +20%, GM과 Guarding +40%, Hardening +60%, Fortification +80%, Invulnerability +100%. 부서진 방어구는 AR 50% 감소

## <a id="04"></a>04 PvM 근접 무기와 코덱스

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

- 기본값은 01절 첫 표. 위키 표기 DPS 기준 2H Medium이 1H Light보다 약 7.8%, 2H Burst보다 약 11.4% 높음
- 위 차이는 기본 평타 비교. 최종 사냥 DPS나 처치 시간 차이 아님
- 1H와 2H의 셋업 보너스는 [Combat](combat.md#03.B) 03.B절. 서로 다른 명중과 피해 보너스를 빼고 실제 격차를 7.8%로 고정하지 않음
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

## <a id="05"></a>05 무방패 최대 코덱스 비교

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
| [Swordsmanship](https://wiki.uooutlands.com/Swordsmanship) | 04절 Aggressive와 출혈, Flaying 비교 | Execute 또는 Bleed Out. Spinslash, Rend, Chop | 양손 가능 |
| [Mace Fighting](https://wiki.uooutlands.com/Mace_Fighting) | Sunder로 Pierce 25에서 60으로 강화. Aggressive 피해 +49% | Pierce 중 Shatter, 없으면 Pulverize. Pummel, Smash | 양손 가능 |
| [Throwing](https://wiki.uooutlands.com/Throwing) | Torrent의 공속 누적. Reaper는 주변 둘에게 각각 56% 추가 | 정지 대상 Hunter. 근접 거리 Clash, 이동 Blitz, 원거리 Hail Mary | 전부 한손, 빈 보조손이면 불가 |
| [Archery](https://wiki.uooutlands.com/Archery) | Arcane의 명중과 피해 +21%. 다수는 Incendiary | Pincushion. 정지 Full Draw, 즉시 Repeater | 양손 활 가능 |
| [Fishing](https://wiki.uooutlands.com/Fishing) | 육상 사용 가능. Snipe의 명중 +21%, 특수 확률 +14%p | 육상 단일 Run Through, Scourge | 양손 가능 |
| [Arcane](https://wiki.uooutlands.com/Arcane) | 최근 60초 내 바딩 시 Codex 자세, 피니셔, 능력 비활성화 | 바딩 유지 빌드의 비교 대상에서 제외 | 별도 스킬 요건도 필요 |

#### Paired의 즉시 피해와 초기화

> "Damage increased by 2% per rank and Attack Speed increased by 1% per rank" -- [Dual Wielding](https://wiki.uooutlands.com/Dual_Wielding), Shank

- Shank의 표 값은 측후면 두 배 보정 포함. 측후면 Coup de Grace는 400%에 400% 추가, Knave는 15초간 피해 +35%
- Paired는 01절의 현행 셋업 보너스. Shank가 콤보처럼 빗나감이나 대상 변경에 초기화되지는 않음
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

## <a id="06"></a>06 PvM Hamstring

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

::part[기록]

## <a id="07"></a>07 자주 틀렸던 것과 출처

| 틀린 생각 | 사실 |
| --- | --- |
| 레슬링 무기 데미지 4\~13 | **13\~31, 평균 22.** 무기표의 DiceMax(4)와 MinDmg(13) 칸을 데미지로 잘못 읽은 값(01절) |

- [Wrestling](https://wiki.uooutlands.com/Wrestling), [Mace Fighting](https://wiki.uooutlands.com/Mace_Fighting) -- 명중 공식, 레슬링 무기
- [Armor & Weapons](https://wiki.uooutlands.com/Armor_%26_Weapons) -- 무기표, 명중 보너스 상한
- [Swing Speed](https://wiki.uooutlands.com/Swing_Speed) -- 기본 무기 피해와 간격, 공속 식
- [Arcane Staff](https://wiki.uooutlands.com/Arcane_Staff)
- [Swordsmanship](https://wiki.uooutlands.com/Swordsmanship), [Fencing](https://wiki.uooutlands.com/Fencing) -- PvM 무기 특수 효과와 코덱스
- [Weapon and Parry Codex](https://wiki.uooutlands.com/Weapon_and_Parry_Codex) -- 사용 조건, 경험치, 자세
