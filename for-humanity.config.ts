import type {SiteConfig} from "for-humanity";

/**
 * UOO 문서 사이트 설정. 묶음 안의 순서는 문서 frontmatter의 order 기준
 */
export default {
    url: "https://nomeehej.github.io",
    basePath: "/uoo/",
    title: "UOO",
    description: "Ultima Online Outlands Razor 스크립트의 작업 방식, 스크립트 규칙, 게임 자료, 템플릿 설계와 확인할 것.",
    lang: "ko",
    port: 4323,
    navigation: ["How we work", "Scripting", "Game reference", "Mechanics", "Templates", "Loops", "Open questions"],
    status: [
        {phrase: "인게임 확인됨", kind: "verified", date: true},
        {phrase: "확인되지 않았다", kind: "unverified"},
    ],
} satisfies SiteConfig;
