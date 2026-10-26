---
name: Bard Archer Enhanced
label: bard-archer-enhanced 루프
group: Loops
order: 20
---

Bard Archer 템플릿의 사냥 루프 `bard-archer-enhanced`의 블록 순서와 전환 규칙. 템플릿의 판단은 [Bard Archer](../templates/bard-archer.md), 아처리 규칙은 [Archery](../mechanics/archery.md).
인게임 확인은 [Open items](../questions/open-items.md#16) 16절.

정본은 레시피 [recipe/bard-archer-enhanced-recipe.razor](https://github.com/nomeehej/uoo/blob/master/recipe/bard-archer-enhanced-recipe.razor). 블록 동작은 각 모듈 파일 머리 주석.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 블록과 순서, 회복 정책, warmode 수동 구간 |
| [02](#02) | 여러 마리 판정. 자세와 피니셔 전환 규칙, 라벨 읽기, 명령 |
| [03](#03) | Virtuoso 유지 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

## <a id="01"></a>01 블록과 순서

| 자리 | 블록 | 값과 출처 |
| --- | --- | --- |
| base | | `warmode_is_manual` 1, `recover_in_warmode` 1, `settle_first` 1(bard-necro). `heal_skill_min` 10(skinning) |
| 패스 첫머리 | `bard/provo-picks` | `Z` 또는 `Shift+Space`로 등록하는 후보 입력, 바딩 대상과 독립. [Barding](../mechanics/barding.md#03.A) 03.A절 |
| 다쳤거나 독, 마비 | `recovery/cure`, `heal`, `bandage`, `light-heal` | 잃은 HP 기준 `heal_hits` 35, `emergency_hits` 45. 회복 정책은 아래 |
| 회복 다음 | `fight/rearm` | `rearm_graphic` 31186. 기억한 손이 비면 그 패스에 다시 듦, 요청 뒤 2초 지나 손 확인. 확인 항목은 [Open items](../questions/open-items.md#16) 16절 |
| 공용 | `fight/target`, `magery/reagents` | `acquire_range` 18, `target_range` 10, `target_grace` 500(bard-necro) |
| 5초마다 | `bard/instrument`, `recovery/refresh`, `buff/food`, `pack/gold-drop` | `refresh_stam` 60(skinning) |
| 하우스키핑 다음 | `buff/potions` | 교전 중 5초마다 검사, 마신 다음 패스는 바로([Combat](../mechanics/combat.md#02.D) 02.D절). 기준선 STR 120, DEX 100은 기본값 |
| 늘 | `bard/provo`, `fight/archery-codex` | 자세와 피니셔 전환(02절) |
| 교전 중 | `bard/disco`, `bard/peace`, `fight/weapon-ability` | `keep_virtuoso` 1. Archery 코덱스, Repeater, 사거리 8 |
| 이동 중 | `bard/song` | 기억한 적이 없을 때만. 노래 커서가 `lastharmful`을 백팩으로 옮겨 `V`가 빗나가는 것을 막음 |
| 늘 | `buff/spells` | RA 24, Reflect 34, Protection 26, 독이면 버프 안 함 |

- 교전 = 고른 적이 10칸 안. 바딩 사거리. 사격 사거리 8칸은 손으로 맞춤
- **바딩 우선순위: Provo, Disco, Peace.** Provo로 짝을 붙인 뒤 현재 대상에 Discordance, Peacemaking. bard-necro와 같은 순서. 코덱스 전환은 Provo와 Disco 사이
- 프로보 후보 입력과 짝 선택은 [Barding](../mechanics/barding.md#03.A) 03.A절, 인게임 확인은 [Open items](../questions/open-items.md#17) 17절
- 스킬별 쿨과 공유 쿨: [Barding](../mechanics/barding.md#01.E) 01.E절
- **평소 회복은 붕대.** 잃은 HP 35 이상이면 힐 포션, 그 패스에 포션을 안 마셨고 손실 45 이상이면 Greater Heal. 붕대 종료를 기다리지 않음
- 일반 Heal은 붕대 대체용으로 유지. 이 템플릿의 기본 설정에서는 붕대가 없고 감는 중도 아닐 때만 사용, 붕대 중첩 시전 없음
- `buff/spells`는 교전 중에도. 사격과 시전이 서로 안 막음([Bard Archer](../templates/bard-archer.md#01.A) 01.A절), 패스 끝에 둬서 바딩이 먼저
- warmode(수동 구간): 바딩, 노래, 버프, 음식 정지. 회복 시전, 포션, 붕대, 코덱스 전환, 무기 능력, 재장착은 계속

## <a id="02"></a>02 여러 마리 판정

- 현재 바딩 대상과 등록한 프로보 후보를 중복 없이 합쳐 마릿수 판정. 입력 방법은 [Barding](../mechanics/barding.md#03.A) 03.A절
- 2초마다 목록에서 살아 있고 10칸 안인 적을 셈. **둘 이상이면 Incendiary와 Ricochet**, 아니면 Arcane과 Pincushion
- 하나로 줄어도 6초 유지 → 짝 하나가 잠깐 멀어질 때 자세가 깜빡이지 않음
- 대상 옆 2칸 판정은 불가. 몹끼리 거리를 재는 식이 없음. 프로보 짝은 붙어 싸우므로 짝 중 하나를 쏘면 Incendiary가 다른 쪽에 감
- 다쳤을 때(Fowling)가 가장 먼저. 피니셔는 다쳤을 때도 마릿수로
- 전환은 코덱스 라벨로 지금 자세와 피니셔를 읽은 뒤에만. 명령이 켜고 끄는 토글이라 같은 것을 또 말하면 꺼짐
- 라벨에 자세 이름이 없거나 둘 이상이면 자세 전환을, 피니셔 이름이 없거나 둘이면 피니셔 전환을 그 Play 동안 멈춤(`[ archery stance, off ]`, `[ archery finisher, off ]`).
  라벨이 지금 것 하나만 보이는지는 확인되지 않았다
- 라벨은 2초 확인마다가 아니라 원하는 것과 기억한 것이 다를 때만, 3초에 한 번까지 읽음. 손으로 바꾼 것은 30초마다 기억을 지워 다시 읽음
- 명령: `[ArcheryAmmunition1`\~`5`(위키 순서 Arcane, Fowling, Incendiary, Longshot, Maiming), `[ArcheryFinisher1`(Ricochet), `[ArcheryFinisher2`(Pincushion). [Commands](https://wiki.uooutlands.com/Commands)
- 자세가 바뀌면 서버가 머리 위에 `Fowling ammunition` 같은 문장을 띄움 → 스크립트는 같은 알림을 다시 안 띄움([Overheads](../scripting/overheads.md#01.B) 01.B절)

## <a id="03"></a>03 Virtuoso 유지

- `bard/disco`의 `keep_virtuoso` 1: Virtuoso가 빠지면 이미 Discord 걸린 대상에게도 다시 Discordance
- 근거: Discord 걸린 대상에게 다시 성공해도 Virtuoso가 다시 생기고, 송으로는 안 생김([Barding](../mechanics/barding.md#02.G) 02.G절)
- 한 마리를 오래 잡으면 약 15초마다 Discordance. Music 5초를 쓰지만 Peace는 약 51초에 한 번([Bard Necro](../templates/bard-necro.md#01.D) 01.D절)이라 겹침이 적음
