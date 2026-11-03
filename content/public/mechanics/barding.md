---
name: Barding
label: 바딩 메커니즘
group: Mechanics
order: 10
---

바드 세 스킬과 송의 서버 규칙, 쿨, 효과, 코덱스.
템플릿별 숫자는 [Bard Necro](../templates/bard-necro.md)와 [Bard Archer](../templates/bard-archer.md), 루프의 블록은 [Bard Necro Enhanced](../loops/bard-necro-enhanced.md).

루프가 쓰는 결론은 01.E절 쿨 모델 하나.

- 바딩 행동은 모두 `music`과 자기 슬롯이 0일 때만. 송은 `song`도 확인
- 스킬은 `music` 5초와 자기 슬롯을 세움. 송은 `song`만 세움
- 01.A \~ 01.D절: 근거. 01.F \~ 01.J절: `cooldowns.xml`과 스크립트 반영. 02절: 송, 디버프, 코덱스 효과

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 쿨. 스킬 쿨, 송, 세 쿨 계열, 쿨 모델, 리셋 프록, `cooldowns.xml` |
| [02](#02) | 효과. 송 버프, Discordance 디버프, Effective Barding, 지속시간, Barding Break, Bard Codex, 성공률, Defensive Barding |
| [03](#03) | 루프의 바딩. 프로보 후보 입력과 짝 선택 |
| [04](#04) | 틀렸던 생각 |
| [05](#05) | 출처 |

이 문서에 걸린 질문은 [Open items](../questions/open-items.md).

::part[쿨]

## <a id="01"></a>01 쿨

### <a id="01.A"></a>01.A 스킬 사용 쿨

|  | 쿨 | 출처 |
| --- | --- | --- |
| **Music (글로벌)** | 5초 | "A player may alternate between using Peacemaking or Provoking and Discordance every 5 seconds" |
| Discordance | 5초. 성공과 실패 같음 | "Skill usage cooldown is 5 seconds on both success and failure" |
| Peacemaking | **성공 10초, 실패 5초** | "Skill usage cooldown is 10 seconds on success and 5 seconds on failure" |
| Provocation | **성공 10초, 실패 5초** | "Skill usage cooldown is 10 seconds on success and 5 seconds on failure" |
| Barding Song | 10초 | "Casting a Barding Song has a 10 second cooldown that is independent of normal bard skill usage" |

- **Peace와 Provo는 슬롯 공유**(01.F절)
- **글로벌 쿨과 개별 쿨이 둘 다 0이어야 함.** Music 5초가 지나도 Peace 자기 쿨 10초가 남으면 사용 불가

```
if cooldown "music" = 0 and cooldown "peace/provo" = 0
```

두 쿨을 다 지킨 순서.

| 시각 | 스킬 | 쿨 |
| --- | --- | --- |
| t=0 | Discordance | Music 0 → 5, Disco 0 → 5 |
| t=5 | Peacemaking | Music 0 → 5, Peace와 Provo 슬롯 0 → 10 |
| t=10 | Discordance | Music 0 → 5, Disco 0 → 5 |
| t=15 | Provocation | Peace와 Provo 슬롯 쿨이 그때 풀림 |

### <a id="01.B"></a>01.B 송은 스킬을 자신이나 땅에 쓴 것

송은 별도 명령이 아님. **바드 스킬을 자기 자신(백팩)이나 땅에 찍으면 송.**

> "What do you wish to pacify? (you may target **yourself for an area effect** or the **ground for a group effect**)"

```
useskill 'Peacemaking'
waitfortarget wait__bard_target
target backpack
```

- 위키 [Musicianship](https://wiki.uooutlands.com/Musicianship): 송은 땅을 찍어 켬. 받는 대상은 자신, 자신에게 초록으로 뜨는 플레이어와 생물(팔로워), 파티원. 50칸 안
- 마지막 줄 `target backpack` → 자신에게 송(범위 효과). 땅(`targetrelloc 0 0`)도 송이 되지만 집 안에서는 `That is not accessible.`로 거절되고, Shadowspire Cathedral에서는 스크립트의 땅만 실패(손으로 바닥을 찍으면 됨). 모두 인게임 확인됨 2026-10-20
  - `targetrelloc 0 0`은 발밑을 좌표로 찍어서, 건물 바닥에서는 보이는 바닥과 달라지는 것으로 추정. 참고 스크립트들이 백팩을 찍는 이유로 보임
- 노래 커서는 적대 커서 → 백팩을 찍으면 `lastharmful`이 백팩으로 바뀜. 루프는 사본(`var__combat_target`)을 쓰고 백팩은 새 대상으로 안 받아 영향 없음. 손으로 누르는 E, V, Shift+V는 다음 고르기 전까지 백팩을 가리킴 → 적이 기억돼 있는 동안은 노래 없음(2026-10-22 변경)
- `module/bard/song.razor`는 백팩. 2026-10-20 하루 땅을 썼다가, 거절되는 장소와 그때마다 태우는 Music 때문에 백팩으로 돌아옴
- 막힌 노래 시도도 Music 5초를 다시 시작하는데(01.C절 표의 마지막 줄) 그때 `music` 바는 그 문장에 반응하지 않았음 → 매 바퀴 재시도해서 노래가 영영 막힘. 2026-10-20 대성당에서 이 순환이 남. 같은 날 `music` 바에 막힘 문장을 넣음(01.I절)

### <a id="01.C"></a>01.C 세 가지 쿨 계열

막힐 때 뜨는 문장으로 계열 구분. **쿨 모델의 열쇠.**

| 계열 | 막힐 때 뜨는 문장 | 범위 |
| --- | --- | --- |
| **Music 글로벌** | "You must wait a few moments to **use another skill**." | 모든 바드 스킬. 5초 |
| **Barding Song** | "You must wait a few moments before performing **another barding song**." | **세 곡이 공유.** 바는 11초(01.I절) |
| **Peace와 Provo 슬롯** | "You must wait a few moments before you may **provoke or pacify another creature**." | **공유.** 10초(01.F절) |

- Discordance는 자기 슬롯 5초를 따로 사용. Discordance 전용 차단 문장은 확인되지 않았다
- `Peace Song -> Disco Skill -> Disco Song` 순서에서 마지막이 "another barding song"으로 막힘 → **곡끼리 쿨 하나를 공유**. 인게임 확인됨

### <a id="01.D"></a>01.D cooldown은 서버 값이 아님

`cooldown "..."`은 서버 값이 아닌 `cooldowns.xml`의 내 트리거. 일반 규칙은 [Overheads](../scripting/overheads.md#06.B) 06.B절.
루프는 바드 쿨을 자체 타이머로 복사하지 않고 프로필 바를 읽음. Lyric 리셋 대응은 01.G절.

- 예전 `music` 항목에 송 트리거(10초)가 섞임 → 뒤따르는 5초 스킬 트리거와 서로 덮어씀
- 증상: "Music이 0인데 송이 안 나간다", "서버가 허용하는 스킬을 10초 참는다"
- 01.I절 최종 형태로 수정. 내역과 이유도 거기

### <a id="01.E"></a>01.E 쿨 모델, 확정

**모든 바딩 행동은 같은 관문 하나.**

```
Music = 0   AND   <그 스킬의 슬롯> = 0
```

**송만 `Song = 0`을 하나 더 확인.** 읽는 조건은 거의 같고, **다른 것은 세우는 것뿐.**

|  | 요구 | 세우는 것 |
| --- | --- | --- |
| Song | `Music = 0 AND Song = 0 AND <그 곡의 슬롯> = 0` | Song 11초만. Music도 슬롯도 안 세움 |
| Skill | `Music = 0 AND <그 스킬의 슬롯> = 0` | Music 5초와 그 스킬의 슬롯 |

| 슬롯 | 길이 | 공유 |
| --- | --- | --- |
| Discord | 5초 | 혼자 사용 |
| Peace와 Provo | 10초 | **공유** |

**송은 스킬의 조건을 읽기만 함. 아무것도 소모하지 않음.** 인게임 확인됨

- 스킬은 Music을 세움 → **스킬 뒤의 송은 막힘**
- 송은 Music을 안 세움 → **송 뒤의 스킬은 통과**
- 스킬은 슬롯을 세움 → **Peace 스킬 뒤의 Peace 송은 막힘**
- 송은 슬롯을 안 세움 → **Peace 송 뒤의 Peace 스킬은 통과**

<figure class="fx" data-fx="steps" id="fx-barding-order" aria-label="송부터 쓰는 순서와 스킬부터 쓰는 순서에서 Music, Song, 스킬 슬롯이 다르게 잠기는 모습">
<div class="fx__stage fx-cols">
<div class="fx-box">
<p class="fx-label">송부터 사용</p>
<div class="fx-lane"><span>Music</span><span class="fx-swap"><span class="fx-chip" data-on="-3" data-hl="3">준비</span><span class="fx-chip" data-on="4-">대기</span></span></div>
<div class="fx-lane"><span>Song</span><span class="fx-swap"><span class="fx-chip" data-on="1">준비</span><span class="fx-chip" data-on="2-" data-hl="2">대기</span></span></div>
<div class="fx-lane"><span>스킬 슬롯</span><span class="fx-swap"><span class="fx-chip" data-on="-3" data-hl="3">준비</span><span class="fx-chip" data-on="4-">대기</span></span></div>
<p class="fx-swap"><span data-on="1">두 행동 모두 준비</span><span data-on="2">송은 Song만 사용</span><span data-on="3">뒤따르는 스킬 사용 가능</span><span data-on="4-">스킬이 Music과 슬롯 사용</span></p>
</div>
<div class="fx-box">
<p class="fx-label">스킬부터 사용</p>
<div class="fx-lane"><span>Music</span><span class="fx-swap"><span class="fx-chip" data-on="1 4-">준비</span><span class="fx-chip" data-on="2-3" data-hl="2-3">대기</span></span></div>
<div class="fx-lane"><span>Song</span><span class="fx-swap"><span class="fx-chip" data-on="-5">준비</span><span class="fx-chip" data-on="6-" data-hl="6">대기</span></span></div>
<div class="fx-lane"><span>스킬 슬롯</span><span class="fx-swap"><span class="fx-chip" data-on="1 6-">준비</span><span class="fx-chip" data-on="2-5" data-hl="4-5">대기</span></span></div>
<p class="fx-swap"><span data-on="1">두 행동 모두 준비</span><span data-on="2-3">송도 Music을 기다림</span><span data-on="4-5">같은 슬롯의 송은 계속 대기</span><span data-on="6-">모든 관문이 비어 송 사용</span></p>
</div>
</div>
<ol class="fx__captions">
<li>Song, Music, 스킬 슬롯이 모두 빈 상태에서 시작. 두 열은 서로 다른 사용 순서</li>
<li>왼쪽은 송을 먼저 사용해 Song만 대기. 오른쪽은 스킬을 먼저 사용해 Music과 스킬 슬롯이 대기</li>
<li>왼쪽의 스킬은 Music과 슬롯이 비어 통과. 오른쪽의 송은 Song이 비어 있어도 Music 때문에 대기</li>
<li>왼쪽은 스킬 사용 뒤 Music과 슬롯도 대기. 오른쪽은 Music이 끝나도 같은 슬롯의 송은 아직 대기</li>
<li>오른쪽에서 다른 슬롯의 송은 그 슬롯과 Song이 비었으면 사용 가능. 같은 슬롯의 송은 계속 대기</li>
<li>오른쪽 슬롯까지 끝나면 송 사용 가능. 각 행동이 읽는 관문과 실제로 세우는 관문을 구별</li>
</ol>
<figcaption>아래 쿨 모델의 순서 비교. 재생 간격은 게임 시간과 무관. 서버 쿨과 프로필 바의 길이 차이는 01.I절</figcaption>
</figure>

#### 근거, 모두 인게임 측정

| 순서 | 결과 | 설명 |
| --- | --- | --- |
| Song → Disco Skill (1.5초 후) | **성공** | 송은 Music도 슬롯도 안 세움. 같은 슬롯도 다른 슬롯도 통과 |
| Song → Peace Skill | **성공** | 같음 |
| Song → Song (즉시) | "another barding song" | 송 쿨 공유 |
| Disco Skill → Song (즉시) | "use another skill" | **송이 Music을 봄** |
| Song (t=0) → Disco Skill (t=9) → Song (t=11) | 막힘 | 송 쿨은 풀렸지만 Disco가 세운 Music이 t=14까지 남음 |
| **Peace Skill → Peace Song** (Music이 풀린 뒤) | **"provoke or pacify another creature"** | **송이 자기 슬롯을 읽음** |
| **Peace Skill → Disco Song** | **성공** | 슬롯이 다르면 통과 |
| **Peace Song → Peace Skill** | **성공** | **송은 슬롯을 안 세움** |
| Song → 막힌 Song → Peace Skill | 막힘 | **막힌 시도도 Music을 태움** |

**마지막 줄이 함정.** 송 쿨에 막힌 시도도 Music을 태움.
"막힌 송 바로 다음의 스킬 판정"을 "송이 스킬을 잠근다"로 잘못 읽기 쉬움. 실제로 한 번 틀림.

#### 루프에 주는 규칙

- **교전 중에는 송이 거의 안 나감.** 디스코와 피스가 `music`을 5초씩 계속 세움
- 악기 연주는 시전을 끊어 주문이 날아감
- → `bard-necro-enhanced`는 **송을 이동 구간에서만.** 이동 10\~20초 동안 `music`이 비고 할 일도 없음

### <a id="01.F"></a>01.F Peace와 Provo는 슬롯 공유

전용 차단 문장 있음. 인게임 확인됨

> "You must wait a few moments before you may **provoke or pacify another creature**."

**`cooldowns.xml`에서는 `peace/provo` 한 항목으로 통합.** 서버 타이머는 하나 → 칸 둘은 화면만 차지하고 값도 틀림.

- 한때 "공유하지 않는다"고 기록. **로컬 Razor 항목만 보고 낸 결론**
- `Provo` 항목이 Peace 문장에 반응하지 않아 `provo READY`로 보였을 뿐, **서버는 막음.** 위키의 원래 서술이 맞음
- 통합 전 기존 스크립트는 **틀린 값을 읽음.** 직전 Peace 뒤에도 `Provo`가 READY → 헛시전, `music`만 소모
- `script/` 전체의 `cooldown "Peace"`, `cooldown "Provo"` 30곳을 `cooldown "peace/provo"`로 교체

### <a id="01.G"></a>01.G 쿨 리셋 프록

- **Lyric Aspect 방어구가 줌.** 모든 바드 쿨을 즉시 0으로. 인게임 확인됨
- 문장은 "Your barding skill cooldowns reset.". `cooldowns.xml`의 바드 항목은 모두 이 문장에 0으로(01.I절)
- **송 쿨도 0**(인게임 확인됨) → `song song disco`도 가능
- **쿨 측정 시 Lyric 방어구를 벗음.** 입으면 리셋이 끼어 실제 길이가 안 보임
- 착용 여부는 송 메시지로 확인. **`8.5%`면 착용, `6.8%`면 미착용**
- 스크립트 영향: 쿨이 예고 없이 0이 될 수 있음 → **바드 쿨을 자체 `timer__`로 흉내 내지 않음.** 게임의 `cooldown "..."`을 직접 읽어야 리셋 프록의 이득

### <a id="01.H"></a>01.H 송 버프 감지

```
findbuff "song of discordance"
findbuff "song of provocation"
findbuff "song of peacemaking"
```

- 15분 만료를 직접 세지 않음. 기존 구현(`script/archive/bard-mace.razor`의 BARD SONG BUFF)도 이 방식
- `bard-necro-enhanced`는 이 버프로 게이트하지 않음([Bard Necro Enhanced](../loops/bard-necro-enhanced.md#01.G) 01.G절)

### <a id="01.I"></a>01.I 이 저장소의 cooldowns.xml 최종 형태

| 항목 | 길이 | 트리거 |
| --- | --- | --- |
| `skill` |   | 일반 스킬 전부, 바드 5초 트리거 4개, 리셋 |
| `music` | 5s | `play successfully`, `fail to incite anger`, `fail to discord`, `fail to pacify`, 막힘 문장 `use another skill`, `another barding song`, `provoke or pacify another creature` |
|   | 0s | `Your barding skill cooldowns` |
| `disco` | 5s | `successfully, disrupting your opponent`, `fail to discord`, `briefly discording` |
|   | 0s | `Your barding skill cooldowns` |
| `peace/provo` | 11s | `pacifying your target`, `successfully, briefly pacifying`, `play successfully, provoking` |
|   | 5s | `fail to pacify any nearby creatures`, `fail to pacify your opponent`, `fail to incite anger` |
|   | 0s | `Your barding skill cooldowns` |
| `song` | 11s | `under the effect of a song` |
|   | 0s | `Your barding skill cooldowns` |

- 바 길이는 위키 값(01.A절)과 조금 다름. 송과 Peace, Provo 성공은 10초가 아닌 11초
- 송 쿨의 정확한 길이는 아직 미측정([Bard Necro Checks](../verification/bard-necro.md#01) 01절의 `송 쿨 길이` 행)
- 항목 순서: **바가 자주 뜨는 순서.** `skill`, `music`, `disco`, `peace/provo`, `song` 다음, 이 루프가 읽는 바를 `magic arrow`, `harm`,
  `fireball`, `lightning`, `mush`, `heal pot` 순서

고친 내역과 이유.

| 바꾼 것 | 이유 |
| --- | --- |
| `music`에서 `"under the effect of a song"` 10초 **제거** | 스킬 글로벌 항목에 송 쿨 값이 들어가 뒤따르는 5초 스킬 트리거와 서로 덮어씀. "Music이 0인데 송이 안 나간다"의 원인. 인게임 확인됨 |
| `song` **신설** | 세 곡이 공유하는 11초와 Lyric 리셋. 인게임 확인됨 |
| `disco`, Peace, Provo에서 각자의 `"effect of a song of ..."` 11초 **제거** | 송은 자기 스킬을 잠그지 않음. 두면 서버가 1.5초 뒤 허용하는 것을 11초 참음 |
| Peace에서 `"You play successfully, briefly pacifying ..."` 5초 **제거** | 같은 문장에 `"successfully, briefly pacifying"` 11초가 이미 있어 충돌 |
| Peace와 Provo를 **`peace/provo` 한 항목으로 통합** | 서버가 슬롯 공유(01.F절) |
| `skill`에 바드 5초 트리거 **추가** | 서버의 스킬 게이트가 하나 → 바드가 도는 동안 다른 스킬도 막힘(01.J절) |
| `music`에 막힘 문장 셋 5초 **추가**(2026-10-20, nomeehej, nomeehui) | 막힌 시도도 Music을 다시 태움(01.C절). 바가 몰라서 루프가 매 바퀴 재시도 → 노래가 영영 막힌 일(Shadowspire Cathedral). `provoke or pacify` 막힘이 Music을 태우는지는 미측정, 5초 대기는 손해가 작아 같이 넣음 |
| 항목 이름 **통일**. 처음 PascalCase, 2026-09-26 모두 소문자 | 스크립트 11개의 `heal pot`과 XML의 `Heal Pot`이 어긋나 임시 쿨다운으로만 돌고 바는 안 뜸. 규칙은 [Overheads](../scripting/overheads.md#06.A) 06.A절 |
| `fireball`에 발동 트리거 `"fireball activated"` **추가** | 실제 문장은 "Wizardry fireball activated.". 트리거가 없어 바가 안 채워지고 프록 게이트가 매 패스 통과. 인게임 확인됨 |
| 바가 자주 뜨는 순서로 **재배치** | 위 목록의 순서 |

**이 파일은 게임 종료 상태에서만 수정**([Workflow](../working/workflow.md#04.C) 04.C절).

### <a id="01.J"></a>01.J skill과 music의 관계

- **서버의 스킬 게이트는 하나.** `music`은 그중 바드 부분만 보는 이름
- **Music이 도는 동안 Animal Lore 같은 다른 스킬도 막힘**
- → `skill` 항목에도 바드 5초 트리거 네 개와 리셋 추가

| 식 | 0보다 클 때 | 쓰는 곳 |
| --- | --- | --- |
| `cooldown "skill"` | 어떤 스킬이든 쿨 |   |
| `cooldown "music"` | 바드 때문에 쿨 | 전투 루프 |

- 전투 루프는 바드 외 스킬을 안 씀 → `music`으로 충분
- **루프에 Animal Lore, Herding 크룩 같은 바드 외 스킬을 넣으면 `skill`로 변경**

::part[효과]

## <a id="02"></a>02 효과

### <a id="02.A"></a>02.A Barding Song, AoE 버프

세 곡 모두 <strong>"Players and their Followers"</strong> 대상. 소환수도 받음.

| 곡 | 효과 | 출처 |
| --- | --- | --- |
| Discordance | `5% x (Effective Barding / 100)` **Damage Resistance** | "Provides a (5% \* (Effective Barding Skill / 100)) Damage Resistance bonus to Players and their Followers" |
| Peacemaking | `5% x (Effective Barding / 100)` **Healing Received** | "Provides a (5% \* (Effective Barding Skill / 100)) Healing Amounts Received Bonus to Players and their Followers" |
| Provocation | `5% x (Effective Barding / 100)` **Damage Bonus** | "Provides a (5% \* (Effective Barding Skill / 100)) Damage Bonus to Players and their Followers" |

- 지속 **15분**. "All AoE Barding Song Buffs durations are 15 minutes"
- **재소환한 소환수에는 없음.** 다시 불러야 함(인게임 확인됨)
- 스킬 사용(디스코, 피스, 프로보)과 별개. 섞지 않음

### <a id="02.B"></a>02.B Discordance 디버프

> "The Discorded debuff increases damage taken from all sources by 25%, and reduces damage done by 25%."
> 스케일: "(Bard's Printed Discordance Skill / 120) \* 25 as %"

**printed 스킬 기준.** Effective 아님. 디스코 80이면 `80/120 x 25 = 16.7%`.

### <a id="02.C"></a>02.C Effective Barding Skill

> "A player's Effective Discordance Skill is their (Discordance Skill + Instrument Skill Bonuses + Applicable Instrument Slayer Bonuses + Supplemental Skill Bonuses + Lyric Aspect Armor Bonus)."
> "total bonuses from these sources cannot exceed the player's **Musicianship skill level**"

- **보너스 합계 상한은 Musicianship** → Musicianship을 버릴 수 없음
- **`Self Taught` 대체값도 이 상한에 적용**(인게임 확인됨)

#### 측정값: Effective Barding = 170

송 메시지가 값을 그대로 보여 줌. 송 공식이 `5% x (Effective Barding / 100)` → 표시 퍼센트 x 20 = Effective Barding.

| 장비 | 송 표시 | Effective Barding |
| --- | --- | --- |
| Lyric Aspect 방어구 착용 | `8.5%` | **170** |
| Lyric 미착용 | `6.8%` | 136 |

- 차이 **34** = Lyric Aspect Armor Bonus. **실전 기준 170**. 인게임 확인됨
- `80 printed + 80 cap = 160` 계산보다 높음. 상한이 정확히 어떻게 잡히는지는 확인되지 않았다
- **추론값 대신 측정값 사용.** 장비 교체 시 송 메시지 재확인

### <a id="02.D"></a>02.D 바딩 지속시간

| 스킬 | 공식 |
| --- | --- |
| Peacemaking | `(60초 - 몹 난이도) x (Effective Barding / 100)`, 최소 `15 x (Musicianship / 100)`초 |
| Provocation | `(60초 - 최고 몹 난이도) x (Effective Barding / 100)`, 최소 `15 x (Musicianship / 100)`초 |

- **난이도 300\~500에서는 앞 항이 음수 → 최소값**
- Musicianship 80이면 `15 x 0.8 = 12초`, 120이면 18초. **이 구간에서 Musicianship 상향의 이득은 6초뿐**

### <a id="02.E"></a>02.E Barding Break

> "for every 1 second that passes there is a ((CreatureDifficulty / 100) \* 1%) chance they will suffer a 'Barding Break'"
> "that will last for (CreatureDifficulty / 10) seconds"

난이도 400 → **초당 4% 확률**, 걸리면 **40초**. 끊는 대상은 스킬마다 다름.

- Peacemaking: "Pacified creatures may suffer a barding break, **ending the pacify effect prematurely**, and temporarily preventing them from being pacified again for a limited
  time."
- Provocation: "Provoked creatures may suffer a barding break, **ending the provocation effect prematurely**"
- Discordance: **안 끊김. 한 번 걸면 유지**(인게임 확인됨). 위키 Discordance 문서에 barding break 언급이 없는 것과 일치

- **`Ensemble`은 그래도 브레이크 영향.** 조건이 `Discord AND (Peace OR Provo)` → 디스코가 살아 있어도 **Peace나 Provo가 끊기면 Ensemble 꺼짐**
- → `Refrain`(브레이크 무시)은 Peace와 Provo를 지키며 **Ensemble 가동률도 지킴**
- **브레이크 걸린 대상에는 Peace도 Provo도 불가**(인게임 확인됨). 한쪽으로 다른 쪽 대체 불가
- 난이도 400이면 **40초 동안 Ensemble 완전 꺼짐**

### <a id="02.F"></a>02.F Peacemaking의 효과

> "Pacified creatures will not move, perform melee attacks, cast spells, or use most abilities"

- **데미지로 안 풀림.** 풀리는 것은 **Barding Break뿐**. 인게임 확인됨
- 위키 어디에도 "damage breaks pacify" 없음. 클래식 UO 규칙 적용 안 함
- → **피스를 걸고 때려도 됨.** 소환수 공격에도 안 풀림. 피스와 공격 로직이 서로 막을 이유 없음
- **피스가 걸린 몹도 프로보가 걸림**(인게임 확인됨 2026-10-20). 대상으로 피스를 받던 A를 B에게 프로보한 첫 시험

### <a id="02.G"></a>02.G Bard Codex

> 요구조건: "Players must have 2 or more skills of at least 80 Musicianship, Peacemaking, Provocation, Discordance skill or above"

**총 20포인트.** 티어별 추가 비용 `1/2/2`, 누적 **`T1=1 / T2=3 / T3=5`**.

| 업그레이드 | 효과(T1, T2, T3) | 팔로워 적용 |
| --- | --- | --- |
| **Sing Your Own Praises** | "Your bard song effects are increased by (40% / 120% / 200%) of normal **for you and your followers** but are reduced by (20% / 60% / 100%) **for others**" | **O** |
| Ensemble | "Gain Damage Bonus of (8% / 24% / 40%) towards creatures that you have Discorded". **실제 조건은 Discord AND (Peace OR Provo). 두 개가 걸려야 함**(인게임 확인됨) | 언급 없음 |
| Reverb | "Gain Damage Bonus of (4% / 12% / 20%) towards the target or targets of your most recent successful barding skill usage" | 언급 없음 |
| Virtuoso | "Damage Bonus and Damage Resistance against Barded Creatures". 크기는 `5% / 15% / 25%` x (lowest skill / 100) | 언급 없음 |
| Perfect Pitch | "Increases barding success chances by (6% / 18% / 30%) of normal" | -- |
| Refrain | "Your barding effects have a (4% / 12% / 20%) chance to ignore any Barding Breaks" | -- |
| Revolution Song | "Your provoked creatures inflict (40% / 120% / 200%) more damage" | -- |
| Self Taught | "Player can use up to (40 / 80 / 120) points of their **lowest printed skill** amongst Discordance, Peacemaking, Provocation to replace Musicianship requirements" | -- |

- **팔로워 적용이 명시된 코덱스는 `Sing Your Own Praises` 하나뿐**
- `Ensemble`, `Reverb`, `Virtuoso`는 "you"나 "the player"로만 서술. 소환수가 딜의 60% 넘게 내는 빌드에서는 이 차이가 배분을 뒤집음
- **`Sing Your Own Praises`의 `for others` 페널티**: 다른 플레이어와 **그 팔로워**가 내 송에서 받는 효과 감소.
  테이머 펫도 해당. T3는 `-100%` → 테이머 쪽은 내 송 효과 없음
- **`Self Taught` 상한**은 "lowest printed skill". Disco, Peace, Provo가 모두 80이면 T3(120점)를 찍어도 **80까지만** → T2(3점)가 상한

> "For the next 15 seconds after a successful barding action the player gains a Damage Bonus and Damage Resistance against Barded Creatures of (25% \* (Lowest Skill / 100))" --
> Bard Codex 화면, Virtuoso T3

- **Virtuoso는 성공한 바딩 행동 뒤 15초.** 크기는 printed 최저값 기준 → 세 스킬 80이면 T3도 20%
- 이미 Discord 걸린 대상에게 Discordance를 다시 성공해도 버프가 다시 생김. 송으로는 안 생김. 버프 이름 `Virtuoso`. 인게임 확인됨 2026-10-21
- → 한 마리를 오래 잡는 동안 Virtuoso를 지키려면 15초마다 Discordance를 다시 걸어야 함(`bard/disco`의 `keep_virtuoso`)

### <a id="02.H"></a>02.H 바딩 성공률

> "Increases barding success chances by (6% / 18% / 30%) of normal" -- Perfect Pitch

최소 성공률 `33% x (Effective Barding / 100)`. Effective 170이면 `56.1%`, `Perfect Pitch` T3를 더하면 `56.1% x 1.3 = 72.9%`.

### <a id="02.I"></a>02.I Defensive Barding

> "Defensive Barding will ONLY apply while a player is Flagged in PvP"
> "Players will receive Defensive Barding if they do not have Heat of Battle in effect (i.e. they have not made an aggressive action against another player recently)"
> "When Defensive Barding activates the player will automatically receive an Effective Wrestling skill value and Effective Magic Resist skill value, but only for the purposes of defending against
> attacks/spells, based on their barding skill values"
> "Effective Wrestling skill value of ((Discordance Skill + Peacemaking Skill + Provocation Skill) / 2) up to a maximum of 100 Skill value"
> "Effective Magic Resist skill value of ((Discordance Skill + Peacemaking Skill + Provocation Skill) / 2) up to a maximum of 100 Skill value"
> "If a player already has a printed Wrestling or Magic Resist skill for their character at a higher amount than the Effective Barding skill received for that skill, the player's printed skill will
> always take priority."
> "The Wrestling/Magic Resist received from Defensive Barding will NOT count towards meeting any Skill Requirements needed for Codexes/Grimoires/etc and players will NOT receive any unique PvM bonuses
> from Wrestling / Magic Resist (such as Wrestling Mana Refund Chance or Magic Resist Siphon Spell Damage)"

- Disco, Peace, Provo가 80, 80, 80이면 `240 / 2 = 120` → 상한 **100**. Wrestling, Magic Resist 모두
- **방어에만 사용.** 내 공격의 명중 판정에는 미포함
- printed가 **더 높을 때만** printed 사용 → 켜져 있는 동안 printed Resist 80은 무의미. printed Wrestling은 0([Bard Necro](../templates/bard-necro.md#01.A) 01.A절)
- **Heat of Battle이 켜지면 통째로 꺼짐.** 그때는 printed 값만

2020-09-28 첫 패치 원문은 지금 위키와 세 군데가 다름.

> "Effective Wrestling skill value of ((Discordance Skill + Peacemaking Skill + Provocation Skill) / 2) up to a maximum of 100 Skill value, when defending against creatures and other players while
> unarmed"
> "Effective Magic Resist skill value of ((Discordance Skill + Peacemaking Skill + Provocation Skill) / 3) up to a maximum of 100 Skill value"

|  | 2020 패치 | 지금 위키 |
| --- | --- | --- |
| Magic Resist | `/ 3`. 80, 80, 80이면 **80** | `/ 2`. **100** |
| Wrestling 적용 범위 | "**while unarmed**" | 언급 없음 |
| PvP 플래그 조건 | 없음 | "ONLY apply while a player is Flagged in PvP" |

확인되지 않은 것:

- 어느 Resist 공식이 지금 서버 값인지. `/ 3`이어도 printed 80과 같아 printed의 추가 이득 없음
- **레슬링 무기를 들었을 때도 Effective Wrestling 적용 여부.** 2020 원문은 "while unarmed"
- "Flagged in PvP"의 정의. 위키에 없음

::part[루프]

## <a id="03"></a>03 루프의 바딩

### <a id="03.A"></a>03.A 프로보 후보 입력, PROVO PICKS와 PROVOKE 블록

2026-10-21 두 바드 루프에 구현(`bard/provo-picks`, `bard/provo`). 인게임 확인은 [Provocation Checks](../verification/provocation.md#01) 01절.

#### 입력과 저장

| 역할 | 입력 | 저장과 알림 |
| --- | --- | --- |
| 현재 바딩 대상 T | Q(`Set Last Target (Harmful)`) 또는 Z(가장 가까운 몹) | `lastharmful` → `var__combat_target`, `[ target, set ]` |
| 프로보 후보 | Z 또는 `Shift+Space`(`Set Last Target (Beneficial)`) | `lastbeneficial` → `list__provo_candidates`, `[ provo, set ]` |
| 이번 자동 시전 | 후보 목록에서 고른 둘 | `var__provo_first`, `var__provo_second` |

- Z는 세 슬롯을 다 바꿈 → 대상이면서 후보. Q는 `lastharmful`만 → 대상만. `Shift+Space`는 `lastbeneficial`만 → 후보만. 근거는 [Razor](../scripting/razor.md#03) 03절
- 후보 수집은 패스 첫머리, warmode와 쿨다운에 무관. 살아 있는 적대 모빌만, 라벨 조회 없음
- `lastbeneficial`은 입력 슬롯일 뿐. 같은 값이 다시 와도 등록 없음. 동료 회복 같은 다른 Beneficial 커서도 이 슬롯을 바꿈
- 후보 목록은 Play를 넘어 유지. 죽거나 `acquire_range` 밖이면 탐색 때 제거

#### 짝 선택

- 등록된 후보끼리만. 둘 미만이면 대기, T로 보충하지 않음
- 등록 순서대로 라벨이 비어 있는 둘(`provoked`, `barding break` 아님). 라벨이 안 오면 이번 선택에서 제외
- 첫째를 둘째에게. 커서마다 `wait__bard_target`(1초) 대기, 전달 전에 거리와 생존 재확인. 첫째를 못 보냈으면 둘째도 안 보냄. 끝에 남은 적대 커서는 취소
- 실패한 첫째는 목록 뒤로. `incite that`(프로보 불가)은 그 Play 동안 제외. 성공은 라벨로 확인, 짝을 영구 저장하지 않음
- Peace는 provoked 몹을 건너뜀(02.F절)

| 현재 대상 | 등록한 후보 | 선택 |
| --- | --- | --- |
| T | B만 | 대기. T의 Disco와 Peace 계속 |
| T | B, C | B→C. T는 바딩 대상 유지 |
| T | B, C, D, E | B→C, 다음 공유 쿨에 D→E |
| A | A, B | A→B. A가 provoked이면 Peace 생략 |
| A | A, B, C, D, E | A→B, 다음 공유 쿨에 C→D. E는 대기 |

#### 실제 라타의 한계

- 자동 프로보가 바꾼 `lastharmful`은 `var__target_hold`로 걸러 루프 대상 T 유지
- 실제 `lastharmful`은 되돌리지 않음(`setlasttarget` 불가, [Razor](../scripting/razor.md#03) 03절). 다음 T 바딩 전까지 마지막 프로보 대상이 남아 E와 V가 그 몹을 가리킬 수 있음
- 두 프로보 커서 사이에 완료된 새 harmful 선택은 자동 타깃 전에 T로 반영

| 상태 | 역할 |
| --- | --- |
| `var__provo_last_pick` | 마지막으로 본 입력. Play를 넘어 유지 |
| `list__provo_candidates` | 등록 순서의 후보 목록. Play를 넘어 유지 |
| `var__provo_first`, `var__provo_second` | 이번 짝 |
| `var__provo_sent`, `var__provo_done` | 전달 단계. 0 전, 1 첫째, 2 둘째. `done`은 둘 다 보냈거나 짝이 깨짐 |

::part[기록]

## <a id="04"></a>04 자주 틀렸던 것

| 틀린 생각 | 사실 |
| --- | --- |
| 피스는 데미지에 풀림 | **아님.** Barding Break로만 풀림 |
| Music 쿨만 보면 됨 | **글로벌 5초와 개별 쿨이 둘 다 0이어야 함** |
| Discordance는 Effective로 스케일 | **printed 스킬로 스케일**(`printed / 120 x 25%`) |
| 소환수도 Virtuoso와 Ensemble을 받음 | **팔로워 명시는 `Sing Your Own Praises`뿐** |
| Discordance도 barding break로 끊김 | **안 끊김.** 브레이크는 Peace와 Provo만 |
| Self Taught는 요구조건만 대체 | **Effective Barding 보너스 상한에도 적용.** 측정값 170 |
| 송은 별도 명령 | **스킬을 자신이나 땅에 찍은 것.** 루프는 백팩(01.B절) |
| 송과 스킬은 서로 막음 | **한쪽만 막음.** 송은 Music과 슬롯을 읽기만, 안 세움 |
| Peace와 Provo는 슬롯이 따로 | **공유.** 로컬 항목이 서로를 반영하지 않아 한 번 착각 |
| 막힌 시도는 아무 쿨도 안 태움 | **Music을 태움.** 막힌 송 다음의 스킬 판정은 불신 |
| Ensemble은 디스코만 있으면 됨 | **Discord AND (Peace OR Provo).** 두 개가 걸려야 함 |
| 바드 쿨은 예측 가능 | **"Your barding skill cooldowns reset." 프록 존재**(Lyric 방어구). 측정 시 벗음 |
| 송 쿨은 `cooldown "music"` | **아님. 별도 계열.** `music`이 둘을 섞어 덮어쓰던 버그는 수정 |
| `cooldown "..."`은 서버 값 | **아님. `cooldowns.xml`에 적은 내 문장 트리거.** 숫자가 이상하면 이 파일 확인 |
| 브레이크 중에는 Provo로 Ensemble 유지 | **불가.** 브레이크 대상에는 Peace도 Provo도 안 걸림 |
| 바드에게 printed Resist는 PvP에서 무의미 | **도주할 때만 맞음.** 반격하면 Heat of Battle이 Defensive Barding을 끔 |
| 바드 메이지는 Defensive Barding이 있어 레슬링 불필요 | **도주할 때만 맞음.** 첫 공격 주문에 Heat of Battle, printed 0 |

## <a id="05"></a>05 참고 링크

- [Musicianship](https://wiki.uooutlands.com/Musicianship) -- Barding Song, barding break 공식, Defensive Barding
- [Discordance](https://wiki.uooutlands.com/Discordance) -- 디버프 공식, Effective Barding 정의
- [Peacemaking](https://wiki.uooutlands.com/Peacemaking) -- 지속시간, 쿨
- [Provocation](https://wiki.uooutlands.com/Provocation)
- [Bard Codex](https://wiki.uooutlands.com/Bard_Codex)
- [Heat of Battle](https://wiki.uooutlands.com/Heat_of_Battle) -- 공격적 행동의 정의, 자동 반격 예외
- [PATCH: Murderer and PvP Overhaul (2020-09-28)](https://forums.uooutlands.com/index.php?threads/patch-murderer-and-pvp-overhaul-general-changes.3232/)
  -- Heat of Battle 지속시간, Defensive Barding 원래 공식, Telekinesis 포션
- [TemplatesBard](https://wiki.uooutlands.com/TemplatesBard)
