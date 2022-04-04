const Deck = require("./deck");

const fs = require("fs").promises;
const path = require("path");

const PROJECT_ROOT = path.dirname(__dirname);
const RESOURCES = path.join(PROJECT_ROOT, "resources");
const SLIDES = path.join(RESOURCES, "slides");
const REVEALJS_ROOT = "./node_modules/reveal.js";

const TITLE = "Initiation to 3D";

async function main() {
    const slideDeck = new Deck(TITLE, REVEALJS_ROOT);
    slideDeck.useTheme("black");

    slideDeck.addStylesheet(`${REVEALJS_ROOT}/plugin/highlight/monokai.css`);
    
    const slideContent = await fs.readFile(path.join(SLIDES, "test.md"));
    slideDeck.addSection(slideContent);

    slideDeck.addPlugin("RevealNotes", `${REVEALJS_ROOT}/plugin/notes/notes.js`);
    slideDeck.addPlugin("RevealMarkdown", `${REVEALJS_ROOT}/plugin/markdown/markdown.js`);
    slideDeck.addPlugin("RevealHighlight", `${REVEALJS_ROOT}/plugin/highlight/highlight.js`);

    fs.writeFile(path.join(PROJECT_ROOT, "index.html"), slideDeck.export(), { encoding: "utf8" });
}

main();