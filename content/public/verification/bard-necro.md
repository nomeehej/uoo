---
name: Bard Necro Checks
label: 바드 네크로 인게임 확인
group: Verification
order: 70
---

바드 네크로 인게임 확인 목록. 검사별 하는 것, 통과 기준, 확인 상태 보관.
확인된 사실은 해당 정본으로 이동. 검사 상태와 날짜는 실제 관찰 뒤에만 갱신.
전체 질문과 검사 문서 색인은 [Open items](../questions/open-items.md#08).

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 검사와 통과 기준 |
| [02](#02) | 변경 경과의 위치 |

## <a id="01"></a>01 검사와 통과 기준

바뀐 동작은 [Module Migration](../history/module-migration.md#01.D) 01.D절. 재소환과 교체의 설계와 실패 증상은 [Bard Necro Summons](../loops/bard-necro-summons.md#03) 03절.

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
| Energy Bolt 회수와 환급 | 한 시전에 `[ mana, refund ]`와 `[ eb, refund ]`가 둘 다 뜨는지([Profile Messages](../scripting/profile-messages.md#01) 01절). 방법은 아직 후보 | 15마나 회수(5초 안에 마무리할 때만)와 환급 확률의 중첩 여부. 갈리는 것은 마나 예산이 초당 2.7인지 훨씬 낮은지([Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.D) 01.D절) | 확인되지 않았다 |
| Ensemble, Reverb, Virtuoso 범위 | 포인트 변경 전후 데미지 트래커의 소환수 딜 절대값 비교 | 셋이 정말 본체에만 적용되는지. 갈리는 것은 코덱스 배분([Barding](../mechanics/barding.md#01.B) 01.B절) | 확인되지 않았다 |
| 바디 번호 | Skeletal Fiend, skeletal marksman, rotting flesh가 나오면 `>info` | 바디 번호. 갈리는 것은 `SUMMON NAMES`의 `findtype` 줄([Bard Necro Summons](../loops/bard-necro-summons.md#02) 02절) | 확인되지 않았다 |
| Corpse Skin 질병 틱 | 프록 한 방 뒤와, 프록 네 방과 볼트 뒤의 Poison Strike 피해를 데미지 트래커로 비교. 방법은 아직 후보 | 질병 하나의 틱 수. 갈리는 것은 Poison Strike 시점([Necromancy](../mechanics/necromancy.md#02) 02절) | 확인되지 않았다 |
| SELF BUFFS | 몹이 없고 서 있을 때(`var__fighting = 0`, `cooldown "walk" = 0`) | 사냥 사이에 Reactive Armor와 Magic Reflection이 버프바에 붙고, 붙어 있는 동안 재시전 없음. 리플렉트가 소모되면 `[ reflect, off ]`와 30초 `reflect` 바, 바가 꺼진 뒤 다음 정지 때 재시전. 실패면 매 패스 재시전, `findbuff` 이름 불일치 | 확인되지 않았다 |
| 시약 10초 리프레시 | 시약을 떨어뜨림 | 헛시전 한 번 뒤 그 주문을 건너뛰고 나머지 진행. 다시 채우면 최대 10초 안에 재개(2026-09-28 변경, 그때는 30초). 실패면 같은 주문의 헛시전 반복 → 캐릭터 이름으로 뜬 줄을 `insysmsg`가 못 읽음 | 확인되지 않았다 |
| Poison Strike와 Energy Bolt 순서 | 교전 | Curse 뒤 네 프록이 이어서 나가고, 바 넷이 다 뜬 뒤 Energy Bolt 한 방, 그다음 `[ poison strike ]`. 몹을 바꾸면 그 몹에 프록이 간 뒤에만(2026-09-28 변경). 실패면 Curse나 첫 프록 바로 뒤에 둘 중 하나. 한 프록만 반복되면 그 바의 트리거 확인 | 확인되지 않았다 |
| 네크로 능력 핫키 | 교전 | `[ blood oath ]` `[ corpse skin ]` `[ evil omen ]` `[ poison strike ]`가 전처럼 뜸(2026-09-28 변경). 실패면 Razor 핫키 목록의 이름 확인 | 확인되지 않았다 |
| Corpse Skin과 Evil Omen 조건 | 교전 중 걷기, warmode | 걷는 동안과 warmode에서는 둘이 안 나가고 `[ blood oath ]`만. 멈추면 프록 앞에 시전(2026-09-28 변경) | 확인되지 않았다 |
| Poison Strike와 Vampiric Embrace 거절 | 질병 없는 몹, 먼 시체 | Poison Strike가 매 패스 반복되지 않고 다음 프록 뒤 재시도. 시체가 멀면 Vampiric Embrace는 5초에 한 번만(2026-09-28 변경). 실패면 같은 거절 줄이 매 패스 | 확인되지 않았다 |
| 타겟을 화면 거리에서 | 10칸 밖의 몹을 All Kill로 찍음 | `[ target, set ]`, 다가오면 교전. 그 사이 송이 나가도 타겟 유지(2026-09-29 변경). 실패면 `[ target, set ]` 없음, 몹이 붙었는데 송과 버프만 | 확인되지 않았다 |
| 남의 소환수 | 파티원의 엘리멘탈 | `[ name, … ]` 없음(2026-09-29 변경). 실패면 뜸 | 확인되지 않았다 |

#### 메모

- 생존, 포션, 버프, 골드는 공용 모듈. 하우스키핑과 교전 및 이동 분기는 레시피 그룹이 생성
- 프로보와 마지막 대상: 후보 입력, 짝 선택, 실제 라타의 한계와 확인 절차는 [01절](provocation.md#01)
- 패스 끝 0.1초 대기, 10초마다 시약 읽기 추가

## <a id="02"></a>02 변경 경과

날짜별 기록은 [Verification History](../history/verification.md#07) 07절.
