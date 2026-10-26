# AGENTS.md

Ultima Online Outlands용 Razor 스크립트 저장소.

| 폴더                 | 내용                          |
|----------------------|-------------------------------|
| `script/`            | 스크립트                      |
| `module/`, `recipe/` | 루프를 조립하는 블록과 레시피 |
| `config/`            | 클라이언트 설정               |
| `content/`          | 설계 문서                     |

이 파일: 언제나 지킬 규칙과 커밋 규칙만. 나머지 규칙은 `content/`, 3절 표에서 찾음.
시작은 [Workflow](content/public/working/workflow.md). 사람은 `pnpm docs:dev`로 문서 사이트를 띄워 읽음.

## 목차

1. [항상 지키는 것](#1-항상-지키는-것)
2. [커밋](#2-커밋)
3. [언제 무엇을 읽나](#3-언제-무엇을-읽나)

---

## 1. 항상 지키는 것

규칙당 한 줄. 이유와 자세한 내용은 링크한 절.

- 답변과 문서는 한국어, 스크립트 주석은 영어 → [Writing](content/public/working/writing.md#07) 07절
- `.razor` 수정 전 파일 끝까지 읽기, 확인된 함정 표 확인 → [Razor](content/public/scripting/razor.md#03) 03절
- 게임 숫자는 추측 금지, 출처나 인게임 확인 날짜 기록 → [Workflow](content/public/working/workflow.md#01.C) 01.C절
- `config/`는 게임 종료 상태에서만 수정 → [Workflow](content/public/working/workflow.md#04.C) 04.C절
- 다른 사람의 `config/`는 손대지 않음. `settings.json` 커밋 금지 → [Conventions](content/public/scripting/conventions.md#01.D) 01.D절
- 스크립트에 serial 숫자 직접 사용 금지 → [Conventions](content/public/scripting/conventions.md#03.C) 03.C절
- 조립한 스크립트(머리에 `Generated from` 줄. `script/combat/*`, `script/gather/*`, loadout 같은 루틴) 직접 수정 금지. `module/`, `recipe/` 수정 후 `pnpm build` → [Modules](content/public/scripting/modules.md#07) 07절
- 같은 규칙이나 사실은 한 곳에만. 다른 곳은 링크 → [Writing](content/public/working/writing.md#08) 08절

## 2. 커밋

커밋 규칙은 여기에만.

- 사용자가 요청할 때만 커밋. push는 별도 요청이 있을 때만
- 커밋 제목은 영어 동사로 시작, 변경 내용을 간단히 설명. 동사 원형, 마침표 없음
- AI 도움을 받은 커밋은 제목 끝에 ` | aa`. `aa`는 AI assistance를 받은 작업이라는 표시
- 제목 한 줄만. 본문과 트레일러(`Co-Authored-By` 등) 없음
- `feat:`, `fix:` 같은 Conventional Commits 접두 없음
- 한 커밋에 변경 하나. 스크립트 수정과 문서 수정이 독립이면 나눔
- 요청 범위의 파일만. `config/`의 게임 설정 변경은 별도 요청 없으면 제외
- 커밋 전 `pnpm check`, `git diff --check`. `util/` 수정 시 `pnpm test`도

| 좋음                                       | 나쁨                                 | 이유                        |
|--------------------------------------------|--------------------------------------|-----------------------------|
| `Update favicon and add cursor face \| aa` | `Update favicon and add cursor face` | AI 도움인데 ` \| aa` 없음   |
| `Regroup scripts by activity \| aa`        | `feat: regroup`                      | 접두 금지                   |
| `Add eval rotation to bard-necro \| aa`    | `update`                             | 변경 내용 없음              |
| `Fix stuck target loop in bard-mace \| aa` | `스크립트 수정`                      | 영어 아님, 대상과 동작 없음 |
| `Port the loop builder to Node \| aa`      | `Ported the loop builder to Node.`   | 동사 원형, 마침표 없음      |

## 3. 언제 무엇을 읽나

| 할 일                            | 읽을 것                                                                                                                                              |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 모든 작업의 시작                 | [Workflow](content/public/working/workflow.md)                                                                                                             |
| `.razor` 수정이나 새 작성        | [Conventions](content/public/scripting/conventions.md), [Razor](content/public/scripting/razor.md). 알림을 띄우면 [Overheads](content/public/scripting/overheads.md)도 |
| 모듈, 레시피 수정과 루프 조립    | [Modules](content/public/scripting/modules.md)                                                                                                             |
| 새 파일과 이름 짓기              | [Conventions](content/public/scripting/conventions.md#01) 01절                                                                                             |
| 게임에서 확인                    | [Workflow](content/public/working/workflow.md#04) 04절                                                                                                     |
| `config/` 수정                   | [Workflow](content/public/working/workflow.md#04.C) 04.C절, [config/README.md](config/README.md)                                                           |
| 오버헤드, 쿨다운 바 추가나 변경  | [Overheads](content/public/scripting/overheads.md)                                                                                                         |
| 바딩 쿨, 효과, 코덱스 숫자       | [Barding](content/public/mechanics/barding.md)                                                                                                             |
| 네크로 소환, 심볼 숫자           | [Necromancy](content/public/mechanics/necromancy.md)                                                                                                       |
| 매저리 프록, 시전 시간           | [Magery](content/public/mechanics/magery.md)                                                                                                               |
| Bard Necro 캐릭터, 소환수 선택   | [Bard Necro](content/public/templates/bard-necro.md)                                                                                                       |
| bard-necro-enhanced 루프 설계    | [Bard Necro Enhanced](content/public/loops/bard-necro-enhanced.md)                                                                                         |
| PvP 규칙                         | [PvP](content/public/game/pvp.md)                                                                                                                          |
| 방어구, 근접, 붕대, 포션, Tracking | [Combat](content/public/mechanics/combat.md)                                                                                                             |
| 공통 pvp 루프 설계               | [PvP Loop](content/public/loops/pvp.md)                                                                                                                    |
| 벌목과 PvP 템플릿, 교전          | [Lumberjack PvP](content/public/templates/lumberjack-pvp.md)                                                                                               |
| lumberjack-enhanced 루프 설계    | [Lumberjack Enhanced](content/public/loops/lumberjack-enhanced.md)                                                                                         |
| 아처리 자세, 피니셔, 무기 능력   | [Archery](content/public/mechanics/archery.md)                                                                                                             |
| Bard Archer 캐릭터, 코덱스, 부활 | [Bard Archer](content/public/templates/bard-archer.md)                                                                                                     |
| bard-archer-enhanced 루프 설계   | [Bard Archer Enhanced](content/public/loops/bard-archer-enhanced.md)                                                                                       |
| Bard Wrestling 캐릭터와 코덱스 | [Bard Wrestling](content/public/templates/bard-wrestling.md) |
| bard-wrestling-enhanced 루프 설계 | [Bard Wrestling Enhanced](content/public/loops/bard-wrestling-enhanced.md) |
| 키 배치                          | [Hotkeys](content/public/game/hotkeys.md)                                                                                                                  |
| `findtype` 인자(graphic id, hue) | [Item list](content/public/game/item-list.md)                                                                                                              |
| 문서 수정이나 새 문서            | [Writing](content/public/working/writing.md)                                                                                                               |
| 사용자에게 물을 것               | [Open items](content/public/questions/open-items.md)                                                                                                       |
| 문서별 정본                      | [Workflow](content/public/working/workflow.md#00.A) 00.A절                                                                                                                        |
