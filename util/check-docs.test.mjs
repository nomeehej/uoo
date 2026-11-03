// Tests for util/check-docs.mjs: node --test util/check-docs.test.mjs
import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {test} from "node:test";
import {fileURLToPath} from "node:url";

const checker = fileURLToPath(new URL("./check-docs.mjs", import.meta.url));

/**
 * Runs the checker on a one-page site and one Markdown source, both written to a temp folder.
 */
const runCheck = ({html = "<h2 id=\"real\">Heading</h2>", markdown = "## Plain heading\n"} = {}) => {
    const directory = mkdtempSync(join(tmpdir(), "uoo-check-docs-"));

    try {
        mkdirSync(join(directory, "site"));
        mkdirSync(join(directory, "docs"));
        writeFileSync(join(directory, "site", "index.html"), html);
        writeFileSync(join(directory, "docs", "page.md"), markdown);

        return spawnSync(process.execPath, [checker, join(directory, "site"), join(directory, "docs")], {encoding: "utf8"});
    } finally {
        rmSync(directory, {recursive: true, force: true});
    }
};

test("passes a site whose links and anchors all exist", () => {
    const result = runCheck({html: "<h2 id=\"real\">Heading</h2><a href=\"#real\">Heading</a><a href=\"/\">Home</a>"});

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /2 local references/);
});

test("checks a project site's links and anchors under its canonical base path", () => {
    const result = runCheck({html: '<link rel="canonical" href="https://example.github.io/uoo/"><h2 id="real">Heading</h2><a href="/uoo/">Home</a><a href="#real">Heading</a>'});

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /2 local references/);
});

test("rejects a project link that escapes the site's deployment path", () => {
    const result = runCheck({html: '<link rel="canonical" href="https://example.github.io/uoo/"><a href="/">Wrong home</a>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /outside the site deployment path/);
});

test("ignores markup inside scripts, styles and comments", () => {
    const result = runCheck({
        html: `<script>const s = '<a href="missing/">'</script><style>a::after { content: '<a href="missing/">' }</style>
            <!-- <a href="missing/"> --><h2 id="real">Heading</h2><a href="#real">Heading</a>`,
    });

    assert.equal(result.status, 0, result.stderr);
});

test("rejects a link to a missing page and a missing anchor", () => {
    const result = runCheck({html: "<a href=\"/missing/\">Page</a><a href=\"#missing\">Anchor</a>"});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /\/missing\/ -- no such page or file/);
    assert.match(result.stderr, /#missing -- no such anchor/);
});

test("rejects a repeated id", () => {
    const result = runCheck({html: "<h2 id=\"twice\">First</h2><h2 id=\"twice\">Second</h2>"});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /"twice" appears more than once/);
});

test("passes numbered headings whose anchors match their numbers", () => {
    const result = runCheck({markdown: "## <a id=\"04\"></a>04 Game\n\n### <a id=\"04.C\"></a>04.C Config\n\n#### Small\n"});

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /2 numbered headings/);
});

test("rejects a numbered heading without its anchor, or with another number", () => {
    const result = runCheck({markdown: "## 04 Game\n\n### <a id=\"04.B\"></a>04.C Config\n"});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /page\.md:1: the numbered heading "04" has no <a id="04"><\/a>/);
    assert.match(result.stderr, /page\.md:3: the anchor "04\.B" does not match the heading number "04\.C"/);
});

test("skips headings inside code blocks", () => {
    const result = runCheck({markdown: "```markdown\n## 01 {절}\n```\n"});

    assert.equal(result.status, 0, result.stderr);
});

test("rejects a section number in the link label that differs from its target", () => {
    const result = runCheck({html: '<h2 id="01">First</h2><a href="#01">02절의 무기</a>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /link label names section "02" but targets "01"/);
});

test("checks section numbers inside nested link markup", () => {
    const result = runCheck({html: '<h3 id="04.C">Config</h3><a href="#04.C"><strong>04.B절</strong></a>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /link label names section "04\.B" but targets "04\.C"/);
});

test("rejects a section number after the link that differs from its target", () => {
    const result = runCheck({html: '<h2 id="01">First</h2><p><a href="#01">Melee</a> 02절 표</p>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /following text names section "02" but targets "01"/);
});

test("checks the label and following text independently", () => {
    const result = runCheck({html: '<h3 id="04.C">Config</h3><p><a href="#04.C">04.B절</a> 04.A절</p>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /link label names section "04\.B" but targets "04\.C"/);
    assert.match(result.stderr, /following text names section "04\.A" but targets "04\.C"/);
});

test("passes matching section labels and following text", () => {
    const result = runCheck({html: '<h3 id="04.C">Config</h3><p><a href="#04.C"><strong>04.C절</strong></a> 04.C절</p>'});

    assert.equal(result.status, 0, result.stderr);
});

test("does not treat a label's section range as one section number", () => {
    const result = runCheck({html: '<h2 id="01">First</h2><a href="#01">01~03절</a>'});

    assert.equal(result.status, 0, result.stderr);
});

test("does not check section text for external links or nonnumeric anchors", () => {
    const result = runCheck({html: '<h2 id="real">Heading</h2><a href="#real">03절</a><a href="https://example.com/#01">02절</a>'});

    assert.equal(result.status, 0, result.stderr);
});

test("rejects numeric-only section labels that differ from their targets", () => {
    const result = runCheck({html: '<h2 id="01">First</h2><h3 id="04.C">Config</h3><a href="#01">02</a><a href="#04.C"><strong>04.B</strong></a>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /link label names section "02" but targets "01"/);
    assert.match(result.stderr, /link label names section "04\.B" but targets "04\.C"/);
});

test("passes matching numeric-only section labels", () => {
    const result = runCheck({html: '<h2 id="01">First</h2><h3 id="04.C">Config</h3><a href="#01">01</a><a href="#04.C"><strong>04.C</strong></a>'});

    assert.equal(result.status, 0, result.stderr);
});

test("rejects a mismatched section immediately after a link inside inline markup", () => {
    const result = runCheck({html: '<h2 id="01">First</h2><p><a href="#01">First</a> <strong><em>02절</em></strong> 표</p>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /following text names section "02" but targets "01"/);
});

test("reads a matching following section across adjacent inline nodes", () => {
    const result = runCheck({html: '<h3 id="04.C">Config</h3><p><a href="#04.C">Config</a> <strong>04.</strong><em>C절</em> 표</p>'});

    assert.equal(result.status, 0, result.stderr);
});

test("does not read following section text from another link or a later block", () => {
    const result = runCheck({html: `<h2 id="01">First</h2><h2 id="02">Second</h2>
        <p><a href="#01">First</a> <a href="#02"><strong>02절</strong></a></p>
        <p><a href="#01">First</a> <strong><a href="#02">02절</a></strong></p>
        <a href="#01">First</a><p>02절 in another paragraph</p>`});

    assert.equal(result.status, 0, result.stderr);
});

test("checks absolute and scheme-relative links on the canonical origin", () => {
    const result = runCheck({html: `<link rel="canonical" href="https://example.github.io/uoo/">
        <h2 id="real">Heading</h2><a href="https://example.github.io/uoo/#real">Heading</a><a href="//example.github.io/uoo/">Home</a>`});

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /2 local references/);
});

test("rejects missing pages and anchors in absolute internal URLs", () => {
    const result = runCheck({html: `<link rel="canonical" href="https://example.github.io/uoo/">
        <a href="https://example.github.io/uoo/missing/">Page</a><a href="//example.github.io/uoo/#missing">Anchor</a>`});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /https:\/\/example\.github\.io\/uoo\/missing\/ -- no such page or file/);
    assert.match(result.stderr, /\/\/example\.github\.io\/uoo\/#missing -- no such anchor/);
});

test("rejects absolute internal links outside the deployment path", () => {
    const result = runCheck({html: '<link rel="canonical" href="https://example.github.io/uoo/"><a href="https://example.github.io/">Wrong home</a>'});

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /outside the site deployment path/);
});

test("leaves other origins and non-HTTP schemes unchecked", () => {
    const result = runCheck({html: `<link rel="canonical" href="https://example.github.io/uoo/">
        <a href="https://external.github.io/uoo/missing/">Other site</a><a href="//cdn.example.com/missing/">CDN</a>
        <a href="mailto:user@example.com">Email</a><img src="data:image/png;base64,AA==">`});

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /0 local references/);
});
