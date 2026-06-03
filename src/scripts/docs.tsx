/** @jsxRuntime classic */
/** @jsx jsx */

import hljs from "highlight.js";
import { raw } from "hono/html";
import { jsx } from "hono/jsx";
import { Child } from "hono/jsx/dom";
import { renderToString } from "hono/jsx/dom/server";
import { marked } from "marked";

const title = "OpenGrapher";
const description = "Generate bespoke Open Graph PNGs from TSX templates.";

const fontFiles = [{
  path: "docs/assets/fonts/zalando-sans-latin-700-normal.woff2",
  url:
    "https://cdn.jsdelivr.net/npm/@fontsource/zalando-sans@5.2.2/files/zalando-sans-latin-700-normal.woff2",
}, {
  path: "docs/assets/fonts/zalando-sans-latin-800-normal.woff2",
  url:
    "https://cdn.jsdelivr.net/npm/@fontsource/zalando-sans@5.2.2/files/zalando-sans-latin-800-normal.woff2",
}, {
  path: "docs/assets/fonts/jetbrains-mono-latin-400-normal.woff2",
  url:
    "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.2.8/files/jetbrains-mono-latin-400-normal.woff2",
}, {
  path: "docs/assets/fonts/jetbrains-mono-latin-700-normal.woff2",
  url:
    "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.2.8/files/jetbrains-mono-latin-700-normal.woff2",
}];

marked.use({
  renderer: {
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
      const highlighted = hljs.highlight(text, { language }).value;

      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    },
  },
});

async function vendorFonts() {
  for (const font of fontFiles) {
    try {
      await Deno.stat(font.path);
      continue;
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
      }
    }

    const response = await fetch(font.url);

    if (!response.ok) {
      throw new Error(`Failed to download ${font.url}: ${response.status}`);
    }

    await Deno.writeFile(font.path, new Uint8Array(await response.arrayBuffer()));
  }
}

function Page({ content }: { content: string; }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <link rel="icon" href="./assets/favicon.svg" type="image/svg+xml" />
        <title>{title}</title>
        <style>{raw(css)}</style>
      </head>
      <body>
        <main class="site-shell">
          <article class="content">{raw(content)}</article>
          <footer class="site-footer">
            <a href="https://github.com/stormlightlabs/opengrapher">GitHub</a>
            <a href="https://desertthunder.dev">desertthunder.dev</a>
          </footer>
        </main>
      </body>
    </html>
  );
}

const css = `
@font-face {
  font-family: "Zalando Sans";
  src: url("./assets/fonts/zalando-sans-latin-700-normal.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Zalando Sans";
  src: url("./assets/fonts/zalando-sans-latin-800-normal.woff2") format("woff2");
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("./assets/fonts/jetbrains-mono-latin-400-normal.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("./assets/fonts/jetbrains-mono-latin-700-normal.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --bg: #111827;
  --text: #FCFBF8;
  --accent: #D5E27B;
  --muted: color-mix(in srgb, var(--text), transparent 28%);
  --soft: color-mix(in srgb, var(--text), transparent 82%);
  --line: color-mix(in srgb, var(--accent), transparent 72%);
}

* {
  box-sizing: border-box;
}

html {
  background: var(--bg);
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 16px;
  line-height: 1.7;
}

.site-shell {
  width: min(880px, calc(100% - 32px));
  margin: 0 auto;
  padding: 72px 0 88px;
}

.content > * {
  max-width: 760px;
}

.content h1,
.content h2,
.content h3 {
  font-family: "Zalando Sans", Inter, system-ui, sans-serif;
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.045em;
}

.content h1 {
  margin: 0 0 24px;
  max-width: 840px;
  color: var(--accent);
  font-size: clamp(3rem, 7vw, 5.5rem);
}

.content h2 {
  margin-top: 72px;
  color: var(--accent);
  font-size: clamp(2rem, 5vw, 3.8rem);
}

.content h3 {
  margin-top: 36px;
  font-size: 1.45rem;
}

.content p,
.content li {
  color: var(--muted);
}

.content strong {
  color: var(--text);
}

.content a {
  color: var(--accent);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.content ul,
.content ol {
  padding-left: 1.25rem;
}

.content li + li {
  margin-top: 0.45rem;
}

.content pre {
  max-width: 100%;
  overflow-x: auto;
  margin: 28px 0;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgb(0 0 0 / 0.28);
  box-shadow: 0 20px 70px rgb(0 0 0 / 0.18);
}

.content code {
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.92em;
}

.content :not(pre) > code {
  padding: 0.14em 0.34em;
  border: 1px solid var(--soft);
  border-radius: 6px;
  color: var(--text);
  background: rgb(255 255 255 / 0.06);
}

.content blockquote {
  margin: 32px 0;
  padding-left: 20px;
  border-left: 3px solid var(--accent);
}

.content img {
  display: block;
  width: 100%;
  height: auto;
  margin: 24px 0;
  border: 1px solid var(--soft);
  border-radius: 18px;
}

.content table {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}

.content th,
.content td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--soft);
  text-align: left;
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  margin-top: 72px;
  padding-top: 24px;
  border-top: 1px solid var(--soft);
  color: var(--muted);
  font-size: 0.9rem;
}

.site-footer a {
  color: var(--accent);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

.hljs-keyword,
.hljs-title,
.hljs-selector-tag,
.hljs-built_in {
  color: var(--accent);
}

.hljs-string,
.hljs-attr,
.hljs-number,
.hljs-literal {
  color: var(--text);
}

.hljs-comment {
  color: color-mix(in srgb, var(--text), transparent 52%);
}
`;

await Deno.mkdir("docs", { recursive: true });
await Deno.mkdir("docs/assets/fonts", { recursive: true });
await vendorFonts();

const markdown = await Deno.readTextFile("docs/index.md");
const content = marked.parse(markdown, { async: false });
const html = "<!doctype html>\n<!-- generated via docs.tsx -->\n"
  + renderToString(<Page content={content} /> as Child);

await Deno.writeTextFile("docs/index.html", html);
console.log("Generated docs/index.html");
