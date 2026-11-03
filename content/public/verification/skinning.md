---
name: Skinning Checks
label: 칼질 루프 인게임 확인
group: Verification
order: 40
---

칼질 루프 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |
| [02](#02) | 변경 경과의 위치 |

## <a id="01"></a>01 검사와 통과 기준

`gather/skinning-enhanced` 지금 v11. Two-Handed Axe를 쓰는 Magery 80 덱서용 던전 근접 루프. 칼질 규칙은 위키 [Forensic Evaluation](https://wiki.uooutlands.com/Forensic_Evaluation) 기준.
반영은 Scripts 탭에서 Reload all scripts → Play로 먼저 확인. 핫키에 묶었다면 클라이언트 재시작([Workflow](../working/workflow.md#04.A) 04.A절).

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 시작 | Reload all scripts → Play | Journal에 `Skinning enhanced v11 loaded` | 확인되지 않았다 |
| 파란 시체 grey | 파란 시체 | `[ loot, crim ]`이 뜨지만 아이템을 가져가야만 grey | 인게임 확인됨 2026-10-06 |
| 2칸 시체 검색 | 2칸 거리의 시체 | 검색됨 | 인게임 확인됨 2026-10-06 |
| ignore한 시체 | 시체를 ignore | clearignore 전까지 findtype에서 빠짐 | 인게임 확인됨 2026-10-06 |
| lasttarget 변경 | 치는 중 lasttarget이 바뀜 | 지금 치는 대상은 불변(bard-mace 경험). 칼질이 문제가 되는 것은 다음 V 한 번 | 인게임 확인됨 2026-10-06 |
| 직접 타겟 칼질 | v3, 시체 직접 타겟 | Journal에 `You carve materials from the corpse.` | 인게임 확인됨 2026-10-07 |
| Sanctuary 파란 시체 | Sanctuary Dungeon의 파란 시체 칼질 | `Criminal actions are not permitted in the Sanctuary Dungeon.`으로 거절 | 인게임 확인됨 2026-10-07 |
| 일반 던전 grey | 일반 던전의 파란 시체 | 아이템을 가져가야만 grey | 인게임 확인됨 2026-10-07 |
| 파란 플레이어 시체 | v6이 파란 플레이어 시체 `the remains of Leap Day William`을 직접 지정 | `You have committed a criminal act! (corpse carving onLeap Day William).`로 범죄 판정. 몬스터 시체 이름은 `aged earth corpse`처럼 "…corpse" | 인게임 확인됨 2026-10-07 |
| 직접 지정 응답 | v8, 직접 지정 뒤 응답 읽기 | `That corpse has already been carved.` → 끝난 시체. `That is too far away.`와 `You must wait to perform another action.` → 한 번 더 시도할 시체 | 인게임 확인됨 2026-10-07 |
| `setlasttarget` 복원 | v3의 `setlasttarget` 복원 | Set Last Target 커서를 띄워 스크립트 정지([Razor](../scripting/razor.md#03) 03절) | 인게임 확인됨 2026-10-07 |
| 늦은 V | Z로 몹을 고른 뒤 V를 늦게 | 그 사이 `Carve request` 없음, V가 그 몹을 침. `Target a new 'Last Target'` 커서가 뜨거나 V가 시체나 나를 치면 실패 | 확인되지 않았다 |
| 처치 뒤 칼질 | 몹이 죽음 | 약 1.2초 뒤부터 주변 시체 칼질 | 확인되지 않았다 |
| 칼 커서 중 Z | 칼 커서가 떠 있을 때 Z | 커서 취소, 시체는 전투 뒤 다시 요청 | 확인되지 않았다 |
| Sanctuary 거절 뒤 | Sanctuary Dungeon에서 파란 시체를 한 번 요청 | 프로필의 `[ crim, blocked ]`와 Journal의 `Carve mode: grey corpses only`, 5분 동안 Smart Harvest만. 같은 파란 시체를 다시 요청하면 실패 | 확인되지 않았다 |
| 일반 던전 칼질 | 일반 던전의 파란 시체 | 거절 없이 칼질 | 확인되지 않았다 |
| 칼질 결과 오버헤드 | 칼질, 이미 깎은 시체, Smart Harvest가 깎을 시체를 못 찾음, 범죄 판정 | 차례로 `[ carve, done ]`, `[ corpse, carved ]`, `[ corpse, out ]`, `[ crim, on ]`, 모두 프로필에서. 스크립트가 같은 문장을 다시 띄우면 실패 | 확인되지 않았다 |
| 칼 커서 | 칼 사용 | 스크립트는 칼을 쓴 뒤 2초 안에 온 중립 커서에만 응답. 중립이 아니거나 2초 뒤에 오면 커서가 남아 회복과 칼질 모두 정지 → 실패, 남은 커서는 직접 닫음 | 확인되지 않았다 |
| 직접 타겟, 요청 줄 | `skin_unowned` 1, 시체 칼질 | 시체마다 `Carve request: corpse=...` 한 줄과 서버 응답 기록 | 확인되지 않았다 |
| 직접 타겟, 몬스터 시체 | 회색과 파란 몬스터 시체 | 칼질 | 확인되지 않았다 |
| 직접 타겟, 플레이어 시체 | 플레이어 시체 | `Carve skip: ... label=the remains of ...` 뒤 요청 없이 건너뜀. 플레이어 시체를 지정하거나 `You have committed a criminal act`가 다시 뜨면 실패 | 확인되지 않았다 |
| 직접 타겟, 라벨 | 인간 NPC 시체와 건너뛴 몬스터 시체 | 라벨 기록. 라벨이 늦게 와 비어 있으면 몬스터 시체도 건너뜀 | 확인되지 않았다 |
| 직접 타겟, 결과 줄 | 요청마다 | `Carve done`, `Carve miss`, `Carve refused`, `Carve no reply` 중 하나 | 확인되지 않았다 |
| 직접 타겟, 재시도 | 너무 멀거나 바쁜 시체 | 한 번 더 요청(`One more try`), 두 번째도 실패면 `Skipped`. 같은 시체 세 번 이상 지정은 실패 | 확인되지 않았다 |
| Smart Harvest, 회색 | `skin_unowned` 0, 회색 시체 칼질 | `worth carving`이 든 응답이 오면 2칸 안의 시체를 모두 건너뜀. 응답 문구가 달라 시체가 있는 동안 2초마다 self가 반복되면 실패 | 확인되지 않았다 |
| Smart Harvest, 파란 시체만 | 파란 시체만 있음 | self 한 번 뒤 건너뜀 | 확인되지 않았다 |
| Smart Harvest 범위 | Smart Harvest | 실제 동작 기록. 위키는 한 번에 가장 가까운 시체라고도, 2칸 안의 회색 시체 전부라고도 적음 | 확인되지 않았다 |
| 도끼 다시 들기 | 왼손이 빔 | 들고 있던 도끼를 다시 듦. 손에 든 것은 라벨 없이 serial로 한 번 기억(`fight/rearm`). 오른손도 같은 규칙 | 확인되지 않았다 |
| 도끼 기억 없음 | 아무것도 기억 못 함 | graphic 5187 검색. item-list의 5187이 아닌 graphic의 도끼면 백팩 검색 실패 → `config__rearm_graphic` 변경 | 확인되지 않았다 |
| 시전 중 장착 | 시전 중 | 장착 없음. 장착 때문에 자기 주문이 끊기면 실패 | 확인되지 않았다 |
| 장착 거절 | 무장 해제 뒤 장착이 거절됨 | 2초마다 재시도 | 확인되지 않았다 |
| 워모드 중 Greater Heal | 워모드로 싸우는 중 | 손실 45부터 Greater Heal | 확인되지 않았다 |
| 가벼운 Heal | 붕대가 있음 | 가벼운 Heal은 안 씀. `config__use_light_heal` 1이면 붕대 옆에서도 | 확인되지 않았다 |
| 독 | 독 | Cure 포션 먼저, 포션이 없을 때만 Smart Heal/Cure. 포션과 주문이 같은 독에 함께 나가면 실패 | 확인되지 않았다 |
| RA와 Reflect | 상시 유지 | 마나가 RA 24, Reflect 34 이상이면 시전 | 확인되지 않았다 |
| 버프 중단 | 손실 35 이상이나 독 | 버프를 시작하지 않음, 시전 중 그렇게 되면 Interrupt | 확인되지 않았다 |
| 버프와 근접 | 버프 시전 | 근접 타격이 멈추는 시간 기록 | 확인되지 않았다 |
| 시약 재확인 | 시약 없음 | 10초(`interval__reagents`) 안에 재확인 | 확인되지 않았다 |
| core 반복 없음 | v11 core 회복 | 재시도 타이머 없이도 같은 행동이 패스마다 반복되지 않음 | 확인되지 않았다 |
| core 회복 순서 | v11 core 회복 | 큐어 포션, 힐 포션(35), Greater Heal(45, 그 패스에 포션이 안 나갔을 때), 붕대, Refresh(60 이하) | 확인되지 않았다 |
| 시전 중 붕대 | 우리 시전 중 | 붕대가 시작되는지, 그때 시전이 안 끊기는지 | 확인되지 않았다 |
| core 버프 | 버프가 빠짐 | 바로 시전 | 확인되지 않았다 |
| core 경고 | v11 실행 | 힐 포션 쿨 라벨, `[ refresh, out ]`, `[ str, out ]` 경고는 안 뜸. Journal에는 `Agent: …`와 `Buff: …` | 확인되지 않았다 |
| 힘과 민첩 포션 | 기억한 적이 있을 때 STR 120, DEX 100 아래 | 힘 포션과 민첩 포션을 5초에 한 번 | 확인되지 않았다 |
| 저항 포션 | 저항 버프가 빠짐 | 저항 포션 | 확인되지 않았다 |
| 아군 Bless | 아군 Bless가 걸림 | 스탯 포션을 마심 | 확인되지 않았다 |
| 힘 포션 소진 | 힘 포션이 떨어짐 | 민첩과 저항은 계속 | 확인되지 않았다 |
| 골드 버리기 | 최대 무게 초과 | 한 패스에 2000골드를 발밑에 버리고 `[ gold, dropped ]`. 버리는 사이에도 회복은 계속. 무게 초과가 아닌데 버리면 실패 | 확인되지 않았다 |
| 골드 없음 | 무게 초과, 골드 없음 | `[ weight, over ]`만 | 확인되지 않았다 |
| 가죽 graphic | 칼질로 나온 가죽 | item-list의 `cut up leather` 4225인지. 다른 graphic(hides 등)이면 검색에 추가 | 확인되지 않았다 |
| 가죽 정리 주기 | 기억한 적이 없음 | 2분마다 정리 | 확인되지 않았다 |
| 가죽 정리 뒤 | 정리 | 파우치 안의 묶음만 ignore, 목록은 비우지 않음. 정리 뒤 깎은 시체에 다시 요청하거나 파우치 안 가죽을 다시 옮기면 실패 | 확인되지 않았다 |
| 가죽 이동 거절 | 이동이 거절됨 | 2.5초 예산 안에서 재시도 | 확인되지 않았다 |
| 시체 Last Target | 기억한 적이 없을 때 시체를 깎음 | Last Target이 바닥의 시체. Mobile not found나 Script Error로 멈추면 실패 | 확인되지 않았다 |
| Sword Codex 라벨 | `debug/dump-label`로 sword codex | 라벨에 스탠스 이름과 `Execute`, `Bleed Out` | 확인되지 않았다 |
| Sword 스탠스 전환 | `defensive_enter_diff` 초과, `defensive_leave_diff` 미만 | 차례로 `[ sword, defensive ]`, `[ sword, warrior ]`. 경계값과 두 선 사이에서는 기존 상태 유지 | 확인되지 않았다 |
| Execute 전환 | Bleed Out이 골라져 있음 | `[SwordsFinisher2`로 Execute로 바뀌는지 | 확인되지 않았다 |
| 피니셔 꺼짐 | 피니셔가 꺼져 있음 | 명령 없이 `[ execute, off ]`만 | 확인되지 않았다 |
| Sword 스탠스 이름 없음 | 라벨에 스탠스 이름 없음 | `[ sword stance, off ]` | 확인되지 않았다 |
| Parry Codex 라벨 | `debug/dump-label`로 shield codex | 라벨에 스탠스 이름과 `Last Stand`, `Barrier` | 확인되지 않았다 |
| Parry Warding | 기억한 적이 2칸 밖이거나 없을 때 독, 출혈, 질병 | `[ parry, warding ]`, 풀리면 `[ parry, bulwark ]`. Warding 요청 뒤 8초 안에 풀리면 8초 뒤. 출혈이나 질병 중 안 바뀌면 `findbuff "Bleed"`와 `"Disease"`의 버프 이름 확인 | 확인되지 않았다 |
| Parry 근접 | 2칸 안에서 싸우는 중 | 주 스탠스 유지 | 확인되지 않았다 |
| Parry 스탠스 이름 없음 | 라벨에 스탠스 이름 없음 | 명령 없이 `[ parry stance, off ]`만, 이번 Play 동안 정지. 같은 스탠스 명령이 3초마다 반복되면 실패 | 확인되지 않았다 |
| Chop | 기억한 적이 2칸 안 | `[ chop ]` 뒤 다음 타격에 나가는지. Arms Lore가 없으니 60초 간격이 맞는지도 | 확인되지 않았다 |

#### 메모

- 템플릿: Forensic Evaluation 120, Swordsmanship과 Tactics 100, Magery, Resisting Spells, Parrying, Anatomy, Healing 80, STR 100, DEX 80, INT 45
- bard-mace에서 바드를 빼고, lumberjack-enhanced의 자기 회복 주문, RA, Reflect와 시체 칼질 추가
- 워모드는 사용자가 Tab으로 직접. Z, V를 눌러도 워모드 불변
- 싸우는 동안 워모드를 켜 두므로 회복, 버프, 칼질 모두 워모드를 보지 않음
- 위키 원문: `Players can target themselves or nearby ground to activate "Smart Harvest" which carves all grey notoriety corpses "within 2 tiles"`
- 회색 시체만: `target self`. 회색과 파란 시체 모두: 시체 serial을 하나씩 직접 지정(`config__skin_unowned`)
- 스크립트는 시체 이름 색을 못 읽음 → 회색 판정은 서버에 맡김
- 공개 스크립트 [forensics](https://outlands.uorazorscripts.com/skills/forensics/c8e4e8eb-743d-4a7f-9043-4c17d2cabb6a)도 `"the remains"`를 플레이어 시체로 보고 건너뜀
- 시체가 Last Target일 때 캐시는 `0x40000000 > serial`로 모빌만 `dead`와 `noto`에 전달
- Parry Codex: 랭크가 오를 때까지 Bulwark, 근접 밖에서 독, 출혈, 질병이면 Warding
- 할 일: Testudo 랭크가 오르면 레시피의 `config__parry_stance_main`을 3(Testudo)으로
- 스탠스, 피니셔, 어빌리티는 Arms Lore가 없어 무기 특수 확률 기본 10%인 점을 반영해 선택. 근거는 `fight/sword-codex`, `fight/weapon-ability` 모듈 주석
- Sword Codex 기본값은 [sword-codex 모듈](https://github.com/nomeehej/uoo/blob/master/module/fight/sword-codex.razor)
- `config__sysmsg`: 전투 대상 변화, 칼질 요청과 결과, codex 전환, 회복과 버프 시전, 도끼 장착, 골드와 가죽 정리를 Journal에 기록
- 할 일: 게임 종료 상태에서 두 프로필에 칼질 결과 오버헤드 추가

## <a id="02"></a>02 변경 경과

날짜별 기록은 [Verification History](../history/verification.md#04) 04절.
