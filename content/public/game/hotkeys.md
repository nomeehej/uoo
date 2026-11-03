---
name: Hotkeys
label: 핫키 배치
group: Game reference
order: 30
---

모든 캐릭터 **같은 자리에 같은 역할**. 배치는 세 유형, Razor 프로필 하나 = 유형 하나.

| 유형 | 누구 | Razor 프로필 |
| --- | --- | --- |
| summoner | 소환수와 펫을 부리는 캐릭터 | `summoner` |
| bard | 펫 없이 바딩하고 손으로 공격하는 캐릭터. 2026-10-21 `summoner`를 복사 | `bard` |
| basic | 그 밖의 캐릭터(기본형) | `default` |

- 유형마다 다른 칸: 아랫줄(01.E절)뿐
- 템플릿마다 채우는 칸: `1 2 3`, `F1`, `F4`, Alt 줄(03절)
- 바인딩 정본: Razor 프로필 xml, ClassicUO `macros.xml`, `profile.json`(02.C절). 이 문서는 사람이 읽는 배치도

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 키별 바인딩 |
| [02](#02) | 층 구분, Mac에서 막히는 키, Razor와 ClassicUO 중 거는 곳 |
| [03](#03) | 캐릭터별 템플릿 칸 |
| [04](#04) | 상황별 누르는 순서 |
| [05](#05) | 프로필 L 번호와 Razor 이름 |
| [06](#06) | 주문 데미지 |
| [07](#07) | 확인 못 한 것 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

::part[배치]

## <a id="01"></a>01 키 배치

- 키보드 줄마다 표 하나. —: 빈칸. (예정): 자리만 정하고 아직 안 건 칸
- Mac: Wine이 `Cmd → Ctrl`, `Option → Alt`로 전달(`prefix/user.reg`의 `LeftCommandIsCtrl`, `LeftOptionIsAlt`)
- 이 문서의 **Ctrl = 엄지로 누르는 Cmd**, Alt = Option

### <a id="01.A"></a>01.A 펑션줄

|  | Esc | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 | F9 | F10 | F11 | F12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 무수정 | 스크립트 정지 | **전투 루프** | cancel-target | recycle | **PvP 루프** | 이름 표시 | 투명 | 하이드 | 명상 | — | share-loot | claim-loot | loadout |
| Shift | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Ctrl | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Alt | — | — | — | — | — | — | — | — | — | — | — | — | — |

### <a id="01.B"></a>01.B 숫자줄

|  | `` ` `` | 1 | 2 | 3 | 4 | 5 | 6 | 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 무수정 | **Smart Heal/Cure** | 시그니처 ① | 시그니처 ② | 시그니처 ③ | Explosion | Energy Bolt | Paralyze | Night Sight |
| Shift | — | — | — | — | — | — | — | — |
| Ctrl | **Greater Heal** (커서 → 펫, 동료) | 힐 포션 | 큐어 포션 | 리프 포션 | 힘 포션 | 민 포션 | 레지 포션 | — |
| Alt | — | **Vengeful Spirit** | Fire El → Lich | Water El → Rag Witch | Earth El → Mummy | Daemon → Vampire | Summon Creature | regear |

- Alt 줄 → 뒤 이름: Vengeful Spirit(`Alt+1`)을 켜고 부를 때 나오는 언데드([Necromancy](../mechanics/necromancy.md#01.A) 01.A절)
- Alt 줄: 템플릿이 쓰는 소환만(03절). 예외 `Alt+0` regear(사망 뒤 장비 다시 갖추기, 옛 dress), 자주 안 눌러 줄 끝에 둠
- 빈 `7`\~`9`는 표에서 제외

### <a id="01.C"></a>01.C 윗줄

|  | Tab | Q | W | E | R | T | Y | U |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 무수정 | — | 셋 라타(Harmful) | ↑ | **라타 발사**(Harmful) | Teleport | Telekinesis | — | — |
| Shift | — | Harm | Magic Arrow | Fireball | Lightning | Mind Blast | Poison | — |
| Ctrl | — | Reactive Armor | Magic Reflection | Protection | Bless | **Cure** (커서 → 펫, 동료) | **Resurrection** (커서 → 동료) | — |
| Alt | — | — | — | — | — | — | — | — |

라타 = last target. `Q`로 대상 지정 → 주문 커서가 뜨면 `E`로 라타에 시전.
2026-10-20부터 두 프로필 모두 Harmful 쪽(`Set Last Target (Harmful)`, `Target Last Harmful`). 적대 대상 표시가 하나로 모이고, 루프도 `lastharmful`을 읽음

두 바드 루프의 프로보 후보 키는 `Shift+Space`(01.F절).

### <a id="01.D"></a>01.D 홈줄

|  | A | S | D | F | G | H | J |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 무수정 | ← | ↓ | → | 로프 | 폭발 포션 | **Chain Lightning** | — |
| Shift | — | — | — | — | — | — | — |
| Ctrl | — | — | — | — | — | — | — |
| Alt | — | — | — | — | — | — | — |

`F` 로프: Razor `Rope`(L:2529, 05절). `macros.xml`의 `[rope` 매크로도 F에 있으나 `HotKeyStop`에 가려짐(02.C절). 여섯 캐릭터 같은 자리.

### <a id="01.E"></a>01.E 아랫줄

**`Z → V` = 공격.** 세 유형 모두 `Z`로 시작, `V`로 끝. 키의 뜻은 유형마다 달라도 결과는 같음 → 가장 가까운 몹 공격.
유형마다 다른 칸: `Z X C V`의 무수정과 Shift뿐.

|  | Z | X | C | V | B | N |
| --- | --- | --- | --- | --- | --- | --- |
| 무수정 (summoner) | **All Kill** (커서) | All Follow Me | All Guard Me | **가장 가까운 몹 타겟** | moongate | home |
| 무수정 (basic, bard) | **가장 가까운 몹 타겟** | 이전 플레이어 | 다음 플레이어 | **Attack Last Target** | moongate | home |
| Shift (summoner) | 다음 몹 | 이전 플레이어 | 다음 플레이어 | Attack Last Target | — | — |
| Shift (bard) | 다음 몹 | — | — | — | — | — |
| Shift (basic) | 햄스트링 토글 (예정) | 디스암 토글 (예정) | — | — | — | — |
| Ctrl | Wall of Stone | Dispel Field | Invisibility | Reveal | — | — |
| Alt | — | — | — | — | — | — |

- summoner: `Z` → All Kill 커서, `V` → 그 커서를 가장 가까운 몹으로 채움. 커서가 없으면 `V`는 라타 지정만
- summoner `Shift+Z`: 다음 몹을 라타로(Next Non-Friendly Monster Target, 인게임 확인됨 2026-10-20). 커서 없이 순환 → 루프의 커서와 안 부딪힘
- basic: `Z`로 라타 지정, `V`로 공격. PvP는 `X`나 `C`로 플레이어 지정 → `V`
- bard: 무수정은 basic과 같음. 펫이 없어 펫 명령 없음. `Shift+Z`는 summoner처럼 다음 몹으로 바딩 대상 변경. 프로보 후보 입력은 [Barding](../mechanics/barding.md#03.A) 03.A절
- 플레이어 순환: summoner `Shift+X/C`, basic과 bard 무수정 `X/C`. 키 하나에 바인딩 하나 → summoner는 무수정 `X`, `C`를 펫 명령에 씀
- summoner Follow `X`, Guard `C`. `C`는 가장 자주 누르는 `V` 옆 → 오입력 잦음.
  Guard 오입력은 펫이 싸움 유지, Follow 오입력은 펫이 싸움 중단
- 햄스트링과 디스암: 평소 켬. basic의 `Shift+Z`, `Shift+X`는 상황별 토글 자리(예정, 07절).
  토글 시 프로필 오버헤드 `[ hams mode, on/off ]`, `[ disarm mode, on/off ]`([Profile Messages](../scripting/profile-messages.md#01) 01절)
- 무기 스왑(`hotkey/weapon-*`)은 스크립트 → 누르면 전투 루프 정지 → 이 줄에서 제외

### <a id="01.F"></a>01.F 마우스와 기타

|  | Space | 휠 위 | 휠 아래 | 사이드 위 (`-5`) | 사이드 아래 (`-4`) |
| --- | --- | --- | --- | --- | --- |
| 무수정 | 자기 타겟 | — | **Interrupt** | 타겟 취소 | **Pouch** (마비 해제) |
| Shift | **프로보 후보** | 다음 아군 플레이어 | 이전 아군 플레이어 | — | — |
| Ctrl | — | — | — | — | — |
| Alt | — | — | — | — | — |

- `Shift+Space`: `Set Last Target (Beneficial)`. 커서로 찍은 몹을 두 바드 루프의 프로보 후보에 등록, 바딩 대상은 그대로([Barding](../mechanics/barding.md#03.A) 03.A절).
  엄지 Space와 새끼 Shift, 손 이동 없음. 2026-10-21 summoner와 bard 프로필에 추가. 커서가 뜨고 찍은 몹에 `[ provo, set ]`. 인게임 확인됨 2026-10-22

## <a id="02"></a>02 규칙

### <a id="02.A"></a>02.A 층

| 층 | 뜻 | 줄별 |
| --- | --- | --- |
| 무수정 | 손에 익어야 하는 것 | 이동, 타겟, 펫, 핵심 콤보, 도주, 긴급 |
| Shift | 밖으로 던지는 것 | 윗줄 공격 주문 6, 아랫줄 교전(summoner는 플레이어 순환, bard는 다음 몹, basic은 햄스트링과 디스암), Space 프로보 후보 |
| Ctrl | 나와 내 편에 좋은 것 | 숫자줄 포션 6, 윗줄 버프 4와 펫 큐어와 동료 부활, 아랫줄 필드와 유틸 4, `` ` `` 펫 힐 |
| Alt | 소환만 | `1` VS → `2`\~`6`. 예외 `0` regear 하나(01.B절). 전투 밖에서 천천히 |

### <a id="02.B"></a>02.B Mac에서 막히는 키

Ctrl = Cmd, Alt = Option(01절) → macOS가 먼저 가져가는 키 있음.

| 키 | 무엇이 막나 | 대처 |
| --- | --- | --- |
| `Ctrl+Space` | macOS가 가져감 | 사용 안 함 |
| `` Ctrl+` `` | macOS 기본 단축키 "다음 윈도우로 초점 이동"이 가져감 | 시스템 설정 → 키보드 → 키보드 단축키 → 키보드에서 그 항목을 끄고 사용 |
| `` Alt+` `` | `` Option+` ``은 악센트 dead key → 게임에 안 들어옴 | 사용 안 함. Alt 줄은 `1`부터 |
| `Shift+Space` | macOS 입력 소스 전환에 `Shift+Space`를 걸어 두면 macOS가 가져감 | 시스템 설정 → 키보드 → 키보드 단축키 → 입력 소스에서 `Shift+Space`가 아닌지 확인. 지금 설정에서는 들어옴. 인게임 확인됨 2026-10-22 |

### <a id="02.C"></a>02.C 어디에 거는가

| 어디 | 무엇 | 메모 |
| --- | --- | --- |
| Razor 프로필 `<hotkeys>` | Razor 핫키로 되는 것 전부. 주문, 네크로 능력, 스킬, 타겟, 펫, 포션, Pouch, 힐, 스크립트 | 프로필 하나 = 유형 하나 → 한 파일 수정으로 그 유형의 캐릭터 전부에 적용 |
| ClassicUO `macros.xml` | Razor에 없는 것만. 말하기(`bank guards`, `[recallcharge Houseboat`, `[vendor`, `all release`), 클라이언트 UI(F5 이름 표시, F6 투명, Set Bag), 화면 클릭용 하이드와 명상(키 없음) | 캐릭터마다 따로. 되도록 적게, 캐릭터끼리 같게 |
| ClassicUO `profile.json` | 이동 키 `W A S D`(`walk_up_key` 같은 항목) | 캐릭터마다 따로 |
| 인게임 카운터와 핫바 | 걸지 않음 | 파일에 없는 바인딩은 저장소가 관리 불가 |

프로필 `HotKeyStop=True` → Razor에 걸린 키는 ClassicUO로 안 넘어감. 같은 키를 양쪽에 걸면 ClassicUO 매크로가 조용히 죽음.

::part[쓰는 법]

## <a id="03"></a>03 템플릿이 채우는 칸

| 캐릭터, 템플릿 (유형) | 1 2 3 | F1 | F4 | Alt 줄 |
| --- | --- | --- | --- | --- |
| nomeehej, Bard Archer (bard) | Disco, Peace, Provo | bard-archer-enhanced | pvp | — |
| nomeehui (옛 xuezhonglian), PK 메이지 (default) | Feeblemind, Weaken, Clumsy | skinning-enhanced (현재 연결) | pvp | Water El과 Earth El만 (`Alt+3`, `Alt+4`) |

- 2026-10-21 nomeehej를 Bard Necro(summoner)에서 Bard Archer(bard)로. summoner 프로필과 bard-necro-enhanced는 그대로 둠([Bard Archer](../templates/bard-archer.md#03) 03절)
- summoner일 때 nomeehej의 Alt 줄: 소환 5와 VS

## <a id="04"></a>04 손에 잡히는 흐름

| 상황 | 키 | 메모 |
| --- | --- | --- |
| 소환 | `Alt+1` → `Alt+2` → `Alt+2`, 솔플은 `Alt+1` → `Alt+3` → `Alt+2` | Vengeful Spirit 켠 뒤 듀오는 Lich 둘, 솔플은 Rag Witch와 Lich([Bard Necro](../templates/bard-necro.md#03.A) 03.A절). bard-necro-enhanced가 돌면 루프가 대신 소환([Bard Necro Summons](../loops/bard-necro-summons.md#03) 03절) |
| PvE 공격 | `Z` → `V` | 가장 가까운 몹 공격. summoner는 펫이, basic과 bard는 내가(01.E절) |
| PvE 주문 | `V`(summoner)로 라타 → `1 E` `2 E` → `4 E` `5 E` | `1`, `2`는 시그니처 칸(03절) |
| 몹 여럿(summoner, bard) | `Z` → `V`, 그다음 `Shift+Space`로 한 마리씩 | 후보마다 `[ provo, set ]` 확인. 후보 등록과 바딩 대상 선택은 분리, 절차는 [Barding](../mechanics/barding.md#03.A) 03.A절 |
| PvP 시작 | `F4` | 전투 루프 정지, PvP 루프 시작. 펫 공격은 루프가 15초마다 `all kill`. 복귀는 `F1` |
| PvP 타겟 | `Q`, summoner는 `Shift+X/C`, basic과 bard는 `X/C` | 라타 하나만 공격. 가장 가까운 플레이어 타겟은 서버가 막음 → 플레이어는 순환으로만 지정 |
| PvP 주문 | 라타를 잡고 → `6 E` → `4 E` `5 E` |   |
| 폭탄 | `T` `E` → `G` `E` | Telekinesis 먼저. 상대가 30초 동안 끈끈이([PvP](pvp.md#04) 04절) |
| 긴급 | `` ` `` 힐(새끼손가락), 사이드 아래 Pouch(엄지), `Ctrl+1` 힐 포션(엄지와 약지) | 손 이동 없이 누름 |
| 펫 돌보기 | `` Ctrl+` `` → 펫 클릭(Greater Heal), `Ctrl+T` → 펫 클릭(Cure) |   |

#### 지금 연결된 것

- default, summoner, bard 프로필: F4 → `Play Script: combat\pvp`. 2026-10-05 템플릿별 PvP 스크립트 삭제, `combat/pvp` 하나로 통합
- bard 현재 연결: `F1=bard-archer-enhanced`, `F4=pvp`. 2026-10-21 summoner를 복사해 아랫줄, F1, Alt 소환만 바꿈.
  게임에서 nomeehej의 Razor 프로필을 `bard`로 고르면 `chars.lst`는 Razor가 기록
- default 현재 연결: `F1=skinning-enhanced`, `F4=pvp`, `T=Telekinesis`. 2026-10-09 게임에서 lumberjack-enhanced → skinning-enhanced로 다시 변경
- 진단 파일: `debug\...` 경로로 연결. 프로필 원본 수정 전 게임 종료([Workflow](../working/workflow.md#04.C) 04.C절)
- 2026-10-05 `xuezhonglian` → `nomeehui`. ClassicUO 설정 정본 `config/indian/classicuo/nomeehui/`, 게임의 새 이름 폴더를 여기에 연결.
  캐릭터 serial 동일 → `chars.lst`의 `default` 선택도 그대로
- 저장된 연결과 게임 반응이 다르면 게임 완전 종료 → 재실행 → Razor Profile이 `default`인지 확인.
  실제 동작은 재실행 뒤 인게임 확인 필요

::part[자료]

## <a id="05"></a>05 Razor 내장 이름과 L 번호

프로필의 `L:번호` 출처: `ClassicUO/Data/Plugins/Assistant/Language/Razor_lang.enu`. 아래는 현재 프로필에 걸린 번호.
스킬과 주문을 뺀 번호는 2026-10-21 설치된 파일과 대조해 전부 일치.

| 번호 | 이름 | 번호 | 이름 |
| --- | --- | --- | --- |
| 1028 \~ 1034 | Drink Heal, Cure, Refresh, Magic Resist, Explosion, Strength, Agility | 1058 | Last Target |
| 1059 | Target Self | 1060 | Set Last Target |
| 2061, 2062 | Set Last Target (Beneficial), Set Last Target (Harmful) | 2120 | Target Last Harmful |
| 1332 | Cancel Current Target | 1391 | > Smart Heal/Cure Self |
| 1395 | Attack Last Target | 1994 | > Interrupt |
| 2013 | Target Closest Non-Friendly Monster | 2022, 2024, 2026 | All Follow Me, All Guard Me, All Kill |
| 2083 | Next Non-Friendly Monster Target | — | — |
| 2052, 2055 | Next Friendly Player Target, Previous Friendly Player Target | 2054, 2057 | Next Non-Friendly Player Target, Previous Non-Friendly Player Target |
| 2101 | > Stop Current Script | 2527, 2529 | Pouch, Rope |
| 1044060 + 스킬번호 | 스킬 사용(Disco 1044075, Peace 1044069, Hiding 1044081, Provo 1044082, Meditation 1044106) | 1060522 | Vengeful Spirit. Razor Hotkeys 탭에서 건 번호. 손으로 넣은 2124는 종료 시 버려짐 |

**Magery 주문** 번호는 계산.

- Razor CE `Spells.cs` 규칙: `3002011 + (서클 - 1) × 8 + (서클 안 번호 - 1)`. 순서는 CE `spells.def`
- ClassicUO 매크로 `subcode`에서 변환: `3001949` 더함(`L = subcode + 3001949`, Clumsy `subcode 62` = `L:3002011`)

| 주문 | 번호 | 주문 | 번호 | 주문 | 번호 |
| --- | --- | --- | --- | --- | --- |
| Clumsy | 3002011 | Feeblemind | 3002013 | Magic Arrow | 3002015 |
| Night Sight | 3002016 | Reactive Armor | 3002017 | Weaken | 3002018 |
| Cure | 3002021 | Harm | 3002022 | Protection | 3002025 |
| Bless | 3002027 | Fireball | 3002028 | Poison | 3002030 |
| Telekinesis | 3002031 | Teleport | 3002032 | Wall of Stone | 3002034 |
| Greater Heal | 3002039 | Lightning | 3002040 | Dispel Field | 3002044 |
| Magic Reflection | 3002046 | Mind Blast | 3002047 | Paralyze | 3002048 |
| Summon Creature | 3002050 | Energy Bolt | 3002052 | Explosion | 3002053 |
| Invisibility | 3002054 | Reveal | 3002058 | Chain Lightning | 3002059 |
| Resurrection | 3002069 | Summon Daemon | 3002071 | Summon Earth El. | 3002072 |
| Summon Fire El. | 3002073 | Summon Water El. | 3002074 |   |   |

## <a id="06"></a>06 주문 데미지 메모

위키 PvM 값, Magery 100 기준. 자세한 값은 위키 [Magery](https://wiki.uooutlands.com/Magery).

| 주문 | 피해 | 비고 |
| --- | --- | --- |
| Fireball | 14\~18 | 0.5초 딜레이 |
| Lightning | 16\~20 | 0.25초 딜레이 |
| Mind Blast | 20\~32 | 상대 AR만큼 증가 |
| Energy Bolt | 32\~44 |   |
| Explosion | 34\~46 | 2.5초 딜레이 |
| Chain Lightning | 30\~42, 2타일 | 리플렉트 제거. 플레이어 피격 시 30초 쿨 |
| Flamestrike | 72\~96 | PvP에서는 연속 시전마다 피즐 10%씩 누적 |
| Earthquake | 15\~25, 8타일 | PvP에서는 현재 HP의 50% |

::part[기록]

## <a id="07"></a>07 확인 안 된 것

- 인게임 카운터와 핫바에 남은 포션, T, Y 바인딩 해제 여부
- default `2`, `3`의 Weaken, Clumsy가 실제 템플릿에 맞는지. 임시 배정. `1`은 2026-10-09 사용자가 Feeblemind로 결정
- 사이드 위, 아래와 코드 `-5`, `-4`의 대응. 반대면 두 줄 맞바꿈
- macOS "다음 윈도우로 초점 이동"을 끈 뒤 `` Ctrl+` ``이 게임에 들어오는지
- 아랫줄 새 배치(`summoner.xml`, `default.xml`, `bard.xml`)의 게임 동작
- 햄스트링과 디스암 토글 거는 방법(Razor 핫키, 채팅 명령, 버튼). 위키 Hamstring 문서 확인 후 basic `Shift+Z`, `Shift+X`에 걸기
- Razor로 옮긴 주문 핫키(`L:3002011` \~ `L:3002074`)의 Outlands 동작. CE 규칙으로 계산한 번호, 이 포크에서 게임 확인 안 됨.
  주문 매크로는 여섯 캐릭터의 `macros.xml`에서 이미 삭제. 안 도는 키는 Razor Hotkeys 탭에서 다시 걸고 게임 종료로 프로필 저장
