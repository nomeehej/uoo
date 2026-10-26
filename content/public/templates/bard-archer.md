---
name: Bard Archer
label: Bard Archer 핸드북
group: Templates
order: 30
---

Bard Archer 템플릿의 판단과 숫자. 바딩, 회복, 버프는 루프, 사격은 손.
아처리 규칙은 [Archery](../mechanics/archery.md), 바드 메커니즘(쿨, 송, Ensemble, Virtuoso)은 [Barding](../mechanics/barding.md), 방어구와 마나 재생, 붕대, AR은 [Combat](../mechanics/combat.md) 01절과 02절.
루프의 블록 순서와 전환 규칙은 [Bard Archer Enhanced](../loops/bard-archer-enhanced.md).
**숫자는 추측 금지.** 인용과 확인 표시: [Workflow](../working/workflow.md#01.C) 01.C절.

- 캐릭터 `nomeehej`, Razor 프로필 `bard`
- 사냥: `script/combat/bard-archer-enhanced.razor`(F1). PK: `script/combat/pvp.razor`(F4)
- 2026-10-21 설계. bard-necro-enhanced와 summoner 프로필은 그대로 둠
- 2026-10-22 아처리 규칙과 루프 설계를 [Archery](../mechanics/archery.md), [Bard Archer Enhanced](../loops/bard-archer-enhanced.md)로 분리

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 스킬, 스탯, 코덱스, 갑옷과 마나 |
| [02](#02) | 부활 |
| [03](#03) | bard 프로필 |
| [04](#04) | 출처 |

이 문서에 걸린 질문과 인게임 확인은 [Open items](../questions/open-items.md#16) 16절.

::part[캐릭터]

## <a id="01"></a>01 캐릭터

### <a id="01.A"></a>01.A 스킬과 스탯

| 스킬 | 값 |
| --- | --- |
| Provocation, Peacemaking, Discordance | 80 |
| Musicianship | 0. Bard Codex `Self Taught` T2가 대체([Barding](../mechanics/barding.md#02.G) 02.G절) |
| Anatomy, Healing | 80 |
| Magery | 80 |
| Tactics, Archery | 80 |
| Resisting Spells | 80 |

- 합 720. 스탯 STR 100, DEX 80, INT 45. 교전 중 Greater Strength, Greater Agility 포션 → STR 120, DEX 100
- 무기: Rampart Crossbow. 2H, Speed 20([Archery](../mechanics/archery.md#01) 01절)
- **공격은 손.** `Z`(가장 가까운 몹)나 `Q`(Set Last Target Harmful)로 고르고 `V`(Attack Last Target)
- 루프가 맡는 것: 바딩, 회복, 자기 버프, 코덱스 자세와 피니셔 전환, 무기 능력 요청([Bard Archer Enhanced](../loops/bard-archer-enhanced.md))
- **warmode는 Tab으로 직접.** 켜면 손으로 바딩하는 구간 → 루프의 바딩, 노래, 버프, 음식 정지([Bard Archer Enhanced](../loops/bard-archer-enhanced.md#01) 01절). `Z`, `V`는 warmode를 안 바꿈
- 바딩, 시전과 사격은 서로 안 막음. 인게임 확인됨 2026-10-21
- 시전하면 무기가 백팩으로 떨어짐. 인게임 확인됨 2026-10-21 → 왼손이 비면 루프가 그 패스에 석궁을 다시 듦([Bard Archer Enhanced](../loops/bard-archer-enhanced.md#01) 01절)

1H 석궁과 Rampart Crossbow. 2026-10-23 Player Stats Profile(Show Stats vs Monsters), 같은 장비에 무기만 바꿈.

| 항목 | 1H 석궁 | Rampart Crossbow |
| --- | --- | --- |
| Swing Delay | 2.97초 | 4.16초 |
| Accuracy (vs 100 Skill) | 127%. 셋업 20%, 재질 8%, Aspect 38%, Arcane 21% | 111%. 재질 12%, Aspect 38%, Arcane 21% |
| Damage (vs 0 AR) | 65.2\~152.2, 평균 108.7 | 86.2\~228.3, 평균 157.3 |
| 평균 피해 / 간격 | 36.6 | **37.8** |
| Weapon Finisher Chance | 37.29% | 52.20% |

- **Rampart 유지.** 둘 다 방어 100에 명중 100% 초과 → 남는 명중은 피해가 아님. 모두 맞히면 2H가 3% 높음
- 피니셔는 발동까지의 시간이 같고 피해는 2H가 1.45배([Archery](../mechanics/archery.md#03) 03절)
- 명중 보너스는 %p 가산([PvP](../game/pvp.md#02.D) 02.D절). 2H가 100% 밑으로 내려가는 방어 스킬은 약 157, 1H가 앞서는 것은 약 183부터.
  화면의 40%를 02.A절 식으로 늘린 추정, 디스코로 깎기 전
- 화면의 간격은 찍을 때 현재 스태미나 약 50 기준(Swing Speed 17%로 역산). 두 무기 비율은 같음

### <a id="01.B"></a>01.B 코덱스

Bard Codex 20점. 효과 원문과 티어별 값은 [Barding](../mechanics/barding.md#02.G) 02.G절.

| 업그레이드 | 점수 | 이 템플릿에서 |
| --- | --- | --- |
| Ensemble | 5 | Discord와 Peace나 Provo가 함께 걸린 대상에 +40% |
| Perfect Pitch | 5 | 바딩 성공률 +30% of normal |
| Virtuoso | 5 | 성공한 바딩 뒤 15초, 바딩한 대상에 피해와 저항 +20%(세 스킬 80) |
| Self Taught | 3 | Musicianship 80 대체 |
| Refrain | 1 | Barding Break 4% 무시 |
| Revolution Song | 1 | 프로보한 몹의 피해 +40% |

- bard-necro의 배분([Bard Necro](bard-necro.md#02.B) 02.B절)과 다른 이유: 거기는 소환수가 딜의 63%. 여기는 딜 전부가 본체 → 본체 몫인 Ensemble, Virtuoso를 T3
- Refrain 1과 Reverb 1은 둘 다 4% 수준, 차이 미미
- Sing Your Own Praises 제외: 테이머와 다니면 그쪽 펫이 받는 내 송 효과가 줄어듦
- Virtuoso는 15초마다 다시 성공해야 유지 → 루프가 Discordance로 갱신([Bard Archer Enhanced](../loops/bard-archer-enhanced.md#03) 03절)

Archery Codex: 자세 다섯 모두 7랭크, 피니셔 둘 5티어, 능력 셋. 고르는 기준은 [Archery](../mechanics/archery.md).

Healer's Codex 20점: Immunize 5, Triage 5, Self Treatment 5, Specialist 5.

> "Patients for the next 15 seconds have a 100% chance for new poisons to apply at 1 level lower, and for new Bleed and Disease effects to be applied at 40% reduced damage
> (cannot stack)" -- Immunize T3, Healer's Codex 화면
> "Patient receives a (3% / 9% / 15%) bonus to damage resistance while in the process of being healed with bonus doubled if patient is below 33% health (cannot stack)" -- Triage
> "Reduces time needed to bandage self by (0.75 / 2.25 / 3.75) seconds (will not apply to veterinary supplies)" -- Self Treatment
> "Increases patient healing amounts and chance to cure or resurrect by (8% / 24% / 40%) of normal" -- Specialist

- 요구: Healing, Anatomy 각 80
- Immunize가 Combat Medic보다 나음: 고렙 던전일수록 상태 이상이 많음. 사용자 판단 2026-10-21
- Self Treatment: 자기 붕대 DEX 100에서 10초 → 6.25초, DEX 80에서 11.3초 → 7.6초([Combat](../mechanics/combat.md#02.C) 02.C절의 식)
- Specialist: 부활 확률 1.4배(02절)
- **몹 상대로만.** "will only apply for the patient against creatures"([Healing](https://wiki.uooutlands.com/Healing)) → PvP에서 Triage, Immunize 효과 없음

### <a id="01.C"></a>01.C 갑옷과 마나

재생 식과 갑옷별 간격은 [Combat](../mechanics/combat.md#01) 01절, AR 표는 [Combat](../mechanics/combat.md#02.E) 02.E절. 아래는 음식 버프 +25%를 넣은 값.

- Meditation 0, INT 45 → 최대 마나 45
- 유지 버프: Reactive Armor 4, Magic Reflection 14, Protection 6. RA와 Reflect는 쓰여 없어질 때까지, Protection은 2분
- Protection: "Increases caster's Armor Rating by (15 \* (Magery / 100)) for 2 minutes" → Magery 80이면 AR +12([Template:SpellCircles](https://wiki.uooutlands.com/Template:SpellCircles))

마나로 AR을 사는 값. 120초 기준, 체인 한 벌에서 출발.

| 사는 것 | AR | 120초에 드는 마나 | 마나 1당 AR |
| --- | --- | --- | --- |
| Protection | +12 | 6. 시전 비용 | 2.0 |
| 체인 → 플레이트, 머리, 목, 장갑만 | +3(NPC 표) | 1.6 | 1.9 |
| 체인 → 플레이트 한 벌 | +8.2(Butler bronze) | 5 | 1.6 |
| 체인 → 플레이트, 가슴, 다리, 팔 | +4(NPC 표) | 3.4 | 1.2 |

- Butler 화면의 bronze 한 벌 AR: 체인 71.8, 플레이트 80. 2026-10-21 사용자 화면
- **고른 조합: 체인 + Protection.** AR 83.8 > 플레이트 한 벌 80, 재생은 120초에 30. Protection 6을 빼면 24 → Reflect 한 번(14)과 RA 두 번(8)
- 섞을 수 있으면 머리, 목, 장갑만 플레이트. 가슴, 다리, 팔은 마나 대비 AR이 가장 비쌈
- bronze, GM 보정은 갑옷 AR에만 붙고 Protection에는 안 붙음 → 실제로는 플레이트 작은 부위가 Protection보다 조금 나을 수 있음
- **Bless는 루프에서 뺌.** 포션과 안 겹쳐 남는 것은 최대 마나 +8.8뿐([Combat](../mechanics/combat.md#02.D) 02.D절). 2분마다 9마나. 부활 직전에 손으로(02절)
- 시전 문턱: RA 24, Reflect 34, Protection 26. Greater Heal 11과 Telekinesis나 Teleport 9의 20을 남김. skinning-enhanced와 같은 방식
- **Lyric Aspect 방어구.** bard-necro는 Lyric 방어구로 Effective Barding 170, 벗으면 136([Barding](../mechanics/barding.md#02.C) 02.C절).
  체인으로 바꾸며 Lyric을 유지하는지 확인되지 않았다 → 송 메시지가 `8.5%`면 170, `6.8%`면 136

### <a id="01.D"></a>01.D 무방패 무기 전환 검토

2026-10-27 비교 조건: 일반 몬스터 한 마리당 약 30\~60초, Barding Break가 잦음, Lyric 무기 15, 방패 제외.
Archery 자리의 무기 스킬 80과 Resisting Spells 자리의 Parrying 80을 비교, 나머지는 01.A절 배분.
모든 무기 코덱스의 자세 7랭크, 피니셔 5티어, 능력 전체 해금 가정.

- **Wrestling과 Fencing 중 추천 검토안: Wrestling 80과 Parrying 80. 무기는 Fistblade, Cestus, Martial Manual 중 선택**
- 같은 몹을 오래 치며 콤보를 유지하고, Hamstring과 시전 중 방어, 마나 반환을 회복에 활용하는 선택
- Hamstring 자격과 몬스터 이동 봉쇄의 범위는 [Combat](../mechanics/combat.md#02.H) 02.H절. 직접 피해 증가로 계산하지 않음
- 전환 템플릿은 [Bard Wrestling](bard-wrestling.md), 구현한 자동 선택은 [Bard Wrestling Enhanced](../loops/bard-wrestling-enhanced.md#02) 02절
- Fencing Blackguard도 이 처치 시간에서는 유력. 후퇴 중에도 기존 질병은 계속 해결되므로 공격 공백이 길면 다시 비교
- 선택 기준은 공격 유지와 생존, 회복을 합친 사냥 운용. 둘 중 인게임 DPS 1위는 확인되지 않았다
- 최대 효과와 미공개 계산, 자세 변경의 초기화는 [Combat](../mechanics/combat.md#02.G) 02.G절

## <a id="02"></a>02 부활

**손으로.** 루프에 없음. 붕대 먼저, 마나가 차면 스크롤.

| 방법 | 성공 | 시간 | 비용 |
| --- | --- | --- | --- |
| 붕대 | 시도당 33.6% | DEX 100에서 시도당 5초, 평균 약 15초 | 붕대 |
| Resurrection 스크롤 | 늘 성공 | 시전 5초 | 50마나, Bless 9, 스크롤 |

- 붕대: Healing 80의 24%([Combat](../mechanics/combat.md#02.C) 02.C절) × Specialist 1.4 = 33.6%. 11번(56초) 연속 실패할 확률 1.1%
- 스크롤: Magery 80은 8서클 최소치, 스크롤이 실효 Magery +20 → 100 → 늘 성공

> "Min Required to Cast - 80 Magery" / "100% Success to Cast - 100 Magery" -- Magery, 8서클
> "Casting a spell from a scroll increases a player's Effective Magery skill by 20" -- Magery

- INT 45 → 최대 마나 45 < 50 → Bless(+8.8) 뒤에만 가능
- 45에서 Bless 9 → 36. 50까지 14 → 체인에 음식이면 4초에 1, 56초. 음식 없이 70초
- → 붕대를 시작하고 그사이 Bless. 56초 동안 붕대가 못 살리면 스크롤. 스크롤은 보험

## <a id="03"></a>03 bard 프로필

- `summoner`를 복사한 `bard`. nomeehej의 에이전트, 정리 목록, 컨테이너 변수를 그대로 가져옴
- 다른 점: 아랫줄은 basic식(`Z` 가장 가까운 몹, `V` Attack Last Target, `X`, `C` 플레이어), F1 = `combat\bard-archer-enhanced`, Alt 소환 줄 없음
- 같은 점: `1 2 3` Disco, Peace, Provo, `Shift+Z` 다음 몹, `Shift+Space` 프로보 후보, Q와 E, Ctrl 버프 줄, F4 pvp
- 키 배치의 정본: [Hotkeys](../game/hotkeys.md) 01.E절, 03절

::part[기록]

## <a id="04"></a>04 출처

- [Healing](https://wiki.uooutlands.com/Healing): Healer's Codex, 부활 확률
- [Magery](https://wiki.uooutlands.com/Magery), [Template:SpellCircles](https://wiki.uooutlands.com/Template:SpellCircles): 서클별 성공 기준, 스크롤, Protection, Bless
- [outlandsbutler.com](https://www.outlandsbutler.com/): 장비 AR과 마나 재생 계산. 2026-10-21 사용자 화면
