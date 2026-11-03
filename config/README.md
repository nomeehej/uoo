# config/

**English** · [한국어](../language/config.ko.md)

Razor and ClassicUO settings, one folder per player. `util/setup.sh` links the game to this folder
so the client reads and writes the repo directly. Nothing is copied or synced.

## What gets linked

```
Ultima Online Outlands/ClassicUO/
  settings.json                          never linked: holds your login
  Data/Plugins/Assistant/                Razor
    Scripts/     =>  uoo/script/                          shared
    Profiles/    =>  uoo/config/<name>/razor/profiles/    yours, one .xml per Razor profile
  Data/Profiles/<Account>/Outlands/
    CharA/       =>  uoo/config/<name>/classicuo/CharA/   yours, one folder per character
```

Other players' changes reach your machine only when you `git pull`; yours reach them only when
you `git push`.

## Run it

```sh
util/setup.sh                    # <name> = first part of your git email: jane.doe@example.com -> config/jane/
util/setup.sh <name>             # or pick the name yourself
util/setup.sh [<name>] /path/to/ClassicUO/Data/Plugins/Assistant   # if it is not under ~/Applications
util/setup.sh --undo             # back to plain folders
```

On macOS (Sikarugir) it finds the `Data/Plugins/Assistant` folder inside the wrapper, moves your
Razor profiles and character folders into `config/<name>/` and leaves links behind. Outlands builds
Razor into `ClassicUO.exe`, so there is no `Razor.exe`; the folder is what the script looks for.

- **It asks one thing.** If `config/<name>/` already has files (second machine, a renamed folder,
  or someone else's name) it asks before pointing the game at them.
- **It never destroys.** Empty folders, and a `Scripts` folder holding only files the repo already
  has, are dropped. Anything else stays as `Scripts-bak`, `Profiles-bak`, `<Char>-bak` next to the
  original. Delete those when you are sure.
- **Re-run any time.** Linked folders are skipped; a new character gets linked.
- **`--undo`** puts real folders back, filled with copies of what the links pointed to. The repo
  keeps every file.
- **Rename:** `git mv config/<old> config/<new>`, then `util/setup.sh <new>`. It asks once and relinks.

On Windows use directory junctions from an elevated PowerShell:

```powershell
$ASSIST = "C:\Program Files (x86)\Ultima Online Outlands\ClassicUO\Data\Plugins\Assistant"
Rename-Item "$ASSIST\Scripts" Scripts-bak
cmd /c mklink /J "$ASSIST\Scripts" "C:\src\uoo\script"
# same for $ASSIST\Profiles and ClassicUO\Data\Profiles\<Account>\<Server>\<Char>
```

## Day to day

- **In-game → repo.** Razor writes profile XML when it closes, ClassicUO writes character files on
  logout, a script saved in Razor's editor changes on the spot. Run `git status`, commit what you
  want to keep.
- **Repo → game.** Apply edited or pulled scripts with the [script cache procedure](../content/public/working/workflow.md#04.A),
  which distinguishes Scripts-tab Play from hotkey execution. Profile XML is loaded at startup and
  overwritten on exit, so edit or pull profiles **while the game is closed**.
- **Characters.** Razor profiles are not per character; pick one per character in the Profile tab
  and Razor remembers it in `chars.lst`. ClassicUO settings are per character already.
- **Several clients, second machine.** Clients share the one install and the same links; nothing
  changes. On another machine run the same command with the same name and answer `y`.

## Sharing

Only collaborators can push. Everyone else clones or forks, runs `setup.sh` against their own copy
if they like, and sends a pull request. `setup.sh` touches only the machine it runs on.

`script/` is shared, `config/<name>/` is per player, so nothing collides and you can still read how
someone else set up their hotkeys or organizer. Serials in a profile only mean something on the
owner's account.

| File                                                                                                                 | Holds                                                                                                                           | Tracked               |
|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| `razor/profiles/<profile>.xml`                                                                                       | hotkeys, agents (organizer / restock / dress lists, container serials), filters, cooldown bars, script variables, window layout | yes                   |
| `razor/profiles/chars.lst`                                                                                           | which profile each character used last                                                                                          | yes                   |
| `classicuo/<Char>/macros.xml`, `skillsgroups.xml`, `infobar.xml`, `journal.xml`, `nameoverhead.xml`, `cooldowns.xml` | client macros, skill groups, info bar, journal tabs, name plates, cooldown bars                                                 | yes                   |
| `classicuo/<Char>/profile.json`                                                                                      | client options, changes every session                                                                                           | yes, noisy            |
| `classicuo/<Char>/*.gumps.xml`, `gumpmanager.xml`                                                                    | window positions, one file per monitor layout                                                                                   | yes, noisy            |
| `classicuo/<Char>/backup_*/`, `staggered_*/`                                                                         | ClassicUO's own profile snapshots; git already keeps history                                                                    | ignored               |
| `ClassicUO/settings.json`                                                                                            | resolution, fps, **username / password**                                                                                        | ignored, never linked |
