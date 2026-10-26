<div align="center">

<img src="content/asset/favicon.svg" width="96" height="96" alt="A gold ring in pixels">

# uoo

**Razor scripts for Ultima Online Outlands.**

Hunt, gather, train and keep house. Shared blocks for the routines, notes for the decisions.

[![MIT](https://img.shields.io/badge/license-MIT-1111aa?style=flat-square)](LICENSE)
![UO Outlands](https://img.shields.io/badge/UO-Outlands-8b1a1a?style=flat-square)
![Razor](https://img.shields.io/badge/Razor-Outlands%20fork-2b6cb0?style=flat-square)

[Docs](https://nomeehej.github.io/uoo/) | [Scripts](script/README.md) | [Config](config/README.md) | [한국어](language/README.ko.md)

</div>

uoo is a personal workspace for the scripts, client profiles and gameplay notes used in everyday play on Ultima Online Outlands.
It keeps recurring routines and the decisions behind them together, from character templates and combat support to gathering and preparing for the next trip.

## Scripts for everyday play

The collection covers the activities around a character, both in the field and back at home.

| Area | What is here |
| --- | --- |
| Combat | Template-specific support for barding, archery, necromancy and pets, plus shared PvP recovery |
| Gathering | Lumberjacking and skinning loops with recovery and resource handling |
| Hotkeys and preparation | Weapon swaps, equipment recovery, loadouts and restocking |
| Loot and cleanup | Identification, recycling, sorting, banking and vendor stocking |
| Training | Scripts for repeated skill practice |

The scripts use the Razor bundled with the Outlands client and its extended scripting syntax.
The [script catalogue](script/README.md) describes individual loops and which actions remain manual.

## Shared modules, template recipes

Combat and gathering loops are assembled from reusable blocks for recovery, potions, buffs, barding, pet care and equipment handling.
A recipe chooses the blocks, their order and the settings for a particular character template.

This keeps common behavior in one place while each template keeps its own priorities.
A change to a shared block carries through to the loops that use it when they are rebuilt.
The result is a single `.razor` script that Razor can run as usual.

The [module design](content/public/scripting/modules.md) explains how the blocks and recipes fit together.

## Client profiles alongside the scripts

Razor and ClassicUO profiles keep hotkeys, agents, cooldown bars and character layouts alongside the routines they support.
They also hold personal selections such as containers, so shared scripts can refer to profile variables.

Keeping scripts and profiles in the same repository makes their relationship visible as bindings, equipment and templates change.
The [configuration guide](config/README.md) documents the profile layout and game connection.

## Mechanics and decisions kept in writing

The documentation records the game mechanics and design choices behind the scripts: skill interactions, recovery priorities, target handling and template tradeoffs.
Source links and dated in-game observations distinguish confirmed behavior from questions that still need checking.

The pages are grouped three ways: server rules by skill family (barding, necromancy, magery, archery, combat), one template page per character build, and one page per assembled loop.
It also keeps Razor-specific pitfalls and pending checks close to the code, so later changes can build on earlier findings.
The [documentation index](content/public/working/workflow.md#00.A) maps those topics to their reference pages.
