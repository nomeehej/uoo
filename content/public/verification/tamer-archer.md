---
name: Tamer Archer Checks
label: 테이머 아처 인게임 확인
group: Verification
order: 110
---

테이머 아처 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |
| [02](#02) | 변경 경과의 위치 |

## <a id="01"></a>01 검사와 통과 기준

블록 순서와 설정의 정본은 [recipe/tamer-archer-enhanced-recipe.razor](https://github.com/nomeehej/uoo/blob/master/recipe/tamer-archer-enhanced-recipe.razor).
반영은 핫키면 클라이언트 재시작, Scripts 탭은 리로드 뒤 Play([Workflow](../working/workflow.md#04) 04절).

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 템플릿 | 캐릭터 스킬 | Animal Lore, Animal Taming 120. Veterinary, Resisting Spells, Magery, Archery, Tactics, Herding 80 | 인게임 확인됨 2026-10-21 |
| 셀프 붕대 | 캐릭터 스킬, 수의사 키트 | Healing 없음 → 붕대 블록 없음, 수의사 키트가 셀프 붕대([01절](tamer-mage.md#01)) | 인게임 확인됨 2026-10-21 |
| 시작 | 실행 | `[ crook, out ]` 없이 `[ tamer archer, on ]`, 코덱스 핫바 표시 | 확인되지 않았다 |
| 코덱스 핫바 다시 Play | 코덱스 핫바가 이미 떠 있을 때 다시 Play | 핫바가 닫히는지 | 확인되지 않았다 |
| 활 재장착 | 활을 들고 시전 | Journal `Rearm: two-handed layer remembered`, 시전 뒤 `Rearm: equip requested on the two-handed layer` | 확인되지 않았다 |
| Full Draw 정지 | 교전 중 정지 | 요청 조건이 맞으면 60초 간격의 `Weapon ability request: codex 2, slot 2`와 `[ full draw ]`. 서버의 정지 3초 뒤 실제 발사와 피해 별도 확인. 손해면 `ability_main` 3 | 확인되지 않았다 |
| Full Draw 이동 | 움직이며 사격 | 이동 중에도 능력 요청과 `[ full draw ]` 가능. 루프는 이동으로 요청을 차단하지 않음. 요청 시각과 실제 발사, 피해를 나눠 기록 | 확인되지 않았다 |
| Protection | `Buff: Protection.` 뒤 | 아이콘, 2분 뒤 다시([01절](bard-archer.md#01) Protection 항목) | 확인되지 않았다 |

#### 메모

- 할 일: 사용할 캐릭터의 summoner 프로필 F1을 `Play Script: combat\tamer-archer-enhanced`로 연결. 현재 프로필에는 연결 없음, 설정 파일은 게임 종료 뒤 수정
- 입력은 summoner 프로필 배치([Hotkeys](../game/hotkeys.md#01.E) 01.E절). 코덱스, 사격, 펫 명령, 대상 지정은 수동, 루프는 펫을 명령하지 않음
- 바드 블록 없음
- `[CodexHotbar`를 시작 때 한 번 요청([Commands](https://wiki.uooutlands.com/Commands) "Launches the Codex Hotbar"). 코덱스 자세와 피니셔의 자동 전환 없음
- Full Draw: 활은 2.21초에 한 발([Melee](../mechanics/melee.md#01) 01절 표) → 15초에 6.8발 × 50% = 약 340%. Repeater 225%보다 큼. 정지 3초 조건이라 움직이며 쏘면 Repeater(`ability_main` 3)
- 사거리 10: 활([Archery](../mechanics/archery.md#01) 01절). `target_range`와 `ability_range` 모두 10
- 버프는 bard-archer와 같은 RA 24, Reflect 34, Protection 26. Greater Heal 11과 Teleport 9의 20을 남김
- 스탯 포션 기준선 STR 120, DEX 100은 기본값. 이 템플릿의 스탯은 미기록 → 다르면 레시피에서 변경
- `rearm_graphic` 5042로 활 검색. 공용 재장착 동작과 상태는 [01절](bard-archer.md#01) 재장착 항목
- 수의사 키트 검사: [01절](tamer-mage.md#01)의 항목 그대로

## <a id="02"></a>02 변경 경과

날짜별 기록은 [Verification History](../history/verification.md#11) 11절.
