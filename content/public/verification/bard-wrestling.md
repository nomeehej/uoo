---
name: Bard Wrestling Checks
label: 바드 레슬링 인게임 확인
group: Verification
order: 120
---

바드 레슬링 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |

## <a id="01"></a>01 검사와 통과 기준

자동 선택과 설정의 정본은 [Bard Wrestling Enhanced](../loops/bard-wrestling-enhanced.md).

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 두 코덱스 라벨 | `debug/dump-label`로 Wrestling과 Parrying 코덱스 검사 | 현재 자세 하나와 피니셔 하나. 전체 라벨과 대소문자 기록 | 확인되지 않았다 |
| 슬롯 | 안전한 몹 하나를 상대로 루프 실행 | Monkey, Chi Thrust, Testudo, Last Stand 선택. Brawl 요청은 슬롯 1 | 확인되지 않았다 |
| 단일 대상 | Z 또는 Q, V로 같은 몹 공격 | Monkey 유지. Barding Break만으로 자세 변경 없음 | 확인되지 않았다 |
| 긴급 전환 | 공격 자세를 바꾼 직후 HP 손실이 45 이상인 상황 | 다음 자유 패스에서 Crab 요청. 8초 유지와 일반 3초 대기 우회 | 확인되지 않았다 |
| 회복 유지 | Crab 중 손실 30 이하로 회복, 중간에 30 초과 재현 | 연속 5초 회복 관찰 뒤 복귀. 반복 전환 없음 | 확인되지 않았다 |
| 실제 다수전 | 현재 대상과 등록한 추가 몹을 내 1칸 안에 모음 | Spider. 멀리 있는 후보, 같은 몹 중복, 사체는 제외 | 확인되지 않았다 |
| 다수전 종료 | 추가 몹을 멀리 보내거나 처치 | 6초 다수전 유지와 최소 자세 유지 뒤 Monkey 복귀 | 확인되지 않았다 |
| 요청 재확인 | 코덱스 전환 전후 Journal과 라벨 확인 | 적용된 선택을 다시 토글하지 않음. 미적용 자세는 3초 넘게 지나 한 번, 그 뒤 8초 유지 뒤. 미적용 피니셔는 `not shown` 줄 뒤 30초 재동기화 때 | 확인되지 않았다 |
| 패링 재동기화 | 루프 실행 중 피니셔를 Barrier로 바꾼 뒤 대기 | 다음 정기 재확인에서 Last Stand 복구. 확인 후 같은 명령 반복 없음 | 확인되지 않았다 |
| 패링 라벨 모호성 | 실제 라벨에 자세나 피니셔 이름이 없거나 여럿인지 확인 | 해당 선택의 off 알림. 판독 가능한 다른 선택의 관리는 계속 | 확인되지 않았다 |
| 수동 창 | 수동 타깃 커서 보유, 시전 또는 은신 중 코덱스 변경이 필요한 상황 | 요청 보류, 커서 유지. 해제 뒤 두 코덱스 자동 관리 복귀 | 확인되지 않았다 |
| Warding | 독, Bleed, Disease 중 기억한 몹과 거리 변경 | 근접 Testudo, 2칸 밖 Warding. 상태 해제 뒤 Testudo. 전환 사이 8초 이상 | 확인되지 않았다 |
| 장착과 능력 | Scroll을 든 채, 백팩에 넣은 채, 다른 무기로 바꾼 채 인접한 몹과 교전 | 든 상태에서만 Brawl 요청. 든 상태에서도 요청이 없으면 `findtype … self`가 손의 물건을 못 찾는 것 → [Razor](../scripting/razor.md#03) 03절 갱신 | 확인되지 않았다 |
| 시전 뒤 재장착 | Greater Heal 등으로 손이 비는 상황 | 회복 후 Scroll 복귀. 요청과 실제 장착을 구분. 코덱스 off 알림이 뜨면 손이 빌 때 자세나 피니셔가 풀리는 것 → 라벨 기록 | 확인되지 않았다 |
| 힐 중 붕대와 재장착 | HP 손실 45 이상에서 Greater Heal. Journal의 `Agent: Greater Heal/Cure Self.`, `In Vas Mani`, 붕대, `Rearm:` 줄 순서와 HP 회복 기록 | 힐이 들어간 뒤 붕대. `Rearm: hand empty for under 2000 ms, equip held.` 한 줄 뒤 `Rearm: equip requested`. `Agent: cast disturbed.`는 끊김, `Agent: cast still shows after 6000 ms.`는 `casting`이 안 풀린 것, `Agent: no cast seen within 1000 ms.`가 잦으면 `wait__cast_start` 조정 | 2026-10-30 수정 뒤에도 실패: `In Vas Mani` 뒤 붕대가 커서를 덮어 힐 소멸, 끊김 줄 없음, 인게임 확인됨 2026-11-01([Magery](../mechanics/magery.md#02.A) 02.A절). 2026-11-01 수정(`casting` 뒤 0.5초 대기, 손이 빈 지 2초 뒤 장착)은 확인되지 않았다 |
| Brawl 충전 | 능력 요청 시각, 실제 명중과 발동, 다음 충전을 기록 | 60초 요청 간격의 지연 여부 확인. 요청 자체를 발동으로 판정하지 않음 | 확인되지 않았다 |
| 재활용 복귀 | 새 루프 실행 후 recycle 완료 | `combat\bard-wrestling-enhanced`로 복귀 | 확인되지 않았다 |
