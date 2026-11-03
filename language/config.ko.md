# config/

[English](../config/README.md) · **한국어**

Razor와 ClassicUO 설정, 사람마다 폴더 하나. `util/setup.sh`가 게임을 이 폴더에 링크해서 클라이언트가
저장소를 직접 읽고 씁니다. 복사도 동기화도 없습니다.

## 무엇이 링크되나

```
Ultima Online Outlands/ClassicUO/
  settings.json                          링크 안 함: 로그인 정보
  Data/Plugins/Assistant/                Razor
    Scripts/     =>  uoo/script/                          공유
    Profiles/    =>  uoo/config/<이름>/razor/profiles/    내 것, Razor 프로필마다 .xml 하나
  Data/Profiles/<계정>/Outlands/
    CharA/       =>  uoo/config/<이름>/classicuo/CharA/   내 것, 캐릭터마다 폴더 하나
```

다른 사람의 수정은 내가 `git pull` 할 때만 내 PC에 오고, 내 수정은 내가 `git push` 할 때만 갑니다.

## 실행

```sh
util/setup.sh                    # <이름> = git 이메일 첫 토큰: jane.doe@example.com -> config/jane/
util/setup.sh <이름>             # 직접 정해도 됨
util/setup.sh [<이름>] /path/to/ClassicUO/Data/Plugins/Assistant   # ~/Applications 밖에 있을 때
util/setup.sh --undo             # 실제 폴더로 되돌리기
```

macOS (Sikarugir)에서는 래퍼 안의 `Data/Plugins/Assistant` 폴더를 찾아, Razor 프로필과 캐릭터 폴더를
`config/<이름>/`으로 옮기고 그 자리에 링크를 남깁니다. Outlands는 Razor를 `ClassicUO.exe` 안에 넣어 빌드하므로
`Razor.exe`가 없고, 스크립트가 찾는 것은 그 폴더입니다.

- **묻는 건 하나.** `config/<이름>/`에 이미 파일이 있으면 (두 번째 PC, 이름 바꾼 폴더, 또는 남의 이름)
  게임을 그쪽으로 연결하기 전에 물어봅니다.
- **지우지 않습니다.** 빈 폴더와, 저장소가 이미 가진 파일만 든 `Scripts` 폴더는 치웁니다. 그 외는
  원래 자리 옆에 `Scripts-bak`, `Profiles-bak`, `<캐릭>-bak`으로 남습니다. 확인 후 지우세요.
- **언제든 다시 실행.** 이미 링크된 폴더는 건너뛰고, 새 캐릭터는 링크합니다.
- **`--undo`**는 실제 폴더를 다시 만들고 링크가 가리키던 내용을 복사해 넣습니다. 저장소 파일은
  전부 그대로입니다.
- **이름 바꾸기:** `git mv config/<옛> config/<새>` 뒤에 `util/setup.sh <새>`. 한 번 묻고 다시 잇습니다.

Windows는 관리자 PowerShell에서 디렉터리 정션으로:

```powershell
$ASSIST = "C:\Program Files (x86)\Ultima Online Outlands\ClassicUO\Data\Plugins\Assistant"
Rename-Item "$ASSIST\Scripts" Scripts-bak
cmd /c mklink /J "$ASSIST\Scripts" "C:\src\uoo\script"
# $ASSIST\Profiles 와 ClassicUO\Data\Profiles\<계정>\<서버>\<캐릭> 도 같은 식으로
```

## 평소에

- **게임 → 저장소.** Razor는 종료할 때 프로필 xml을 쓰고, ClassicUO는 로그아웃할 때 캐릭터 파일을
  쓰고, Razor 편집기에서 저장한 스크립트는 즉시 바뀝니다. `git status`로 보고 남길 것만 커밋하세요.
- **저장소 → 게임.** 스크립트를 고쳤거나 pull 했으면 [실행 방식에 맞는 캐시 반영 절차](../content/public/working/workflow.md#04.A)를
  따르세요. Scripts 탭 Play와 핫키 실행의 반영 방법이 다릅니다. 프로필 xml은 시작할 때 읽고 종료할 때
  덮어쓰니 **게임을 끈 상태에서** 고치거나 pull 하세요.
- **캐릭터.** Razor 프로필은 캐릭터 단위가 아닙니다. Profile 탭에서 캐릭터마다 골라 두면
  `chars.lst`에 기억됩니다. ClassicUO 설정은 원래 캐릭터별입니다.
- **여러 클라이언트, 두 번째 PC.** 클라이언트를 여러 개 켜도 같은 설치, 같은 링크라 달라지는 게 없습니다. 다른
  PC에서는 같은 명령을 같은 이름으로 실행하고 `y`.

## 공유

push는 collaborator만 할 수 있습니다. 나머지는 clone이나 fork를 해서, 원하면 자기 사본에
`setup.sh`를 돌리고, 고친 게 있으면 pull request를 보냅니다. `setup.sh`는 실행한 PC만 건드립니다.

`script/`는 공유, `config/<이름>/`은 사람별이라 겹치지 않고, 남이 핫키나 organizer를 어떻게 짰는지
읽어볼 수는 있습니다. 프로필 안의 serial은 주인 계정에서만 의미가 있습니다.

| 파일                                                                                                                 | 내용                                                                                                         | 추적               |
|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|--------------------|
| `razor/profiles/<프로필>.xml`                                                                                        | 핫키, 에이전트(organizer / restock / dress 목록, 컨테이너 serial), 필터, 쿨다운 바, script variable, 창 배치 | 함                 |
| `razor/profiles/chars.lst`                                                                                           | 캐릭터마다 마지막에 쓴 프로필                                                                                | 함                 |
| `classicuo/<캐릭>/macros.xml`, `skillsgroups.xml`, `infobar.xml`, `journal.xml`, `nameoverhead.xml`, `cooldowns.xml` | 클라 매크로, 스킬 그룹, 인포바, 저널 탭, 이름표, 쿨다운 바                                                   | 함                 |
| `classicuo/<캐릭>/profile.json`                                                                                      | 클라 옵션, 세션마다 바뀜                                                                                     | 함, 노이즈 있음    |
| `classicuo/<캐릭>/*.gumps.xml`, `gumpmanager.xml`                                                                    | 창 위치, 모니터 배치마다 파일 하나                                                                           | 함, 노이즈 있음    |
| `classicuo/<캐릭>/backup_*/`, `staggered_*/`                                                                         | ClassicUO가 스스로 만드는 프로필 스냅샷. git이 이미 이력을 가진다                                            | ignore             |
| `ClassicUO/settings.json`                                                                                            | 해상도, fps, **username / password**                                                                         | ignore, 링크 안 함 |
