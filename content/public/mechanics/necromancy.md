---
name: Necromancy
label: 네크로 메커니즘
group: Mechanics
order: 20
---

Vengeful Spirit 소환, 언데드, Unholy Symbol의 서버 규칙.
어떤 소환수를 고르는지는 [Bard Necro](../templates/bard-necro.md#03) 03절, 소환 블록은 [Bard Necro Summons](../loops/bard-necro-summons.md#01) 01절.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | Vengeful Spirit과 언데드 소환수, 소환 절차 |
| [02](#02) | Unholy Symbol 충전, 능력 우선순위와 응답 문장 |
| [03](#03) | 자주 틀렸던 생각 |
| [04](#04) | 출처 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

## <a id="01"></a>01 소환

### <a id="01.A"></a>01.A Vengeful Spirit

**언데드 소환수는 `Vengeful Spirit`을 켠 뒤 소환 주문 시전.** Spirit Speak만으로는 안 나옴.

> "For next 30 seconds all summon spells cast will instead create an Undead follower that loses 1% health &
> max health every 10 seconds but has damage increased by (20% \* (Necromancy / 100))"

| Magery 소환 | 언데드 |
| --- | --- |
| Fire Elemental | **Lich** |
| Earth Elemental | **Ancient Mummy** |
| Air Elemental | Skeletal Fiend |
| Water Elemental | Rag Witch |
| Summon Daemon | **Vampire Thrall** |
| Blade Spirits | Skeletal Husk |
| Energy Vortex | Jackal Spirit |
| Summon Creature | 무작위 언데드 |

- 8서클 소환은 모두 **마나 50, 시전 6.00초**, 시약 **Bloodmoss** 포함([Item list](../game/item-list.md#19) 19절)
- **타이머 없음. 대신 최대 체력이 10초마다 1%씩 감소 → 결국 쓸모없음.** 0은 안 됨(01.B절). 재소환은 "죽었을 때"가 아닌 주기적인 정비
- **`followers`는 컨트롤 슬롯 수.** 위 소환수는 각 **2**, Summon Creature는 1(인게임 확인됨).
  Skeletal Husk는 위키 데이터상 1([PvP](../game/pvp.md#06.B) 06.B절)
- Vengeful Spirit: 심볼 1개, 30초. 둘을 뽑으려면 30초 안에 VS, 소환, 소환
- Vengeful Spirit은 누르면 즉시 켜짐. 버프 아이콘 `Vengeful Spirit`, 응답 `Unholy symbols remaining: 9/10`. 인게임 확인됨 2026-10-18
- 소환에 커서 없음. 시전이 끝나면 바로 옆에 나옴. 인게임 확인됨 2026-10-18
- 소환수는 시전이 끝날 때 생김 → 그때 VS가 꺼져 있으면 언데드가 아닌 맨 엘리멘탈이 나올 수 있음(사용자 경고). 루프의 시작 마감은 [Bard Necro Summons](../loops/bard-necro-summons.md#03) 03절
- 소환수 놓기: `<이름> release`라고 말하면 즉시 사라짐. 확인 gump 없음, 야생으로 남지 않음, Dismissive 마나 없음. 인게임 확인됨 2026-10-18
- 팔로워가 꽉 찬 채 소환: 주문어 뒤에 `You have too many followers to cast that spell.` 인게임 확인됨 2026-10-18

### <a id="01.B"></a>01.B 소환 절차

- **`Vengeful Spirit`(심볼 1)을 켜고 30초 안에 소환 주문 시전.** 안 켜면 맨 엘리멘탈
- 8서클 → **마나 50, 시전 6초.** 둘이면 마나 100, 12초. 키는 Alt 숫자줄([Hotkeys](../game/hotkeys.md#01.B) 01.B절)
- 언데드는 **10초마다 남은 최대 체력의 1%씩 감소.** 복리라 30분 뒤에도 약 16% 남음, 0은 안 됨(인게임 관찰)
- 결국 쓸모없어짐 → 재소환은 죽었을 때의 대응이 아닌 **주기적인 정비**
- Lich 하나 = 슬롯 2. Lich 2마리면 `followers` 4

## <a id="02"></a>02 Unholy Symbol 경제

- 심볼: 5초에 1개, 최대 `Effective Necro / 10` = **10개**
- 30초 사이클에 6개 충전, 전투용 셋(4 + 2 + 2 = 8)을 다 쓰면 **사이클마다 2개 부족**
- → 개수가 되자마자 쓰지 않고 **위 능력의 몫을 남기고** 사용

| 능력 | 비용 | 발동 조건 | 남겨 두는 것 |
| --- | --- | --- | --- |
| **Blood Oath** | 4 | `>= 4` | 없음. 가장 먼저 |
| **Corpse Skin** | 2 | `>= 4`. 서 있고 warmode가 아닐 때 | 없음. Blood Oath와 같은 4 → 체인 순서가 우선순위 |
| Evil Omen | 2 | `>= 4`. 서 있고 warmode가 아닐 때 | 없음. 위 둘이 30초에 6개를 다 씀 → 사실상 이동 중 잉여로만 |
| Poison Strike | 1 | `>= 1`. Corpse Skin이 켜져 있고, 프록 코어와 필러 뒤 | 없음. 필러 자리, 위는 이미 사용 |
| Vampiric Embrace | 3 | `>= 9`. 이동 중에만 | 6 |
| Vengeful Spirit | 1 | `>= 1`. 소환수가 빠졌거나 교체할 때만([Bard Necro Summons](../loops/bard-necro-summons.md#03) 03절) | 없음. 빠진 소환수가 Blood Oath보다 큼 |
| Wither | 5 | 소환수가 빠지고 마나 20\~64일 때만. VS와 함께 `>= 6`, 우리 VS 창 처음 15초면 혼자 `>= 5`([Bard Necro Summons](../loops/bard-necro-summons.md#03) 03절) | 모으는 동안 위 능력 모두 정지(`var__hold_symbols`). 은행이 차면(10) 넘칠 몫만 허용 |

- **Necro 100에서 실제로 도는 것은 Blood Oath와 Corpse Skin.** 30초에 6개 충전, 둘이 정확히 6개 사용
- 셋 모두 4개에서 발동 → 체인 순서(Blood Oath, Corpse Skin, Evil Omen) = 우선순위
- Blood Oath 뒤 20초에 Corpse Skin, 그때부터 Poison Strike 열림. Evil Omen은 이동 중 잉여로만
- 문턱은 모두 `config__symbols_*` → 사냥터에 맞춰 조정. 전투가 짧고 이동이 길면 올리고, 은행이 늘 차 있으면 내림
- 2026-09-27 Corpse Skin, Evil Omen, Poison Strike, Vampiric Embrace 문턱을 6, 8, 9, 7에서 4, 4, 1, 9로 변경.
  이전에는 은행이 늘 찬 채로 Evil Omen과 Poison Strike가 거의 안 나가고, Poison Strike는 Corpse Skin을 오래 기다림

**우선순위 근거**(Necro 100).

|  | 효과 | 전체 딜 기여 |
| --- | --- | --- |
| Blood Oath | 팔로워 딜 **+30%** | 63% x 30% = **+18.9%** |
| Corpse Skin | 공격 주문마다 25% 질병 DoT | 37% x 25% = +9.3%, **자해 없음** |
| Evil Omen | 주문 +20%, 주문마다 25% 확률로 마나/2만큼 자해 | 37% x 20% = +7.4%, 자해 있음 |

- **Corpse Skin이 Evil Omen보다 위.** 보너스가 크고 대가 없음. **둘은 동시 유지**(인게임 확인됨)
- **Corpse Skin과 Evil Omen은 걷는 중(`cooldown "walk"`)과 warmode에는 안 씀.** warmode는 수동 모드, 게이트가 `not warmode`를 직접 읽음
- 둘 다 루프의 주문이 있어야 값을 함. 걷는 동안은 공격 주문이 안 나가 지속시간만 흐름 → 멈춰서 다시 칠 때 프록과 함께 열리게
- Blood Oath는 소환수 몫 → 걷는 중에도 warmode에서도 사용

> "Target a creature that you have applied Poison or Disease onto to resolve up to 3 Poison ticks and up to 8 Disease ticks remaining at (100% \* (Necromancy / 100)) normal damage."
> -- 위키 Necromancy, Poison Strike

> "For next 30 seconds any damaging spell will apply a Disease effect dealing damage of (25% \* (Necromancy / 100)) over 30 seconds" -- 위키 Necromancy, Corpse Skin

> "30 second cooldown in between uses of the same Necromancy ability" -- 위키 Necromancy

> "Player takes 10 damage and for next 30 seconds gains (30 \* (Necromancy / 100)) mana"
> "that can only be spent on non-damage causing spells" -- 위키 Necromancy, Wither

- **Wither 마나로 소환 가능.** 마나 약 25에서 Wither → VS → Water Elemental 소환 성공. 인게임 확인됨 2026-10-18
- Wither의 응답과 버프 아이콘은 VS와 같은 모양: `Unholy symbols remaining`, 버프 `Wither`. 인게임 확인됨 2026-10-18
- Necro 100 → 마나 30. 50짜리 소환 하나분 → Wither 한 번에 소환 하나

- **Poison Strike**: Corpse Skin의 질병 틱 최대 8개, 독 3개를 한 번에 터뜨림. 곧 죽을 몹에서 함께 사라질 딜을 회수. 마나가 안 들어 **필러 자리**
- 질병은 공격 주문마다 하나 → **프록 코어 네 개와 필러 Energy Bolt 한 방 뒤에** 터뜨림(4 + 1 = 5개)
- Magic Arrow 하나 뒤에 쓰면 쌓이던 스택 낭비. 순서 유지 방법은 [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.A) 01.A절
- 질병 하나의 틱 수는 확인되지 않았다. 하나에 틱이 여러 개면 다섯 스택보다 적어도 8틱이 참

**능력의 응답 문장.** 루프는 결과를 이 문장으로 판정. 거절당하면 30초 창을 다시 세우지 않음.

| 문장 | 뜻 | 루프의 처리 | 확인 |
| --- | --- | --- | --- |
| `unholy symbols remaining` | 사용함 | 그 능력의 타이머를 0, 30초 뒤 재사용 | 성공 오버헤드가 여기서 뜸 |
| `seconds before you may use that ability again.` | 아직 쿨 | 타이머를 0. 대개 성공 줄이 늦게 온 사용의 답이라 30초가 맞음 | 확인되지 않았다 |
| `You do not have a poison or disease effect on that target.` | Poison Strike. 대상에 독도 질병도 없음 | `var__proc_target`을 비우고, 다음 프록이 그 몹에 갈 때까지 대기 | 인게임 확인됨 2026-09-28 |
| `You do not see any corpses near that location.` | Vampiric Embrace. 닿는 시체 없음 | `interval__embrace_miss`(5초) 뒤 재사용 | 인게임 확인됨 2026-09-28 |

- **넣지 않은 것**: Strangle(4)은 Blood Oath와 심볼 경쟁, 모든 딜을 5초 늦춤. Pain Spike(5)는 **다음 몹 옆에** 시체 필요
- Wither(5)는 비공격 주문용 마나만 → 소환에만 씀([Bard Necro Summons](../loops/bard-necro-summons.md#03) 03절)
- **핫바의 Auto-Renew는 모두 끔.** 게임이 같은 심볼을 쓰고 우선순위가 <strong>"least expensive first"</strong>
  → 이 빌드와 정반대, Blood Oath가 맨 마지막
- 핫바에서 심볼 수를 읽는 방법: [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.H) 01.H절

::part[기록]

## <a id="03"></a>03 자주 틀렸던 것

| 틀린 생각 | 사실 |
| --- | --- |
| Vampire Thrall은 근접 딜러 | **주문 딜러.** "Spell Damage: 26 - 32" |
| Fury는 분당 5% | **30초당 5%, 최대 +30%.** 3분이면 상한 |
| Spirit Speak만 있으면 언데드 소환 | **Vengeful Spirit을 먼저 켜야 함.** 주문별 언데드는 01.A절 표 |
| `followers`는 소환수 마릿수 | **컨트롤 슬롯 수.** Lich 2마리 = 4 |
| 소환수는 맞지 않으면 그대로 | **10초마다 최대 체력 1%씩 감소.** 0은 안 되지만 쓸모없어짐 → 재소환은 주기적(01.B절) |

## <a id="04"></a>04 참고 링크

- [Spirit Speak](https://wiki.uooutlands.com/Spirit_Speak)
- [Summoner's Tome](https://wiki.uooutlands.com/Summoner%27s_Tome)
- [Status Effects](https://wiki.uooutlands.com/Status_Effects) -- Hex 같은 상태 효과
- [Ancient Mummy](https://wiki.uooutlands.com/Ancient_Mummy)
- [Rag Witch](https://wiki.uooutlands.com/Rag_Witch)
- [Skeletal Fiend](https://wiki.uooutlands.com/Skeletal_Fiend)
- [Lich](https://wiki.uooutlands.com/Lich)
- [Vampire Thrall](https://wiki.uooutlands.com/Vampire_Thrall)
- [Earth Elemental Tome Upgrades](https://wiki.uooutlands.com/Template%3ASummonersTomeEarthElemental)
- [Air Elemental Tome Upgrades](https://wiki.uooutlands.com/Template%3ASummonersTomeAirElemental)
- [Fire Elemental Tome Upgrades](https://wiki.uooutlands.com/Template%3ASummonersTomeFireElemental)
- [Daemon Tome Upgrades](https://wiki.uooutlands.com/Template%3ASummonersTomeDaemon)
