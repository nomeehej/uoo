---
name: Recycle Checks
label: 감정과 분류 인게임 확인
group: Verification
order: 60
---

감정과 분류 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |
| [02](#02) | 변경 경과의 위치 |

## <a id="01"></a>01 검사와 통과 기준

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
| 속도 | recycle 실행, 아이템 수와 걸린 시간 기록 | 아이템당 시간. 2026-11-02 전(라벨 조회 2~3번, 완드 뒤 재조회)과 비교. Outlands의 `getlabel` 대기도 기록 | 확인되지 않았다 |
| 두 단계 | 미감정품이 섞인 루팅 백 | 완드가 미감정품을 연달아 찍은 뒤에야 이동과 분해. 완드 사이에 라벨 재조회 없음 | 확인되지 않았다 |
| 감정 안 됨 | 완드 소진 또는 감정이 안 들어간 물건 | 2단계가 그 물건을 건너뛰고 끝에 `[ unidentified, skip ]` 한 번. 다음 실행에서 재검사 | 확인되지 않았다 |
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
| 라벨 못 받음 | 라벨 응답 없음 | `[ item, skip ]`. 그 물건만 건너뛰고 다음 아이템 처리 | 확인되지 않았다 |
| 자원 드롭 거절 | 거절 지역에서 자원 드롭 | 거절 문장 뒤 백팩 복구 요청, 실제 반환 | 확인되지 않았다 |
| 실패 뒤 정리 | 처리 실패 | 아이템이 실제로 백팩에 반환, Outlands 클라이언트 큐 초기화 | 확인되지 않았다 |
| 복귀, skinning | skinning-enhanced를 Play한 뒤 F3 | `hotkey 'Play Script: gather\skinning-enhanced'`의 실행과 복귀, 끝나고 그 루프의 loaded 문구 | 인게임 확인됨 2026-10-19 |
| 복귀, 다른 루프 | lumberjack이나 bard-archer를 Play한 뒤 F3 | 그쪽으로 복귀 | 확인되지 않았다 |
| 복귀, Play 없음 | 클라이언트를 켠 뒤 루프를 한 번도 Play하지 않고 F3 | recycle만 종료 | 확인되지 않았다 |
| 복귀, pvp 중 | pvp 중 F3 | 마지막 사냥이나 채집 루프로 복귀 | 확인되지 않았다 |

#### 메모

- 검색: `global__my_loot_bag`. 보관: `global__my_supply_pouch`. 둘 다 백팩 안에 있어야 함
- `ignore`는 이번 실행의 재선택 방지용. 시작과 끝에 초기화. 보관품은 루팅 백 밖으로 옮기므로 다음 실행에서도 조회 생략
- 단일 ID wand `20496`만 사용. Item Identification 스킬 경로와 `config__min_item_id_skill`, `wait__item_id` 제거
- 재활용 도구: tinker tool, sewing kit 또는 saw. 완드와 도구는 백팩에서 검색
- [공식 Recycling](https://wiki.uooutlands.com/Recycling), 2026-10-21 확인: "Recycle single item" is the recommended option, as it is limited to recycling individual items.
- 다른 분해 모드는 백팩의 유용한 장비까지 대상이 될 수 있음
- 검프의 대소문자 `Recycle Single Item` 선례는 [Bapeths Slower Item Recycler](https://outlands.uorazorscripts.com/script/752d1745-90d4-4078-a8cb-8ce2cccef3e0)
- IDENTIFY: 라벨에 `unidentified`가 있는 물건만 완드. 더블클릭 간격은 행동 큐(`ObjectDelay`)가 정하고 다음 물건의 라벨 조회가 그 사이에 끝남. 완드 뒤 재조회 없음
- SORT: 라벨 한 번으로 보관 또는 분해. 아직 `unidentified`면 건너뛰고 끝에 `[ unidentified, skip ]` 한 번. 감정 성공 여부는 이 라벨로만 판정
- 느린 이유였던 것: 아이템마다 `getlabel` 2~3번(한 번에 0.5초 이상, [Razor](../scripting/razor.md#06) 06절)과 완드, 도구 더블클릭 2번
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
- 처리 상태: `var__running`, `var__item_pending`, `var__unidentified_left`, `var__keep`, `var__kind`, `var__slayer`, `var__armor_type`
- `timer__recycle` 하나를 단계마다 초기화. 이전 `timer__recycle_identify` 제거
- `wait__poll` 50ms: 품질 라벨, 행동 큐, 보관 이동, 분해 결과의 재확인 간격
- `wait__target` 500ms: 도구 커서 대기 상한
- `wait__timeout` 5000ms: 행동 큐, 검프, 보관 이동, 분해 결과의 대기 상한
- `wait__drop` 650ms: 자원 드롭 뒤 거절 문장을 읽기 전 대기
- 위 `wait__` 값은 서버 쿨다운이나 실측 속도가 아닌 스크립트 설정. `getlabel` 자체 대기 시간은 별도([Razor](../scripting/razor.md#06) 06절)
- 정적 동일성 검사와 모의 실행은 통과
- 보관 설정을 바꿔 재분류할 때는 해당 장비를 루팅 백으로 옮겨 실행
- 현재 코드의 [RETURN 블록](https://github.com/nomeehej/uoo/blob/master/script/loot/recycle.razor#L701) 기준 `stop` 없음.
  실패는 `var__running 0`으로 이번 정리만 끝내고 공통 복귀 경로 실행. 실제 큐 정리와 복귀 결과는 위 인게임 검사 대상
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

## <a id="02"></a>02 변경 경과

날짜별 기록은 [Verification History](../history/verification.md#06) 06절.
