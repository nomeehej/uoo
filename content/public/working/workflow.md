---
name: Workflow
label: 작업 방식
group: How we work
order: 10
---

문서별 정본, 로컬 작업, 근거, 스크립트 수정 순서, 게임 반영과 확인.
파일 이름과 스크립트 모양은 [Conventions](../scripting/conventions.md), 문법과 함정은 [Razor](../scripting/razor.md).

## <a id="00"></a>00 한눈에

```mermaid
flowchart LR
  a("01<br>근거") --> b("02<br>고치기")
  b --> c("03<br>보고")
  c --> d("04<br>반영과 확인")
  d --> e("05<br>문서와 커밋")
```

| 절 | 내용 |
| --- | --- |
| [01](#01) | 근거의 우선순위, 참고 사이트, 숫자 인용 |
| [02](#02) | 로컬 작업과 스크립트 수정 순서 |
| [03](#03) | 변경 보고에 넣을 것 |
| [04](#04) | 게임 반영. 리로드와 재시작, 캐시와 종료의 덮어쓰기 |
| [05](#05) | 문서와 커밋 규칙의 위치 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

### <a id="00.A"></a>00.A 문서별 정본

문서별 정본은 이 표 한 곳. 같은 내용은 다시 쓰지 않고 해당 문서로 링크.
언제나 지킬 규칙과 커밋 규칙은 [AGENTS.md](https://github.com/nomeehej/uoo/blob/master/AGENTS.md).

| 문서 | 정본인 내용 |
| --- | --- |
| [Workflow](workflow.md) | 문서별 정본, 로컬 작업, 근거의 우선순위와 참고 사이트, 스크립트 수정 순서, 변경 보고, 게임 반영과 확인 |
| [Writing](writing.md) | 문서 작성. 새 문서, frontmatter, 짜임, 문장, Markdown, 언어와 번역본, 흐름도, 끝낼 때 확인 |
| [Conventions](../scripting/conventions.md) | 폴더와 파일 이름, 스크립트 모양과 배너, 변수 접두, serial, 타이머 관용구, 편집기 하이라이팅 |
| [Razor](../scripting/razor.md) | Outlands Razor 확장 문법, 확인된 함정, 되는 구문의 선례, 명령문 비용, PvP 명령 제약 |
| [Modules](../scripting/modules.md) | 모듈 폴더, 레시피와 모듈 형식, 조립 규칙, base와 블록 사이 신호, 옮긴 기록 |
| [Overheads](../scripting/overheads.md) | 알림의 세 경로, `[ 대상, 상태 ]` 형식, 어휘, hue, 쿨다운 바, 프로필 오버헤드 표 |
| [PvP](../game/pvp.md) | 템플릿과 무관한 PvP 규칙과 숫자. Heat of Battle, 명중률, Hamstring, TK, 주문 싸움, 소환수 |
| [Combat](../mechanics/combat.md) | 방어구와 마나 재생, 근접 반격력, 붕대, 스탯 포션, Parrying, Resisting Spells, Tracking |
| [PvP Loop](../loops/pvp.md) | 공통 자기관리 루프 `combat/pvp`의 입력 규칙, 설정, 골격, 타이머, 무기 선택, 상태 |
| [Hotkeys](../game/hotkeys.md) | 키 배치, 주문 데미지 메모 |
| [Item list](../game/item-list.md) | 아이템 이름, graphic id, hue |
| [Barding](../mechanics/barding.md) | 바드 세 스킬과 송의 쿨, 효과, 코덱스, Defensive Barding, 프로보 후보 입력 |
| [Necromancy](../mechanics/necromancy.md) | Vengeful Spirit 소환, 언데드, Unholy Symbol 경제 |
| [Magery](../mechanics/magery.md) | Magery 프록과 시전 시간 |
| [Bard Necro](../templates/bard-necro.md) | Bard Necro의 캐릭터, 코덱스 배분, 소환수 선택, PvP 판단 |
| [Bard Necro Enhanced](../loops/bard-necro-enhanced.md) | bard-necro-enhanced 루프의 설계, 자원, 마나 예산, 설계 결정, 소환수 블록 |
| [Lumberjack PvP](../templates/lumberjack-pvp.md) | 벌목과 PvP 템플릿의 스킬, 스탯, 도끼 선택, 마나 예산, 교전 분기, 구현 요구사항, 공통 pvp 설정 |
| [Lumberjack Enhanced](../loops/lumberjack-enhanced.md) | lumberjack-enhanced 루프의 실행 흐름, 채집 근거, 기본값과 상태, 실행 준비 |
| [Archery](../mechanics/archery.md) | 아처리 무기와 사격 간격, 자세, 피니셔, 무기 능력, PvP에서 빠지는 것 |
| [Bard Archer](../templates/bard-archer.md) | Bard Archer의 스킬과 코덱스, 갑옷과 마나, 부활, bard 프로필 |
| [Bard Archer Enhanced](../loops/bard-archer-enhanced.md) | bard-archer-enhanced 루프의 블록 순서, 여러 마리 판정, Virtuoso 유지 |
| [Bard Wrestling](../templates/bard-wrestling.md) | Bard Wrestling의 스킬 계획, 무기와 코덱스 선택 |
| [Bard Wrestling Enhanced](../loops/bard-wrestling-enhanced.md) | 바드 레슬링 루프의 자동 자세, Parry Codex, 능력과 장착 조건 |
| [Open items](../questions/open-items.md) | 사용자에게 물을 것. 뜨지 않는 바, 규칙과 어긋난 줄, 출처 없는 숫자, 인게임 확인 목록 |

::part[근거]

## <a id="01"></a>01 근거

### <a id="01.A"></a>01.A 우선순위

규칙이 다르면 앞의 것.

1. 사용자 요청
2. [AGENTS.md](https://github.com/nomeehej/uoo/blob/master/AGENTS.md)와 `content/`의 규칙 문서
3. 같은 폴더의 기존 스크립트
4. 공식 위키

### <a id="01.B"></a>01.B 참고 사이트

| 용도 | 링크 |
| --- | --- |
| Outlands Razor 문법. 확장 명령 포함, 가장 먼저 | [https://wiki.uooutlands.com/Razor_Scripting](https://wiki.uooutlands.com/Razor_Scripting) |
| 게임 메커니즘, 아이템, 몹 | [https://wiki.uooutlands.com/](https://wiki.uooutlands.com/) |
| Razor CE 기본 문법. Outlands Razor의 포크 원본 | [https://www.razorce.com/guide/](https://www.razorce.com/guide/) |
| 공개 스크립트 모음. Jaseowns 스크립트 포함 | [https://outlands.uorazorscripts.com/](https://outlands.uorazorscripts.com/) |
| Storage Shelf 로드아웃 스크립트 생성기 | [https://www.outlandsbutler.com/](https://www.outlandsbutler.com/) |
| 공식 포럼 | [https://forums.uooutlands.com/](https://forums.uooutlands.com/) |

문법이 애매하면 추측 대신 위키. Outlands Razor에는 Razor CE에 없는 명령이 많음([Razor](../scripting/razor.md)).

### <a id="01.C"></a>01.C 숫자는 인용

공식, 쿨다운, 확률 같은 게임 숫자는 추측 금지. 먼저 아래 문서에서 찾음.

| 숫자 | 위치 |
| --- | --- |
| 바드, 네크로, 소환수 | [Bard Necro](../templates/bard-necro.md) |
| PvP 규칙 | [PvP](../game/pvp.md) |
| 아이템 graphic id, hue | [Item list](../game/item-list.md). 상점 가격은 `script/loot/stock-vendor.razor` 맨 위가 정본 |
| 주문 데미지 메모 | [Hotkeys](../game/hotkeys.md#06) 06절 |

문서에 없으면 위키를 읽고 해당 문서에 추가.

- 위키, 패치노트 문장: 원문 그대로 `>` 인용. 해석은 인용 아래 따로
- 인게임 확인: "인게임 확인됨 2026-09-28"처럼 날짜. 미확인: "확인되지 않았다". 사용자가 말로 확인한 것도 같은 문구("사용자 확인" 같은 변형 금지)

::part[스크립트]

## <a id="02"></a>02 스크립트 고치기

### <a id="02.A"></a>02.A 로컬 작업

설치 요건과 문서 사이트 실행은 [Writing](writing.md#01) 01절.

| 명령 | 역할 |
| --- | --- |
| `pnpm build` | 모듈과 레시피로 스크립트 조립. 형식과 조립 규칙은 [Modules](../scripting/modules.md#07) 07절 |
| `pnpm check` | 스크립트, 조립 결과, 설정 타입과 문서 링크 검사 |
| `pnpm test` | `util/`의 PvP 시뮬레이터와 문서 검사 테스트 실행 |

- 단일 스크립트 사용: [스크립트 목록](https://github.com/nomeehej/uoo/blob/master/script/README.md)에서 `.razor` 파일을 골라 Razor의 `Scripts` 폴더에 복사
- 게임에 저장소 연결: [설정 안내](https://github.com/nomeehej/uoo/blob/master/language/config.ko.md)

### <a id="02.B"></a>02.B 수정 순서

1. **대상 스크립트를 끝까지 읽음.** 메인 루프 하나에 타이머, 타겟 캐시, 후속 시전이 얽힘 → 한 분기만 고치면 다른 분기가 깨짐
2. [Razor](../scripting/razor.md#03) 03절 확인된 함정 표. 새 패턴은 같은 문서 04절 선례부터
3. 요청 범위만. 저장소에 근거 없는 패턴 금지
4. `util/check.sh <파일>`: `if`와 `endif`, `while`과 `endwhile`, `for`와 `endfor` 짝, 값 없이 쓴 접두 변수 검사
5. 새 전투 루프는 [script/README.md](https://github.com/nomeehej/uoo/blob/master/script/README.md) 전투 루프 표에 추가

## <a id="03"></a>03 변경 보고

보고에 꼭 넣을 것.

- 추가하거나 바꾼 변수와 타이머
- 인게임 확인 방법. 어떤 상황에서 어떤 `overhead`가 떠야 하고, 어떤 경우가 실패인지
- 반영 방법. 리로드 또는 재시작(04절), 게임 종료 뒤 `git status`
- 답 못 받은 질문. [Open items](../questions/open-items.md)에도 추가

## <a id="04"></a>04 게임에 반영하고 확인하기

### <a id="04.A"></a>04.A 스크립트 캐시와 리로드

Razor는 스크립트 본문을 메모리에 캐시. 반영 방법은 수정 위치와 실행 방법에 따라 다름.

```mermaid
flowchart LR
  file{"외부 편집기로<br>파일을 고쳤나"} -- 예 --> hotkey{"핫키로 돌리나"} -- 예 --> restart("클라이언트를 껐다 켠다<br>리로드로는 안 된다")
  file -- 아니요 --> owned("Razor 편집기에 붙여넣었다<br>핫키도 새 본문을 쓴다")
  hotkey -- 아니요 --> reload("Reload all scripts 뒤<br>Play 버튼으로 돌린다")
```

- **핫키 실행 → 클라이언트 재시작. 리로드로는 반영 불가.** 리로드는 기존 객체를 바꾸지 않고 새 객체를 목록에 덧붙임.
  프로필의 바인딩은 객체가 아닌 이름(`Play Script: hotkey\regear`) → 키를 누르면 같은 이름 중 맨 앞의 옛 객체 실행
- **Scripts 탭 Play 버튼 실행 → 리로드로 충분.** Scripts 탭을 다시 열거나 우클릭 → Reload all scripts. 반복 시험은 이쪽
- **조립한 스크립트**(머리에 `Generated from` 줄. 루프와 loadout 같은 루틴): 모듈과 레시피 수정 → `pnpm build` → 위와 같이 반영.
  Razor 편집기에서 고치면 다음 조립이 덮어씀([Modules](../scripting/modules.md#07) 07절)
- **Razor 편집기에 붙여넣기 → 기존 객체 본문 교체, 핫키도 새 본문.** 단, 그때부터 Razor가 파일의 주인. 외부 편집기 수정과 섞지 않음(04.B절)

리로드마다 Hotkeys 목록에 `Play Script: ... (not assigned)` 한 줄씩 추가. 메모리에만, 파일에는 안 남음.

**파일을 고쳤는데 오류가 같은 줄 번호를 계속 가리키면 캐시 의심.** 줄을 지웠다면 아래 줄 번호도 당겨져야 정상.
Reload all scripts로 안 풀리면 클라이언트 완전 재시작.

### <a id="04.B"></a>04.B 캐시가 파일을 되돌림

- 캐시에 옛 본문이 남은 채 종료 → Razor가 그 본문을 파일에 다시 씀. 외부 편집기 수정이 되돌아갈 수 있음 → **종료 뒤 `git status` 확인**
- 리로드 반복 → 옛 본문 객체가 쌓여 위험도 커짐. 해결은 재시작
- 외부 편집기로 스크립트를 고치는 프로필은 Razor 설정 `AutoSaveScript` 끔

### <a id="04.C"></a>04.C config는 종료 시 덮어씀

**`config/`는 게임 종료 상태에서만 수정.** 종료 시 클라이언트가 설정 파일을 통째로 덮어씀.
Razor 프로필 xml, ClassicUO의 `cooldowns.xml`, `macros.xml` 모두 해당. 켜 둔 채 고치면 종료 때 조용히 사라짐(실제로 한 번 날아감).

::part[문서와 커밋]

## <a id="05"></a>05 문서와 커밋

- 문서 쓰는 법, 글의 언어와 번역본: [Writing](writing.md)
- 커밋 규칙, 제목의 좋은 예와 나쁜 예: [AGENTS.md](https://github.com/nomeehej/uoo/blob/master/AGENTS.md) 2절에만
