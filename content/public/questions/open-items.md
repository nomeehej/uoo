---
name: Open items
label: 확인할 것
group: Open questions
order: 10
---

사용자에게 물을 것과 아직 정하지 않은 것. 인게임 검사는 08절의 문서 색인에서 선택.
답이 정해지면 그 사실을 정본 문서로 옮기고 질문은 삭제.

## <a id="00"></a>00 한눈에

01~07절은 답이 필요한 질문, 08절은 별도 문서로 분리한 인게임 검사 색인.
검사의 하는 것, 통과 기준, 확인 상태는 각 검사 문서에만 보관.

먼저 답이 필요한 셋:

1. **네 캐릭터의 옛 `cooldowns.xml`**(01절). 그 캐릭터로 돌리면 바를 하나도 못 읽음
2. **뜨지 않는 바 14개**(01절). 삭제나 트리거 추가를 정해야 바 목록이 실제와 일치
3. **내가 나에게 건 TK, 받은 TK에도 켜지는 target 바**([PvP Experiments](../verification/pvp-experiments.md#01.B) 01.B절). 내 공격 TK 성공으로 오판해 포션을 점화할 위험.
   지금 루프는 자동 점화 없음 → 자동 점화를 다시 넣기 전에 해결

| 절 | 내용 |
| --- | --- |
| [01](#01) | 뜨지 않거나 옛 형식인 쿨다운 바 처리 |
| [02](#02) | 머리 위 알림 규칙과 어긋난 줄의 기준 |
| [03](#03) | 키 배치와 맞지 않는 캐릭터와 바인딩이 예외인지 |
| [04](#04) | 출처 없는 숫자와 사실의 근거 |
| [05](#05) | 규칙과 다른 파일: 파일 수정인지 규칙 수정인지 |
| [06](#06) | 겹치거나 제자리가 아닌 문서 내용의 이동처 |
| [07](#07) | 순서를 기다리는 일 |
| [08](#08) | 인게임 검사 문서 색인 |

::part[설정과 알림]

## <a id="01"></a>01 쿨다운 바

| 바 | 지금 | 정할 것 |
| --- | --- | --- |
| indian angus bot, kit, nom, pay 네 캐릭터의 `cooldowns.xml` | 옛 22항목 형식(`mushroom`, `CorpseSkin` 등). 지금 이름을 읽는 스크립트는 그 캐릭터에서 바를 못 찾음. nomeehui는 nomeehej와 같은 105항목 | nomeehej 파일로 맞출까 |
| `pain spike` `necrosis` `noble sacrifice` `holy light` `poison strike` `curse` `mass curse` `spyglass` `divine fury` `consecrate weapon` `spam` `crew heal` `quest` | 트리거 없음, 세우는 스크립트 없음 → 안 뜸([Overheads](../scripting/overheads.md#06.C) 06.C절) | 삭제, 또는 트리거 문장 추가 |
| `drain` | 트리거는 머리 위 메시지 "MV ON" 하나, 띄우는 곳 없음 | 삭제, 또는 다른 트리거 |

## <a id="02"></a>02 머리 위 메시지

규칙은 [Overheads](../scripting/overheads.md). 아래는 규칙과 어긋난 채 남은 줄.

| 규칙 | 지금 | 정할 것 |
| --- | --- | --- |
| 대상 위 줄은 1288([Overheads](../scripting/overheads.md#01.C) 01.C절) | moongate의 `[ moongate, set ]`은 290으로 게이트 위, archive/backstab-mugging의 `[ range, out ]`은 254로 lasttarget 위 | 1288로 바꿀까, 예외로 적을까 |
| 한 대상에 한 낱말([Overheads](../scripting/overheads.md#04) 04절) | 프로필 `[ omen, target ]`과 스크립트 `[ evil omen ]`, train/herding의 `[ herding, done ]`과 글로서리 `herd`, 바 `cannons`와 `[ cannon, out ]`도 불일치 | 어느 쪽으로 맞출까 |
| 대상만 쓰는 줄 = 시전 알림([Overheads](../scripting/overheads.md#05) 05절) | 프로필의 `[ swing ]`(290)은 대상만인데 시전 알림 아님 | `[ swing, on ]`처럼 상태를 붙일까 |
| 글로서리 낱말 | `gheal` `invis` `tp`를 쓰는 줄 없음 | 예약어로 둘까, 지울까 |

## <a id="03"></a>03 캐릭터와 핫키

| 무엇 | 지금 | 정할 것 |
| --- | --- | --- |
| indian angus bot | 키 배치 밖. 이동은 화살표 키, 매크로는 ClassicUO 기본 세트(F1 Guards, F2 bank, 4 all stay, 6 Circle Trans). `chars.lst`에도 없음 | 예외 캐릭터인가 |
| `Shift`+휠 | 아군 순환이 Shift 층 정의("밖으로 던지는 것")와 어긋남([Hotkeys](../game/hotkeys.md#02.A) 02.A절) | 의도한 예외인가 |
| 가장 가까운 플레이어 타겟 | "서버가 막아 놨다"([Hotkeys](../game/hotkeys.md#04) 04절)에 출처 없음 | 맞다면 PvP 제약 → [Razor](../scripting/razor.md#07) 07절로 옮길까 |
| "C and a click" | 지금은 없는 bard-necro-pvp 주석의 말. 어느 바인딩과도 불일치(summoner의 `C`는 All Guard Me) → "Q or Shift+X/C"로 수정함 | 원래 뜻이 있었나 |
| 저장소 밖 파일 | Wine `user.reg` 키 이름([Hotkeys](../game/hotkeys.md#01) 01절), Clumsy subcode 62([05절](../game/hotkeys.md#05)) 미대조. L 이름은 2026-10-21 설치된 `Razor_lang.enu`와 대조 완료([Hotkeys](../game/hotkeys.md#05) 05절) | 나머지도 게임이 깔린 기계에서 대조 가능한가 |

::part[근거]

## <a id="04"></a>04 출처 없는 숫자와 사실

숫자 인용 규칙([Workflow](../working/workflow.md#01.C) 01.C절) 기준으로 근거 없는 것. 문서에는 그대로 두거나 "확인되지 않았다"로 표시.

| 무엇 | 어디 | 물을 것 |
| --- | --- | --- |
| 캐릭터의 기본 STR과 DEX(스탯 포션 기준선) | 기준선: bard-necro-enhanced와 tamer-mage-enhanced 120과 45, pvp와 skinning-enhanced 120과 100, archive의 bard-mace, bard-throwing, hally-mage 120과 120 | 버프 없는 STR과 DEX. 기준선 = 그 값 + 20([Combat](../mechanics/combat.md#02.D) 02.D절). bard-necro의 DEX 25는 인게임 확인됨 2026-10-10(포션을 마셔도 45), 그 전 120은 옛 임계값 100에서 짐작. STR 100은 아직 짐작. pvp는 벌목과 skinning 템플릿의 100과 80 기준, summoner 프로필에서도 쓰므로 그 캐릭터의 기본값이 다르면 실행 전 변경. 선이 높으면 포션 도는 동안 5초마다 거절될 마시기, 낮으면 아예 안 마심 |
| Lyric 방어구 무시 42.5% | [Bard Necro](../templates/bard-necro.md#02.B) 02.B절 | 출처. Peace 가동률 62%의 근거 |
| Barding Break 동안 Virtuoso | [Bard Necro](../templates/bard-necro.md#02.B) 02.B절, `bard/peace` 모듈 | 정말 꺼지나. "Barded Creatures"에 디스코만 걸린 몹도 드는지 모름 |
| PK의 Alchemy | [Bard Necro](../templates/bard-necro.md#04.B) 04.B절 | 80인가 100인가. 지금 숫자는 80 기준 |
| `song`과 `peace/provo` 바의 성공 쿨 | `cooldowns.xml` 11초, 위키 10초([Barding](../mechanics/barding.md#01.C) 01.C절) | 1초는 의도한 추가인가 |
| Vengeful Spirit의 마나 | [Necromancy](../mechanics/necromancy.md#01.B) 01.B절, [Bard Necro Summons](../loops/bard-necro-summons.md#03) 03절 | "마나 101"을 심볼 1과 마나 100으로 수정함. 마나가 따로 드나 |
| `cooldown "…"`의 반환값 | [Razor](../scripting/razor.md) | 1인가, 남은 초인가 |
| `and`의 단락 평가 | [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.H) 01.H절 | 버섯 `findtype`, `counttype`을 서 있을 때만 읽는다는 설명의 전제. Razor 문서에 없음 |
| `in`의 대소문자 구분 | [Conventions](../scripting/conventions.md#05) 05절 | 근거는 `dump-label.razor:11` 주석뿐. 인게임에서 봤다면 [Razor](../scripting/razor.md#03) 03절 함정 표로 |
| Vampiric Embrace 확인 날짜 | [Razor](../scripting/razor.md#04) 04절 | 2026-09-25는 커밋 날짜. 실제로 본 날짜인가 |
| `auto-mage.razor:1160` 인용 | [Razor](../scripting/razor.md#04) 04절 | 저장소와 이력 어디에도 없는 파일. 위치 |
| Overheads의 숫자 | [Profile Messages](../scripting/profile-messages.md#01) 01절과 [Overheads](../scripting/overheads.md#09) 09절 | 광역 바딩의 8타일과 5초, 2초. Resist 흡수 `25% x Resist/100`과 -75%(PvP의 Parrying 공식과 혼동 여부). siphon의 5분마다와 60분. reactive 25. drain의 레지 -10과 -20, 2분. Paralyze Combat 05초 |
| PvP의 주장 | [PvP](../game/pvp.md#02) 02절, 03절, 05절 | "Swordsmanship도 같은 형태다", 크리처 주문 패링 25%, Hamstring이 PvM 목록에 있다는 말의 출처 |
| 명중률 상한과 화면의 기본 40% | [PvP](../game/pvp.md#02.D) 02.D절, [Bard Archer](../templates/bard-archer.md#01.A) 01.A절 | 100% 넘는 명중이 버려지는지. Archery 80 대 방어 100의 식은 43.3%인데 Player Stats Profile은 40% |
| Outlands의 아이템 사용 간격 | [Razor](../scripting/razor.md#03) 03절의 `queued` | 프로필 `ObjectDelay` 600을 줄여도 `You must wait to perform another action.`이 안 나는 값. 다른 샤드(Lost Lands)는 750ms 권장 |

::part[규칙과 문서]

## <a id="05"></a>05 규칙과 파일이 다른 곳

| 규칙 | 파일 | 정할 것 |
| --- | --- | --- |
| 헤더는 설명 한 줄과 `Needs:`([Conventions](../scripting/conventions.md#02.C) 02.C절) | archive의 bard-throwing, bard-mace: 배너 뒤 "Naming convention" 블록. bard-necro-enhanced: 배너 없이 설명 한 줄, 설계 문서 안내, Needs, 긴 메모 | 긴 루프의 헤더 모양 |
| `cooldown` 명령은 기존 파일이 그 스타일일 때만([Conventions](../scripting/conventions.md#04) 04절) | archive의 bard-throwing이 `cooldown "ability"`로 게이트 | 규칙이 낡았나, 바 표시를 위한 의도인가 |
| 같은 성격 3개 이상이면 폴더([Conventions](../scripting/conventions.md#01.C) 01.C절) | `gather/` 2개, `restock/` 1개 | 규칙 수정, 또는 폴더 병합 |
| 시작 4줄([Conventions](../scripting/conventions.md#02.D) 02.D절) | loadout, claim-loot, share-loot: `clearall`, `clearsysmsg`, `cleardragdrop`, `clearignore` 순. archive의 bard-throwing, bard-mace: `clearsysmsg`, `clearall`, `clearignore`, `cleardragdrop` 순 | 순서가 중요한가 |
| 세션 값과 영속 값([Conventions](../scripting/conventions.md#03.B) 03.B절) | stock-vendor가 `setvar var__…`. 영속 값 `setvar`인데 접두가 `var__`. loadout은 지금 `setvar global__…`로 규칙 준수 | stock-vendor를 규칙에 맞출까 |

## <a id="06"></a>06 문서 정리

이동처를 정할 중복과 제자리가 아닌 내용. 한 사실은 한 곳에([Writing](../working/writing.md#08) 08절).

| 무엇 | 제안 |
| --- | --- |
| Defensive Barding과 서버 스킬 게이트([Barding](../mechanics/barding.md#02.I) 02.I절) | 모든 바드 템플릿 공통 → [PvP](../game/pvp.md)로 이동 |
| 2026-09-29에 바꾼 루프(교전과 이동 분기, 하우스키핑 시계, peace 대기, 한 줄로 접은 게이트) | 2026-10-10 모듈 조립 뒤 인게임 확인 목록은 [Bard Necro Checks](../verification/bard-necro.md#01) 01절. 교전과 이동은 있음, 하우스키핑 시계와 peace 대기와 한 줄로 접은 게이트는 없음. [Bard Necro Checks](../verification/bard-necro.md#01) 01절에 추가할까 |

::part[보류]

## <a id="07"></a>07 미뤄 둔 것

사용자가 그대로 두라고 한 것(2026-09-29 결정). 답이 아닌 순서 대기.

| 무엇 | 남은 일 |
| --- | --- |
| archive/hally-mage | `[ cure pot, on ]`(290)을 아직 띄움 → 프로필 줄과 중복. `[ pvp, on ]`이 234(공통 pvp는 290). 읽는 무기 바 `Halberd` `Battle Axe` `Viking Sword` `Katana`가 어느 `cooldowns.xml`에도 없음. 2026-10-10 archive로 이동, 다시 쓸 때 수정 |
| indian angus nom, kit, pay | [Hotkeys](../game/hotkeys.md#03) 03절의 summoner 캐릭터는 nomeehej 하나뿐. gumps 파일 serial로 보면 이 셋도 summoner(추정). 그렇다면 Bard Necro 칸: 1 2 3은 Disco, Peace, Provo, F1은 bard-necro-enhanced |


::part[인게임 확인]

## <a id="08"></a>08 인게임 검사 문서

먼저 스크립트를 선택하고 해당 문서의 검사와 통과 기준을 함께 확인.
확인되지 않은 행은 통과로 바꾸지 않음. 확인한 날짜와 사실을 정본에 반영한 뒤 검사 목록 정리.

| 기존 절 | 검사 문서 |
| --- | --- |
| <a id="08.A"></a><a id="08.B"></a><a id="08.C"></a>08 | [PvP Experiments](../verification/pvp-experiments.md) — PvP 자동화 전 실험 |
| <a id="09"></a>09 | [Lumberjack Checks](../verification/lumberjack.md) — 벌목 루프 인게임 확인 |
| <a id="10"></a>10 | [PvP Checks](../verification/pvp.md) — 공통 pvp 인게임 확인 |
| <a id="11"></a>11 | [Skinning Checks](../verification/skinning.md) — 칼질 루프 인게임 확인 |
| <a id="12"></a>12 | [Tamer Mage Checks](../verification/tamer-mage.md) — 테이머 메이지 인게임 확인 |
| <a id="13"></a>13 | [Recycle Checks](../verification/recycle.md) — 감정과 분류 인게임 확인 |
| <a id="14"></a>14 | [Bard Necro Checks](../verification/bard-necro.md) — 바드 네크로 인게임 확인 |
| <a id="15"></a>15 | [Loadout Checks](../verification/loadout.md) — 보급과 장비 인게임 확인 |
| <a id="16"></a>16 | [Bard Archer Checks](../verification/bard-archer.md) — 바드 아처 인게임 확인 |
| <a id="17"></a>17 | [Provocation Checks](../verification/provocation.md) — 프로보 후보 입력 인게임 확인 |
| <a id="18"></a>18 | [Tamer Archer Checks](../verification/tamer-archer.md) — 테이머 아처 인게임 확인 |
| <a id="19"></a>19 | [Bard Wrestling Checks](../verification/bard-wrestling.md) — 바드 레슬링 인게임 확인 |

기존 스크립트 주석의 `Open items part 09` 같은 번호는 이 표의 번호. 날짜별 변경 경과는 [Verification History](../history/verification.md).
