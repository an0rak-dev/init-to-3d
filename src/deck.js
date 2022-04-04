const { JSDOM } = require("jsdom");

module.exports = class Deck {
    constructor(title, revealJsRoot) {
        this.plugins = {};
        this.revealJsRoot = revealJsRoot;
        this.jsdom = new JSDOM("<!doctype html><html></html>");
        this.document = this.jsdom.window.document;

        const titleTag = this.document.createElement("title");
        titleTag.innerHTML = title;
        this.document.head.appendChild(titleTag);

        const encodingTag = this.document.createElement("meta");
        encodingTag.setAttribute("charset", "utf-8");
        this.document.head.appendChild(encodingTag);

        const viewportTag = this.document.createElement("meta");
        viewportTag.setAttribute("name", "viewport");
        viewportTag.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
        this.document.head.appendChild(viewportTag);

        
        this.addStylesheet(`${this.revealJsRoot}/dist/reset.css`);
        this.addStylesheet(`${this.revealJsRoot}/dist/reveal.css`);

        
        const revealDiv = this.document.createElement("div");
        revealDiv.setAttribute("class", "reveal");
        const deckDiv = this.document.createElement("div");
        deckDiv.setAttribute("id", "deck");
        deckDiv.setAttribute("class", "slides");
        revealDiv.appendChild(deckDiv);
        this.document.body.appendChild(revealDiv);

        this.addScriptRef(`${this.revealJsRoot}/dist/reveal.js`);
    }

    addStylesheet(link) {
        const linkTag = this.document.createElement("link");
        linkTag.setAttribute("rel", "stylesheet");
        linkTag.setAttribute("href", link);
        this.document.head.appendChild(linkTag);
    }

    useTheme(themeName) {
        this.addStylesheet(`${this.revealJsRoot}/dist/theme/${themeName}.css`);
    }

    addSection(content) {
        const slidesRoot = this.document.getElementById("deck");
        const section = this.document.createElement("section");
        section.setAttribute("data-markdown", "");
        section.setAttribute("data-separator-vertical", "\\n---");
        section.innerHTML = content;
        slidesRoot.appendChild(section);
    }

    addPlugin(pluginName, pluginPath) {
        this.plugins[pluginName] = pluginPath;
    }
    
    addScriptRef(scriptPath) {
        const script = this.document.createElement("script");
        script.setAttribute("src", scriptPath);
        this.document.body.appendChild(script);
    }

    export() {
        let pluginInit = "";
        for (const [pluginName, pluginPath] of Object.entries(this.plugins)) {
            this.addScriptRef(pluginPath);
            pluginInit = `${pluginInit}, ${pluginName}`;
        }
        pluginInit = pluginInit.substring(1); // Remove trailing ","

        const script = this.document.createElement("script");
        script.innerHTML = `
            Reveal.initialize({
                hash: true,
                plugins: [ ${pluginInit} ]
            });
        `;
        this.document.body.appendChild(script);
        return this.jsdom.serialize();
    }
}