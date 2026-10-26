---
name: Open items
label: 확인할 것
group: Open questions
order: 10
---

물을 것과 인게임에서 확인할 것의 모음. 답이 정해지거나 확인되면 그 사실을 정본 문서로 옮기고 여기서 지움.

## <a id="00"></a>00 한눈에

두 종류. 01\~07절은 **물을 것**, 표의 마지막 열이 물음. 답은 "01 drain: 지운다"처럼 절 번호와 항목 이름으로.
08\~19절은 **인게임에서 확인할 것**, 스크립트마다 한 절, 같은 모양의 표 하나.

| 열 | 뜻 |
| --- | --- |
| 검사 | 짧은 이름 |
| 하는 것 | 게임에서 할 일 |
| 통과 기준 | 보여야 하는 것. 실패했을 때 적을 것이 있으면 "실패면 …" |
| 상태 | `확인되지 않았다` = 아직. `인게임 확인됨 2026-10-22` = 그날 확인. 확인된 행은 사실을 정본으로 옮긴 뒤 삭제 |

표 밑의 `기록`은 날짜 붙은 경과, `메모`는 검사가 아닌 설명.
새로 물을 것은 여기에 추가([Workflow](../working/workflow.md#03) 03절).

먼저 답이 필요한 셋:

1. **네 캐릭터의 옛 `cooldowns.xml`**(01절). 그 캐릭터로 돌리면 바를 하나도 못 읽음
2. **뜨지 않는 바 14개**(01절). 삭제나 트리거 추가를 정해야 바 목록이 실제와 일치
3. **내가 나에게 건 TK, 받은 TK에도 켜지는 target 바**(08.B절). 내 공격 TK 성공으로 오판해 포션을 점화할 위험.
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
| [08](#08) | 벌목과 PvP 자동화 전 실험 |
| [09](#09) | lumberjack-enhanced |
| [10](#10) | 공통 pvp |
| [11](#11) | skinning-enhanced |
| [12](#12) | tamer-mage-enhanced |
| [13](#13) | recycle |
| [14](#14) | bard-necro-enhanced |
| [15](#15) | loadout, regear, aspect |
| [16](#16) | bard-archer-enhanced |
| [17](#17) | 프로보 후보 입력, 두 바드 루프 공통 |
| [18](#18) | tamer-archer-enhanced |
| [19](#19) | bard-wrestling-enhanced |

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
| 저장소 밖 파일 | Wine `user.reg` 키 이름(01절), Clumsy subcode 62(05절) 미대조. L 이름은 2026-10-21 설치된 `Razor_lang.enu`와 대조 완료([Hotkeys](../game/hotkeys.md#05) 05절) | 나머지도 게임이 깔린 기계에서 대조 가능한가 |

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
| Vengeful Spirit의 마나 | [Necromancy](../mechanics/necromancy.md#01.B) 01.B절, [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#02.C) 02.C절 | "마나 101"을 심볼 1과 마나 100으로 수정함. 마나가 따로 드나 |
| `cooldown "…"`의 반환값 | [Razor](../scripting/razor.md) | 1인가, 남은 초인가 |
| `and`의 단락 평가 | [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.H) 01.H절 | 버섯 `findtype`, `counttype`을 서 있을 때만 읽는다는 설명의 전제. Razor 문서에 없음 |
| `in`의 대소문자 구분 | [Conventions](../scripting/conventions.md#05) 05절 | 근거는 `dump-label.razor:11` 주석뿐. 인게임에서 봤다면 [Razor](../scripting/razor.md#03) 03절 함정 표로 |
| Vampiric Embrace 확인 날짜 | [Razor](../scripting/razor.md#04) 04절 | 2026-09-25는 커밋 날짜. 실제로 본 날짜인가 |
| `auto-mage.razor:1160` 인용 | [Razor](../scripting/razor.md#04) 04절 | 저장소와 이력 어디에도 없는 파일. 위치 |
| Overheads의 숫자 | [Overheads](../scripting/overheads.md#07) 07절, 09절 | 광역 바딩의 8타일과 5초, 2초. Resist 흡수 `25% x Resist/100`과 -75%(PvP의 Parrying 공식과 혼동 여부). siphon의 5분마다와 60분. reactive 25. drain의 레지 -10과 -20, 2분. Paralyze Combat 05초 |
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
| [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#02.B) 02.B절이 되풀이하는 문법 사실 | [Razor](../scripting/razor.md#03) 03절 링크로 교체 |
| "바드 쿨을 자기 타이머로 복사하지 않는다" | 세 문서에 있음. 한 곳을 정본으로, 나머지는 링크 |
| Defensive Barding과 서버 스킬 게이트([Barding](../mechanics/barding.md#02.I) 02.I절) | 모든 바드 템플릿 공통 → [PvP](../game/pvp.md)로 이동 |
| [Open items](open-items.md#14) 14절의 "loadout 배치" 행 | 이 템플릿 이야기 아님. Conventions나 Hotkeys로 옮길까 |
| 2026-09-29에 바꾼 루프(교전과 이동 분기, 하우스키핑 시계, peace 대기, 한 줄로 접은 게이트) | 2026-10-10 모듈 조립 뒤 인게임 확인 목록은 14절. 교전과 이동은 있음, 하우스키핑 시계와 peace 대기와 한 줄로 접은 게이트는 없음. 14절에 추가할까 |

::part[보류]

## <a id="07"></a>07 미뤄 둔 것

사용자가 그대로 두라고 한 것(2026-09-29 결정). 답이 아닌 순서 대기.

| 무엇 | 남은 일 |
| --- | --- |
| archive/hally-mage | `[ cure pot, on ]`(290)을 아직 띄움 → 프로필 줄과 중복. `[ pvp, on ]`이 234(공통 pvp는 290). 읽는 무기 바 `Halberd` `Battle Axe` `Viking Sword` `Katana`가 어느 `cooldowns.xml`에도 없음. 2026-10-10 archive로 이동, 다시 쓸 때 수정 |
| indian angus nom, kit, pay | [Hotkeys](../game/hotkeys.md#03) 03절의 summoner 캐릭터는 nomeehej 하나뿐. gumps 파일 serial로 보면 이 셋도 summoner(추정). 그렇다면 Bard Necro 칸: 1 2 3은 Disco, Peace, Provo, F1은 bard-necro-enhanced |

::part[벌목과 PvP 실험]

## <a id="08"></a>08 벌목과 PvP, 자동화 전에 확인할 것

2026-10-01 후속 관찰과 근접 중심 설계 반영. 확인된 자기 TK 공용 쿨과 두 클라이언트 관찰은 [PvP](../game/pvp.md#04) 04절.
아래는 그 결과로도 아직 못 정하거나 고쳐야 할 부분.

### <a id="08.A"></a>08.A TK와 Reflect 추가 확인 범위

A 공격자, B 대상의 통제 시험. 매번 화면 주인 기록.

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 시작 상태 | 처음엔 A의 Reflect 끔, 양쪽 TK 제한이 끝난 상태에서 시작 | B의 Inscription 값과 Reflect 상태 기록 | 확인되지 않았다 |
| A → B TK | A가 B에게 TK | 직후 양쪽 Journal과 B의 Reflect 기록. A에게 TK를 받았다는 안내가 오는지, B에게 건 사람이 뜨는지 | 확인되지 않았다 |
| 포션 부착 | 별도 시행. A가 B에게 포션을 던지고 B가 움직임 | 실제 부착 여부 | 확인되지 않았다 |
| 반대 방향 포션 | 모든 TK와 포션 제한이 끝난 뒤 반대 방향으로 새 시행 | 실제 부착 여부 | 확인되지 않았다 |
| 비교군 | Reflect 없는 B, A의 자기 TK를 각각 시험 | 마지막으로 걸거나 붙인 때부터 계측. 포션이 붙으면 대상 제한이 새로 시작 | 확인되지 않았다 |
| Inscription | Inscription 0과 높은 경우를 나눔 | "첫 반사 뒤에도 남음"과 "전혀 반사되지 않음"을 양쪽 화면으로 구분 | 확인되지 않았다 |
| 네 경우 | 자기 TK만, 내가 상대에게만, 상대가 나에게만, 양쪽 동시를 따로 시행 | 양쪽 Journal, 실제 대상 serial, 시도와 응답 시점 기록. 캐릭터 이름이 화면 주인인지 시전자인지 구분 | 확인되지 않았다 |
| 거짓 성공 | 취소, 실패, 대상 변경, 응답 지연, 남은 옛 메시지, 수동 TK 핫키 개입을 하나씩 넣음 | 거짓 성공이 없는지 | 확인되지 않았다 |

#### 메모

- 이번 실험의 "TK로 Reflect가 사라지지 않음" 결과는 미확인으로 되돌리지 않음
- 화면 관찰을 서버 내부로 넓히지 않음. "어떤 조건에서도 반사 판정을 완전히 건너뜀"이나 포션 부착의 소유권은 화면만으로 결정 불가
- 실험 전에도 운영 결론은 같음: TK를 Reflect 제거나 공짜 자기 TK 수단으로 쓰지 않음

### <a id="08.B"></a>08.B 자동화 전에 남은 것

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 직접 serial 적용 | 직접 serial을 쓴 alt TK, Explosion에서 EB로 잇기 | 적용됨. 정본은 [Razor](../scripting/razor.md#03.A) 03.A절 | 인게임 확인됨 2026-10-04 |
| 플레이어 조회 | 플레이어 find | find 실패, 변수 비교 방향 문제, 조회마다의 제한. 정본은 [Razor](../scripting/razor.md#03.A) 03.A절 | 인게임 확인됨 2026-10-04 |
| Range check | 실행 중 `Range check Last Target` | ON, 12타일 | 인게임 확인됨 |
| 수동 Last Target | 거리 밖에서 안으로 들어올 때 수동 Last Target | 커서를 쥐었다 놓는지 | 확인되지 않았다 |
| 진단, 바디 ID | 바디 ID를 넣은 findtype 비교 | 검색이 플레이어를 빠뜨리는 원인 | 확인되지 않았다 |
| 진단, 거리 | 실제 거리를 기록하며 되풀이하는 검사 | 검색이 플레이어를 빠뜨리는 원인 | 확인되지 않았다 |
| 진단, NPC label | NPC getlabel | label이 안 온 이유 | 확인되지 않았다 |
| 자기 TK, 받은 TK의 바 | 내가 나에게 TK, 또는 적의 TK를 받음 | target 바가 켜짐. 적의 TK를 받아도 공통 안내, me 바, target 바가 생길 수 있음. 사용자 후속 보고 | 인게임 확인됨 |
| 받기만 한 시행 | 적의 TK를 받기만 함 | 절대 점화하지 않음 | 확인되지 않았다 |
| TK를 건 사람, 문구 | 화면 주인별 고정 문구 검사 | 나에게 TK를 건 사람 구분 | 확인되지 않았다 |
| TK를 건 사람, name | name 표현식 시험 | 문자열 동적 조합 가능 여부 | 확인되지 않았다 |
| 동시 TK | 양쪽이 동시에 걸어 모호함 | 점화하지 않음 | 확인되지 않았다 |
| Reflect 소진 | 첫 반사로 소진, 첫 반사 뒤에도 남음, 두 번째에 소진으로 나눠 시행 | 공격자 Journal 수집. 소진 전용 문구가 있는지 | 확인되지 않았다 |
| Bless, Magery 80 | Magery 80에서 Bless만 | STR, DEX, INT, 최댓값, 현재 마나 기록. 공식값 +8.8의 정수 처리 구분 | 확인되지 않았다 |
| Bless 마나 | 같은 시행 | Bless 비용 9와 스크롤로 꺼내는 데 필요한 실제 마나 50 조건 구분 | 확인되지 않았다 |
| Bless, Magery 100 | Magery 100에서 Bless | `changed by 11`로 +11. [12절](#12) | 인게임 확인됨 2026-10-09 |
| 스탯 포션과 Bless | 포션이 걸린 동안 Bless | 안 겹침. Bless의 STR, DEX는 더해지지 않음. [Combat](../mechanics/combat.md#02.D) 02.D절 | 인게임 확인됨 2026-10-21 |
| 붕대 시간 | 포션 뒤 DEX 100에서 붕대 | 10초 | 확인되지 않았다 |
| GA, Norse | STA 100에서 GA와 Norse | GA 3초, Norse 1.5625초 | 확인되지 않았다 |
| 마지막 스윙 | 무기 교체 | 공유하는 마지막 스윙 기록 | 확인되지 않았다 |
| 피격 뒤 스태미나 | 피격 | 스태미나 감소량 기록 | 확인되지 않았다 |
| 재생량 | 가죽과 Meditation 0에서 30초 | 30초 동안의 재생량 기록 | 확인되지 않았다 |
| 이동 중 견제 | 이동 중 6타일에서 시전 시작 | 이동 차단 옵션, LOS, 시전 종료 시 거리, 상대 이동 속도, 실패 뒤 재시도 기록 | 확인되지 않았다 |
| Harm 거리 | 5타일 이상에서 Harm | 피해 감소와 접근 지연 비교 | 확인되지 않았다 |
| 피해 계산 | 같은 상대와 장비로 Eval 0과 100, Tracking 유무, RA 유무를 나눠 계측 | 경우별 실측. 계산 중간값을 실측 평균처럼 적지 않음 | 확인되지 않았다 |
| Reflect 재시전, 시작 | PvP 플래그 중 Reflect | 제한 시작 시점이 시전, 첫 반사, 마지막 소진 중 어디인지 양쪽에서 기록 | 확인되지 않았다 |
| Reflect 재시전, 안내 | 플래그 전환 | 플래그 전환과 남은 시간 안내를 양쪽에서 기록 | 확인되지 않았다 |

#### 기록

- 2026-10-04 bard-necro-pvp에서 공통 바 기반 자동 점화 블록 삭제. 실제 포션은 손으로 투척
- 2026-10-05 공격을 수동으로 전환, 상대 조회와 자동 공격을 루프에서 삭제
- v5: 보통의 수동 입력을 기다리고, 긴급 회복이 준비되면 수동 주문을 끊었음([PvP Loop](../loops/pvp.md))
- v6: 수동 입력 중단 삭제([10절](#10))

#### 메모

- 새 자기관리 루프 확인은 [10절](#10). 예전 자동 공격의 캐시와 후속 주문 시험은 지금 동작에 불필요
- 검색이 플레이어를 빠뜨리는 내부 원인은 모름 → 진단 핫키 유지
- 응답 대기 뒤 새 안내와 같은 대상만으로 성공 처리 금지. 독립된 성공 신호가 없으면 자동 점화 보류
- me 바는 `applied telekinesis to you`만 읽음. 확인된 공격 TK를 me 바만 보고 취소하지 않음
- Harm 반사 피해와 Spell Siphon 표시는 소진 전용 신호가 아님. 소진 전용 문구가 없으면 스크립트에서 확정 상태로 만들지 않음
- 공식 설명상, 완료한 프리캐스트를 쥔 채 포션을 마시면 주문 취소. 자체 자기 시전 중 새 수동 입력이 겹치는 경우는 [10절](#10)
- 출발 스탯 지금 안은 100, 80, 45. 벌목 핸드북의 표는 공식에 값을 넣은 계산
- 시전 시작 거리 6타일은 설계 초안, 최대 사거리 아님
- [Lumberjack PvP](../templates/lumberjack-pvp.md#07) 07절은 Tracking의 주문 보조를 뺀 비교 모델
- Reflect 재시전 제한은 2026 공식 패치에서 PvP 플래그 중 60초

### <a id="08.C"></a>08.C 포션 부착과 실패 복구

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 플레이어 부착 | 30초 안내가 뜨는 플레이어 대상에 포션 | 실제 부착 메시지, 이동 추적, 피해 | 확인되지 않았다 |
| PvP 부착 문구 | PvP에서 포션 부착 | 60초 안내 화면의 `Your explosion potion sticks to your target.`을 PvP에서도 받는지 | 확인되지 않았다 |
| 시각 계측 | 점화부터 폭발까지 | 점화, 커서 생성, 투척, 부착, 폭발 시각을 따로 계측 | 확인되지 않았다 |
| 점화 뒤 실패 | 점화 뒤 대상 이탈, LOS 차단, 대상 사망이나 변경 | 내 포션 커서가 남은 경우에만 땅에 던져 버림 | 확인되지 않았다 |
| 땅에 던지기 | 유효와 무효 위치, 높이, 벽, 발밑, 이동 경로별 | 투척 완료 신호, 실제 폭발 위치와 반경 기록 | 확인되지 않았다 |
| 복구 방해 | 커서 취소, 자동 회복 개입, 부착 메시지 누락 투입 | 다른 커서를 써 버리지 않음. 같은 실패에서 포션을 또 점화하지 않음 | 확인되지 않았다 |
| Splashback | Splashback 발생 | 지금 피해 분담과 반경 | 확인되지 않았다 |

#### 메모

- 화면의 5, 4, 3, 2만으로 정확한 퓨즈나 네트워크 여유 시간을 정하지 않음
- 회수나 재타겟이 되더라도 퓨즈가 처음으로 돌아간다고 가정하지 않음
- 실험 전에는 완전 자동 공격 TK 확인, 안전한 자동 폭탄 폐기를 구현됐다고 적지 않음
- 받은 TK만으로 점화 = 기능 실패. 확인된 공격 TK를 me 바 하나 때문에 취소하는 것도 별개의 판정 오류

::part[인게임 확인]

## <a id="09"></a>09 lumberjack-enhanced 인게임 확인

지금 v18. 설정, 상태, 타이머, 반영 절차의 정본은 [Lumberjack Enhanced](../loops/lumberjack-enhanced.md).

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 기본 채집, v8 | v8로 채집 | 정상 동작. 사용자 보고 | 인게임 확인됨 2026-10-05 |
| 빈손 장착, v9 | 손이 빈 채 v9 실행 | 백팩 도끼를 장착하지 않음. 보고 | 인게임 확인됨 2026-10-05 |
| 정리 뒤 채집, v11 | v11로 목재 가공과 파우치 이동 | 채집이 멈추고 Logs가 남음. 화면의 오류 문구와 줄 번호는 모름 | 인게임 확인됨 2026-10-05 |
| 정리 반복, v12 | v12로 목재 정리 | BEGIN 뒤 convert만 반복 | 인게임 확인됨 2026-10-05 |
| 정리 종료, v13 | v13으로 목재 정리 | 사용자 Journal에 v13의 END와 채집 응답 | 인게임 확인됨 2026-10-05 |
| 엔진 범위 처리 | if 안의 break가 든 반복문 | 실제 Outlands 내부 동작이 CE 원본 재현과 같은지 | 확인되지 않았다 |
| 같은 Boards 반복 | 두 번 정리 | 같은 Boards serial이 이동 대상으로 반복, 일부 미이동. 보고 | 인게임 확인됨 |
| 직접 serial의 ignore | 지금 포크에서 직접 serial 검색 | ignore가 적용되는지 | 확인되지 않았다 |
| Smart Harvest 순서 | Hatchet 하나만 준비 | 손 슬롯 확인 → Use item in hand → target self 순서로 채집 | 확인되지 않았다 |
| 빈손 장착 | 빈손, 백팩에 도끼 | `var__my_hatchet`으로 장착, 다음 시도에서 왼손 serial 일치. sysmsg ON의 `Hatchet equip requested` 줄은 요청 기록일 뿐, 성공 증거 아님 | 확인되지 않았다 |
| 무게 한도 장착 | 무게 한도에서 빈손 | 빈손 장착이 됨 | 확인되지 않았다 |
| 장착 예외 | 장착 거절, 도끼 파손, 교체, 장착 상태에서 재실행 | 백팩에만 도끼가 있는데 장착으로 판정하면 실패 | 확인되지 않았다 |
| 다른 손 장비 | 왼손이나 오른손에 다른 장비 | 다른 왼손 장비만 비움, 오른손 장비는 수동 처리 | 확인되지 않았다 |
| 늦은 중립 커서 | 1초 뒤 중립 커서 도착 | 3초 타임아웃 안에 같은 블록에서 처리. 도구 큐가 남아도 자기 타깃 전송 | 확인되지 않았다 |
| 커서 무응답 | 3초 동안 응답 없음 | 자기 타깃을 보내지 않고 다음 요청을 4초 더 미룸 | 확인되지 않았다 |
| 기존 커서 | 커서가 이미 있음 | 새 채집 요청은 미루고 루프는 계속 | 확인되지 않았다 |
| 대기 중 수동 입력 | 대기 중 수동 입력과 중립 커서가 겹침 | 겹칠 때의 동작 기록 | 확인되지 않았다 |
| v17 반복 없음 | v17로 회복, 버프, 시약 | 재시도 타이머 없이도 같은 행동이 패스마다 반복되지 않음 | 확인되지 않았다 |
| 워모드 | 워모드 ON | 회복 주문과 버프 정지, 포션은 계속, 음식은 쉼 | 확인되지 않았다 |
| 리콜 결정 | 리콜 결정 | 버프 정지. 재실행 전까지 재개 없음 | 확인되지 않았다 |
| 버프와 손실 | 손실 15 이상 | 버프를 시작하지 않음, 시전 중이면 끊김 | 확인되지 않았다 |
| 시약 읽는 순서 | 시약 읽기 | 자동 리콜 뒤에 읽어 Tracking 줄을 먼저 확인 | 확인되지 않았다 |
| `[ refresh, out ]` | v17로 실행 | 이제 안 뜸 | 확인되지 않았다 |
| v18 로드 | 실행 | 먼저 `Lumberjack enhanced v18 loaded` | 확인되지 않았다 |
| 블록별 타이머 | v18 실행 | 음식 60초마다, 목재 정리 2분마다, 리콜의 책, Hunting, 무게 점검 5초마다, 각자의 타이머 | 확인되지 않았다 |
| 음식 | 다침, 독, 리콜 결정 중 | 그래도 먹음 | 확인되지 않았다 |
| 채집 보류 | 책 필수인데 책 없음, 또는 감지 리콜인데 Hunting 없음 | 빈손 장착, 채집, 목재 정리 모두 대기 | 확인되지 않았다 |
| 보류 해제 | 책을 넣거나 Hunting을 켬 | 다음 5초 점검 뒤 재개 | 확인되지 않았다 |
| 자원 없음 재시도 | 주변 자원 없음 원문과 `[ harvest, out ]` | 약 2초 지나 도구 요청. 실제 간격과 응답 소비 기록 | 확인되지 않았다 |
| 새 장소 | 새 장소에서 요청 | 다음 간격은 기본 4초로 복귀 | 확인되지 않았다 |
| 자원 없음 반복 | 자원 없음이 반복 | 응답마다 2초 | 확인되지 않았다 |
| 2초 대기 중 | 대기 중 회복, 기존 커서, 시전, 이동 바, 리콜 결정 | 회복은 계속, 기존 커서, 시전, 이동 바, 리콜 결정은 존중 | 확인되지 않았다 |
| 다른 거절 | 여행 제한, 수확 실패, 채집 불가 | 자원 없음으로 처리하면 실패 | 확인되지 않았다 |
| 출력 조합 | `config__chatty`와 `config__sysmsg`의 네 조합 | 골라 켜는 오버헤드와 Journal 진단이 독립적으로 움직임 | 확인되지 않았다 |
| 출력 둘 다 끔 | `config__chatty`, `config__sysmsg` 둘 다 끔 | 도끼와 파우치 부족 경고, 프로필의 채집 결과는 남음 | 확인되지 않았다 |
| 정리 조립 | `pack/lumber`를 넣은 조립과 뺀 조립, 2분과 3분 주기 | 각 경우의 동작 기록 | 확인되지 않았다 |
| 파우치 | 파우치를 처음 고를 때, 뺄 때, 용량 부족 | 각 경우의 동작 기록 | 확인되지 않았다 |
| Logs 가공 | 일반 Logs와 특수 Logs | Boards로 가공. 기존 Boards와 합쳐져도 새 묶음 이동 | 확인되지 않았다 |
| 보관한 Boards | 이미 파우치 안의 Boards | 제외하고 계수 | 확인되지 않았다 |
| 정리 실패 | 가공이나 이동 실패 | 반복 루프 없이 다음 주기로 | 확인되지 않았다 |
| 정리 연기 | 수동 커서, 시전, 피해, `var__hold_gathering`(리콜 결정, 책 없음, Hunting 없음) | 정리 연기. 처리 중 상태가 바뀌면 다음 묶음 전에 양보 | 확인되지 않았다 |
| 정리 예산 | 가공과 이동 각 2.5초 예산이 끝남 | 남은 목재는 다음 주기로, 채집 재개 | 확인되지 않았다 |
| 정리 로그 | v18 loaded 확인 뒤 sysmsg로 정리 | `Lumber pack BEGIN`, convert와 skip과 move request, END, 큐와 커서 안내 기록. 기존 파우치의 Boards는 skip만 | 확인되지 않았다 |
| 실제 이동 | 정리 뒤 백팩과 파우치의 실제 묶음 수량 확인 | v14의 실제 이동 성공. move request는 완료 증거 아님 | 확인되지 않았다 |
| 합친 뒤 다음 주기 | 같은 hue로 합쳐진 뒤 다음 주기 | 새 Boards만 들어 올림 | 확인되지 않았다 |
| 거절된 이동 | 이동 거절 | 다음 주기에 재시도 | 확인되지 않았다 |
| BEGIN과 END | 다른 색, 큐 지연, 목재 없음, 이미 보관한 Boards | 한 번 정리에 BEGIN 한 번, END까지 도달 | 확인되지 않았다 |
| Play 실행 | Play로 실행 | Script Error, Line 번호, Script finished 문구 기록 | 확인되지 않았다 |
| 500ms 대기 | 정리 | 실제 서버 인벤토리 갱신에 500ms 대기가 충분한지 기록 | 확인되지 않았다 |
| `escape/tracking` 있음 | 넣은 조립 | 확인한 Hunting 재사용, 필요할 때만 시작 설정 | 확인되지 않았다 |
| `escape/tracking` 없음 | 뺀 조립 | 시작 설정도 없음 | 확인되지 않았다 |
| Tracking만 뺌 | `escape/recall`은 두고 Tracking 블록만 뺀 조립 | 조립기 정지. `escape/recall`이 Tracking 블록의 상태를 읽음 | 확인되지 않았다 |
| `escape/recall` 없음 | 뺀 조립 | 리콜용 감지, 책, 여유 무게 조회 없음 | 확인되지 않았다 |
| 뺀 조립과 red | 가까이 red | 자기 회복, 버프, 채집 계속 | 확인되지 않았다 |
| 감지 리콜 1 | recall_on_detection 1, 캐릭터에 Tracking 있음 | 이때만 Hunting 준비를 채집 조건으로 요구 | 확인되지 않았다 |
| 감지 리콜 0 | recall_on_detection 0 | Hunting 때문에 채집을 미루지 않음 | 확인되지 않았다 |
| `[ track, check ]` | recall_on_detection과 무관하게 Hunting 끔 | 뜸. Tracking 0이면 안 뜸 | 확인되지 않았다 |
| 다른 리콜 조건 | 위 설정 조합 | 무게 리콜과 책 필수 조건은 그대로 | 확인되지 않았다 |
| Tracking 필터 | 시작 | 기본 red. 지금 창의 필터 확인, 세션의 색 캐시 재사용 | 확인되지 않았다 |
| 필터 변경 | 필터를 바꿔야 함 | Hunting 먼저 끄고 최대 10개 필터를 돌며 맞춤. 설정 중 곰 같은 추적 문구를 비운 뒤 Hunting 켬 | 확인되지 않았다 |
| 필터 예외 | 다른 필터로 Hunting이 켜진 경우, Play 반복, 필터를 손으로 바꾼 뒤 Hunting을 끈 경우, 클라이언트 재시작 | 각각 동작 기록 | 확인되지 않았다 |
| 준비 실패 | 첫 응답 누락, 피해, 수동 시전 | 안전해진 뒤 재실행으로 준비 상태 복귀 | 확인되지 않았다 |
| Hunting 상태 점검 | 감지 리콜 ON, 리콜 결정 전 | 이때만 리콜 블록의 5초 점검 주기로 상태 확인. Hunting 미확인이면 채집 연기 | 확인되지 않았다 |
| grey, orange 문장 | grey와 orange 필터 | 확인 문장이 서버 문장과 일치하는지 기록 | 확인되지 않았다 |
| 거리 숫자 위치 | `spaces to target`가 든 서버 문장 전체를 받음 | 거리 숫자의 낱말 위치 확인 | 확인되지 않았다 |
| 이름 낱말 수 | 이름의 낱말 수가 달라짐 | 고정된 {n}이 같은 숫자를 가리킴 | 확인되지 않았다 |
| 감지 거리 | 45 steps와 46 steps, 거리 무관 옵션 | 각 경우의 리콜 판정 기록 | 확인되지 않았다 |
| 겹친 안내 | 감지와 같은 패스의 무게 부족, 시약 부족과 시전 끊김 안내가 함께 옴 | 감지는 무게보다 먼저 읽고, 같은 패스부터 채집 연기 | 확인되지 않았다 |
| 판정 지연 | 자기 시전, 최대 3초의 도구 커서 대기, 목재 정리 중 | 판정 지연과 입력 충돌 기록 | 확인되지 않았다 |
| 리콜 원인 | sysmsg ON | `Recall trigger` 로그로 실제 요청 원인 구분, Tracking 또는 여유 무게 | 확인되지 않았다 |
| 회복 조합 | 독, 붕대, 회복 포션, 시약 부족, 프리캐스트를 조합 | 자동 회복 직후의 커서 충돌 확인 | 확인되지 않았다 |
| 시약 갱신 | 실행 | 첫 패스와 그 뒤 10초마다 시약 갱신 | 확인되지 않았다 |
| 시약 부족 안내 | 부족 안내 | 안내를 읽은 패스에 즉시 재검색 | 확인되지 않았다 |
| Home 리콜 | 책으로 Home 리콜 | 책 충전량, 룬 이름, 지연, 실패 기록. 요청은 실행당 한 번 | 확인되지 않았다 |
| 집 접근 거절 | Home 룬으로 리콜 | 집 접근 거절은 도착 성공 아님. Home 룬의 목적지와 집 권한 확인, 실제 거절 안내 기록 | 확인되지 않았다 |
| 책 상태 | 책 없음, 뺌, 새로 넣음, 책 필수 OFF | 각각 동작 기록 | 확인되지 않았다 |
| 책과 무게 점검 | 실행 | 리콜 블록의 5초 점검 패스에서 채집 전에 | 확인되지 않았다 |
| 요청 직전 책 없음 | 리콜 요청 직전 책이 사라짐 | 캐시를 0으로, 다음 점검까지 재검색 없음 | 확인되지 않았다 |
| 준비 포션 | 실행 | 준비용 Strength 포션, Agility 포션은 안 씀 | 확인되지 않았다 |
| 리콜 요청 미룸 | 마나 부족, 기존 수동 커서, 이동 때문에 요청을 미룸 | 채집은 정지, 회복은 계속 | 확인되지 않았다 |
| 늦은 거절 | 전송 뒤 늦은 거절 | 알림. 같은 실행에서 재전송이나 채집 재개 없음 | 확인되지 않았다 |
| 5초 경과 | 전송 뒤 5초 경과 | 결과 안내나 도착 상태를 만들지 않음. 새 요청은 재실행으로 시작 | 확인되지 않았다 |
| Heat of Battle | Heat of Battle 버프 중 리콜 | 버프만으로 명령 전송을 막지 않음. 실제 허용 여부와 서버 문구 기록 | 확인되지 않았다 |
| 채집 결과 프로필 | default와 summoner 프로필에서 각각 채집 | 일반 logs와 특수 목재의 종류 표시, 수확 실패, 두 배 수확 | 확인되지 않았다 |
| summoner 전용 줄 | summoner 프로필 | 스킬 확률과 스킬 상승, 주변 자원 없음 줄은 summoner에만 | 확인되지 않았다 |
| 재질 표시 | 채집 | 재질은 `You chop some`으로 찾고 서버 문장 전체의 {4} 표시 | 확인되지 않았다 |
| 고갈 | 자원 고갈 | 고갈 안내 → 다음 장소로 이동 | 확인되지 않았다 |
| 거절 안내 | 이동 제한, 주변 자원 없음, 채집 불가 | 안내가 한 번씩 뜸 | 확인되지 않았다 |
| 60초 제한 | 실제 이동 뒤 | 서버의 60초 제한과 스크립트의 4초 명령 재시도 간격 구분. 거절 메시지를 받은 때부터 60초를 새로 세지 않음 | 확인되지 않았다 |
| 쿨다운 바 | 지금 캐릭터로 heal pot, walk, reflect | 실제 트리거 확인. 없거나 다르면 그 캐릭터만 나중에 수정 | 확인되지 않았다 |
| 필터 확인 실패 | 감지 리콜 ON, 필터 확인 실패 또는 고른 필터와 다른 필터 | `[ track, miss ]`나 `[ track, check ]`, 채집 보류 | 확인되지 않았다 |
| 설정 실패 중 회복 | 처음 Tracking 설정을 못 마침 | 회복은 계속 | 확인되지 않았다 |
| 오래 채집 | Tracking 설정 뒤 오래 채집 | Tracking 창이나 필터 버튼을 다시 건드리지 않음 | 확인되지 않았다 |
| 전체 필터 문장 | `tracking_color` 4로 재실행 | 전체 필터의 확인 문장 기록 | 확인되지 않았다 |
| 리콜 없이 Tracking | `escape/recall`은 빼고 `escape/tracking`은 둔 조립 | Tracking 시작 설정은 실행 | 확인되지 않았다 |
| 도끼 없음 | 손과 백팩 모두 도끼 없음, 또는 도끼 하나만 | 없으면 `[ hatchet, out ]`. 하나만 있으면 수량 경고 없이 채집 | 확인되지 않았다 |
| hue별 묶음 | 정리 뒤 인벤토리 확인 | 같은 hue는 합쳐지고 다른 hue는 따로 남음 | 확인되지 않았다 |
| 결과 중복 없음 | 채집 성공, 수확 실패, 두 배 수확 | 프로필만 표시. 스크립트가 같은 결과를 또 띄우면 실패 | 확인되지 않았다 |
| 회복 우선 | 독, 보통 피해, 큰 피해 | 채집보다 해독과 회복 먼저 | 확인되지 않았다 |
| 회복 자원 부족 | Cure 포션, 붕대, Heal 포션 부족 | `[ cure pot, out ]`, `[ bandage, out ]`, `[ heal pot, out ]` | 확인되지 않았다 |
| 워모드 채집 | 워모드 ON | 채집 보류 | 확인되지 않았다 |
| 리콜 알림 | 리콜 요청, 읽은 서버 거절, 마나 부족 | 각각 `[ recall, on ]`, `[ recall, blocked ]`, `[ mana, low ]` | 확인되지 않았다 |
| 전송 뒤 회복 | RecallCharge 전송 뒤 | 회복은 계속, 채집은 재실행까지 보류. 실제 도착은 화면으로 확인 | 확인되지 않았다 |
| 무게 리콜 | 무게 리콜 켬(기본)과 끔 | 켬: 다음 채집 전 5초 점검에서 `[ weight, low ]` 뒤 채집 정지와 리콜 요청. 끔: 여유 조건으로는 정지 없음 | 확인되지 않았다 |
| 실제 무게 한도 | 실제 남은 무게 0 이하 | 채집 보류 | 확인되지 않았다 |
| 음식 조건 | Food Satisfaction 버프 있음, 기존 커서, 시전, 큐 | 버프가 있으면 안 먹음. 먹는 동작이 기존 커서, 시전, 큐를 덮으면 실패 | 확인되지 않았다 |
| 서버 저장 | 저장 시작과 완료 알림 | 알림은 기존 프로필 담당. 스크립트에 저장 상태나 저장 문구에 따른 정지와 재개 분기 없음 | 확인되지 않았다 |

#### 기록

- **v10**: 빈손이면 저장한 `var__my_hatchet` 장착, 실제 왼손 serial 일치 확인. 목재 가공과 파우치 정리는 그대로
- **v10**: 도끼 장착에는 책, Hunting, 무게 준비 불필요. 도구 사용, 커서 대기, 자기 타깃은 같은 채집 블록에서 처리, 별도 pending 상태 없음
- **v10**: 리콜용 책, Hunting, 무게 점검은 기존 housekeeping 주기 재사용. 경과만 알리던 응답 타이머와 안내 상태 삭제. Tracking 시작 설정과 자동 리콜 판정은 계속 분리
- **v11**: 목록과 foreach 삭제, 작업 예산과 횟수 제한. 순서: 생존, 자동 리콜, 채집, 자기 버프, housekeeping. 집 문과 Stockpile 코드 삭제
- **v12**: 네 겹의 채집 조건을 차단 사슬로 정리, 큐가 남았을 때만 대기, 진단 출력은 sysmsg로 분리
- **v12**: CE 원본의 제어 흐름 재현 결과, if 안의 break가 반복문 범위를 남겨 바깥 for 2를 Logs 단계로 되돌리는 경로 발견
- **v13**: 목재 검색과 큐 대기를 조건으로 끝나는 while로 교체, break와 continue 삭제. 새 상태나 타이머 없음. 기존 모의 검사가 엔진의 범위 처리를 놓침
- **v14**: 파우치에 든 것인지를 ignore 전에 가림, 이미 보관한 Boards는 skip, 나머지는 move request로 기록
- **v14**: 검색의 ignore 적용과 미적용 두 경우 모두 병합과 다음 주기 재시도까지 모의 검사
- v15: 자원 없음 뒤 2초 재시도
- 2026-10-10 v17: 모듈 조립으로 회복, 버프, 시약을 pvp와 같은 모듈로 교체([Modules](../scripting/modules.md#08) 08절)
- 2026-10-10 v18: housekeeping 주기 삭제. 리콜 블록은 자기 5초 주기, 음식과 목재 정리는 각자의 타이머를 패스마다 확인
- 2026-10-10 `[ track, check ]`를 `escape/tracking`이 띄우기 시작

#### 메모

- 책과 Hunting 조건은 리콜 결정과 함께 `var__hold_gathering` 하나로 채집과 목재 정리를 세움([Modules](../scripting/modules.md#08) 08절)
- v9의 실제 검색 범위와 실패한 가드는 모름 → 레이어 문법 오류로 단정하지 않음
- Tracking 거리 오버헤드는 사용자 요청으로 지금 매핑 유지
- 공식 문서상 Heat of Battle은 Recall도 제한. 규칙의 정본은 [PvP](../game/pvp.md#01) 01절
- 확률 숫자를 실제 스킬 상승으로 읽지 않음
- 채집 결과 매핑의 정본은 [Overheads](../scripting/overheads.md#07) 07절

## <a id="10"></a>10 공통 pvp의 자기관리와 무기 장착 인게임 확인

`combat/pvp` 지금 v10. 설정, 변수, 타이머, 커서 처리의 정본은 [PvP Loop](../loops/pvp.md).
반영은 Scripts 탭에서 Stop → Reload all scripts → Play로 먼저 확인. 외부에서 고친 뒤 기존 핫키로 돌리면 클라이언트 재시작([Workflow](../working/workflow.md#04.A) 04.A절).

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 옵션 조합 | 레시피에서 Magery와 붕대를 각각 0과 1로, 무기 블록 둘과 그 설정을 넣거나 빼서 재조립 | `[ pvp, on ]`과 `PvP sustain v10 loaded`. 꺼 둔 기능을 요청하면 실패 | 확인되지 않았다 |
| 시작 자기 TK | 무기를 들고 이동 중 F4. 워모드 ON과 OFF에서 각각 | 첫 주문의 Journal은 `Opening: Telekinesis on self requested.`. 커서 종류, 서버 수신 문장의 내 이름, 적용 시각 확인. 요청 표시만으로 성공 판정 금지 | 확인되지 않았다 |
| 이미 받은 TK | `teleki, me` 바가 도는 동안 시작 | 자기 TK 재요청 없이 버프와 회복 계속. 바가 끝나도 같은 Play에서 자동 반복 없음 | 확인되지 않았다 |
| 시작 TK 보류 | 커서나 시전, 큐, 은신, 마비 또는 자원 부족 상태에서 시작하고 해제 | 기존 입력 유지. 조건이 풀리면 자기 TK 한 번, 이동 때문에 실패한 경우 서버 문장과 시각 기록 | 확인되지 않았다 |
| 자기 TK와 수동 대상 | Q 선택 전과 후에 각각 F4 | 자기 TK 뒤 Q와 Last Target이 가리키는 대상을 기록. 자기 TK가 상대에게 나가면 실패 | 확인되지 않았다 |
| Q와 Tab, 공격 요청 | Q로 alt나 NPC 고르기, Q 바꾸기, Tab ON과 OFF | 상대 TK, 공격 주문, 소환수 공격, 근접 공격 요청, Hamstring 토글을 보내지 않음. 서버의 기존 자동공격과 수동 요청은 구분 | 확인되지 않았다 |
| Q와 Tab, 조회 경고 | 같은 조작 | 상대 find, dead, getlabel 제한 경고가 뜨면 실패 | 확인되지 않았다 |
| 무기 복구, 상대 없음 | 상대를 고르지 않고 손의 무기를 벗김 | 기억한 무기 복구 | 확인되지 않았다 |
| 회복 순서 | 피해, 독, 마비, 낮은 STA | 파우치, Cure 포션, 힐 포션, GH 에이전트, 붕대, 가벼운 Heal 순서. 기본 손실 35부터 포션, 포션이 못 나가면 GH | 확인되지 않았다 |
| 가벼운 Heal, 옵션 0 | `use_light_heal` 0, 붕대 중 | 가벼운 Heal이 나가면 실패 | 확인되지 않았다 |
| 가벼운 Heal, 옵션 1 | `use_light_heal` 1, 붕대 중 | 붕대와 함께 가벼운 Heal | 확인되지 않았다 |
| Cure 포션 우선 | Cure 포션이 하나라도 있음 | Cure 에이전트를 쓰지 않음 | 확인되지 않았다 |
| Heal 경로 | Healing이나 붕대가 없음 | Heal 경로 확인 | 확인되지 않았다 |
| 보급품 부족 | 파우치, Cure 포션, 힐 포션, 붕대 부족 | `[ pouch, out ]`, `[ cure pot, out ]`, `[ heal pot, out ]`, `[ bandage, out ]`. 진행 중인 붕대를 반복해 시작하면 실패 | 확인되지 않았다 |
| 꺼 둔 기능 | Magery OFF, 붕대 OFF | 꺼 둔 기능의 자동 요청 없음 | 확인되지 않았다 |
| 자동 반복 없음 | 버프 옵션 | RA와 Reflect와 Protection만 유지. 시작 TK는 한 번, Bless와 Arch Protection, 시폰, 버섯, 자기 MA 자동 반복 없음 | 확인되지 않았다 |
| Resist 포션 | Resist 버프가 빠짐 | 다음 패스에 Resist 포션 | 확인되지 않았다 |
| Strength, Agility 포션 | STR과 DEX가 기준선 아래로 | 다음 패스에 Strength 포션과 Agility 포션 | 확인되지 않았다 |
| RA, Reflect, Protection 재시전 | 각각의 버프가 빠짐 | 빈 창에서 바로 다시. Protection이 커서를 열면 자기에게, 남는 커서 없음 | 확인되지 않았다 |
| 스탯 포션 하나 소진 | 스탯 포션 하나가 떨어짐 | 나머지는 계속 | 확인되지 않았다 |
| 아군 Bless | `config__str_potion`과 `config__dex_potion`을 실행 캐릭터의 기본값 + 20으로, 아군 Bless가 걸린 채 교전 | 힘 포션과 민첩 포션이 한 번씩. 마신 뒤 5초마다 다시 눌리면 선이 높음 | 확인되지 않았다 |
| 스탯 저하 주문 | 포션 도는 동안 Curse, Weaken, Clumsy에 맞음 | 거절 메시지는 5초에 한 번만 | 확인되지 않았다 |
| 걷는 중 버프 | 걷기와 워모드 ON을 함께 | RA, Reflect, Protection 시도. 서버가 이동으로 끊는지 기록 | 확인되지 않았다 |
| 긴급 손실과 버프 | 긴급 손실 | 버프를 시작하지 않음, 시전 중 그 선에 닿으면 끊음 | 확인되지 않았다 |
| 시작 전 시전 | 수동 시전 중, 커서가 뜨기 전에 시작 | 포션은 나감 | 확인되지 않았다 |
| 시작 전 커서 | 수동 시전, 프리캐스트, 포션, 소환수 커서를 쥔 채 시작 | 기존 커서 보호, 마비 파우치 외 모두 대기. 커서 종료를 공격 성공으로 해석하면 실패 | 확인되지 않았다 |
| 긴급 HP, 수동 시전 | 손실 35 이상에서 수동 시전 | 포션은 나가고, GH는 시전이 끝난 다음 패스에. 스크립트가 수동 시전을 끊으면 실패 | 확인되지 않았다 |
| 긴급 HP, 공격 커서 | 긴급 HP에서 완료한 공격 커서를 쥠 | 포션과 GH 모두 대기, 커서를 놓은 다음 패스에. 스크립트가 커서를 끊으면 실패 | 확인되지 않았다 |
| 시전 중 포션 | 시전 중 포션을 마심 | 주문이 실제로 안 끊기는지 기록 | 확인되지 않았다 |
| 커서 쥔 채 포션 | 커서를 쥔 채 포션을 마심 | 주문이 취소되는지 기록 | 확인되지 않았다 |
| 자기 시전 폴링 | 시작 TK, 에이전트, RA, Reflect, Protection 시전 | 각 주문의 커서나 시전 종료, 끊김 줄을 처리하고 다음으로. 요청과 서버 성공 구분 | 확인되지 않았다 |
| 만피 커서 | 에이전트가 만피에서 beneficial 커서를 남김 | 그 커서만 취소. 스크립트는 커서에 응답하지 않음 | 확인되지 않았다 |
| 손 커서 | 손으로 harmful이나 neutral 커서를 엶 | 취소하거나 자기 타깃으로 쓰면 실패 | 확인되지 않았다 |
| 버프 중 긴급 HP | RA, Reflect, Protection 시전 중 긴급 HP | `> Interrupt` 뒤 다음 패스에 회복 | 확인되지 않았다 |
| 에이전트와 Q | 에이전트 시전 | Q 선택과 수동 Last Target에 주는 영향 확인 | 확인되지 않았다 |
| 첫 실행 긴급 아이템 | 첫 실행, 보급품 보충 직후 | 시작 TK의 시도나 보류 뒤 필요한 마비 파우치, Cure 포션, 힐 포션 처리. TK가 회복을 얼마나 늦추는지 기록 | 확인되지 않았다 |
| 시약 조회 생략 | Magery OFF, 그 주문이 불필요, 최소 마나 미달 | 시약 조회 없음 | 확인되지 않았다 |
| 시약 보충 | 시약 없는 상태에서 넣음 | 다음 회복이나 버프 점검에 반영. 보충은 10초 안에 반영 | 확인되지 않았다 |
| 시약 소진 | 시약이 떨어짐 | `More reagents are needed` 직후 플래그가 바뀌어 같은 주문 반복 없음 | 확인되지 않았다 |
| 붕대 재고 변화 | 붕대를 빼거나 채움 | 진행 중인 붕대는 유지, 다음 점검의 Heal 대체 조건은 실제 재고를 따름 | 확인되지 않았다 |
| 빈 스탯 포션 | STR과 DEX가 기준선 이상, Resist가 있거나 포션이 없음 | 스탯 포션 블록에서 대기 없이 무기 단계로 | 확인되지 않았다 |
| 자기 주문 순서 | 기본값 | 시작 TK 뒤 Cure, 큰 피해의 GH, 붕대 대체 Heal. 회복이 끝난 패스에서 스탯 포션, RA, Reflect, Protection 차례. 폴링 종료를 주문 성공으로 해석하면 실패 | 확인되지 않았다 |
| 마나 경계 | 각 `config__mana_*` 값의 바로 아래와 같은 값 | 시작 조건 비교 | 확인되지 않았다 |
| GH 예비 마나 | 예비 마나 20을 반영한 GH 최소값 31 | 마나 30에서는 요청 없음, 31부터 가능. 기본값은 예비 마나를 보장하지 않음 | 확인되지 않았다 |
| GH 시약 부족 | GH 시약만 모자람 | 붕대 대체 조건을 채운 Heal | 확인되지 않았다 |
| RA 시약 부족 | RA 시약만 모자람 | 가능한 Reflect | 확인되지 않았다 |
| 무기 OFF | 레시피에서 `fight/remember-hands`, `fight/rearm`과 그 설정을 제거해 재조립 | 장착 명령 없음 | 확인되지 않았다 |
| 시작 무기 기억 | 무기를 들고 F4 | 첫 자기 TK 전에 `Rearm: ... layer remembered`와 들고 있던 serial 기록 | 확인되지 않았다 |
| 주문 뒤 빈손 | TK, RA, Reflect, Protection, GH를 각각 사용 | 주문과 커서 종료 뒤 같은 serial 복구. 손 장비와 `Rearm: equip requested`를 함께 확인 | 확인되지 않았다 |
| 같은 graphic의 여분 | 같은 무기 두 개 중 하나를 들고 시작 | 처음 들던 serial 복구. 여분을 새로 고르면 실패 | 확인되지 않았다 |
| 1H와 2H | 각 손 레이어의 무기로 각각 시작 | 해당 레이어로 복구. `lift`와 `drop` 거절이면 서버 문장 기록 | 확인되지 않았다 |
| 반대 손 무기로 교체 | 2H에서 1H로, 1H에서 2H로 각각 수동 교체. 켜 둔 채와 Stop 뒤 Play를 나눔 | 현재 양손을 먼저 채택. 반대 손의 옛 serial을 복구하면 실패 | 확인되지 않았다 |
| 교체 직후 버프 | 새 무기를 든 뒤 RA, Reflect, Protection이 각각 빠짐 | 주문 전에 `Rearm: current hands remembered`로 새 serial 기록, 주문 뒤 그 무기 복구. 예전 무기를 꺼내면 실패 | 확인되지 않았다 |
| 무기와 방패 | 방패를 든 채 한손 무기만 교체 | 방패는 유지하고 새 무기 기억. 주문으로 손이 비면 그 구성 복구 | 확인되지 않았다 |
| 이미 든 무기 | 기억한 serial이 손에 있음 | 장착 요청 반복 없음 | 확인되지 않았다 |
| 다른 무기로 교체 | 수동으로 다른 무기를 들고 손 점검 주기를 기다림 | 새 serial을 기억하고 다음 시전 뒤 그 무기 복구 | 확인되지 않았다 |
| 기억한 무기 없음 | 클라이언트 재시작 후 빈손으로 F4, 백팩에 무기는 있음 | 기본 설정에서는 임의 무기를 찾거나 장착하지 않음 | 확인되지 않았다 |
| 기억한 무기 소실 | 기억한 무기를 손과 백팩 밖으로 옮김 | 그 값은 잊고 회복 계속. 다른 무기를 그래픽으로 고르면 실패 | 확인되지 않았다 |
| 장착 직전 가드 | 찾는 도중 새 수동 커서, 시전, 큐, 은신 | 장착 요청 직전 가드가 연기 | 확인되지 않았다 |
| 장착 거절 | 디스암 등으로 장착 거절 | 반복 요청 간격 유지, 회복 루프 계속 | 확인되지 않았다 |
| 스윙 바 | 여러 바가 0이거나 진행 중 | 무기 선택과 무관. 장착이나 Q 변경을 실제 스윙으로 확정하면 실패 | 확인되지 않았다 |
| Stop 뒤 재실행 | Stop 뒤 Play | 손 serial은 유지하고, 시작 TK와 조회 타이머는 새 Play 기준. 활성 TK 바가 있으면 TK 생략 | 확인되지 않았다 |
| 시약 점검 뒤 재실행 | 시약 부족 점검 직후 Stop과 Play 반복 | 첫 패스에 시약을 다시 읽음 | 확인되지 않았다 |
| 은신 | 은신 | 대기 | 확인되지 않았다 |
| 이동 중 시전 | 걷기. v6부터 걷는 중에도 자동 주문을 시작 | 이동 중 시전의 서버 거절이나 끊김 기록 | 확인되지 않았다 |
| 구조화 PvP | 명령 제한 | `[ script, blocked ]` 뒤 정지 | 확인되지 않았다 |
| 필드 Heat of Battle | 필드 HoB만 | 같은 차단이 나면 구분 실패 | 확인되지 않았다 |
| 시전 마나 | 시전 시작, 종료, 방해 직전과 직후의 마나 기록 | 중단 비용과 시전 중 재생 확인 | 확인되지 않았다 |
| 모형 입력 | 근접 유지 시간, 양쪽 회복, 도끼 명중, 포션 시각을 함께 기록 | 모형 입력과 비교 | 확인되지 않았다 |
| 던전 첫 버스트, 사용자 보고 | 메이지 한 명, Reflect 없음, 몹에게 맞은 뒤 | HP 약 100에서 약 10초 안에 사망 | 인게임 확인됨 2026-10-05 |
| 첫 버스트 기록 | 던전 첫 버스트 | TK 적용, 포션 부착, Explosion 방출, EB 시전, 각 피해, 회복 시각, 붕대 남은 시간 기록 | 확인되지 않았다 |
| 첫 버스트 회복 대기 | 시전 중 포션과 완료한 프리캐스트를 쥔 채 마신 경우를 나눔 | 지금의 수동 입력 대기가 회복 요청을 미뤘는지 확인 | 확인되지 않았다 |
| 만피 붕대 | 만피에서 Bandage Self 요청 | 서버가 받아 실제로 붕대를 감는지. 지금 루프는 피해나 독이 있어야 요청 | 확인되지 않았다 |
| 피해 뒤 붕대 | 이미 피해가 있음 | 자기 MA 없이 시작되는지. 수동 커서, 시전, 진행 중인 붕대가 요청을 막았는지 구분 | 확인되지 않았다 |

#### 기록

- 2026-10-05: `combat/pvp.razor`로 자기관리 통합, 예전 PvP 파일 둘 삭제
- 2026-10-06 **v5**: 회복 선택, 긴급 수동 주문 중단, 자기관리 실행, 무기 장착 순서. GH와 긴급 중단 기준을 손실 35로 통일, 시폰과 버섯 자동화, 양손과 슬롯 상태 삭제
- 2026-10-08 **v6**: 각 블록이 지금 상태를 읽고 바로 행동하는 구조로 재작성. 회복 주문은 에이전트, 버프는 빠지면 바로 시전, 스탯 포션은 켜 둔 동안 유지.
  수동 입력 중단, 주문의 이동 가드, 6초 시전 대기와 `[ cast, check ]` 정지, 재시도 타이머 삭제. 시약은 10초마다, 또는 시약 거절 직후 읽음
- 2026-10-09 **v7**: Strength 포션, Agility 포션을 버프 대신 STR과 DEX 값으로 판정. 아군 Bless가 같은 아이콘을 띄워 포션을 막았음([Combat](../mechanics/combat.md#02.D) 02.D절)
- 2026-10-10 **v8**: 가벼운 Heal을 붕대 옆에서도 쓸지 `config__use_light_heal`로 결정(기본 0). 붕대를 못 쓰면 옵션과 무관하게 대신 나감
- 2026-10-10 **v9**: 모듈 조립. 동작은 v8과 같음([Modules](../scripting/modules.md#08) 08절)

#### 메모

- 할 일: F4와 별도 PvP 키는 `combat\pvp`로 재연결
- 할 일: 게임 종료 뒤 `git status --short`로 옛 본문의 덮어쓰기 여부 확인
- Resist 포션은 몹과 펫용. 적 플레이어의 주문 피해 감소로 해석하지 않음
- [Lumberjack PvP](../templates/lumberjack-pvp.md#05.D) 05.D절의 조건부 전투 모형 결과는 실제 승률 아님
- 퓨즈와 Splashback 반경은 [08.C절](#08.C) 실험과 함께 확인
- [Lumberjack PvP](../templates/lumberjack-pvp.md#05.E) 05.E절의 피해 범위는 설명 가능한 조건일 뿐. 실제 상대 스킬은 확인되지 않았다
- 30초와 60초 모형의 낮은 사망 비율로 첫 버스트 생존 여부를 판단하지 않음
- 자기 MA 자동 반복으로 마나를 쓰거나 진행 중인 붕대를 재시작하는 정책은 넣지 않음

## <a id="11"></a>11 skinning-enhanced 인게임 확인

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
| Parry Warding | 기억한 적이 2칸 밖이거나 없을 때 독, 출혈, 질병 | `[ parry, warding ]`, 풀리면 `[ parry, bulwark ]`. 출혈이나 질병 중 안 바뀌면 `findbuff "Bleed"`와 `"Disease"`의 버프 이름 확인 | 확인되지 않았다 |
| Parry 근접 | 2칸 안에서 싸우는 중 | 주 스탠스 유지 | 확인되지 않았다 |
| Parry 스탠스 이름 없음 | 라벨에 스탠스 이름 없음 | 명령 없이 `[ parry stance, off ]`만, 이번 Play 동안 정지. 같은 스탠스 명령이 3초마다 반복되면 실패 | 확인되지 않았다 |
| Chop | 기억한 적이 2칸 안 | `[ chop ]` 뒤 다음 타격에 나가는지. Arms Lore가 없으니 60초 간격이 맞는지도 | 확인되지 않았다 |

#### 기록

- 2026-10-06 `gather/skinning-enhanced.razor` 생성
- **v5**: 복원 삭제, 기억한 적이 없을 때만 칼질. 거절이 보이면 5분 동안 회색 시체만
- **v6**: sword codex 이름에 `sword_` 접두, 칼질 결과와 범죄 행위 거절을 프로필 오버헤드로 이관. 같은 날 오버헤드 팔레트 채도 하향([Overheads](../scripting/overheads.md#05) 05절)
- **v7**: 직접 지정 전 라벨을 읽어 "corpse"가 있고 "remains"가 없는 시체만. 그래도 범죄 판정이면 그 Play 동안 직접 지정 끔
- 2026-10-09 **v9**: 힘 포션과 민첩 포션을 버프 대신 STR과 DEX 값으로 판정([Combat](../mechanics/combat.md#02.D) 02.D절), 세 스탯 포션을 따로 판정.
  v8은 `elseif` 사슬이라 힘 포션이 떨어지면 민첩과 저항 포션까지 막힘
- 2026-10-10 **v10**: 가벼운 Heal을 붕대 옆에서도 쓸지 `config__use_light_heal`로 결정(기본 0). 붕대를 못 쓸 때 대신 나가는 것은 그대로
- 2026-10-10 **v11**: 모듈 조립. 회복, 포션, 버프, 시약을 pvp와 같은 core 블록으로. 바뀐 동작은 [Modules](../scripting/modules.md#08) 08절
- 2026-10-21 `fight/axe`를 `fight/rearm`으로 이름 변경

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
- 할 일: Testudo 랭크가 오르면 `config__parry_stance_main`을 `config__parry_stance_testudo`로
- 스탠스, 피니셔, 어빌리티는 Arms Lore가 없어 무기 특수 확률 기본 10%인 점을 반영해 선택. 근거는 `fight/sword-codex`, `fight/weapon-ability` 모듈 주석
- Sword Codex 기본값은 [sword-codex 모듈](https://github.com/nomeehej/uoo/blob/master/module/fight/sword-codex.razor)
- `config__sysmsg`: 전투 대상 변화, 칼질 요청과 결과, codex 전환, 회복과 버프 시전, 도끼 장착, 골드와 가죽 정리를 Journal에 기록
- 할 일: 게임 종료 상태에서 두 프로필에 칼질 결과 오버헤드 추가

## <a id="12"></a>12 tamer-mage-enhanced 인게임 확인

`combat/tamer-mage-enhanced` 지금 v6. 바뀐 동작은 [Modules](../scripting/modules.md#08.E) 08.E절.
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

#### 기록

- 2026-10-09 v1: `combat/tamer-mage-enhanced.razor` 생성
- v2: `Strength`와 `Agility`가 스탯 포션과 겹침 → Bless를 `Cunning`으로, Arch Protection을 `Protection`으로 판정, 시전 시각 타이머 삭제
- 포션은 스탯 값으로 판정. 포션을 마신 값(기본 + 20)을 `config__str_potion`과 `config__dex_potion`에, 그보다 낮으면 마심
- 거절된 마시기가 회복 포션과 같은 아이템 큐를 패스마다 차지하지 않도록 5초 재시도 간격
- v3: 펫 지정과 거리 확인 삭제, 키트를 셀프 붕대로
- v4: 프로필 오버헤드의 `You begin using veterinary supplies`, `You finish using veterinary supplies`로 키트 진행 구간 파악
- v4: 진행 중 재사용 없음, 재사용하면 진행 중 치료 취소. 피가 1이라도 빠지면 바로, 풀피면 끝난 직후와 거절 2초 뒤에 펫용으로
- v5: 가벼운 Heal 에이전트를 `config__use_light_heal`로 켜고 끔, 기본 끔. 너무 잦다는 사용자 의견 → 회복은 키트, 힐 포션, GH만
- v5: 독일 때 큐어 포션이 없으면 쓰는 `Smart Heal/Cure`는 그대로
- 2026-10-10 사용자가 지금 안 쓴다고 해서 `script/archive/`로 옮김. 같은 날 레시피 조립과 함께 `script/combat/`으로 복귀
- 2026-10-20 걷는 중 Greater Heal이 안 나감 → 긴급선 Greater Heal만 이동 가드 없음

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

## <a id="13"></a>13 recycle 인게임 확인

`loot/recycle`: 루팅 백의 장비만 단일 ID wand로 감정. 저품질은 분해, 보관품은 보급 파우치로 이동. 반영은 [Workflow](../working/workflow.md#04.A) 04.A절.

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 완드 감정 | 단일 ID wand로 감정 | 성공 | 인게임 확인됨 2026-10-21 |
| 역할 임시 사용 | 저장된 역할을 못 찾음, 백팩에 bag `3702`와 hue 0 pouch `3705`가 각각 하나 | 그 둘을 임시 사용, global 값은 덮어쓰지 않음 | 확인되지 않았다 |
| 루팅 백 누락, 중복 | 루팅 백이 없거나 둘 | `[ loot bag, out ]`, 장비 처리와 자원 드롭 없이 루프로 복귀 | 확인되지 않았다 |
| 보급 파우치 누락, 중복 | 보급 파우치가 없거나 둘 | `[ supplies, out ]`, 장비 처리와 자원 드롭 없이 루프로 복귀 | 확인되지 않았다 |
| 같은 역할 | 두 역할이 같거나 서로 안에 들어 있음 | `[ loot bag, wrong ]`, 처리 없이 복귀 | 확인되지 않았다 |
| 컨테이너 열기 | 시작 | 두 컨테이너를 한 번씩 열고 행동 큐가 비워질 때까지 대기 | 확인되지 않았다 |
| 컨테이너 열기 기한 초과 | 시작의 행동 큐가 기한을 넘김 | `[ loot bag, blocked ]`, 장비와 자원은 건드리지 않고 루프 복귀 | 확인되지 않았다 |
| 섞은 루팅 백 | 루팅 백에 미감정 일반품, 미감정 보관품, 이미 감정한 품목을 섞음 | 저장품은 보급 파우치의 오른쪽 아래 `130 200`으로 | 확인되지 않았다 |
| 검사 범위 | 다른 가방, 백팩에 따로 둔 장비, 보급 파우치의 보관품 | 검사하지 않음 | 확인되지 않았다 |
| 도구 없음 | 완드나 재활용 도구 없이 실행 | 경고 뒤 루프로 복귀 | 확인되지 않았다 |
| 분해 모드, 단일 | Recycle Single Item 모드 | 검프의 `Recycle Single Item` 문구 확인 뒤 개별 아이템만 타깃. 실패면 `[ recycle, wrong ]`과 검프 원문 기록 | 확인되지 않았다 |
| 분해 모드, 다른 모드 | 다른 분해 모드 | `[ recycle, wrong ]`, 아이템을 찍지 않고 후속 아이템 처리 없이 루프 복귀 | 확인되지 않았다 |
| 속도 | recycle 실행 | 실제 단축 시간, Outlands의 라벨 응답 시간과 행동 큐 기록 | 확인되지 않았다 |
| 방어구 재질 | 돌려 놓은 체인 장갑 | 라벨의 재질로 판정, 링메일이 아닌 체인 설정으로 보관 | 확인되지 않았다 |
| exceptional | `config__save_exceptional 1`, exceptional 장비 | 보관, 파우치로 이동 | 확인되지 않았다 |
| aspect | aspect 장비 | 항상 보관, 파우치로 이동 | 확인되지 않았다 |
| 주문서와 단검 | hue 0 주문서와 단검 | 루팅 백에 유지, 감정과 분해 생략 | 확인되지 않았다 |
| 같은 종류 여럿 | 같은 graphic ID 여러 개 | 개별 serial만 ignore. 남은 물건은 계속 검색, 각각 보관 또는 분해 | 확인되지 않았다 |
| F3 재실행 | 처리 뒤 F3 다시 | 저장품을 다시 조회하거나 옮기지 않음 | 확인되지 않았다 |
| 보관품 재분해 | 품질 설정에 걸려 보관한 물건 | 같은 처리에서 다시 분해되지 않음 | 확인되지 않았다 |
| 감정 전 기한 초과 | 감정 전 행동 큐가 기한을 넘김 | `[ recycle, blocked ]`, 완드 사용과 후속 아이템 처리 없이 루프 복귀 | 확인되지 않았다 |
| 보관 이동 미확인 | 가득 찬 파우치로 시험 | `[ supplies, blocked ]`, 보관품을 분해하지 않고 루프 복귀 | 확인되지 않았다 |
| 분해 결과 미확인 | 타깃한 serial이 루팅 백에 남음 | `[ recycle, blocked ]`, 후속 아이템 처리 없이 루프 복귀 | 확인되지 않았다 |
| 분해 검프나 커서 누락 | 검프나 커서가 안 뜸 | `[ recycle, blocked ]`. 기다리는 횟수는 한 번, 자원 드롭 없이 루프 복귀 | 확인되지 않았다 |
| 자원 드롭 기한 초과 | 자원 드롭 행동 큐가 기한을 넘김 | `[ recycle, blocked ]`, 추가 대기 반복 없이 루프 복귀 | 확인되지 않았다 |
| 완드 여럿 | 완드 둘 이상 | 첫 완드를 소진, 예비 완드는 유지 | 확인되지 않았다 |
| 완드 커서 실패 | 커서를 못 연 완드 | 그 실행에서 제외, 같은 아이템에 예비 완드 사용 | 확인되지 않았다 |
| 완드 모두 실패 | 모든 완드가 커서를 못 염 | `[ id wand, out ]` 한 번. 미감정품은 남기고 이미 감정된 품목은 계속 처리 | 확인되지 않았다 |
| 라벨 못 받음 | 품질 라벨을 못 받거나 갱신되지 않은 라벨만 받음 | `[ item, skip ]`. 그 물건만 건너뛰고 다음 아이템 처리 | 확인되지 않았다 |
| 자원 드롭 거절 | 거절 지역에서 자원 드롭 | 거절 문장 뒤 백팩 복구 요청, 실제 반환 | 확인되지 않았다 |
| 실패 뒤 정리 | 처리 실패 | 아이템이 실제로 백팩에 반환, Outlands 클라이언트 큐 초기화 | 확인되지 않았다 |
| 복귀, skinning | skinning-enhanced를 Play한 뒤 F3 | `hotkey 'Play Script: gather\skinning-enhanced'`의 실행과 복귀, 끝나고 그 루프의 loaded 문구 | 인게임 확인됨 2026-10-19 |
| 복귀, 다른 루프 | lumberjack이나 bard-archer를 Play한 뒤 F3 | 그쪽으로 복귀 | 확인되지 않았다 |
| 복귀, Play 없음 | 클라이언트를 켠 뒤 루프를 한 번도 Play하지 않고 F3 | recycle만 종료 | 확인되지 않았다 |
| 복귀, pvp 중 | pvp 중 F3 | 마지막 사냥이나 채집 루프로 복귀 | 확인되지 않았다 |

#### 기록

- 2026-10-21 검색 범위 축소, 보관 위치 통합, 고정 대기 제거. 처리 실패도 공통 정리 뒤 루프 복귀

#### 메모

- 검색: `global__my_loot_bag`. 보관: `global__my_supply_pouch`. 둘 다 백팩 안에 있어야 함
- `ignore`는 이번 실행의 재선택 방지용. 시작과 끝에 초기화. 보관품은 루팅 백 밖으로 옮기므로 다음 실행에서도 조회 생략
- 단일 ID wand `20496`만 사용. Item Identification 스킬 경로와 `config__min_item_id_skill`, `wait__item_id` 제거
- 재활용 도구: tinker tool, sewing kit 또는 saw. 완드와 도구는 백팩에서 검색
- [공식 Recycling](https://wiki.uooutlands.com/Recycling), 2026-10-21 확인: "Recycle single item" is the recommended option, as it is limited to recycling individual items.
- 다른 분해 모드는 백팩의 유용한 장비까지 대상이 될 수 있음
- 검프의 대소문자 `Recycle Single Item` 선례는 [Bapeths Slower Item Recycler](https://outlands.uorazorscripts.com/script/752d1745-90d4-4078-a8cb-8ce2cccef3e0)
- 감정 직후: 감정된 라벨을 받으면 같은 아이템 처리에서 바로 분류. 고정 대기 없음
- 아이템 라벨 조회: 첫 조회로 감정 필요 여부 확인. 완드 사용 후 품질을 다시 조회. 조회 횟수와 완드 사용 횟수는 별개
- 완드 감정 뒤 재조회는 갱신된 품질 라벨 수신용, 스킬 성공 여부 판정 아님
- 보관 이동: 파우치 소속을 `find`로 확인하면 즉시 다음 아이템. 고정 대기 없음
- 품목별 storage: 17개 제거. 보급 파우치 한 곳으로 통합
- 아이템별 Journal: `config__sysmsg 0` 기본값. `1`이면 검사와 저장 로그
- 완드와 분해 도구: 선택한 serial 재사용, 완드 커서 실패나 분해 도구 유실 시 다시 검색
- `pushlist` 한 줄은 품목군 하나. 스태프, 쌍수, 투척, 검술, 메이싱, 펜싱, 활, 방패, 마법 장비, 레슬링, 악기, 방어구의 12종
- 숫자는 개별 물건의 serial이 아닌 graphic ID. 쌍수와 투척은 기존 이름 검색어와 ID를 함께 유지
- 이름과 ID의 대응은 [Item list](../game/item-list.md#29) 29절, 방어구는 같은 문서 [02절](../game/item-list.md#02)
- 품질 판정은 무기, 메이싱, 악기, 방패, 방어구의 5종. 검색 대상 220개, 보관 설정 49개의 기본값과 재질 판정 유지
- 모든 그룹이 감정, 이동, 분해 코드를 공유. `config__skip_supply_pouch`와 품목별 storage, 백팩 보관 대체 경로 제거
- 컨테이너: `var__loot_bag`, `var__supply_pouch`. 도구: `var__id_wand`, `var__id_wand_out`, `var__tool`
- 처리 상태: `var__running`, `var__item_pending`, `var__id_sent`, `var__keep`, `var__kind`, `var__slayer`, `var__armor_type`
- `timer__recycle` 하나를 단계마다 초기화. 이전 `timer__recycle_identify` 제거
- `wait__label` 650ms: 완드 사용 후 갱신된 품질 라벨의 추가 조회 기한. 받으면 즉시 진행
- `wait__poll` 50ms: 품질 라벨, 행동 큐, 보관 이동, 분해 결과의 재확인 간격
- `wait__target` 500ms: 도구 커서 대기 상한
- `wait__timeout` 5000ms: 행동 큐, 검프, 보관 이동, 분해 결과의 대기 상한
- `wait__drop` 650ms: 자원 드롭 뒤 거절 문장을 읽기 전 대기
- 위 `wait__` 값은 서버 쿨다운이나 실측 속도가 아닌 스크립트 설정. `getlabel` 자체 대기 시간은 별도([Razor](../scripting/razor.md#06) 06절)
- 정적 동일성 검사와 모의 실행은 통과
- 보관 설정을 바꿔 재분류할 때는 해당 장비를 루팅 백으로 옮겨 실행
- `stop` 없음. 실패는 `var__running 0`으로 이번 정리만 끝내고 공통 복귀 경로 실행
- 실패 뒤 남은 장비 처리와 자원 드롭 생략. 같은 실행에서 아이템마다 같은 타임아웃을 반복하지 않음
- 루팅 백에 남은 아이템은 다음 recycle 실행에서 재검사. 미확인 품목을 저품질로 간주하거나 분해하지 않음
- 자원 드롭은 장비 처리를 마친 경우에만 기존대로 백팩 전체 검색. `config__drop_*`와 arcane essence 사용 설정 유지
- 백팩 `getlabel`을 대기용으로 사용하지 않음. 기준은 [Razor](../scripting/razor.md#06) 06절
- 정상 완료와 처리 실패 모두 `clearall`, 분해 검프 닫기, `clearignore` 뒤 복귀
- `clearall`: 현재 타깃과 타깃 큐 취소, 드래그 큐 정리, 들고 있는 아이템의 백팩 반환 요청
- `clearall` 근거, 2026-10-21 확인: [CE clearall](https://www.razorce.com/guide/commands/#clearall),
  [CE ClearAll 구현](https://github.com/markdwags/Razor/blob/master/Razor/Scripts/Commands.cs),
  [CE DropCurrent 구현](https://github.com/markdwags/Razor/blob/master/Razor/Core/ActionQueue.cs)
- 이 명령을 모든 행동 큐나 서버에 이미 보낸 요청의 취소로 간주하지 않음. 정리 뒤 `queued`가 남아도 복귀 핫키 실행
- 백팩으로 반환된 보관품을 재분류할 때는 루팅 백에 다시 넣고 실행
- 모의 실행은 실패 분기의 복귀 경로 확인용
- `list__resume_script`의 각 항목을 `hotkey`로 실행. 정상 완료, 컨테이너 선택 실패, 도구 부족, 처리 실패 모두 같은 경로
- bard-necro-enhanced, bard-archer-enhanced, tamer-mage-enhanced, dexxer-basic, skinning-enhanced, lumberjack-enhanced가 Play할 때 자기 핫키 이름 등록
- archive의 bard-mace와 bard-throwing은 archive 이름 등록. pvp는 등록하지 않음
- 이름의 저장 형식은 [script/README.md](https://github.com/nomeehej/uoo/blob/master/script/README.md#returning-to-the-loop)

## <a id="14"></a>14 bard-necro-enhanced 인게임 확인

바뀐 동작은 [Modules](../scripting/modules.md#08.D) 08.D절. 재소환과 교체의 설계와 실패 증상은 [Bard Necro Enhanced](../loops/bard-necro-enhanced.md#02.C) 02.C절.

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 시작 | Play | 악기 검색(없으면 `[ inst, pick ]`), `[ bard necro, on ]` | 확인되지 않았다 |
| 악기 교체 | warmode를 켠 뒤 사용 중인 악기를 백팩 밖으로 이동, 예비 악기는 백팩에 유지 | 다음 악기 점검에서 `[ inst, set ]`, warmode를 끄면 바딩 재개 | 확인되지 않았다 |
| 예비 악기 없음 | 예비 악기도 없이 사용 중인 악기를 백팩 밖으로 | `[ inst, out ]`, 회복 블록은 계속 | 확인되지 않았다 |
| 악기 다시 넣기 | `[ inst, out ]` 뒤 악기를 다시 넣음 | 스크립트 재시작 없이 다음 예비 검색에서 복구 | 확인되지 않았다 |
| 커서 중 악기 복구 | 타깃 커서나 시전이 있는 동안 악기가 빠짐 | 예비 선택 대기. 커서와 시전이 끝나면 선택 재개 | 확인되지 않았다 |
| 소환수 이름 | 소환 | 5초 안에 `[ name, leech ]`처럼 이름이 뜨고 네임태그 변경. 실패면 Journal 확인 | 확인되지 않았다 |
| 이름 실패, Journal | 네임태그가 안 바뀐 뒤 Journal | `Summon name: no known kind in its label: …`이면 그 라벨 기록. 아무것도 안 뜨는데 오버헤드만 뜨면 `rename` 거부 | 확인되지 않았다 |
| 종류를 읽은 이름 | `[ name, mummy ]`처럼 종류를 읽은 이름 | 서버가 `That name is unacceptable.`로 거절 | 인게임 확인됨 2026-10-10 |
| 종류를 피한 철자 | `mumi`, `wytch` | `mumi`는 수락, `wytch`는 거절 | 인게임 확인됨 2026-10-10 |
| `wicca` | 이름 `wicca` | 거절 | 인게임 확인됨 2026-10-13 |
| 새 이름 수락 | `wichy`와 나머지 새 이름으로 소환 | 서버가 수락 | 확인되지 않았다 |
| Rag Witch 바디 | Rag Witch 소환 | 바디 740 | 인게임 확인됨 2026-10-18 |
| 새 rag witch 이름 | 새 rag witch 소환. 기본 이름 `a rag witch` 재검색은 삭제됨 | 5초 안에 `wichy` | 확인되지 않았다 |
| Vampire Thrall 바디 | 뽑으면 `>info` | 바디 722. 지금 출처는 구식 캐시 | 확인되지 않았다 |
| 하나 release | 소환수 하나를 손으로 release, 서 있기 | `[ vengeful spirit ]`, Water Elemental 주문어, 5초 안에 `[ name, wichy ]` | 확인되지 않았다 |
| `mumi` release | `mumi`만 release | Earth Elemental. Water Elemental이면 바디 740 검색 실패 | 확인되지 않았다 |
| 둘 다 없음 | 소환수 둘 다 없음 | VS 한 번에 Rag Witch, Mummy 순서 | 확인되지 않았다 |
| 교전 중 사망 | 교전 중 소환수가 죽음 | 그 자리에서 VS와 소환. VS와 첫 시전이 한 패스에 붙어 나감 | 확인되지 않았다 |
| 소환 중 긴급 HP | 소환 중 긴급 HP | `[ summon, cut ]`과 힐 | 확인되지 않았다 |
| 교체 보류 | 교체 시계가 넘은 채 소환수가 10\~18칸의 몹과 싸움 | 안 놓음 | 확인되지 않았다 |
| 워모드, 걷기 | 워모드, 걷는 중 | 아무것도 안 나감 | 확인되지 않았다 |
| 교체 시계 | 레시피에서 잠시 `summon_refresh`를 60000으로. 확인 뒤 600000으로 | 이동 중 1분 뒤 `wichy release`, 다시 소환 | 확인되지 않았다 |
| Bloodmoss 없음 | Bloodmoss를 빼 둠 | VS 심볼을 쓰지 않음 | 확인되지 않았다 |
| 손 VS | 손으로 Alt+1 | 루프는 그 버프가 꺼질 때까지 소환하지 않음 | 확인되지 않았다 |
| 저마나 사망 | 교전 중 마나 20\~64에서 소환수가 죽음 | 심볼 6까지 Blood Oath 등 정지 → `[ wither ]`, `[ vengeful spirit ]`, 소환이 한 패스에. Journal `Summon: cast kind 2, wither state 2.` | 확인되지 않았다 |
| 둘 다 사망, 저마나 | 둘 다 죽고 마나가 낮음 | 첫째는 바로, 둘째는 약 30초 뒤 다음 Wither. 그동안 Blood Oath는 은행이 찰 때만 | 확인되지 않았다 |
| Wither, VS 0.4초 | 루프가 Wither와 VS를 0.4초 간격으로 누름 | 둘 다 들어감 | 확인되지 않았다 |
| Wither, VS 손 순서 | 손으로 Wither → VS | Wither → VS 순서. 손으로 확인한 것은 이 순서뿐 | 인게임 확인됨 |
| Wither 핫키 | 교전 중 Journal | `[ wither, miss ]`가 30초마다 반복되지 않음. 실패면 Razor 핫키 이름 `Wither` 확인 | 확인되지 않았다 |
| Wither 마나 | Razor의 `mana` 값 보기 | Wither 마나가 들어가는지. 들어가면 로테이션이 공격 주문을 헛시전할 수 있음 | 확인되지 않았다 |
| 긴급 끊기 뒤 재시도 | 소환 중 긴급 끊기 → 힐 → 재시도 | 힐이 Wither 마나를 먹어 재시도가 실패하는지. 실패면 마나 부족 문장도 기록 | 확인되지 않았다 |
| 맨 엘리멘탈 | 소환 결과 보기 | 맨 엘리멘탈 없음. 한 번이라도 나오면 기록, 시작 마감 23초가 길다는 뜻 | 확인되지 않았다 |
| 교전 | 적을 찍음 | 10칸 안에서 Disco, Peace, 네크로 버스트, 오프너, 프록이 예전 순서로 | 확인되지 않았다 |
| 이동 | 적 없음 | 버섯, RA, Reflect, Spell Siphon, 노래, Vampiric Embrace | 확인되지 않았다 |
| 노래, 장소 | Shadowspire Cathedral과 집 | 노래가 들어감(`You are now under the effect of a Song`). 노래는 다시 백팩 | 확인되지 않았다 |
| 노래, 막힘 | 노래가 막히거나 실패 | 곡을 건너뛰지 않음. `use another skill`이 매 바퀴 반복되지 않음 | 확인되지 않았다 |
| 노래, 적 기억 | `[ target, set ]` 뒤 적이 기억된 상태, 10칸 밖이라도 | 노래 없음. 적이 죽거나 놓인 뒤 다시(2026-10-22 변경) | 확인되지 않았다 |
| Spell Siphon 순서 | RA와 Reflect가 빠진 채 이동 | RA, Reflect 먼저, Siphon Magic Arrow는 그다음 패스 | 확인되지 않았다 |
| 독과 힐 | 독에 걸린 채 다침 | 큐어 먼저, 힐 포션과 Greater Heal은 독이 풀린 뒤. 예전보다 위험하게 느껴지면 기록 | 확인되지 않았다 |
| 셀프 버프 끊기 | 잃은 HP 35 이상에서 RA, Reflect 시전 | 시전이 끊김. 거슬리면 레시피의 `buff_max_loss` 상향 | 확인되지 않았다 |
| Journal 줄 | `config__sysmsg` 1로 실행 | 에이전트, 버프, 골드, 전투 대상 줄 기록. 너무 많으면 레시피에서 0 | 확인되지 않았다 |
| 패스 속도 | 교전 | 교전 반응이 눈에 띄게 늦지 않음. 늦으면 기록 | 확인되지 않았다 |
| 버섯 | 교전 중 마나 55 이하, 쿨다운 끝 | 먹음. Create Food는 이동 중에만 | 확인되지 않았다 |
| 송의 슬롯 잠금 | [Barding](../mechanics/barding.md#01.E) 01.E절 근거 표의 순서를 Lyric 방어구를 벗고 한 번 실행. probe 스크립트는 git 이력. 실행 중 손 조작 금지 | 송이 바드 스킬 슬롯까지 잠그는지. 갈리는 것은 송 게이트의 모양 | 확인되지 않았다 |
| 송 쿨 길이 | 같은 probe의 4단계(약 11초 뒤 시도) | 송 쿨의 정확한 길이. 갈리는 것은 `song` 바 길이 | 확인되지 않았다 |
| Energy Bolt 회수와 환급 | 한 시전에 `[ mana, refund ]`와 `[ eb, refund ]`가 둘 다 뜨는지([Overheads](../scripting/overheads.md#07) 07절). 방법은 아직 후보 | 15마나 회수(5초 안에 마무리할 때만)와 환급 확률의 중첩 여부. 갈리는 것은 마나 예산이 초당 2.7인지 훨씬 낮은지([Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.D) 01.D절) | 확인되지 않았다 |
| Ensemble, Reverb, Virtuoso 범위 | 포인트 변경 전후 데미지 트래커의 소환수 딜 절대값 비교 | 셋이 정말 본체에만 적용되는지. 갈리는 것은 코덱스 배분([Barding](../mechanics/barding.md#01.B) 01.B절) | 확인되지 않았다 |
| 바디 번호 | Skeletal Fiend, skeletal marksman, rotting flesh가 나오면 `>info` | 바디 번호. 갈리는 것은 `SUMMON NAMES`의 `findtype` 줄([Bard Necro Enhanced](../loops/bard-necro-enhanced.md#02.B) 02.B절) | 확인되지 않았다 |
| Corpse Skin 질병 틱 | 프록 한 방 뒤와, 프록 네 방과 볼트 뒤의 Poison Strike 피해를 데미지 트래커로 비교. 방법은 아직 후보 | 질병 하나의 틱 수. 갈리는 것은 Poison Strike 시점([Necromancy](../mechanics/necromancy.md#02) 02절) | 확인되지 않았다 |
| SELF BUFFS | 몹이 없고 서 있을 때(`var__fighting = 0`, `cooldown "walk" = 0`) | 사냥 사이에 Reactive Armor와 Magic Reflection이 버프바에 붙고, 붙어 있는 동안 재시전 없음. 리플렉트가 소모되면 `[ reflect, off ]`와 30초 `reflect` 바, 바가 꺼진 뒤 다음 정지 때 재시전. 실패면 매 패스 재시전, `findbuff` 이름 불일치 | 확인되지 않았다 |
| 시약 10초 리프레시 | 시약을 떨어뜨림 | 헛시전 한 번 뒤 그 주문을 건너뛰고 나머지 진행. 다시 채우면 최대 10초 안에 재개(2026-09-28 변경, 그때는 30초). 실패면 같은 주문의 헛시전 반복 → 캐릭터 이름으로 뜬 줄을 `insysmsg`가 못 읽음 | 확인되지 않았다 |
| Poison Strike와 Energy Bolt 순서 | 교전 | Curse 뒤 네 프록이 이어서 나가고, 바 넷이 다 뜬 뒤 Energy Bolt 한 방, 그다음 `[ poison strike ]`. 몹을 바꾸면 그 몹에 프록이 간 뒤에만(2026-09-28 변경). 실패면 Curse나 첫 프록 바로 뒤에 둘 중 하나. 한 프록만 반복되면 그 바의 트리거 확인 | 확인되지 않았다 |
| 네크로 능력 핫키 | 교전 | `[ blood oath ]` `[ corpse skin ]` `[ evil omen ]` `[ poison strike ]`가 전처럼 뜸(2026-09-28 변경). 실패면 Razor 핫키 목록의 이름 확인 | 확인되지 않았다 |
| Corpse Skin과 Evil Omen 조건 | 교전 중 걷기, warmode | 걷는 동안과 warmode에서는 둘이 안 나가고 `[ blood oath ]`만. 멈추면 프록 앞에 시전(2026-09-28 변경) | 확인되지 않았다 |
| Poison Strike와 Vampiric Embrace 거절 | 질병 없는 몹, 먼 시체 | Poison Strike가 매 패스 반복되지 않고 다음 프록 뒤 재시도. 시체가 멀면 Vampiric Embrace는 5초에 한 번만(2026-09-28 변경). 실패면 같은 거절 줄이 매 패스 | 확인되지 않았다 |
| 타겟을 화면 거리에서 | 10칸 밖의 몹을 All Kill로 찍음 | `[ target, set ]`, 다가오면 교전. 그 사이 송이 나가도 타겟 유지(2026-09-29 변경). 실패면 `[ target, set ]` 없음, 몹이 붙었는데 송과 버프만 | 확인되지 않았다 |
| 남의 소환수 | 파티원의 엘리멘탈 | `[ name, … ]` 없음(2026-09-29 변경). 실패면 뜸 | 확인되지 않았다 |

#### 기록

- 2026-10-10 `combat/bard-necro-enhanced`를 레시피 조립으로 전환. 바드, 네크로, 공격 주문 블록의 코드는 그대로
- 2026-10-10 종류 단어와 한 글자 차이도 막는 것으로 보고 모든 이름을 두 글자 이상 떨어뜨림(`leech`, `vampa`, `wicca` 등)
- 2026-10-13 `wicca`를 `wichy`로 교체
- 2026-10-18 재소환과 교체 추가
- 2026-10-20 노래 검사 추가
- 2026-10-21 악기 복구 추가, 아처와 네크로 공통
- 2026-10-21 프로보와 마지막 대상 검사 추가

#### 메모

- 생존, 포션, 버프, 골드는 공용 모듈. 하우스키핑과 교전 및 이동 분기는 레시피 그룹이 생성
- 프로보와 마지막 대상: 후보 입력, 짝 선택, 실제 라타의 한계와 확인 절차는 [17절](#17)
- 패스 끝 0.1초 대기, 10초마다 시약 읽기 추가

## <a id="15"></a>15 loadout, regear, aspect 인게임 확인

모듈과 일회성 레시피 구조는 [Modules](../scripting/modules.md#03.A) 03.A절, 동작 설명은 각 모듈 머리 주석.

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| regear 표시 | Razor를 다시 켬 | Scripts 탭에 `hotkey\regear`. Alt+0이 regear로 바뀜(summoner, default 프로필) | 확인되지 않았다 |
| loadout 차단 | loadout Play | `[ script, blocked ]`는 구조적 PvP에서만. 시작 4줄(clearall 등)은 전과 같음 | 확인되지 않았다 |
| loadout, 스크롤 없음 | 귀환 스크롤이 떨어진 채 loadout | aspect까지 돎. 전에는 `stop`으로 끝남 | 확인되지 않았다 |
| 룬북 리필 끔 | `config__use_runebook_refill` 0 | 스크롤 상자를 묻지 않음 | 확인되지 않았다 |
| 귀환 직후 룬북 리필 | 귀환 직후 loadout | 룬북 리필이 돎. 상자를 연 뒤 스크롤이 보일 때까지 최대 2초 대기. 전에는 0.2초 만에 `[ recall scroll, out ]`이 뜰 수 있었음 | 확인되지 않았다 |
| 가구와 보급 상자 | 가구와 보급 상자를 염 | 0.6초(`wait__long`) 대기 뒤 금고, 저장소, 수리대, 선반, 리사이클러를 다시 묻지 않음. 다시 물으면 이 대기를 늘림 | 확인되지 않았다 |
| aspect 다시 켜기 | 죽고 시체를 먹은 뒤 regear | 옷을 다 입고 정리한 뒤 `[aspect` gump가 열리고, 방어구와 손 순서로 Activate가 두 번씩 눌린 뒤 닫힘 | 확인되지 않았다 |
| aspect Journal | 위와 같음 | Journal에 `... aspect activated.` 둘, Essence 10 감소 | 확인되지 않았다 |
| aspect 일부 조각 | 방어구 몇 조각만 벗었다 낀 채 regear | 모든 조각이 다시 켜짐 | 확인되지 않았다 |
| aspect gump 안 열림 | gump가 안 열림 | `[ aspect, miss ]`, Journal에 `Aspect: the [aspect gump did not open.` | 확인되지 않았다 |
| Show Only Unlocked | gump가 Show Only Unlocked 목록으로 열림 | 버튼 102로 줄 화면에 돌아가 누름. 참고 스크립트의 처리 | 확인되지 않았다 |
| 먼저 힐 | 다친 채 regear | 붕대, 힐 포션, Greater Heal을 각자 쓸 수 있을 때마다 겹쳐 써서 HP 가득(`heal_first_until` 0)까지 | 확인되지 않았다 |
| 먼저 힐, Magery 없음 | Magery가 없거나 마나가 모자람 | 붕대와 포션만. 포션이 쿨다운 중이면 기다림 | 확인되지 않았다 |
| 먼저 힐, 쓸 것 없음 | 쓸 것이 하나도 없음 | 바로 옷 입기로 | 확인되지 않았다 |
| 먼저 힐, 시간 초과 | 20초(`wait__heal_first`) 안에 못 채움 | 옷 입기로, 감던 붕대는 계속 | 확인되지 않았다 |
| 먼저 힐, 시약 없음 | 시약 없이 regear | Greater Heal은 한 번만 시도. 끝나고 남은 Greater Heal 커서는 취소 | 확인되지 않았다 |
| 정리 | regear | 백팩 아래쪽에 새첼, 보급 파우치, 루팅 백, 트랩 파우치가 loadout 때처럼 쌓이고, 보급품이 보급 파우치로 | 확인되지 않았다 |
| 파우치 못 가져옴 | 시체에서 보급 파우치나 루팅 백을 못 가져옴 | 묻지 않고 `[ supplies, out ]`, `[ loot bag, out ]`(`pouches_ask` 0) | 확인되지 않았다 |
| 보급 파우치 없음 | 보급 파우치 없이 regear | 보급품은 백팩에 그대로, aspect까지 계속. 다음 loadout에서 새 파우치를 고름 | 확인되지 않았다 |

#### 기록

- 2026-10-19 추가. 같은 날 loadout과 regear(옛 dress)를 모듈과 일회성 레시피로 옮김
- 2026-10-19 옛 `hotkey/aspect` 삭제. 두 루틴 안의 `gear/aspect` 블록이 대신함
- 2026-10-19 `gear/aspect`를 `[aspect` gump의 Activate 버튼으로 바꿈. 기억 없이 매번 누름

#### 메모

- regear 순서: 먼저 힐(`recovery/heal-first`), 옷(`gear/dress`, `gear/cosmetic`), 정리(`pack/pouches`, `pack/sorting`), aspect(`gear/aspect`)
- loadout과 regear는 같은 `gear/aspect` 블록을 씀
- aspect 근거: [Aspect Mastery](https://wiki.uooutlands.com/Aspect_Mastery). 켤 때마다 Arcane Essence 5, 죽으면 장비의 aspect가 풀림
- Activate 버튼 번호와 이유는 `module/gear/aspect.razor` 머리 주석

## <a id="16"></a>16 bard-archer-enhanced 인게임 확인

설계와 숫자는 [Bard Archer Enhanced](../loops/bard-archer-enhanced.md). 새 루프와 새 프로필 → 클라이언트 재시작, nomeehej의 Razor 프로필을 `bard`로([Workflow](../working/workflow.md#04.A) 04.A절).
프로보 후보 입력은 [17절](#17), 악기 복구는 [14절](#14).

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

## <a id="17"></a>17 프로보 후보 입력과 인게임 확인

동작과 짝 선택 규칙은 [Barding](../mechanics/barding.md#03.A) 03.A절. 두 바드 루프 공통(`bard/provo-picks`, `bard/provo`).
키는 [Hotkeys](../game/hotkeys.md#01.F) 01.F절. 반영은 클라이언트 재시작([Workflow](../working/workflow.md#04) 04절).

쓰는 순서. 루프 시작 전에 고른 몹은 등록되지 않음.

1. Tab으로 warmode(수동 구간). 이미 나간 시전과 커서가 끝난 뒤
2. Z로 A 선택, 아처는 V로 공격. A에 `[ provo, set ]`
3. Shift+Space로 B부터 차례로. 몹마다 `[ provo, set ]`을 보고 다음. 같은 몹을 다시 골라도 알림 없음, 알림은 `config__chatty` 1에서만
4. Tab으로 자동 구간 복귀. A→B, C→D

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| Shift+Space | 수동 구간에서 Shift+Space | 커서가 뜨고 찍은 몹에 `[ provo, set ]` | 인게임 확인됨 2026-10-22 |
| 대상과 후보 분리 | Q로 T, Shift+Space로 B | `lastharmful`과 `[ target, set ]`은 T, `[ provo, set ]`은 B. 등록 중 T가 안 바뀜 | 확인되지 않았다 |
| 후보 넷 | B, C, D, E 등록 | 알림 받은 넷 전부 등록. 빠진 serial 기록 | 확인되지 않았다 |
| 후보 하나 | T만 고르고 B 하나 등록 | B→T 자동 시전 없음, 대기 | 확인되지 않았다 |
| Z의 A | Z로 A, Shift+Space로 B | A도 후보. 바딩 대상이 A여도 A→B | 확인되지 않았다 |
| 다섯 마리 | Z로 A, B부터 E 등록 | A→B, 다음 공유 쿨에 C→D. E는 대기. provoked 몹을 다른 짝에 안 씀 | 확인되지 않았다 |
| Q 순회 | Q로 B, C, D, E 차례로 | 바딩 대상만 이동, 후보 목록과 짝 순서 유지. 각 몹의 Disco는 알림과 별도로 확인 | 확인되지 않았다 |
| 자동 B→C 뒤 라타 | 자동 시전 뒤 E나 V | 루프 대상 T와 후보 목록 유지. 실제 `lastharmful`은 C로 남을 수 있음([Barding](../mechanics/barding.md#03.A) 03.A절의 한계). V가 간 곳 기록 | 확인되지 않았다 |
| 커서 대기 중 새 선택 | 두 프로보 커서 사이에 Q | 자동 시전 뒤에도 새 바딩 대상 유지 | 확인되지 않았다 |
| 커서 중첩 | 자동 구간에서 Shift+Space | 자동 바딩이 등록 커서를 먹거나 엉뚱한 몹을 찍지 않음. 등록 취소도 정상. 이 확인 전까지 등록은 수동 구간에서 | 확인되지 않았다 |
| 늦은 둘째 커서 | 렉이 있을 때 자동 프로보 | 둘째 커서를 1초까지 기다려 전달. 못 받으면 취소, 커서가 남지 않음(2026-10-22 변경). 남으면 그 뒤 멈춘 블록 기록 | 확인되지 않았다 |
| 수동 B→C 뒤 복귀 | 수동 구간에서 B→C, Tab | 등록된 B, C에 재프로보와 Peace 중복 없음 | 확인되지 않았다 |
| 사망, 이탈, 라벨 없음 | 짝 중 하나가 죽거나 멀어짐 | 무한 반복과 종료 없음, 다음 짝 | 확인되지 않았다 |
| 아처리 마릿수 | Q로 T, Shift+Space로 B | Incendiary와 Ricochet | 확인되지 않았다 |
| 다른 슬롯 입력 | 동료 회복 커서, 같은 몹 재선택 | 동작 기록 | 확인되지 않았다 |

## <a id="18"></a>18 tamer-archer-enhanced 인게임 확인

블록 순서와 설정의 정본은 [recipe/tamer-archer-enhanced-recipe.razor](https://github.com/nomeehej/uoo/blob/master/recipe/tamer-archer-enhanced-recipe.razor).
반영은 핫키면 클라이언트 재시작, Scripts 탭은 리로드 뒤 Play([Workflow](../working/workflow.md#04) 04절).

| 검사 | 하는 것 | 통과 기준 | 상태 |
| --- | --- | --- | --- |
| 템플릿 | 캐릭터 스킬 | Animal Lore, Animal Taming 120. Veterinary, Resisting Spells, Magery, Archery, Tactics, Herding 80 | 인게임 확인됨 2026-10-21 |
| 셀프 붕대 | 캐릭터 스킬, 수의사 키트 | Healing 없음 → 붕대 블록 없음, 수의사 키트가 셀프 붕대([12절](#12)) | 인게임 확인됨 2026-10-21 |
| 시작 | 실행 | `[ crook, out ]` 없이 `[ tamer archer, on ]`, 코덱스 핫바 표시 | 확인되지 않았다 |
| 코덱스 핫바 다시 Play | 코덱스 핫바가 이미 떠 있을 때 다시 Play | 핫바가 닫히는지 | 확인되지 않았다 |
| 활 재장착 | 활을 들고 시전 | Journal `Rearm: two-handed layer remembered`, 시전 뒤 `Rearm: equip requested on the two-handed layer` | 확인되지 않았다 |
| Full Draw 정지 | 교전 중 정지 | `[ full draw ]` 60초마다, 정지 3초 뒤 발사. 손해면 `ability_main` 3 | 확인되지 않았다 |
| Full Draw 이동 | 움직이며 사격 | `[ full draw ]` 안 나감 | 확인되지 않았다 |
| Protection | `Buff: Protection.` 뒤 | 아이콘, 2분 뒤 다시([16절](#16) Protection 항목) | 확인되지 않았다 |

#### 기록

- 2026-10-21 추가. 사용자 요청으로 뺀 것: `escape/tracking`, `recovery/bandage`, `bard/provo-picks`, `fight/archery-codex`, `buff/mushroom`, `magery/flamestrike`, Bless, Arch Protection

#### 메모

- 할 일: 사용할 캐릭터의 summoner 프로필 F1을 `Play Script: combat\tamer-archer-enhanced`로 연결. 현재 프로필에는 연결 없음, 설정 파일은 게임 종료 뒤 수정
- 입력은 summoner 프로필 배치([Hotkeys](../game/hotkeys.md#01.E) 01.E절). 코덱스, 사격, 펫 명령, 대상 지정은 수동, 루프는 펫을 명령하지 않음
- 바드 블록 없음
- `[CodexHotbar`를 시작 때 한 번 요청([Commands](https://wiki.uooutlands.com/Commands) "Launches the Codex Hotbar"). 코덱스 자세와 피니셔의 자동 전환 없음
- Full Draw: 활은 2.21초에 한 발([Combat](../mechanics/combat.md#02.B) 02.B절 표) → 15초에 6.8발 × 50% = 약 340%. Repeater 225%보다 큼. 정지 3초 조건이라 움직이며 쏘면 Repeater(`ability_main` 3)
- 사거리 10: 활([Archery](../mechanics/archery.md#01) 01절). `target_range`와 `ability_range` 모두 10
- 버프는 bard-archer와 같은 RA 24, Reflect 34, Protection 26. Greater Heal 11과 Teleport 9의 20을 남김
- 스탯 포션 기준선 STR 120, DEX 100은 기본값. 이 템플릿의 스탯은 미기록 → 다르면 레시피에서 변경
- `rearm_graphic` 5042로 활 검색. 공용 재장착 동작과 상태는 [16절](#16) 재장착 항목
- 수의사 키트 검사: [12절](#12)의 항목 그대로


## <a id="19"></a>19 bard-wrestling-enhanced 인게임 확인

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
| 요청 재확인 | 코덱스 전환 전후 Journal과 라벨 확인 | 적용된 선택을 다시 토글하지 않음. 미적용은 라벨 확인 뒤 재시도 | 확인되지 않았다 |
| 패링 재동기화 | 루프 실행 중 피니셔를 Barrier로 바꾼 뒤 대기 | 다음 정기 재확인에서 Last Stand 복구. 확인 후 같은 명령 반복 없음 | 확인되지 않았다 |
| 패링 라벨 모호성 | 실제 라벨에 자세나 피니셔 이름이 없거나 여럿인지 확인 | 해당 선택의 off 알림. 판독 가능한 다른 선택의 관리는 계속 | 확인되지 않았다 |
| 수동 창 | 수동 타깃 커서 보유, 시전 또는 은신 중 코덱스 변경이 필요한 상황 | 요청 보류, 커서 유지. 해제 뒤 두 코덱스 자동 관리 복귀 | 확인되지 않았다 |
| Warding | 독, Bleed, Disease 중 기억한 몹과 거리 변경 | 근접 Testudo, 2칸 밖 Warding. 상태 해제 뒤 Testudo | 확인되지 않았다 |
| 장착과 능력 | Scroll을 백팩에 넣거나 다른 무기로 교체 | 22187이 장착되기 전 Brawl 요청 없음 | 확인되지 않았다 |
| 시전 뒤 재장착 | Greater Heal 등으로 손이 비는 상황 | 회복 후 Scroll 복귀. 요청과 실제 장착을 구분 | 확인되지 않았다 |
| Brawl 충전 | 능력 요청 시각, 실제 명중과 발동, 다음 충전을 기록 | 60초 요청 간격의 지연 여부 확인. 요청 자체를 발동으로 판정하지 않음 | 확인되지 않았다 |
| 재활용 복귀 | 새 루프 실행 후 recycle 완료 | `combat\bard-wrestling-enhanced`로 복귀 | 확인되지 않았다 |
