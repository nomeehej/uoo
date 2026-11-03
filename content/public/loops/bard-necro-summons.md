---
name: Bard Necro Summons
label: 소환수 이름과 재소환 블록
group: Loops
order: 20
---

Bard Necro 루프의 소환수 식별, 이름 변경, 재소환과 교체 블록.
전체 실행 순서와 마나 예산은 [Bard Necro Enhanced](bard-necro-enhanced.md), 소환수 선택은 [Bard Necro](../templates/bard-necro.md#03) 03절.
인게임 확인은 [Bard Necro Checks](../verification/bard-necro.md).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 소환수 식별과 바디 번호 |
| [02](#02) | SUMMON NAMES, 이름과 실패 증상 |
| [03](#03) | RESUMMON, 재소환과 교체 |

## <a id="01"></a>01 소환수 식별과 바디 번호

- Air Elemental(Skeletal Fiend)을 쓰려면 `SUMMON NAMES`에 바디 번호와 종류 이름 추가 필요.
  바디는 `findtype` 줄, 이름은 종류 표(02절). 지금 종류 표에 fiend 없음, 바디 번호도 모름(아래 표)
  - `RESUMMON`도 같음. 바디가 생기면 첫째 칸 판정에, 이름이 생기면 교체의 `release` 갈래에 추가(03절)
- **`bard-necro-enhanced`는 송을 위해 소환수를 추적하지 않음.** 송을 이동 중 계속 갱신 → 재소환 감지 불필요([Bard Necro Enhanced](bard-necro-enhanced.md#01.G) 01.G절 설계 결정).
  소환수를 찾는 블록은 이름을 붙이는 `SUMMON NAMES`, 첫째 종류가 나와 있는지만 보는 `RESUMMON`(03절) 둘
- **적 Lich와 내 Lich는 그래픽이 같음.** 소환수를 타입으로 찾는 코드를 새로 쓰면 `noto` 필터 필수. `fight/target`, `necro/summon-names` 모듈이 그 모양
- **소환수 이름 자동 변경.** `SUMMON NAMES` 블록이 새 소환수를 종류를 알아볼 이름(`leech`, `mumi` 등)으로 변경. 설계와 실패 증상은 02절
- **바디 번호(`>info`).** 내 소환수의 Notoriety는 2(friend)

| 소환수 | 바디 | hue | 출처 |
| --- | --- | --- | --- |
| Lich | 24 | 0 | `>info` |
| Ancient Mummy | 158 | 2340 | `>info` |
| Vampire Thrall | 722 |   | 구식 `bard-necro` 팔로워 캐시 |
| Rag Witch | 740 | 2669 | `>info`, 인게임 확인됨 2026-10-18. 2026-10-10 이름이 안 바뀐 원인은 바디가 아님 → 이름 검색 우회 삭제 |
| Summon Creature 풀의 표준 언데드 | 3 26 50 56 57 147 148 153 155 |   | 표준 클라이언트 아트(zombie, ghost, skeleton, skeletal knight, skeletal mage, ghoul, rotting corpse) |
| Skeletal Fiend, 그리고 Summon Creature 풀의 skeletal marksman과 rotting flesh | 모름 |   | Outlands 바디. 나오면 `>info`로 확인([Bard Necro Checks](../verification/bard-necro.md#01) 01절) |

## <a id="02"></a>02 소환수 이름, SUMMON NAMES 블록

- 새 소환수는 기본 이름(`a lich` 등). 블록이 **종류 이름**으로 변경
- → 펫 체력바와 네임태그로 무엇이 나와 있는지 확인, 펫 명령에서 그 이름 호출
- 2026-10-10 사용자 결정. 이전에는 PK 교란용으로 내 이름의 닮은꼴 셋

| 라벨에 든 말 | 새 이름 |
| --- | --- |
| `skeletal knight` | `nite` |
| `skeletal mage` | `majik` |
| `lich` | `leech` |
| `mummy` | `mumi` (받아짐, 인게임 확인됨 2026-10-10) |
| `thrall` | `vampa` |
| `witch` | `wichy` (`wicca`는 거절, 인게임 확인됨 2026-10-13) |
| `zombie` | `zomz` |
| `ghost` | `spook` |
| `skeleton` | `skelz` |
| `ghoul` | `gool` |
| `rotting corpse` | `rotter` |

- 이름은 모듈 setup이 채우는 `list__summon_kinds` 리스트. `foreach`로 항목을 꺼내 `rename`에 전달.
  문자열 전달의 실행 선례와 확인 날짜는 [Razor](../scripting/razor.md#04) 04절
- 끄려면 레시피에서 `necro/summon-names` 제거. 같은 종류가 둘이면 둘 다 같은 이름

**이름은 기본 이름의 어느 단어와도 두 글자 이상 차이.**

- 2026-10-10 서버가 `mummy`도, `witch`에서 한 글자만 바꾼 `wytch`도 `That name is unacceptable.`로 거절, `mumi`는 수락(인게임 확인)
- 몬스터 종류 단어와 한 글자 차이까지 막는 것으로 판단 → 모든 이름을 두 글자 이상 떨어뜨림
- 2026-10-13 `witch`에서 두 글자 떨어진 `wicca`도 거절(인게임 확인). `mumi`와 같은 거리라 거리로는 설명 불가, 원인은 확인되지 않았다
- → 실제 낱말은 피하고 witch 느낌은 살린 `wichy`로 교체. `wicca`와 같은 두 글자 차이라 거리 때문이었다면 다시 거절
- RunUO 계열 이름 검사가 막는 `mage` 같은 단어도 회피. 새 이름이 거절되면 같은 문장

#### 왜 이 모양인가

- **바디 번호로 검색.** 2026-09-28 프로브: `findtype`은 바디 번호로도 기본 이름으로도 소환수를 잡고, `as` alias에 serial이 들어감
  - `as` alias의 범위는 [Razor](../scripting/razor.md#03) 03절. 블록 안에서 `var__fresh_summon`으로 복사한 serial 사용
  - 이름 대신 바디를 쓰는 이유: 이름 변경 뒤 Razor 캐시 갱신 여부를 모름
  - 번호와 출처는 01절 표. Summon Creature 풀의 표준 언데드도 포함
  - VS 없이 나오는 맨 엘리멘탈과 데몬(9 13 14 15 16)은 2026-09-29 제외.
    이 캐릭터는 늘 VS로 뽑는데, 다른 메이지의 엘리멘탈이 내 소환수로 잡혀 셋째 이름을 가져감
  - **Skeletal Fiend, skeletal marksman, rotting flesh는 Outlands 바디라 번호를 모름.** 나오면 `>info`로 읽어 `findtype` 줄에 추가
- **"내 펫" 플래그는 상태 패킷(0x11).** ClassicUO는 새 모빌이 보일 때마다 상태 요청
  (`PacketHandlers.UpdateMobile`: "a way to get all Hp from all new mobiles")
  - → Razor는 소환 직후 `CanRename`을 앎. `rename`은 이 플래그가 선 모빌에만 패킷 전송. 체력바를 열 필요 없음
- **`noto` 필터 = 구식 스크립트의 팔로워 필터 + `innocent`.** 내 소환수는 `>info`에서 Notoriety 2(friend, 초록)
  - 야생 리치는 필터 통과 불가, 통과해도 `rename`이 거부
  - 다른 플레이어의 소환수는 길드원이나 동맹이 아니면 `innocent`(파랑) → 제외
  - 길드원의 소환수는 friend → `noto`로 구분 불가. 맨 엘리멘탈을 바디 목록에서 뺀 것이 그 몫
- **이름을 바꿔도 바디는 그대로 매치.** "이미 바꿨는가"는 **`list__named_summons`의 serial**로 판정
  - 종류를 알아낸 소환수만 serial 추가, 훑을 때 리스트에 있는 serial은 건너뜀
  - 리스트는 Play마다, 팔로워가 하나도 없을 때 비움
  - 2026-10-10 첫판은 라벨을 읽기 전에 serial을 넣고, 리스트를 클라이언트 종료까지 유지 → 한 번 실패한 소환수는 재시도 안 함. 이름이 안 바뀐 원인 후보
- **종류는 라벨에서 판정.** 훑는 동안 alias가 살아 있는 블록 안에서 `getlabel alias__fresh_summon`으로 기본 이름을 읽고 종류 번호(`var__summon_kind`) 결정.
  소문자와 첫 글자 대문자 모두 확인
  - 종류를 모르면 건너뛰고 다음 틱에 재시도. 막 나와 라벨이 없거나 표에 없는 이름일 때
  - `config__sysmsg` 1이면 Journal에 `Summon name: no known kind in its label: …`로 라벨 기록
  - 이름은 `foreach pet_name in list__summon_kinds` 안에서 `index = var__summon_kind`인 항목으로 `rename`. 내장 `index`가 왼쪽이라 변수와 비교 가능
  - 반복 변수 이름은 다른 이름에 포함되지 않는 말로. 첫판의 `summon_kind`는 `var__summon_kind` 안에 포함.
    Razor가 항목을 글자로 치환한다면 비교가 깨짐(확인되지 않음)
- **매치를 모두 훑음.** `findtype`, `@ignore`, `@clearignore`의 순회 규칙은 [Razor](../scripting/razor.md#03) 03절.
  이 블록은 처리한 serial과 `noto`를 함께 확인해 둘째 소환수까지 순회
  - 이름은 하우스키핑 틱(5초)마다 한 마리씩. 연달아 둘을 뽑아도 먼저 나온 쪽이 먼저. 둘째를 시전하는 6초 동안 첫째가 혼자 있음
  - `@clearignore`는 이 5초 틱과 `RESUMMON`의 첫째 종류 검색(03절)에서만. 둘 다 같은 틱 안에서 비움, 루프의 다른 곳은 ignore 목록에 의존하지 않음
- 시전도 커서도 없음 → 교전 여부와 무관하게 동작. `followers > 0`일 때만

#### 실패 증상

| 증상 | 뜻 |
| --- | --- |
| 소환 후 5초 안에 `[ name, leech ]`처럼 종류 이름이 소환수 머리 위에 뜨고(`config__chatty 1`일 때) 네임태그 변경 | 정상 |
| 오버헤드는 뜨는데 네임태그 그대로 | 서버가 이름 거부(`That name is unacceptable.`). 이름이 변수를 거쳤거나, 숫자이거나, 종류 단어와 너무 비슷한 경우. serial은 이미 리스트에 있어 재시도 안 함 |
| 오버헤드가 아예 안 뜸 | 그 소환수의 바디 번호가 `findtype` 줄에 없거나, 라벨의 기본 이름이 종류 표에 없음. Journal에 `Summon name: no known kind in its label`이 뜨면 뒤의 라벨에서 이름을 읽어 표에 추가. 안 뜨면 `>info`로 바디 번호를 읽어 추가 |
| 남의 소환수 머리 위에 `[ name, … ]` | 길드원이 언데드를 뽑은 경우. 이름은 안 바뀌고(`rename`은 내 펫에만), 그 serial은 리스트에 남아 재확인 안 함 |

## <a id="03"></a>03 재소환과 교체, RESUMMON 블록

- 소환수 둘을 늘 내보냄. 빠지면 다시 뽑고, 오래된 것은 놓고 다시 뽑음
- 블록은 [necro/resummon](https://github.com/nomeehej/uoo/blob/master/module/necro/resummon.razor). 설정의 뜻은 그 파일, 이 루프의 값은 레시피
- 2026-10-18 사용자 요청으로 구현. 그전의 "수동 유지" 판단과 설계 메모는 git 이력

#### 언제 도나

- 레시피 자리: 버섯 뒤, 교전과 이동 분기 앞 → 두 분기 모두에서 먼저([Bard Necro Enhanced](bard-necro-enhanced.md#01.A) 01.A절)
- 재소환은 교전 중에도. 소환수가 전선을 버팀 → 빠지면 바로 채움. 사용자 결정
- 교체는 기억한 적이 없을 때만(`var__combat_target` 0). 교전 판정 10칸보다 넓은 18칸 기준 → 소환수가 10칸 밖에서 싸우는 동안은 안 놓음
- 다른 시전과 같은 가드: 걷는 중(`walk_guard`), 워모드(수동 창), 은신, 리콜 대기(`var__hold_casts`), 커서, 시전 중이면 쉼
- 마나 20(`config__summon_mana_wither`) 이상, 시약(`var__regs_summon`. Fire나 Daemon이 들면 ash까지 `var__regs_summon_ash`), 잃은 HP가 `emergency_hits` 미만일 때만.
  마나 65 미만이면 Wither 경로(아래)
- 6초 시전은 블록 안에서 폴링, 긴급 HP면 `> Interrupt`와 `[ summon, cut ]`. 다음 패스 첫머리로 넘기면 `settle_first` 대기 동안 회복 블록도 멈춤
- 둘 다 나와 있고 교체할 때가 아니면 게이트 한 줄([Bard Necro Enhanced](bard-necro-enhanced.md#01.H) 01.H절)

#### Vengeful Spirit 창

| 시점 | 무엇 |
| --- | --- |
| 0초 | VS. 누르기 직전 `timer__vengeful_spirit` 0. 버프가 뜨면 `[ vengeful spirit ]` |
| 약 0.5초 | 같은 패스에서 첫째 시전 시작 |
| 약 7초 | 둘째 시전 시작 |
| 23초 | 시작 마감(`interval__summon_cast_by`). VS 30초 - 시전 6초 - 여유 1초 |
| 30초 | VS 끝 |

- 소환수는 시전이 끝날 때 생김 → 끝나는 순간 VS가 켜져 있어야 함([Necromancy](../mechanics/necromancy.md#01.A) 01.A절)
- 마감은 Spirit Pact의 시전 감소 없이 계산. Tome마다 찍었는지 모름([Bard Necro](../templates/bard-necro.md#02.C) 02.C절). 사용자 결정
- 손해 없음: 둘 다 13초 전에 시작. 마감에 걸리는 것은 끊김이 반복될 때뿐 → 버프가 꺼진 뒤 다음 VS
- 창이 열렸다는 판정: `findbuff "Vengeful Spirit"`, 그리고 우리 타이머가 마감 전. 둘 다
- 응답 줄 `Unholy symbols remaining`은 모든 능력이 같음 → 판정에 안 씀. 다른 능력의 늦은 응답을 VS로 오인하면 맨 엘리멘탈
- 시전 직전 마감을 한 번 더 확인. 같은 패스의 누르기와 바디 검색이 창을 씀
- 시계는 누를 때 시작 → 서버의 시작보다 조금 앞섬 → 여유 1초가 응답 대기만큼 줄지 않음
- 응답이 늦어도 버프가 뜨면 누른 시각 기준으로 창 인정. 버프가 끝내 없으면 다음 누르기는 30.5초 뒤
- VS가 들어간 패스에서 바로 첫째 시전. 다음 패스로 넘기면 그 사이 로테이션이 마나를 써서 창을 놓칠 수 있음
- VS가 쓴 심볼을 리스트는 아직 셈 → 그 패스 동안 리스트를 비움, 다음 패스에 `necro/symbols`가 다시 읽음. Blood Oath와 Vampiric Embrace가 낡은 수로 헛누르지 않음
- 누른 뒤의 응답 줄과 쿨 거절 줄은 이 블록이 읽어 없앰 → `necro/burst`가 제 응답으로 오인하지 않음
- 손으로 켠 VS(Alt+1)는 우리 타이머가 모름 → 남은 시간을 모르니 시전 안 함. 꺼진 뒤 루프가 다시 켬
- VS 누르는 조건: 버프 꺼짐, 타이머 30.5초 이상(`interval__necro_action`), 심볼 1 이상. 마나 20\~64면 Wither와 함께 6(아래).
  마나와 시약은 바깥 게이트 → 심볼만 날리지 않음

#### 마나와 Wither

| 마나 | 소환 | 다른 네크로 능력 |
| --- | --- | --- |
| 65 이상(`config__summon_mana`) | VS → 소환 | 그대로 |
| 20\~64 | 심볼 6을 모아 Wither → VS → 소환, 한 패스에 | **정지**(`var__hold_symbols`). 은행이 차면 넘칠 몫만 |
| 20 미만 | 안 함 | 그대로. 마나가 바닥이면 심볼만 드는 Blood Oath가 가장 나은 행동 |

- 65: 2026-10-18 사용자 결정. 50에서 소환하면 그 뒤 주문이 하나도 안 나감
- 20 = 소환 50 - Wither 30(Necro 100, [Necromancy](../mechanics/necromancy.md#02) 02절). 20을 65로 두면 Wither 꺼짐
- Wither도 30초, 같은 시계 규칙: 누를 때 시작, 시작 마감 23초
- 순서는 Wither 먼저. 게임에서 확인한 순서([Necromancy](../mechanics/necromancy.md#02) 02절). 성공도 VS처럼 버프로만 판정
- 400ms 안에 Wither 버프가 안 보이면 `[ wither, miss ]`, 그 패스에는 VS를 안 누름. 버프가 늦었으면 다음 패스에 VS만 눌러 이어감
- 우리 VS 창이 이미 열려 있으면 Wither만 누름(심볼 5). 창의 처음 15초(`interval__summon_release_by`) 안에서만, 늦으면 시전이 23초 마감을 넘김
- **Wither 한 번 = 소환 하나.** 소환이 끝나면 `var__wither_used` 1 → 둘째는 마나 65나 다음 Wither. 누를 때 0 → 늦게 뜬 버프도 받음
- 소환이 끝까지 가면 그 Wither는 결과와 무관하게 끝으로 봄. 다른 비공격 주문(Greater Heal 등)이 Wither 마나를 먼저 써서 소환이 모자랐어도 같음
  - 마나 부족 문장은 시전자 이름으로 와서 `insysmsg`가 읽는지 모름([Bard Necro Checks](../verification/bard-necro.md#01) 01절의 시약 줄과 같은 문제) → 읽지 않음
- 시전 끊김, 긴급 끊기 → 마나 미소모, Wither 마나도 남음 → 다음 패스 재시도.
  단 끊은 이유인 힐이 다음 패스 첫머리에 나가며 Wither 마나를 먹을 수 있음 → 재시도가 모자라면 그 Wither는 끝
- 손으로 누른 Wither도 VS처럼 무시. 우리 시계가 모름
- 자해 10: 잃은 HP 25(`config__wither_max_loss`) 이상이면 안 누름. 이 루프의 `emergency_hits` 35에 닿아 소환이 끊기지 않게
- **정지 범위**: Blood Oath, Corpse Skin, Evil Omen, Poison Strike, Vampiric Embrace
  - VS나 Wither가 쿨이어도 정지 유지. 쿨은 30초, 그사이 심볼 6이 참 → 둘 다 죽었을 때 둘째도 약 30초 뒤
  - 은행이 차면(10, `config__symbols_bank`) 정지를 풂. 넘칠 몫을 다른 능력이 씀, Blood Oath 4를 써도 6이 남음
  - → 오래 걷거나 Wither가 안 나가도 심볼이 버려지지 않고, Blood Oath는 은행이 찰 때마다 나감
  - 정지는 걷기와 커서 가드보다 앞에서 판정 → 한 걸음에 은행을 내주지 않음
- 정지의 손해와 이득: Blood Oath는 남은 소환수 하나에 +30%, 전체 약 +9.5%. 빠진 소환수는 전체 딜의 약 31%와 탱킹
- 교체는 마나 65 이상일 때만, 놓은 패스에서 바로 다시 채움 → 자발적인 교체에는 Wither를 안 씀

#### 무엇을 뽑나

| 값 | 주문 | 언데드 | 바디 | 이름 |
| --- | --- | --- | --- | --- |
| 1 | Fire Elemental | Lich | 24 | `leech` |
| 2 | Water Elemental | Rag Witch | 740 | `wichy` |
| 3 | Earth Elemental | Ancient Mummy | 158 | `mumi` |
| 4 | Air Elemental | Skeletal Fiend | 모름 | 없음 |
| 5 | Summon Daemon | Vampire Thrall | 722 | `vampa` |

- 바디 출처는 01절, 이름은 02절
- 같은 종류 둘: 판정 없이 그 주문
- 다르면 첫째 종류만 바디로 찾음(`noto` 필터). 있으면 둘째, 없으면 첫째
- 레시피 값 `summon_first 2`, `summon_second 3`: 둘 다 없으면 Rag Witch부터. 탱커가 먼저 섬([Bard Necro](../templates/bard-necro.md#03.D) 03.D절)
- Air는 바디를 몰라 첫째 불가. 둘째에 둠. 첫째가 4면 Play 때 `[ summon, wrong ]`
- serial을 기억하는 방식은 안 씀. 재시작 뒤 이미 이름 바뀐 소환수(`wichy`, `mumi`)는 라벨로 종류를 못 읽음. 바디는 재시작과 이름에 무관
- 알려진 오판
  - 첫째가 18칸(`config__summon_range`) 밖이면 없는 것으로 보고 같은 종류를 하나 더
  - 근처 길드원의 같은 종류 소환수는 friend라 내 것으로 봄

#### 교체, 10분

- 언데드는 10초마다 최대 체력 1% 감소([Necromancy](../mechanics/necromancy.md#01.B) 01.B절). 10분이면 약 55%, 15분 41%, 20분 30%
- 체력바로는 판단 불가: 줄어드는 것은 최대 체력 → 현재와 최대의 비율인 체력바는 가득 찬 채
- → 나온 시간으로 판단. 칸마다 시계(`timer__summon_age_first`, `timer__summon_age_second`), 그 칸의 시전을 시작할 때 0
- 레시피 값 `summon_refresh` 600000, 10분. 사용자 결정
- 조건: 기억한 적 없음, 둘 다 나와 있음, 마나 65 이상, VS를 곧 쓸 수 있음. 놓으면 바로 채울 수 있을 때만
- 놓은 패스에서 바로 VS나 소환. 다음 패스로 넘기면 그 사이 이동 블록(자기 버프, Create Food)이 마나를 써서 Wither로 넘어갈 수 있음
  - VS 쿨이 끝났거나, 우리 창이 15초(`interval__summon_release_by`) 전
  - 15초: 놓은 뒤 다음 패스의 시전이 23초 마감 전에 시작하도록
- 동작: 시계가 넘은 칸 하나를 `say "wichy release"`처럼 이름으로 놓음 → `followers` 감소 → 재소환이 채움
- 둘 다 오래되면 한 VS 창 안에서 차례로. 첫째를 놓고 채운 뒤 둘째
- 이름은 갈래마다 리터럴. 변수로 단어를 못 넘김([Razor](../scripting/razor.md#03) 03절)
- 한계
  - 같은 종류 둘은 이름이 같아 함께 놓임. 놓을 때 두 시계를 함께 0, 둘 다 없을 때 뽑아도 함께 0 → 오래된 쪽 기준으로 둘을 함께 교체
  - Play 때 시계는 0 → 첫 교체는 Play 뒤 10분. 손으로 뽑은 소환수는 시계가 모름
  - Skeletal Fiend는 이름이 없어 교체 안 됨

**교체는 release. Dismissive는 불필요.** Dismissive 원문은 [Bard Necro](../templates/bard-necro.md#02.C) 02.C절.

| 놓는 방법 | 소환수 하나당 실제 마나 | 대가 |
| --- | --- | --- |
| release, 말하기 | 재소환 50 | 없음. 즉시, 커서와 시약 없음. Dismissive 마나 없음([Necromancy](../mechanics/necromancy.md#01.A) 01.A절) |
| Dispel + Dismissive T3 | 20 - 40 + 50 = 30 | 시전 1.75초, 커서로 소환수 지정, 시약 셋, Tome마다 5포인트 |
| Mass Dispel + Dismissive T3 | 둘에 40 - 80 + 100 = 60 | 주변의 모든 소환수를 맞힘. 남의 것도 → 위험 |

- Dispel로 아끼는 마나: 둘, 10분에 40 → 초당 0.07. 교전 소모 초당 2.7\~4.0([Bard Necro Enhanced](bard-necro-enhanced.md#01.D) 01.D절)의 1/40
- Dismissive의 값은 교전 중 죽을 때의 40 회수. 그때 재소환이 실제 10 → 소환수가 자주 죽는 사냥터면 고려, 아니면 전투 T3
- Dispel 마나 20, 시전 1.75초, Mass Dispel 마나 40, 시전 2초: [Item list](../game/item-list.md#19) 19절

#### 실패 증상

| 증상 | 뜻 |
| --- | --- |
| 소환수가 빠지면 `[ vengeful spirit ]`, 소환 주문어, 5초 안에 `[ name, wichy ]` | 정상 |
| `[ vengeful spirit ]`가 안 뜸 | 마나 20 미만, 시약 없음(Bloodmoss, Fire나 Daemon이면 ash), 심볼 부족(마나 65 이상이면 1, 20\~64면 Wither와 함께 6), 워모드, 걷는 중, 은신. 20\~64에서 잃은 HP 25 이상이면 Wither를 안 눌러 대기 |
| Journal `Summon: no Vengeful Spirit buff after the press.` | 400ms 안에 버프가 안 보임. 늦게 뜨면 다음 패스에 소환, 끝내 없으면 다음 누르기는 30초 뒤. 반복되면 Razor 핫키 이름 `Vengeful Spirit` 확인 |
| 첫째만 나오고 둘째는 다음 VS에서 | 마나 65 미만이면 정상(Wither 한 번 = 소환 하나). 65 이상인데 그러면 버프 이름 불일치로 창을 못 읽음 |
| 소환수가 빠졌는데 Blood Oath도 안 나감 | Wither 경로가 심볼 6을 모으는 중. 은행이 차면 넘칠 몫으로 나감 |
| `[ wither, miss ]` | 400ms 안에 Wither 버프가 안 보임. 가끔이면 버프가 늦은 것, 다음 패스에 이어감. 30초마다 반복되면 Razor 핫키 이름 `Wither` 확인 |
| 마나 20\~64에서 소환 주문어 뒤 마나 부족 문장 | 다른 주문이 Wither 마나를 먼저 씀. 그 Wither는 끝, 다음은 마나 65나 다음 Wither |
| Play 때 `[ summon, wrong ]` | `summon_first`가 4. Air를 둘째로 |
| 같은 종류가 둘 나옴 | 첫째 종류를 바디로 못 찾음. 그 소환수의 `>info`로 바디와 Notoriety 확인 |
| 언데드 대신 맨 엘리멘탈 | 시전이 끝날 때 VS가 꺼짐. 마감 23초를 줄임 |
| `[ release, miss ]` | 이름이 안 붙었거나 거절됨. 다음 시도는 10분 뒤 |
| Journal `Summon: too many followers, resting.` | `config__summon_followers`가 실제와 다르거나 다른 팔로워가 있음. 30초 쉼 |
