---
name: Profile Messages
label: 프로필 서버 문장과 머리 위 알림 목록
group: Scripting
order: 50
---

프로필에서 찾는 서버 문장과 표시할 머리 위 알림의 대응표.
검색 순서와 기다림 처리 규칙은 [Overheads](overheads.md#07) 07절, 형식과 hue는 같은 문서 [02절](overheads.md#02)과 [05절](overheads.md#05).
숫자의 미확인 항목은 [Open items](../questions/open-items.md#04) 04절.

## <a id="00"></a>00 한눈에

| 절 | 내용 |
| --- | --- |
| [01](#01) | 프로필별 차이와 서버 문장 대응표 |

## <a id="01"></a>01 프로필 메시지 목록

Razor 프로필 `summoner.xml`, `default.xml`의 `<overheadmessages>`. 정본은 프로필 xml, 항목을 바꾸면 이 표도 수정.
`bard.xml`은 2026-10-21 `summoner.xml`을 복사 → 같은 목록. 항목을 바꾸면 세 파일 모두.
두 파일은 거의 같음. `default.xml`에는 던지기 8줄(`now planted`, `moving throws`, `wing your target`)과 벌목 3줄이 없고 붕대 1줄이 더 있음.
벌목 3줄(`Lumberjacking skillgain:`, `Your skill in Lumberjacking has increased`, `You do not see any harvestable resources nearby`)은 2026-10-07부터 `default.xml`에서 빠짐.

아래가 항목 전부, `summoner.xml` 파일 순서. `default.xml`에만 있는 붕대 줄은 그 파일에서의 자리에.

| 서버 문장 (검색어) | 메시지 (hue) | 메모 |
| --- | --- | --- |
| : Attempting to heal you. | `[ heal, coming ] (209)` |   |
| You do not have a full suit of armor | `[ armor, out ] (254)` |   |
| Now tracking | `[ track, {3} {4} {5} ] (290)` |   |
| spaces to target | `[ track, {3} {4} {5} ] (290)` |   |
| You search the home and find no one hiding within. | `[ house, clear ] (269)` |   |
| script variable updated | `[ var, set ] (290)` |   |
| Your attack hamstrings your target | `[ hams, target ] (244)` |   |
| There's not enough wood here to harvest. | `[ wood, out ] (254)` |   |
| Harvest double yield/loot triggered | `[ harvest, double ] (269)` | 추가 수확 발동 |
| You chop some | `[ lumber, {4} ] (269)` | 네 번째 낱말. 일반 목재는 `logs`, 특수 목재는 `dullwood`, `shadowwood` 같은 재질 이름. 수확 성공 줄은 모두 269 |
| You hack at the tree for a while, but fail to produce any useable wood. | `[ lumber, miss ] (254)` | 채집했지만 목재 없음. 자원 고갈 안내와 다름 |
| Lumberjacking skillgain: | `[ lumber, {3} ] (290)` | `summoner.xml`에만. 세 번째 낱말은 스킬 상승 확률, 실제 상승 아님 |
| Your skill in Lumberjacking has increased | `[ lumber, gain ] (290)` | `summoner.xml`에만. 실제 스킬 상승 |
| You have recently traveled | `[ harvest, wait ] (254)` | 여행 뒤 채집 거절 안내. 기다리라는 표시일 뿐, 별도 타이머 없음 |
| You do not see any harvestable resources nearby | `[ harvest, out ] (254)` | `summoner.xml`에만. 주변 자원 없음 → 다음 장소로 이동 안내 |
| harvesting is not allowed | `[ harvest, blocked ] (254)` | 채집 불가 장소 안내 |
| you notice | `[ thief, me ] (234)` |   |
| you have already used the maximum | `[ field, out ] (254)` |   |
| You finish applying the bandages. | `[ bandage, done ] (290)` | `default.xml`에만 |
| You have been poisoned! | `[ poison, on ] (234)` |   |
| You have been cured of all poisons. | `[ poison, off ] (265)` |   |
| You have been cured of all poisons! | `[ poison, off ] (265)` |   |
| You are already at full health. | `[ hits, full ] (290)` |   |
| You increase your damage resistance to creature-casted spells | `[ resist, on ] (290)` |   |
| You cannot move! | `[ para, on ] (234)` |   |
| You can move! | `[ para, off ] (265)` |   |
| before you may use another strength potion | 빈 메시지 | 버프창이 지속 시간을 보여 주므로 안 띄움. 지우면 뒤의 넓은 검색어 `minutes `가 잡아 `[ wait, minutem secondss ]` → 앞에서 **삼키려고** 둠 |
| before you may use another agility potion | 빈 메시지 | 위 줄과 같음 |
| you are already at full stamina. | `[ stam, full ] (290)` |   |
| You are not poisoned. | `[ poison, off ] (265)` |   |
| You may now use a strength potion. | `[ str, ready ] (269)` |   |
| You may now use an agility potion. | `[ agi, ready ] (269)` |   |
| Looting this corpse will be a criminal act! | `[ loot, crim ] (254)` |   |
| Looting this monster corpse will be a criminal act! | `[ loot, crim ] (254)` |   |
| You carve materials from the corpse. | `[ carve, done ] (290)` | Forensic Evaluation 칼질 성공(skinning-enhanced) |
| worth carving or investigating | `[ corpse, out ] (254)` | Smart Harvest가 깎을 시체를 못 찾음 |
| Criminal actions are not permitted | `[ crim, blocked ] (254)` | Sanctuary Dungeon에서 주인 없는 시체 칼질 거절. skinning-enhanced는 그 뒤 5분 동안 회색 시체만 |
| That corpse has already been carved. | `[ corpse, carved ] (290)` | 이미 깎은 시체를 다시 찍음(skinning-enhanced) |
| You have committed a criminal act! | `[ crim, on ] (234)` | 플레이어 시체 칼질 같은 범죄 행위. 뒤에 붙는 행동 이름은 무시 |
| You are now a criminal. | `[ crim, on ] (234)` |   |
| You have been reported for a murder! | `[ murder, +1 ] (234)` |   |
| You summon an ancient | `[ ancient, on ] (269)` |   |
| Your spellbook generates mana for your spell. | `[ mana, refund ] (290)` |   |
| You fail to ignite the campfire. | `[ camp, miss ] (254)` |   |
| Your campfire is now secure. | `[ camp, on ] (269)` |   |
| You feel it would take a few moments to secure your camp. | `[ camp, coming ] (290)` |   |
| You enter a meditative trance. | `[ medi, on ] (290)` |   |
| Your concentration is disturbed, thus ruining thy spell. | `[ cast, disturbed ] (254)` |   |
| Being perfectly rested, you shove something invisible out of the way. | `[ hidden, near ] (254)` |   |
| You may now attempt to | `[ hams, ready ] (269)` |   |
| You refrain from making hamstring attempts. | `[ hams mode, off ] (290)` |   |
| You will now attempt to hamstring your opponents. | `[ hams mode, on ] (290)` |   |
| You fail to hamstring your opponent. | `[ hams, miss ] (254)` |   |
| Their attack hamstrings you! | `[ hams, me ] (234)` |   |
| You are no longer hamstrung | `[ hams, off ] (265)` |   |
| You will now attempt to disarm your opponents. | `[ disarm mode, on ] (290)` |   |
| You refrain from making disarm attempts. | `[ disarm mode, off ] (290)` |   |
| Your strike disarms your target! | `[ disarm, target ] (244)` |   |
| You fail to disarm your opponent. | `[ disarm, miss ] (254)` |   |
| Their attack disarms you! | `[ disarm, me ] (234)` |   |
| Where do you wish to traverse to? | `[ rope, pick ] (255)` |   |
| That location is blocked. | `[ spot, blocked ] (254)` |   |
| Target cannot be seen. | `[ range, out ] (254)` |   |
| You are now under the protection of the town guards. | `[ guard, on ] (290)` |   |
| You have left the protection of the town guards. | `[ guard, off ] (254)` |   |
| Someone tried to steal from you. | `[ thief, me ] (234)` |   |
| You have been revealed! | `[ reveal, me ] (234)` |   |
| You have been banned from this house. | `[ ban, me ] (254)` |   |
| You have been ejected from this house! | `[ eject, me ] (254)` |   |
| You have been added to the party. | `[ party, on ] (209)` |   |
| You have been removed from the party. | `[ party, off ] (209)` |   |
| You feel ready to continue stealthing | `[ stealth, ready ] (269)` |   |
| You feel comfortable enough to begin stealthing | `[ stealth, ready ] (269)` |   |
| You have 5 stealth steps remaining | `[ stealth, 5 ] (290)` |   |
| You have successfully cleared it of traps | `[ trap, done ] (290)` |   |
| You successfully pick the lock | `[ lock, done ] (290)` |   |
| You fail to make any progress on the lock | `[ lock, miss ] (254)` |   |
| You fail to make any progress towards removing traps | `[ trap, miss ] (254)` |   |
| You finish using veterinary supplies | `[ vet, done ] (290)` |   |
| You begin using veterinary supplies | `[ vet, on ] (290)` |   |
| What do you wish to focus your follower's aggression towards? | `[ herd, pick ] (255)` |   |
| you extend the life of your creature | `[ summon, extended ] (290)` |   |
| you are now under the effect of herbal poultice | `[ herb, on ] (290)` |   |
| Your herbal poultice has lost its effectiveness. | `[ herb, off ] (254)` |   |
| That spell is already currently in effect. | `[ buff, on ] (290)` |   |
| already at full repair | `[ repair, done ] (290)` |   |
| You may now use another magic mushroom | `[ mush, ready ] (269)` |   |
| before you may consume another magic mushroom | `[ mush, {5} ] (290)` |   |
| One of more of your ship crewmembers | `[ crew, ready ] (269)` |   |
| Criminal healing will now be allowed | `[ crim heal, on ] (290)` |   |
| Criminal healing will now be prevented | `[ crim heal, off ] (290)` |   |
| Criminal looting will now be allowed | `[ crim loot, on ] (290)` |   |
| Criminal looting will now be prevented | `[ crim loot, off ] (290)` |   |
| Your lightning spell hinders your target | `[ lightning, target ] (244)` | 라이트닝 프록 |
| Your attack cripples your target, lowering their defense | `[ cripple, target ] (244)` |   |
| You smash through | `[ smash, target ] (244)` |   |
| susceptible to special | `[ bleed, target ] (244)` |   |
| armslore skillgain | `[ swing ] (290)` |   |
| attack causes your target to bleed | `[ bleed, target ] (244)` |   |
| minutes before | `[ wait, {5}m ] (254)` | "…wait another 2 minutes before…"처럼 초가 없는 꼴. 초가 있는 꼴보다 앞에 |
| minute before | `[ wait, {5}m ] (254)` | 위 줄과 같음 |
| minutes (뒤에 빈칸) | `[ wait, {5}m {7}s ] (254)` | "You must wait another 4 minutes 17 seconds …" |
| minute (뒤에 빈칸) | `[ wait, {5}m {7}s ] (254)` | 위 줄과 같음 |
| must wait another | `[ wait, {5}s ] (254)` |   |
| 0 Trapped pouches remain | `[ pouch, out ] (254)` |   |
| No trapped pouches found | `[ pouch, out ] (254)` |   |
| restricted from performing aggressive | `[ restrict, {14} ] (234)` |   |
| world will save | `[ world, coming ] (224)` |   |
| world is saving | `[ world, saving ] (224)` |   |
| save complete | `[ world, done ] (224)` |   |
| aspect and other bonuses return | `[ aspect, on ] (269)` |   |
| free cure potion | `[ cure pot, free ] (290)` |   |
| too fatiqued | `[ weight, over ] (254)` |   |
| too fatigued | `[ weight, over ] (254)` |   |
| are overloaded | `[ weight, over ] (254)` |   |
| contested boss has spawned | `[ boss, {7} ] (224)` |   |
| control points earned for current beacon | `[ beacon, +{2} {12} ] (290)` |   |
| kill points earned | `[ kill, +{2} {9} ] (290)` |   |
| DF A Dungeon Flashpoint will begin in 15 minutes. | `[ flashpoint, coming ] (224)` |   |
| cured the target of all poisons | `[ cure, target ] (269)` |   |
| cast a wizardry magic arrow spell again | `[ magic arrow, ready ] (269)` | 검색어를 준비 문장으로 좁힘. 프록 발동 "activated" 줄은 아래 |
| cast a wizardry harm spell again | `[ harm, ready ] (269)` |   |
| cast a wizardry fireball spell again | `[ fireball, ready ] (269)` |   |
| cast a wizardry lightning spell again | `[ lightning, ready ] (269)` |   |
| cast a wizardry chain lightning spell again | `[ chain, ready ] (269)` |   |
| cast a wizardry meteor swarm spell again | `[ meteor, ready ] (269)` |   |
| magic arrow activated | `[ magic arrow, target ] (244)` | 프록 발동. 15초 바 시작([Overheads](overheads.md#06.C) 06.C절) |
| harm activated | `[ harm, target ] (244)` | 위 줄과 같음 |
| fireball activated | `[ fireball, target ] (244)` | 위 줄과 같음 |
| chain lightning activated | `[ chain, target ] (244)` | 위 줄과 같음 |
| meteor swarm activated | `[ meteor, target ] (244)` | 위 줄과 같음 |
| upgraded to Deadly | `[ poison, deadly ] (244)` |   |
| upgraded to Lethal | `[ poison, lethal ] (244)` |   |
| Triggered (Epic) | `[ aspect, on ] (269)` |   |
| enough experience to upgrade | `[ aspect, upgrade ] (290)` |   |
| Society Job Progress | `[ society, {4} ] (290)` |   |
| You have completed a society job | `[ society, done ] (290)` |   |
| aspect experience | `[ {4}, {7} ] (290)` |   |
| resist a bleed | `[ bleed, off ] (265)` |   |
| resist a disease effect | `[ disease, off ] (265)` |   |
| been struck by an ancient blight | `[ disease, on ] (234)` |   |
| may now review results | `[ boss, done ] (290)` |   |
| struck by an evil omen | `[ omen, target ] (244)` |   |
| enough unholy | `[ unholy, out ] (254)` |   |
| unholy symbols remaining | `[ unholy, {4} ] (290)` |   |
| max unholy | `[ unholy, max ] (269)` | 원문 "Max unholy symbols earned (10/10)". `{5}`는 괄호째 떠서 안 씀 |
| consume a magic mushroom | `[ mush, on ] (290)` | 원문 "You consume a magic mushroom and restore some mana.". 넓은 검색어 `You consume`보다 앞에. 뒤에 두면 `[ essence, +a ]` |
| mana from your mana well | `[ eldritch, +{3} ] (290)` | 원문 "You draw 11 mana from your mana well.". Eldritch 아스펙트 |
| You consume | `[ essence, +{3} ] (290)` |   |
| generates mana | `[ mana, refund ] (290)` |   |
| progress on the lock | `[ lock, {8} ] (290)` |   |
| clearing it of traps | `[ trap, {10} ] (290)` |   |
| thrown at that player within 30 | `[ teleki, target ] (244)` | 자기 TK, 받은 TK와 혼동 가능. 공격 대상에게 들어갔다는 증거 아님([PvP](../game/pvp.md#04.D) 04.D절) |
| has applied telekinesis to you | `[ teleki, me ] (234)` | 원문 "nomeehej has applied telekinesis to you.". 건 사람 이름은 저널에 |
| An explosion potion has stuck to you | `[ bomb, me ] (234)` | 5초 바 `bomb, me`와 짝. 실제 점화부터 재는 퓨즈와 다름([PvP Experiments](../verification/pvp-experiments.md#01.C) 01.C절) |
| Your explosion potion sticks to your target | `[ bomb, target ] (244)` |   |
| free hand to drink | `[ hands, full ] (254)` |   |
| You drink a healing potion | `[ heal pot, on ] (290)` | 스크립트의 같은 줄은 삭제 |
| You drink a cure potion | `[ cure pot, on ] (290)` | 스크립트의 같은 줄은 삭제. Refresh 포션은 서버 문장이 없어 줄 없음. 힘과 민첩 포션은 "Your strength has changed by 20"뿐, Weaken에도 같은 문장이라 안 잡음 |
| You will now automatically | `[ scroll mode, on ] (290)` |   |
| You may only cast that spell on a player once every 30 seconds. | `[ limit, 30s ] (254)` |   |
| Your boarding party fails to board the ship | `[ boarding, miss ] (254)` |   |
| That ship is too far away to board. | `[ range, out ] (254)` |   |
| Your shot hinders your target! | `[ hinder, target ] (244)` |   |
| You deactivate your stance. | `[ stance, off ] (254)` |   |
| You smash the unprotected | `[ smash, target ] (244)` |   |
| fallen to corruption | `[ shrine, on ] (224)` |   |
| You begin to move quietly | `[ stealth, on ] (290)` |   |
| You have 4 stealth | `[ stealth, 4 ] (254)` |   |
| You have 3 stealth | `[ stealth, 3 ] (254)` |   |
| You have 2 stealth | `[ stealth, 2 ] (254)` |   |
| You have 1 stealth | `[ stealth, 1 ] (234)` |   |
| You have 0 stealth | `[ stealth, 0 ] (234)` |   |
| You must hide first | `[ hide, off ] (254)` |   |
| Those cannons are out of ammunition | `[ cannon, out ] (254)` |   |
| You fail to steal | `[ steal, miss ] (254)` |   |
| You fail in your stealing attempt | `[ steal, miss ] (254)` |   |
| You steal | `[ steal, done ] (290)` |   |
| You successfully steal | `[ steal, done ] (290)` |   |
| You have already stolen from this creature | `[ steal, wrong ] (254)` |   |
| You may now taunt again. | `[ taunt, ready ] (269)` |   |
| Potion codex Panaccea upgrade is now ready. | `[ panacea, ready ] (269)` |   |
| Your ability to hide is no longer impeded | `[ hide, ready ] (269)` |   |
| Weapon ability ready | `[ ability, ready ] (269)` |   |
| your rapid | `[ move, slow ] (254)` |   |
| your movements attract | `[ move, slow ] (254)` |   |
| your quick movements draw the attention | `[ move, slow ] (254)` |   |
| iron flesh charges remaining | `[ iron flesh, {1} ] (290)` |   |
| You detonate a ground trap | `[ detonate, done ] (290)` |   |
| You may now detonate another trap | `[ detonate, ready ] (269)` |   |
| You increase your \[EventScore | `[ event, +{6} ] (290)` |   |
| You are now under the effect of a Song | `[ song, on ] (53)` |   |
| You fail to discord | `[ disco, miss ] (254)` |   |
| fail to pacify any nearby creatures | `[ peace, area miss ] (254)` |   |
| fail to pacify your opponent | `[ peace, miss ] (254)` |   |
| disrupting your opponent | `[ disco, target ] (53)` |   |
| briefly discording | `[ disco, area ] (53)` | 자기를 찍으면 8타일 광역, 하나에 5초 |
| pacifying your target | `[ peace, target ] (53)` |   |
| briefly pacifying | `[ peace, area ] (53)` | 자기를 찍으면 8타일 광역, 하나에 2초 |
| play successfully, provoking | `[ provo, target ] (53)` | 프로보는 광역 없음. 자기를 찍으면 송 |
| fail to incite anger | `[ provo, miss ] (254)` |   |
| Song of Discordance effect ends | `[ disco song, off ] (254)` | 15분 송 끝남. 넓은 검색어 `You play successfully`는 삭제 |
| Song of Peacemaking effect ends | `[ peace song, off ] (254)` | 위 줄과 같음 |
| Song of Provocation effect ends | `[ provo song, off ] (254)` | 위 줄과 같음 |
| additional energy | `[ spell, charged ] (244)` |   |
| What instrument shall you play | `[ inst, out ] (254)` |   |
| now planted | `[ planted, on ] (290)` | `summoner.xml`에만 |
| 5 moving throws | `[ throws, 5 ] (290)` | `summoner.xml`에만 |
| 4 moving throws | `[ throws, 4 ] (290)` | `summoner.xml`에만 |
| 3 moving throws | `[ throws, 3 ] (290)` | `summoner.xml`에만 |
| 2 moving throws | `[ throws, 2 ] (290)` | `summoner.xml`에만 |
| 1 moving throws | `[ throws, 1 ] (234)` | `summoner.xml`에만 |
| 0 moving throws | `[ throws, 0 ] (234)` | `summoner.xml`에만 |
| wing your target | `[ wing, target ] (244)` | `summoner.xml`에만 |
| Magic reflect removed | `[ reflect, off ] (254)` | 바 `reflect`와 짝([Overheads](overheads.md#06.C) 06.C절) |
| Spell siphon active. | `[ siphon, on ] (269)` | 5분마다 첫 주문 피격에 켜지는 60분 PvM 버프. 바 `siphon`과 짝 |
| Your spell siphon bonus has expired | `[ siphon, off ] (254)` |   |
| You absorb their spell. | `[ spell, absorbed ] (269)` | Resist의 `25% x Resist/100` 확률로 흡수, 피해 -75% |
| You mana drain your target. | `[ drain, target ] (244)` | 스크립트의 `[ drain ]` 시전 알림은 삭제 |
| You curse your target. | `[ curse, target ] (244)` | 스크립트의 `[ curse ]` 시전 알림은 삭제 |
| Your reactive armor spell has been nullified. | `[ reactive, off ] (254)` | 25 흡수 후 빠짐. 다음에 서 있을 때 다시 시전 |
| You generate mana for your spell. | `[ mana, refund ] (290)` | 예전 `generates mana`는 이 문장을 못 잡음 |
| recovered from energy bolt kill | `[ eb, refund ] (290)` | 돌려받는 양이 티어마다 달라 숫자는 안 띄움([Magery](../mechanics/magery.md#01) 01절) |
| That is too far away. | `[ range, out ] (254)` |   |
