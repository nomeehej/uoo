---
name: Bard Wrestling
label: 바드 레슬링과 패링 사냥 템플릿
group: Templates
order: 50
---

Bard Archer에서 Archery를 Wrestling, Resisting Spells를 Parrying으로 바꾸는 사냥 구성.
자동화 설계는 [Bard Wrestling Enhanced](../loops/bard-wrestling-enhanced.md), 무기 비교 근거는 [Combat](../mechanics/combat.md#02.G) 02.G절.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 스킬과 사냥 조건 |
| [02](#02) | 무기, 코덱스와 회복 |
| [03](#03) | 적용과 확인 범위 |

인게임 확인 항목은 [Open items](../questions/open-items.md#19) 19절.

## <a id="01"></a>01 스킬 계획

2026-10-27 결정. 방패 없이 일반 몬스터 한 마리씩, 처치 약 30\~60초, Lyric 무기 15, 코덱스 최대 해금 조건.

| 스킬 | 값 |
| --- | --- |
| Provocation, Peacemaking, Discordance | 각각 80 |
| Anatomy, Healing, Magery | 각각 80 |
| Tactics, Wrestling, Parrying | 각각 80 |
| Musicianship | 기존 Self Taught 대체 |

- 합 720. 스탯과 Bard, Healer 코덱스의 기존 배분은 [Bard Archer](bard-archer.md#01) 01절
- Wrestling과 Anatomy의 Hamstring 자격, 몬스터 이동 제한은 [Combat](../mechanics/combat.md#02.H) 02.H절
- 마나 반환과 시전 중 근접 방어는 [Combat](../mechanics/combat.md#02.G) 02.G절
- Defensive Barding의 적용 조건은 [Barding](../mechanics/barding.md). 실전 PvP는 도주 우선, 자동 반격 없음

## <a id="02"></a>02 무기와 코덱스

- 무기 Martial Arts Scroll, Item list의 Martial Manual과 같은 graphic. 번호는 [Item list](../game/item-list.md#29) 29절
- Wrestling과 Parrying 코덱스 모두 사용. 자동 선택은 [Bard Wrestling Enhanced](../loops/bard-wrestling-enhanced.md#02) 02절과 03절
- 기본 단일 공격은 Monkey, 큰 HP 손실은 Crab, 실제로 붙은 등록 몹이 여럿이면 Spider
- 피니셔 Chi Thrust, 능력 Brawl, Parry Testudo와 Last Stand
- 독과 지속 피해 중 후퇴하면 Parry Warding. 자세 교체로 콤보를 계속 초기화하지 않도록 별도 관리
- 회복, 바딩, 자기 버프는 기존 바드 아처 정책. 공격과 대상 선택은 손

## <a id="03"></a>03 적용 범위

- 새 사냥 루프 `combat/bard-wrestling-enhanced`, 로드아웃 `shelf/bard-wrestling`
- 기존 `bard-archer-enhanced`와 별도 실행 파일. 공통 모듈의 개선만 기존 소비자에 반영
- 무방패 사냥의 운용 선택. Fencing보다 인게임 DPS가 높다는 실측 결론 없음
- Dragon, Crane, Mirror의 최적 자동 판단은 판독 근거와 비교 사냥이 필요
- 캐릭터 스킬 전환, 프로필 핫키 변경과 실제 사냥 효과는 확인되지 않았다
