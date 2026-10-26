// Executes the actual module branches against a small deterministic Razor subset.
// This checks decisions and command traces, not Razor scope, packets or game effects.
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";

const readModule = (name) => {
    try {
        return readFileSync(new URL("../module/fight/" + name + ".razor", import.meta.url), "utf8");
    } catch (error) {
        if (error.code === "ENOENT") return "";
        throw error;
    }
};
const tokens = (line) => line.match(/"[^"]*"|'[^']*'|\S+/g) ?? [];
const unquote = (value) => value?.replace(/^["']|["']$/g, "");
const compare = (left, op, right) => {
    if (op === "=") return left === right;
    if (op === "!=") return left !== right;
    if (op === ">=") return left >= right;
    if (op === "<=") return left <= right;
    if (op === ">") return left > right;
    if (op === "<") return left < right;
    if (op === "in") return String(right).includes(String(left));
    throw new Error("Unsupported comparison: " + op);
};

function parse(lines, start = 0, stops = []) {
    const nodes = [];
    let i = start;
    while (i < lines.length && !stops.includes(tokens(lines[i])[0])) {
        const [command] = tokens(lines[i]);
        if (command === "if") {
            const branches = [];
            let condition = lines[i].slice(3);
            for (;;) {
                const body = parse(lines, i + 1, ["elseif", "else", "endif"]);
                branches.push({condition, nodes: body.nodes});
                i = body.end;
                assert.ok(i < lines.length, "Unclosed if");
                if (lines[i] === "endif") break;
                condition = lines[i] === "else" ? null : lines[i].slice(7);
            }
            nodes.push({branches});
        } else if (command === "foreach") {
            const [, variable, , list] = tokens(lines[i]);
            const body = parse(lines, i + 1, ["endfor"]);
            assert.equal(lines[body.end], "endfor");
            nodes.push({variable, list, nodes: body.nodes});
            i = body.end;
        } else {
            nodes.push({line: lines[i]});
        }
        i++;
    }
    return {nodes, end: i};
}

class ModuleRun {
    constructor(name, overrides = {}) {
        const source = readModule(name);
        assert.ok(source.includes("# @ loop"), name + " module must exist");
        this.now = 0;
        this.vars = new Map(Object.entries({
            config__chatty: 0, config__sysmsg: 0, wait__short: 0,
            var__combat_target: 101, var__fighting: 1, config__acquire_range: 18,
            config__ability_weapon_graphic: 0,
        }));
        this.timers = new Map([["timer__message", -10000]]);
        this.lists = new Map([["list__provo_candidates", []]]);
        this.events = [];
        this.diffhits = 0;
        this.flags = {};
        this.mobs = new Map([[101, {range: 1, dead: false}]]);
        this.items = new Map([
            [11891, {serial: 201, source: "backpack", label: "Monkey, Chi Thrust"}],
            [11889, {serial: 202, source: "backpack", label: "Testudo, Last Stand"}],
            [22187, {serial: 203, source: "self", label: "Martial Arts Scroll"}],
        ]);
        const sections = new Map();
        let section = null;
        for (const raw of source.split(/\r?\n/)) {
            const line = raw.trim();
            const marker = /^# @ (config|wait|timer|state|setup|loop)$/.exec(line);
            if (marker) {
                section = marker[1];
                sections.set(section, []);
            } else if (section && line && !line.startsWith("#")) {
                sections.get(section).push(line);
            }
        }
        for (const name of ["config", "wait"]) this.execute(parse(sections.get(name) ?? []).nodes);
        for (const [key, value] of Object.entries(overrides)) this.vars.set(key, value);
        for (const line of sections.get("timer") ?? []) {
            const [name, value] = tokens(line);
            this.timers.set(name, this.now - this.value(value));
        }
        this.execute(parse(sections.get("state") ?? []).nodes);
        this.execute(parse(sections.get("setup") ?? []).nodes);
        this.loop = parse(sections.get("loop")).nodes;
    }

    value(token) {
        if (/^["']/.test(token)) return unquote(token);
        if (/^-?\d+$/.test(token)) return Number(token);
        if (this.vars.has(token)) return this.vars.get(token);
        if (["self", "backpack", "ground"].includes(token)) return token;
        throw new Error("Unknown value: " + token);
    }

    condition(line) {
        const input = tokens(line);
        let at = 0;
        const atom = () => {
            const word = input[at++];
            if (word === "not") {
                const inner = atom();
                return () => !inner();
            }
            let get;
            if (word === "timer") {
                const name = unquote(input[at++]);
                get = () => this.now - this.timers.get(name);
            } else if (word === "list") {
                const name = unquote(input[at++]);
                get = () => this.lists.get(name).length;
            } else if (word === "listexists" || word === "varexist") {
                const name = unquote(input[at++]);
                get = () => (word === "listexists" ? this.lists : this.vars).has(name);
            } else if (word === "inlist") {
                const name = unquote(input[at++]);
                const value = input[at++];
                get = () => this.lists.get(name).includes(this.value(value));
            } else if (word === "find" || word === "findtype") {
                const args = [];
                while (at < input.length && !["and", "or", "as"].includes(input[at])) args.push(input[at++]);
                let alias;
                if (input[at] === "as") { at++; alias = input[at++]; }
                get = () => {
                    const object = word === "find"
                        ? this.mobs.get(this.value(args[0]))
                        : this.items.get(this.value(args[0]));
                    const found = object && (word === "find"
                        ? object.range <= this.value(args[4] ?? "18")
                        : object.source === unquote(args[1]));
                    if (found && alias) this.vars.set(alias, word === "find" ? this.value(args[0]) : object.serial);
                    return Boolean(found);
                };
            } else if (word === "dead") {
                const serial = input[at++];
                get = () => this.mobs.get(this.value(serial))?.dead ?? false;
            } else if (word === "findbuff") {
                const buff = unquote(input[at++]);
                get = () => Boolean(this.flags[buff]);
            } else if (word === "diffhits") {
                get = () => this.diffhits;
            } else if (["hidden", "queued", "casting", "targetexists", "poisoned"].includes(word)) {
                get = () => Boolean(this.flags[word]);
            } else {
                get = () => this.value(word);
            }
            if (["=", "!=", ">=", "<=", ">", "<", "in"].includes(input[at])) {
                const op = input[at++];
                const right = input[at++];
                const left = get;
                get = () => compare(left(), op, this.value(right));
            }
            return get;
        };
        const conjunction = () => {
            let left = atom();
            while (input[at] === "and") {
                at++;
                const a = left, b = atom();
                left = () => a() && b();
            }
            return left;
        };
        let left = conjunction();
        while (input[at] === "or") {
            at++;
            const a = left, b = conjunction();
            left = () => a() || b();
        }
        assert.equal(at, input.length, "Unparsed expression: " + line);
        return Boolean(left());
    }

    execute(nodes) {
        for (const node of nodes) {
            if (node.branches) {
                const branch = node.branches.find(({condition}) => condition === null || this.condition(condition));
                if (branch) this.execute(branch.nodes);
            } else if (node.variable) {
                for (const item of [...this.lists.get(node.list)]) {
                    this.vars.set(node.variable, item);
                    this.execute(node.nodes);
                }
            } else {
                const [command, ...args] = tokens(node.line);
                if (command === "@setvar!" || command === "setvar!") {
                    this.vars.set(args[0], this.value(args[1]));
                } else if (command === "@unsetvar!") {
                    this.vars.delete(args[0]);
                } else if (command === "settimer") {
                    this.timers.set(unquote(args[0]), this.now - this.value(args[1]));
                } else if (command === "createlist" || command === "clearlist") {
                    this.lists.set(unquote(args[0]), []);
                } else if (command === "pushlist") {
                    this.lists.get(unquote(args[0])).push(this.value(args[1]));
                } else if (command === "getlabel") {
                    const item = [...this.items.values()].find((item) => item.serial === this.value(args[0]));
                    if (item?.label !== undefined) this.vars.set(args[1], item.label);
                } else if (command === "say" || command === "overhead" || command === "sysmsg") {
                    const value = unquote(args[0]);
                    this.events.push({at: this.now, command, value});
                    if (command === "say" && !this.flags.rejectCommands) {
                        const match = /^\[(Wrestling|Shields)(Stance|Finisher)([1-5])$/.exec(value);
                        if (match) {
                            const [, family, kind, slot] = match;
                            const names = family === "Wrestling"
                                ? {Stance: ["Dragon", "Crab", "Spider", "Monkey", "Crane"], Finisher: ["Chi Thrust", "Zen Strike"]}
                                : {Stance: ["Shield Bash", "Warding", "Testudo", "Mirror", "Bulwark"], Finisher: ["Last Stand", "Barrier"]};
                            const item = this.items.get(family === "Wrestling" ? 11891 : 11889);
                            const selected = names[kind][Number(slot) - 1];
                            assert.ok(selected, "Unknown codex slot " + value);
                            const other = kind === "Stance" ? "Finisher" : "Stance";
                            const retained = names[other].filter((name) => item.label.includes(name));
                            item.label = [...retained, item.label.includes(selected) ? "None" : selected].join(", ");
                        }
                    }
                } else if (command !== "wait") {
                    throw new Error("Unsupported command: " + node.line);
                }
            }
        }
    }

    pass(ms = 0) { this.now += ms; this.execute(this.loop); return this; }
    said() { return this.events.filter(({command}) => command === "say").map(({value}) => value); }
}

test("single target holds Monkey and Chi Thrust without repeating toggle commands", () => {
    const run = new ModuleRun("wrestling-codex");
    run.pass().pass(3100).pass(31000);
    assert.deepEqual(run.said(), []);
});

test("Crab bypasses both a recent stance request and its retry interval", () => {
    const run = new ModuleRun("wrestling-codex");
    run.items.get(11891).label = "Dragon, Chi Thrust";
    run.pass();
    run.diffhits = 45;
    run.pass(100);
    assert.deepEqual(run.said(), ["[WrestlingStance4", "[WrestlingStance2"]);
});

test("rejected wrestling stance requests are rechecked before the long cache refresh", () => {
    const run = new ModuleRun("wrestling-codex");
    run.items.get(11891).label = "Dragon, Chi Thrust";
    run.flags.rejectCommands = true;
    run.pass().pass(3100);
    assert.deepEqual(run.said(), ["[WrestlingStance4", "[WrestlingStance4"]);
});

test("emergency Crab overrides minimum hold and waits for continuous recovery", () => {
    const run = new ModuleRun("wrestling-codex");
    run.pass();
    run.diffhits = 45;
    run.pass(100);
    assert.deepEqual(run.said(), ["[WrestlingStance2"]);
    run.diffhits = 30;
    run.pass(3000).pass(4000);
    assert.deepEqual(run.said(), ["[WrestlingStance2"]);
    run.diffhits = 31;
    run.pass(100);
    run.diffhits = 30;
    run.pass(100).pass(4900);
    assert.deepEqual(run.said(), ["[WrestlingStance2"]);
    run.pass(1100);
    assert.deepEqual(run.said(), ["[WrestlingStance2", "[WrestlingStance4"]);
});

test("Spider needs the current target and a distinct live registered enemy within one tile", () => {
    const run = new ModuleRun("wrestling-codex");
    run.lists.set("list__provo_candidates", [101, 102, 103]);
    run.mobs.set(102, {range: 8, dead: false});
    run.mobs.set(103, {range: 1, dead: true});
    run.pass();
    assert.deepEqual(run.said(), []);
    run.mobs.get(102).range = 1;
    run.pass(2100);
    assert.deepEqual(run.said(), []);
    run.pass(1100);
    assert.deepEqual(run.said(), ["[WrestlingStance3"]);
    run.mobs.get(102).range = 8;
    run.pass(2100).pass(4000);
    assert.deepEqual(run.said(), ["[WrestlingStance3"]);
    run.pass(2100);
    assert.deepEqual(run.said(), ["[WrestlingStance3"]);
    run.pass(1100);
    assert.deepEqual(run.said(), ["[WrestlingStance3", "[WrestlingStance4"]);
});

test("nearby candidates do not replace an out of reach primary target", () => {
    const run = new ModuleRun("wrestling-codex");
    run.mobs.get(101).range = 8;
    run.lists.set("list__provo_candidates", [102, 103]);
    run.mobs.set(102, {range: 1, dead: false});
    run.mobs.set(103, {range: 1, dead: false});
    run.pass();
    assert.deepEqual(run.said(), []);
});

test("ambiguous wrestling stance labels disable only stance switching", () => {
    const run = new ModuleRun("wrestling-codex");
    run.items.get(11891).label = "Dragon, Monkey, Zen Strike";
    run.diffhits = 50;
    run.pass().pass(3100);
    assert.deepEqual(run.said(), ["[WrestlingFinisher1"]);
    assert.equal(run.vars.get("var__wrestling_disabled"), 1);
});

test("transient missing label retries and no manual cursor is consumed", () => {
    const run = new ModuleRun("wrestling-codex");
    delete run.items.get(11891).label;
    run.pass();
    assert.equal(run.vars.get("var__wrestling_disabled"), 0);
    run.items.get(11891).label = "Dragon, Zen Strike";
    run.flags.targetexists = true;
    run.pass(3100);
    assert.deepEqual(run.said(), []);
    run.flags.targetexists = false;
    run.pass(3100);
    assert.deepEqual(run.said(), ["[WrestlingFinisher1", "[WrestlingStance4"]);
});

test("Brawl is requested only with the configured weapon equipped and an enemy in reach", () => {
    const run = new ModuleRun("weapon-ability", {
        config__ability_codex: 3, config__ability_main: 1,
        config__ability_range: 1, config__ability_weapon_graphic: 22187,
    });
    run.items.get(22187).source = "backpack";
    run.pass();
    assert.deepEqual(run.said(), []);
    run.items.get(22187).source = "self";
    run.flags.casting = true;
    run.pass();
    assert.deepEqual(run.said(), []);
    run.flags.casting = false;
    run.pass().pass(59000).pass(1000);
    assert.deepEqual(run.said(), ["[WeaponAbility1", "[WeaponAbility1"]);
});

test("default archery ability remains Repeater", () => {
    const run = new ModuleRun("weapon-ability", {
        config__ability_codex: 2, config__ability_main: 3, config__ability_range: 8,
    });
    run.mobs.get(101).range = 8;
    run.pass();
    assert.deepEqual(run.said(), ["[WeaponAbility3"]);
});

test("ambiguous parry stance and finisher labels never send toggle commands", () => {
    const run = new ModuleRun("parry-codex", {config__parry_stance_main: 3});
    run.items.get(11889).label = "Warding, Mirror, Last Stand, Barrier";
    run.pass(1);
    assert.deepEqual(run.said(), []);
    assert.equal(run.vars.get("var__parry_disabled"), 1);
});

test("parry transient label failure retries instead of disabling protection", () => {
    const run = new ModuleRun("parry-codex", {config__parry_stance_main: 3});
    delete run.items.get(11889).label;
    run.pass(1);
    assert.equal(run.vars.get("var__parry_disabled"), 0);
    run.items.get(11889).label = "Bulwark, Last Stand";
    run.pass(3100);
    assert.deepEqual(run.said(), ["[ShieldsStance3"]);
});

test("rejected parry stance requests are rechecked before the long cache refresh", () => {
    const run = new ModuleRun("parry-codex", {config__parry_stance_main: 3});
    run.items.get(11889).label = "Bulwark, Last Stand";
    run.flags.rejectCommands = true;
    run.pass(1).pass(3100);
    assert.deepEqual(run.said(), ["[ShieldsStance3", "[ShieldsStance3"]);
});

test("new melee recipe puts recovery before codex decisions and codices before bard casts", () => {
    const source = readFileSync(new URL("../recipe/bard-wrestling-enhanced-recipe.razor", import.meta.url), "utf8").replace(/\r\n/g, "\n");
    assert.ok(source.indexOf("# @ use recovery/heal") < source.indexOf("# @ use fight/wrestling-codex"));
    assert.ok(source.indexOf("# @ use fight/wrestling-codex") < source.indexOf("# @ use bard/provo\n"));
    assert.ok(source.indexOf("# @ use fight/parry-codex") < source.indexOf("# @ use bard/provo\n"));
});


test("parry stance and finisher converge under actual toggle semantics", () => {
    const run = new ModuleRun("parry-codex", {config__parry_stance_main: 3});
    run.items.get(11889).label = "Bulwark, Barrier";
    run.pass(1).pass(3100).pass(31000);
    assert.deepEqual(run.said(), ["[ShieldsFinisher1", "[ShieldsStance3"]);
    assert.ok(run.items.get(11889).label.includes("Testudo"));
    assert.ok(run.items.get(11889).label.includes("Last Stand"));
});
