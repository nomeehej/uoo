---
name: Conventions
label: 저장소와 스크립트 규칙
group: Scripting
order: 10
---

파일 위치와 이름, 스크립트 모양.
되는 구문과 함정은 [Razor](razor.md), 머리 위 메시지는 [Overheads](overheads.md).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 폴더와 파일 이름, `config/`의 주인 |
| [02](#02) | 스크립트 순서와 모양. 헤더, 시작 4줄, 섹션과 블록 배너, 주석, 편집기 하이라이팅 |
| [03](#03) | 변수 접두, 세션 값과 영속 값, serial 금지 이유 |
| [04](#04) | 타이머 만들기와 읽기 |
| [05](#05) | 그 밖의 관용구 |
| [06](#06) | `overhead` 쓰는 법 |
| [07](#07) | PvP 겸용 스크립트 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

::part[저장소]

## <a id="01"></a>01 저장소 구조

### <a id="01.A"></a>01.A 폴더

폴더 규칙의 정본은 이 표. 루트 README의 폴더 표는 사람용 요약.

| 폴더 | 내용 |
| --- | --- |
| `script/` | Razor 스크립트. 모두 공용 |
| `module/`, `recipe/` | 한 벌만 둔 블록, 루프와 루틴마다 레시피 하나. `util/build-scripts.mjs`가 `script/combat/*`, `script/gather/*`와 loadout 같은 루틴으로 조립([Modules](modules.md)) |
| `config/` | 사람마다 클라이언트 설정 원본 하나(`config/<이름>/`). 링크 방식과 파일별 설명은 [config/README.md](https://github.com/nomeehej/uoo/blob/master/config/README.md) |
| `content/` | 설계 문서. 공개 문서는 `public/` 아래 묶음별 폴더, 홈은 `README.md`, 공용 자원은 `asset/`. for-humanity 사이트로 읽음(`pnpm docs:dev`). 문서 목록은 [Workflow](../working/workflow.md#00.A) 00.A절, 쓰는 법은 [Writing](../working/writing.md) |
| `language/` | README 번역본. 규칙은 [Writing](../working/writing.md#07) 07절 |
| `util/` | 저장소 도구. 아래 표 |

`util/` 구성. Node 도구는 Node 22 표준 라이브러리만, 문서 검사만 `parse5` 사용.

| 파일 | 역할 |
| --- | --- |
| `setup.sh` | 게임을 저장소에 링크 |
| `build-scripts.mjs` | 모듈과 레시피로 루프 조립(`pnpm build`). `--check`, `--settings`, `--new-module` |
| `check.sh` | 블록 짝, 값 없이 쓴 접두 변수 검사. 인자 없이 돌리면 끝에 조립 결과물 검사(`build-scripts.mjs --check`)도 |
| `check-docs.mjs` | 문서 사이트의 끊긴 링크와 앵커, 번호 제목의 앵커 검사. 테스트는 `check-docs.test.mjs` |
| `pvp-sim.mjs` | 조건부 전투 모형. 수치 검사는 `pvp-sim.test.mjs` |
| `razor-syntax/` | `.razor` 편집기 하이라이팅(02.F절) |

- 웹이나 서버 프로젝트 아님. 스크립트 자동 검사는 `check.sh`와 그 안의 조립 검사뿐, 동작은 인게임에서만 확인
- `pnpm check`: 스크립트, 설정 타입과 문서 검사. `pnpm test`: `util/` 테스트
- 전투 모형의 입력, 정책, 실측 한계: [Lumberjack PvP](../templates/lumberjack-pvp.md#05.D) 05.D절

### <a id="01.B"></a>01.B script 분류와 파일명

`script/`는 **언제 돌리는지**로 분류. 파일명만으로 무엇인지 알 수 있어야 함.

| 폴더 | 언제 | 파일명 규칙 | 예 |
| --- | --- | --- | --- |
| `script/combat/` | 사냥 중 계속 도는 메인 루프 | `<템플릿>[-<변형>]` | `bard-necro-enhanced`, `pvp` |
| `script/hotkey/` | 키에 물린 단발 매크로 | `<동작>[-<대상>]`. 무기 바꾸기는 `weapon-<무기>` | `weapon-katana`, `cancel-target`, `regear`, `moongate` |
| `script/debug/` | 진단, 동작 시험용 단발 스크립트. 필요하면 핫키 | `<검사>[-<대상>]` | `dump-label`, `debug-target-find`, `debug-target-state`, `test-telekinesis-var` |
| `script/train/` | 스킬 훈련 | `<스킬>` | `magery`, `carto` |
| `script/gather/` | 채집 루프 | `<채집>` | `lumberjack-enhanced`, `skinning-enhanced` |
| `script/loot/` | 주워 온 것 정리, 분해 | `<동사>-<대상>` | `recycle`, `claim-loot`, `bank-pouch` |
| `script/restock/` | 나가기 전 준비. 로드아웃 | `<동사>-<대상>` | `loadout` |
| `script/archive/` | 쓰지 않는 스크립트. 핫키 없음, 수정 없음, `util/check.sh` 제외. 다시 쓰려면 원래 폴더로 이동 | 원래 이름 그대로 | `bard-mace`, `hally-mage`, `lumberjack` |
| `script/shelf/` | outlandsbutler.com이 만든 Storage Shelf 로드아웃 | `<템플릿>` | `bard-dexxer`, `sailing` |

- 전투 루프와 템플릿 대응의 정본: [script/README.md](https://github.com/nomeehej/uoo/blob/master/script/README.md) 전투 루프 표
- `combat/pvp`: 여러 템플릿 공용 자기관리 루프. Magery, 무기, 붕대는 레시피 설정으로 켜고 끔. 템플릿별 PvP 진입 파일 없음([PvP Loop](../loops/pvp.md))

### <a id="01.C"></a>01.C 파일 규칙

- 파일 이름: kebab-case 소문자, 공백 없음. 폴더가 분류이므로 `combat-` 같은 접두 없음
- 같은 성격 파일 3개 이상 → 폴더 분리. 2개 이하 → 기존 폴더
- `-temp`, `-old`, `-new`, `-backup` 파일 금지. 이력은 git
- `shelf/`: outlandsbutler.com 생성 파일. 손으로 고치지 않고 사이트에서 재생성. 만든 사람의 Storage Shelf serial 포함 → 사실상 개인 파일
- 외부 스크립트(Jaseowns, raveX 등): 헤더 크레딧 유지, 맨 위 설정 변수 위주로만 수정. 이 문서와 [Overheads](overheads.md) 형식은 적용 안 함
- 예외 `loot/recycle`: 2026-10-10 사용자 요청으로 이 규칙에 맞게 재작성. 크레딧은 헤더에 유지, 이후 직접 만든 스크립트로 취급

### <a id="01.D"></a>01.D config는 사람별

- 스크립트는 공용, 설정은 사람별. **다른 사람의 `config/`는 손대지 않음**
- `settings.json`에 계정 비밀번호 포함. **절대 커밋 금지**
- `config/`는 게임 종료 상태에서만 수정. 이유는 [Workflow](../working/workflow.md#04.C) 04.C절

::part[모양]

## <a id="02"></a>02 스크립트 모양

### <a id="02.A"></a>02.A 기준 파일

- 사냥 루프, 채집 루프, loadout 같은 루틴은 `module/`, `recipe/`로 조립([Modules](modules.md)). 결과물은 직접 수정 금지, 모듈과 레시피를 수정
- 모양의 기준 파일: `script/gather/skinning-enhanced.razor`, `script/restock/loadout.razor`
- 새 코드는 이 문서 규칙. 아직 옮기지 못한 파일은 그 파일의 스타일 유지

### <a id="02.B"></a>02.B 구조와 섹션 배너

루프 구성: 헤더(02.C절), 시작 4줄(02.D절), 아래 순서의 섹션(`skinning-enhanced.razor`, `lumberjack-enhanced.razor`).
조립한 루프의 시작 4줄은 `config__clear_at_start`를 읽어야 함 → STATE 뒤 준비 자리([Modules](modules.md#05) 05절).

| 배너 | 내용 |
| --- | --- |
| `CONFIG` | 손으로 조정하는 `config__` 값 |
| `WAIT AND COOLDOWN` | `wait__`, `interval__`, `cooldown__` 값. 단위는 모두 ms |
| `TIMER` | `timer__` 생성과 첫 값(04절) |
| `STATE` | `var__` 첫 값. Play를 넘어 이어 쓸 값은 `if not varexist`로 감쌈(03.B절) |
| `INSTRUMENT` 같은 준비 | 루프 전 한 번 하는 준비. 예: 악기 찾기, 없으면 고르게 함. 조립한 루프에서는 모듈별 출처 상자 밑 |
| `MAIN LOOP` | `while not dead`부터 `endwhile`까지 루프 하나. 안의 블록은 `-` 배너로 구분 |

**배너는 두 종류.** 둘 다 폭 90칸, 제목은 대문자 `# 제목` 한 줄.

- **섹션 배너**: 줄 맨 앞. `=` 줄 두 개 사이에 제목. 위 표의 섹션
- **블록 배너**: 루프 안, 들여 쓴 자리. `-` 줄 두 개 사이에 제목, 빈 `#` 줄, 블록이 하는 일. 설명은 배너 안, 배너 바로 밑부터 코드. 설명 없으면 제목만

```
# ========================================================================================
# CONFIG
# ========================================================================================
@setvar! config__chatty 1

while not dead
    # ------------------------------------------------------------------------------------
    # BANDAGE
    #
    # Never restarts a running bandage, and full health does not start one. Its target
    # cursor would replace a held precast, so it waits while any cursor is up.
    # ------------------------------------------------------------------------------------
    if not bandaging and not paralyzed
        ...
    endif
endwhile
```

- 모듈과 레시피의 상자(`# @ config`, `# @ use`)도 같은 `-` 줄과 `=` 줄([Modules](modules.md#03) 03절)
- 조립한 루프의 블록 배너: 줄과 제목만 남고, 제목 줄 오른쪽에 출처 모듈 파일. 블록이 하는 일은 그 모듈 파일의 배너에서 확인
- 배너 밖, 코드 사이 주석은 결과물에서 빠짐. 예외는 [Modules](modules.md#05) 05절

```
    # ------------------------------------------------------------------------------------
    # BANDAGE                                               module/recovery/bandage.razor
    # ------------------------------------------------------------------------------------
    if config__use_bandages = 1 and not bandaging and not paralyzed
        ...
```

### <a id="02.C"></a>02.C 헤더

- 직접 만든 스크립트: 첫 줄에 한 줄 설명, 둘째 줄에 `Needs:` 전제조건(`script/loot/claim-loot.razor`)
- 조립한 루프: 레시피 헤더 뒤에 조립기가 `Hotkeys:` 줄과 "Generated from …" 줄 추가([Modules](modules.md#05) 05절)

```
# Put your share from the distribution chest into your own loot container.
# Needs: global__my_loot_container (asked for on first run), container within 2 tiles
```

### <a id="02.D"></a>02.D 시작 4줄, 들여쓰기, 빈 줄

```
clearall
clearsysmsg
cleardragdrop
clearignore
```

- 들여쓰기: 스페이스 4칸. 탭 금지
- 줄 끝: CRLF. Razor가 파일을 CRLF로 다시 씀
- 편집기 설정의 정본: `.editorconfig`
- 예외 공통 `combat/pvp`: 플레이어 수동 입력과 함께 돌므로 시작 4줄 생략. 레시피에 `config__clear_at_start 0`([Modules](modules.md#06) 06절)
  - 이유: Play 시 플레이어가 든 주문 커서, 아이템 커서, 시전 큐, 장착 큐 보존
  - 대신 자동 행동 직전에 수동 시전, 타깃, 큐 검사([PvP Loop](../loops/pvp.md))

빈 줄은 작업 단위의 경계에 하나씩.

- 준비, 요청과 대기, 결과 처리, 다음 작업 사이에 빈 줄 하나. 긴 중첩 분기도 같은 기준
- 같은 행동의 명령은 붙임. `dclick`과 `waitfortarget`, `lift`와 `drop`, 상태 초기화 묶음 등
- 블록 첫 줄과 닫는 줄 앞에는 빈 줄 없음. 연속 빈 줄은 하나로. 조립 결과의 정리는 [Modules](modules.md#05) 05절

```
settimer "timer__action" 0

while queued and timer "timer__action" < wait__timeout
    wait wait__poll
endwhile

if queued
    stop
endif

dclick var__tool
waitfortarget wait__target

if targetexists
    target alias__item
endif
```

### <a id="02.E"></a>02.E 주석

- 스크립트 주석: 영어, 줄 맨 앞 `#`. `//` 금지
- **주석에 `;` 금지.** Razor는 주석을 걷어 내기 전에 `;`을 구문 구분자로 봄 → 세미콜론 뒤를 명령으로 읽어 그 줄에서 오류([Razor](razor.md#03) 03절). 문장은 마침표로 끊음

### <a id="02.F"></a>02.F 편집기 하이라이팅

- `util/razor-syntax/`: `.razor`용 TextMate 문법
- WebStorm 사용자 정의 파일 형식은 `#` 뒤 전체를 주석 한 색으로 칠함 → 주석 안 `# @ use`, 배너 제목, 설정 이름 구분 불가
- 이 문법은 주석 줄도 모양별로 따로 칠함

| 대상 | scope | WebStorm 색(Language Defaults) | Light 기본 |
| --- | --- | --- | --- |
| 명령(`@setvar!`, `hotkey`, `cast`)과 `if`, `while`, `endif` | `keyword` | Keyword | 남색 굵게 |
| 조건식(`poisoned`, `findtype`, `insysmsg`) | `constant.other` | Constant | 보라 굵게 기울임 |
| `and`, `or`, `not`, `stop`, `break` | `entity.other.attribute-name` | Markup → Attribute | 분홍 |
| `self`, `backpack` 같은 레이어와 대상 | `constant.character.entity` | Markup → Entity | 파랑 굵게 |
| 문자열과 `>` 메모, `# @ hotkeys` 목록 | `string` | String | 초록 굵게 |
| 문자열 안의 `{{…}}` | `constant.character.escape` | Valid escape sequence | 남색 굵게 |
| `# @ use`, `# @ config` 같은 지시. `# @ when`과 `# @ every` 뒤 조건은 코드처럼 | `meta.tag` | Metadata | 올리브 |
| 모듈 이름, `# module/…razor` 출처 | `entity.other.attribute-name` | Markup → Attribute | 분홍 |
| 섹션 제목(`# CONFIG`) | `markup.heading` | TextMate → Heading | 굵게, 밑줄 |
| 블록 제목(`# BANDAGE`) | `markup.bold` | TextMate → Bold | 굵게 |
| 상자의 이름 줄(`#   config__x`, `#   heal_hits (default 35)`) | `constant.other` | Constant | 보라 굵게 기울임 |
| 접두 변수(`config__`, `var__` 등) | `variable` | Parameter, Local variable | 색 없음 |

scope 선택 기준: WebStorm 기본 Light 구성표에서 색이 있는 항목. Function call, Parameter처럼 Light에서 색 없는 항목은 피함.

WebStorm 설정.

1. Settings → Editor → File Types → `Razor`(사용자 정의 형식)에서 `*.razor` 패턴 삭제. 패턴이 남으면 TextMate 문법 미적용
2. Settings → Editor → TextMate Bundles → `+` → 저장소의 `util/razor-syntax` 폴더 선택
3. 색: Settings → Editor → Color Scheme → Language Defaults에서 위 표의 이름으로 변경. TextMate 문법은 이 기본 색을 따름
4. 문법 파일 변경 시: TextMate Bundles 목록에서 번들 체크 끄고 켠 뒤 Apply, 또는 WebStorm 재시작

VS Code: `util/razor-syntax` 폴더를 확장으로 추가.

## <a id="03"></a>03 변수

### <a id="03.A"></a>03.A 접두

접두로 종류 표시. 단어는 snake_case, 접두와 이름 사이는 **더블 언더스코어**.

| 접두 | 내용 | 수명 |
| --- | --- | --- |
| `config__` | 손으로 조정하는 설정. 파일 맨 위에 모음 | 세션 |
| `wait__` | 쉬는 시간, 타겟 커서 대기 시간 | 세션 |
| `interval__` | `timer__`와 비교하는 간격. 그 타이머가 다시 돌기까지의 ms(`timer "timer__food" >= interval__food`) | 세션 |
| `cooldown__` | Razor 쿨다운 바 길이(`cooldown "heal pot" cooldown__heal_potion`). 쿨다운 바에만 | 세션 |
| `var__` | 스크립트가 든 상태 | 세션 |
| `alias__` | `find`, `findtype`의 `as`로 묶은 결과. 블록 밖에서 쓰려면 `var__`로 옮김([Razor](razor.md#03) 03절) | 묶은 블록 안 |
| `label__` | `getlabel` 결과. 블록 밖에서는 `<not found>`([Razor](razor.md#03) 03절) | `getlabel`을 부른 블록 안 |
| `timer__` | `createtimer`, `settimer` 대상 | 세션 |
| `list__` | `createlist`, `pushlist` 대상. `foreach x in list__y`의 루프 변수 `x`는 접두 없음 | 세션 |
| `global__` | **프로필에 저장되는 값** | 영속 |

### <a id="03.B"></a>03.B 세션 값과 영속 값

- 세션 값: `global__` 외 모든 변수. `@setvar!`로 넣음
  - 스크립트가 끝나도 클라이언트 종료까지 남음, 다른 스크립트도 읽음. 예: `restock/loadout`이 적은 `var__right_hand`를 `hotkey/regear`가 읽음
  - 타이머와 리스트도 실행 종료 후 남음
- 영속 값: `global__`뿐. `setvar`로 넣음. 프로필에 저장, 클라이언트 재시작 후에도 남음
- **`global__` 이름 변경 → 프로필의 기존 항목과 연결 끊김.** 이름이 곧 키 → 전부 다시 타겟, 프로필에는 옛 항목이 고아로 남음.
  같은 이름을 쓰는 파일이 여럿이면 한 커밋에서 함께 변경

### <a id="03.C"></a>03.C serial 리터럴 금지

**`0x45147618` 같은 serial 리터럴 금지.** `script/`는 공용 → 남의 컨테이너 번호가 pull 한 모두의 게임에 들어감.
개인 값은 프로필에 저장, 스크립트에는 이름만(`script/loot/claim-loot.razor`).

```
if not varexist global__my_loot_container
    overhead "[ loot chest, pick ]" 255
    setvar global__my_loot_container
endif
```

`setvar 이름` → 타겟 커서, 찍은 대상의 serial을 프로필 script variable로 저장.

### <a id="03.D"></a>03.D varexist는 선언 여부만 확인

- `varexist`는 값의 정확성을 보지 않음. 잘못 타겟한 값도 참 → 영영 안 고쳐짐
- 그 물건 앞에 서 있는 게 확실한 스크립트: `find`로 실재까지 확인, 없으면 지우고 다시 물음(`script/restock/loadout.razor`)

```
if not varexist global__my_supply_box or not find global__my_supply_box ground -1 -1 config__reach
    unsetvar global__my_supply_box
    overhead "[ supply box, pick ]" 255
    setvar global__my_supply_box
endif
```

**그 밖의 곳에는 이 검사 금지.** `find`는 클라이언트가 지금 인식하는 것만 찾음 → 집의 상자를 던전에서 검사하면 멀쩡한 값을 지움.

::part[관용구]

## <a id="04"></a>04 타이머

- 이름에 `timer__` 접두(03.A절). `if not timerexists`로 한 번만 생성, 첫 값은 `endif` 밖 `settimer`
  - 타이머는 실행 종료 후에도 남음 → 첫 값을 밖에 두어야 실행마다 같은 값에서 시작
- 시간은 타이머로 잼. `cooldown` 명령은 기존 파일이 이미 그 스타일일 때만
- 서버가 메시지로 알리는 쿨(바드 스킬, 마법 프록 등)은 자체 타이머로 흉내 내지 않음. `cooldown "이름"`을 읽음. 이유는 [Overheads](overheads.md#06.B) 06.B절

`skinning-enhanced.razor`의 TIMER 섹션 모양. 첫 값을 간격(`interval__`)으로 주면 첫 패스부터 통과.

```
if not timerexists "timer__overhead_message"
    createtimer "timer__overhead_message"
endif

settimer "timer__overhead_message" interval__overhead_message
```

루프 안: `timer`로 지난 시간 읽기 → 할 일 → `settimer`로 0부터 다시.

```
if timer "timer__overhead_message" > interval__overhead_message
    overhead "[ heal pot, out ]" 254
    settimer "timer__overhead_message" 0
endif
```

## <a id="05"></a>05 그 외 관용구

| 목적 | 모양 |
| --- | --- |
| 시스템 메시지 없이 명령 실행 | `@` 접두 |
| 찾은 것 재사용 | `if findtype "name" backpack as alias__x`로 alias에 담음 |
| 같은 검색을 되풀이하며 하나씩 보기 | `@ignore`와 `@clearignore`([Razor](razor.md#03) 03절의 `findtype` 줄) |
| 라벨로 분기 | `getlabel alias__x label__x` 뒤 `if "문자열" in label__x`. `in`은 대소문자 구분 → 정확한 글자는 `debug/dump-label`로 확인 |
| 검프와 핫바 조작 | `gumpexists`, `ingump`로 확인 후 `gumpresponse` |
| 디버그 출력 | `{{var}}` 보간. 확인 후 삭제 |

## <a id="06"></a>06 overhead

- 머리 위 메시지: 모두 `[ 대상, 상태 ]` 모양 소문자. 시전 알림만 `[ 대상 ]`
- 낱말, hue, 경로의 정본: [Overheads](overheads.md). 새 낱말 전에 그 문서의 03절 어휘와 04절 글로서리 확인

## <a id="07"></a>07 PvP 겸용 스크립트

- `if pvp` 분기를 먼저. PvE 로직을 그대로 옮기지 않음
- 구조화 PvP, 팩션 상태에서 막히는 명령: [Razor](razor.md#07) 07절. 게임 쪽 PvP 규칙: [PvP](../game/pvp.md)
