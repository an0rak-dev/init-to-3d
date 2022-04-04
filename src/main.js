const { JSDOM } = require("jsdom");

const fs = require("fs").promises;
const path = require("path");

const PROJECT_ROOT = path.dirname(__dirname);
const RESOURCES = path.join(PROJECT_ROOT, "resources");
const SLIDES = path.join(RESOURCES, "slides");
const REVEALJS_ROOT = "./node_modules/reveal.js";

const TITLE = "Initiation to 3D";

function createStylesheetLink(document, target) {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", target);
    document.head.appendChild(link);
}

function createScriptRef(document, target) {
    const script = document.createElement("script");
    script.setAttribute("src", target);
    document.body.appendChild(script);
}

async function main() {
    const templateRaw = await fs.readFile(path.join(RESOURCES, "template.html"), { encoding: "utf8" });
    const templateDom = new JSDOM(templateRaw);
    const document = templateDom.window.document;

    // Setup Head
    const title = document.createElement("title");
    title.innerHTML = TITLE;
    document.head.appendChild(title);

    createStylesheetLink(document, `${REVEALJS_ROOT}/dist/reset.css`);
    createStylesheetLink(document, `${REVEALJS_ROOT}/dist/reveal.css`);
    createStylesheetLink(document, `${REVEALJS_ROOT}/dist/theme/black.css`);
    createStylesheetLink(document, `${REVEALJS_ROOT}/plugin/highlight/monokai.css`);

    const slidesRoot = document.getElementById("deck");
    const slideContent = await fs.readFile(path.join(SLIDES, "test.md"));
    const section = document.createElement("section");
    section.setAttribute("data-markdown", "");
    section.setAttribute("data-separator-vertical", "\\n---");
    section.innerHTML = slideContent;
    slidesRoot.appendChild(section);

    // Add JS scripts
    createScriptRef(document, `${REVEALJS_ROOT}/dist/reveal.js`);
    createScriptRef(document, `${REVEALJS_ROOT}/plugin/notes/notes.js`);
    createScriptRef(document, `${REVEALJS_ROOT}/plugin/markdown/markdown.js`);
    createScriptRef(document, `${REVEALJS_ROOT}/plugin/highlight/highlight.js`);

    const revealInitScript = document.createElement("script");
    revealInitScript.innerHTML = `
        Reveal.initialize({
            hash: true,
            plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
        });
    `;
    document.body.appendChild(revealInitScript);

    fs.writeFile(path.join(PROJECT_ROOT, "index.html"), templateDom.serialize(), { encoding: "utf8" });
}

main();