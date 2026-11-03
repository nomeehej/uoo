---
name: Tamer Mage Checks
label: 테이머 메이지 인게임 확인
group: Verification
order: 50
---

테이머 메이지 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |
| [02](#02) | 변경 경과의 위치 |

## <a id="01"></a>01 검사와 통과 기준

`combat/tamer-mage-enhanced` 지금 v6. 바뀐 동작은 [Module Migration](../history/module-migration.md#01.E) 01.E절.
새 파일 → Scripts 탭에서 Reload all scripts 뒤 Play로 먼저 확인, 핫키에 묶었으면 클라이언트 재시작([Workflow](../working/workflow.md#04.A) 04.A절). 핫키는 `Play Script: combat\tamer-mage-enhanced`.

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 버프 바, Bless | Bless 시전 | 아이콘 `Strength`, `Agility`, `Cunning` 셋. 시스템 메시지 `Your strength/dexterity/intelligence has changed by 11` | 인게임 확인됨 2026-10-09 |
| 버프 바, Arch Protection | Arch Protection 시전 | 아이콘 `Protection` | 인게임 확인됨 2026-10-09 |
| 스탯 포션 버프 이름 | 힘 포션과 민첩 포션을 마심 | 버프 이름에 Potion 없음 → 버프로는 Bless와 구분 불가 | 인게임 확인됨 |
| 수의사 키트 범위 | 키트 사용 | 나와 주변 팔로워를 함께 치료 | 인게임 확인됨 |
| 수의사 키트, 대상 없음 | 치료할 대상이 없거나 팔로워가 멂 | `You or your nearby followers do not require healing.`만 남고 미적용 | 인게임 확인됨 |
| 시작 | Play | Journal에 `Tamer mage enhanced v6 loaded` | 확인되지 않았다 |
| 키트, 다침 | 내 피가 1이라도 빠짐, 키트 진행 중 아님 | 바로 `[ vet, on ]` | 확인되지 않았다 |
| 키트, 진행 중 | `[ vet, on ]`부터 `[ vet, done ]`까지 | 재사용 없음, 끝나면 바로 다음 시도 | 확인되지 않았다 |
| 키트, 아무도 안 다침 | 나와 펫 모두 풀피 | `You or your nearby followers do not require healing.`이 약 2초마다 한 번. 더 잦거나 뜸하면 기록 | 확인되지 않았다 |
| 키트, 치료 중 | 키트로 치료 | 키트가 끊기지 않음 | 확인되지 않았다 |
| 키트, 기록할 것 | 거절, 키트 시간, 죽은 펫 | 거절 시 키트 소모 여부, 키트 시간이 실제 5초인지, 죽은 펫 부활 시도 기록 | 확인되지 않았다 |
| 키트 없음 | 키트 없이 실행 | `[ vet kit, out ]` | 확인되지 않았다 |
| 자기 버프 | 교전 중 아님(전투 대상이 10칸 밖이거나 없음), 워모드 꺼짐, `Cunning`과 `Protection` 아이콘 없음 | 커서에 자기 자신 지정, `Buff: Bless`와 `Buff: Arch Protection` 기록 | 확인되지 않았다 |
| 자기 버프 커서 | Bless와 Arch Protection 시전 | 커서는 Bless가 beneficial, Arch Protection이 neutral | 확인되지 않았다 |
| 자기 버프 재시전 | 아이콘이 뜬 다음 패스 | 같은 주문 재시전 없음 | 확인되지 않았다 |
| 자기 버프 만료 | 2분 뒤 아이콘이 사라짐 | 재시전 | 확인되지 않았다 |
| 펫의 Arch Protection | Arch Protection 뒤 펫 상태 | 펫도 Arch Protection을 받음 | 확인되지 않았다 |
| Bless 중 스탯 포션 | Bless가 걸린 채 전투 | 힘 포션과 민첩 포션이 한 번씩 나가고, 마신 뒤 5초마다 다시 눌리지 않음. 다시 눌리면 값이 높거나 포션이 +20이 아님 | 확인되지 않았다 |
| 포션과 Bless 겹침 | 포션(+20)과 Bless(+11)를 함께 | 안 쌓임, 120 | 인게임 확인됨 2026-10-21 |
| 포션 뒤 Bless | 포션이 끝난 뒤 `Cunning`이 남은 동안 | Bless의 힘과 민첩이 살아 있는지. 사라지면 그동안 Bless 재시전 없음 | 확인되지 않았다 |
| 저항 포션 버프 | 저항 포션을 마심 | 버프 바에 `Magic Resist Potion`. 판정은 아직 `findbuff "Magic Resist Potion"` | 확인되지 않았다 |
| Flamestrike 조건 | 전투 대상 10칸 안, 마나 51 이상, 워모드 꺼짐 | 그때만 시전 | 확인되지 않았다 |
| Flamestrike 대상 변경 | 시전 중 다른 몹을 V로 고름 | 커서 취소, 다음 패스에 새 대상으로 | 확인되지 않았다 |
| Flamestrike 대상 사망 | 시전 중 대상이 죽음 | 취소 | 확인되지 않았다 |
| Flamestrike 손실 | 손실 35 이상 | 시작하지 않음, 시전 중이면 끊음. aspect 발동 여부도 기록 | 확인되지 않았다 |
| 버섯 | 마나 55 이하, 쿨다운 끝 | 먹음 | 확인되지 않았다 |
| Create Food | 교전 중 아님, 마나 70 이상, 버섯 2개 미만 | Create Food 시전 | 확인되지 않았다 |
| Create Food 버섯 | Create Food 시전 | 실제로 버섯을 만드는지(Grimoire 단계) | 확인되지 않았다 |
| Tracking | 루프 실행 | 설정한 색 필터로 Hunting 켬. 감지는 프로필의 `[ track, … ]` 오버헤드로만 알림 | 확인되지 않았다 |
| Tracking 꺼짐 | Hunting이 꺼짐 | 5초마다 `[ track, check ]`. 귀환 없음 | 확인되지 않았다 |
| 이동 가드 | 걷는 중, `walk` 바가 도는 동안 | 시전 블록 대기, 포션은 걷는 중에도 나감. 회복 에이전트가 늦으면 기록 | 확인되지 않았다 |
| 걷는 중 Greater Heal, 가드 전 | 걷는 중 다침 | Greater Heal이 안 나감 | 인게임 확인됨 2026-10-20 |
| 긴급 Greater Heal | 달리며 피가 빠짐 | 긴급선 Greater Heal이 나감. 걸음에 끊기면 다음 패스에 다시 나감 | 확인되지 않았다 |

#### 메모

- 템플릿: Animal Lore, Animal Taming, Veterinary 120, Magery와 Tracking 100, Resisting Spells와 Meditation 80
- bard-necro-enhanced의 생존, 전투 대상, 타겟 주문 모양과 lumberjack-enhanced의 Tracking 설정 차용
- 펫 명령과 대상 지정은 수동. 워모드 ON → Flamestrike, Bless, Arch Protection, Create Food 정지
- 설계 근거는 위키. 수의사 키트(Veterinary Supplies)는 붕대처럼 5초 뒤 2칸 안의 내 펫 모두 치료
- 해독과 부활은 50%, 펫이 하나면 75%. 쓰면 진행 중인 붕대 취소([Veterinary](https://wiki.uooutlands.com/Veterinary))
- 사용자는 힐링 코덱스로 사거리 3을 늘려 5칸으로 사용
- Bless 9마나 2분, Arch Protection 11마나 2분. Arch Protection은 6칸 안 아군 모두의 AR 상승. Flamestrike 40마나([Magery](https://wiki.uooutlands.com/Magery))
- Razor `diffhits`는 내 체력만 읽음 → 펫 체력 기반 자동 GH 없음
- 주문 이름은 클라이언트 `spells.def`의 `Flamestrike`, `Bless`, `Arch Protection`, `Create Food`
- 위키 BuffIcons의 `Strength Potion Usage Cooldown`은 표의 라벨일 뿐
- Bless만 걸린 상태(기본 + 11)는 포션 기준값보다 낮음
- `config__str_potion`과 `config__dex_potion`은 내 기본 힘과 민첩 + 20. 이 루프의 120과 45는 이 템플릿의 STR 100, DEX 25, INT 100 기준
- 시전 블록이 `walk` 바 동안 대기하는 것은 bard-necro-enhanced와 같음

## <a id="02"></a>02 변경 경과

날짜별 기록은 [Verification History](../history/verification.md#05) 05절.
