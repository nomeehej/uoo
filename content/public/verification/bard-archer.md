---
name: Bard Archer Checks
label: 바드 아처 인게임 확인
group: Verification
order: 90
---

바드 아처 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |

## <a id="01"></a>01 검사와 통과 기준

설계와 숫자는 [Bard Archer Enhanced](../loops/bard-archer-enhanced.md). 새 루프와 새 프로필 → 클라이언트 재시작, nomeehej의 Razor 프로필을 `bard`로([Workflow](../working/workflow.md#04.A) 04.A절).
프로보 후보 입력은 [01절](provocation.md#01), 악기 복구는 [01절](bard-necro.md#01).

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 시작 | F1 | 악기 검색(없으면 `[ inst, pick ]`), `[ bard archer, on ]` | 확인되지 않았다 |
| warmode 수동 구간 | Tab | 바딩, 노래, RA, Reflect, Protection 정지. 회복, 포션, 붕대, 코덱스 전환, 무기 능력, 재장착은 계속. Tab을 끄면 재개 | 확인되지 않았다 |
| 붕대 회복 | 붕대를 들고 맞기 | 붕대만, 일반 Heal 시전 없음. 감는 중 마지막 붕대를 다 써도 끝날 때까지 Heal 대기. 실패면 Journal의 `Agent:` 줄 | 확인되지 않았다 |
| 붕대 없음 | 붕대를 빼고 맞기 | 손실 `light_hits`(15) 이상에서 `Agent: Smart Heal/Cure Self, light Heal.`. 시전이 없으면 마나와 시약 확인 | 확인되지 않았다 |
| 스탯 포션 셋 | 셋 다 없이 교전 시작 | 첫 교전 패스부터 Strength, Agility, Magic Resist가 약 0.6초 간격으로 연달아. 한 병 뒤 5초 쉬면 실패 | 확인되지 않았다 |
| 힐 포션과 Greater Heal | 손실 35 이상 | `heal pot` 바, 그 패스는 Greater Heal 생략. 다음 패스에도 45 이상이면 `Agent: Greater Heal/Cure Self.` | 확인되지 않았다 |
| 풀피 뒤 커서 | Greater Heal 뒤 바로 풀피 | 남은 회복 커서 취소. 커서가 남으면 그 뒤 멈춘 블록 기록 | 확인되지 않았다 |
| 코덱스 라벨 | `debug/dump-label`로 codex of archery(11886) | 지금 자세 하나와 피니셔 하나만, `Arcane`, `Ricochet`처럼 대소문자 그대로. 다섯 자세나 두 피니셔가 다 보이면 `[ archery stance, off ]`, `[ archery finisher, off ]`가 뜨고 전환 정지, 라벨 문장 전체 기록 | 확인되지 않았다 |
| 자세 명령 | `[ArcheryAmmunition3` 두 번 | 처음에 Incendiary, 다시 말하면 꺼짐(`You deactivate your stance.`) | 확인되지 않았다 |
| 피니셔 명령 | `[ArcheryFinisher1` | Ricochet이 켜지고 Pincushion이 꺼짐. 둘이 따로 켜지면 기록 | 확인되지 않았다 |
| 한 마리 | Z → V | Arcane, Pincushion. Journal `Archery stance switch`, `Archery finisher switch` | 확인되지 않았다 |
| 여러 마리 | Z → V, Shift+Space로 둘째 등록, 둘 다 10칸 안 | 2초 안에 Incendiary와 `[ archery, ricochet ]`. 하나로 줄면 6초 뒤 Arcane, Pincushion | 확인되지 않았다 |
| Fowling | 잃은 HP 45 초과 → 30 미만 | 초과에서 Fowling, 미만에서 원래 자세. 그 사이는 유지, 깜빡임 없음 | 확인되지 않았다 |
| Incendiary 튐 | 프로보 짝 중 하나를 쏨 | 짝에게 Incendiary 피해. 데미지 트래커로 | 확인되지 않았다 |
| 손으로 바꾼 자세 | 자세를 손으로 변경 | 30초 안에 루프가 되돌림 | 확인되지 않았다 |
| Virtuoso 갱신 | 한 마리를 오래 잡음 | Virtuoso 아이콘이 빠지면 약 15초마다 Discordance. 실패하면 5초 뒤 다시 | 확인되지 않았다 |
| 바딩 순서 | 새 대상, 짝 있음 | Provocation → Discordance → Peacemaking. Peace가 끊긴 때와 Virtuoso 갱신이 겹치면 Discordance 먼저 | 확인되지 않았다 |
| Repeater | 교전 60초마다 | `[ repeater ]`, Journal `Weapon ability request: codex 2, slot 3`. `[WeaponAbility3`이 Repeater. 다른 능력이면 슬롯 번호 기록 | 확인되지 않았다 |
| 무기 능력 토글 | 요청 뒤 명중 없이 60초 | 요청은 토글이 아님, 다음 명중에 나감. `Weapon ability ready` 문장에 맞출 필요 없음 | 인게임 확인됨 2026-10-22 |
| Repeater 피해 | 데미지 트래커 | 일반 한 발과 비교. 무기 속도 보정 식이 위키에 없음 | 확인되지 않았다 |
| Protection | `Buff: Protection.` | 아이콘 `Protection`. 커서가 뜨면 자기에게. 2분 뒤 다시, 마나 26 아래에서는 안 나감 | 확인되지 않았다 |
| 재장착, Play | 석궁을 들고 F1 | Journal `Rearm: two-handed layer remembered` | 확인되지 않았다 |
| 재장착, 시전 뒤 | RA, Reflect, Protection, Greater Heal | 석궁이 떨어진 다음 패스에 바로 `Rearm: equip requested on the two-handed layer`, 2초 뒤 손 확인(2026-10-22 변경). 사격이 이어지는지, V를 다시 눌러야 하는지 기록 | 확인되지 않았다 |
| 재장착, 빈손 | 양손이 비고 기억한 무기 없음 | graphic 31186 검색, `Rearm: graphic 31186 picked`. 없으면 `[ weapon, out ]` 3초마다 | 확인되지 않았다 |
| 재장착, 1H | graphic 검색으로 1H 무기 | `drop self lefthand`로 보냄. 서버가 제 레이어에 올리는지, 거절해 2초마다 다시 집는지 | 확인되지 않았다 |
| 재장착, 여분 | 같은 석궁 하나 더 | 처음 든 것 또는 처음 고른 serial로. 다른 것을 집으면 그 serial 기록 | 확인되지 않았다 |
| 재장착, 거절 | 디스암 뒤 | 같은 serial을 2초마다 재시도. 백팩 밖으로 옮기면 같은 graphic 다른 것 | 확인되지 않았다 |
| 재장착, 커서 | 바딩 커서나 자기 주문 중 | 재장착이 끊지 않음. 끊기면 시전 중 가드가 샌 것 | 확인되지 않았다 |
| `rhandempty`, `righthand` | Play | 오류 줄 없음 | 확인되지 않았다 |
| 31186 | Pistol Crossbow와 같은 art인지 | 백팩에 둘 다 있을 때 `findtype`이 집는 것 기록 | 확인되지 않았다 |
| 마나 | 체인 한 벌, 음식 없이 | 마나 10이 차는 시간 50초면 Butler 식([Combat](../mechanics/combat.md#01) 01절) | 확인되지 않았다 |
| Lyric | 송 메시지 | `8.5%`면 170. `6.8%`면 Lyric 보너스 없음([Bard Archer](../templates/bard-archer.md#01.C) 01.C절) | 확인되지 않았다 |
