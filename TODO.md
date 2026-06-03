# TODO: OG image generator

Current state: Opengrapher is a Deno CLI that renders `1200x630` PNG Open
Graph images with Takumi. It supports config files, runtime font fetching and
caching, graph-paper and blob backgrounds, card and terminal templates, and four
terminal frame styles.

## Open work

### Config surface

- [ ] Add `[backgroundOptions]` for blob and graph-paper tuning:
  - `seed`
  - `count`
  - `blur`
  - `opacity`
  - `palette`
  - `gridSize`
- [ ] Decide whether theme colors should be allowed to feed background palettes
      by default.
- [x] Add config examples that exercise blob backgrounds directly.

### Templates

- [ ] Consider a split card template for image/content layouts.
- [ ] Add a rough paper card only if the marker-style example needs a distinct
      template after more visual tests.
- [ ] Keep card and terminal templates as the stable default paths.

### Renderer and output

- [ ] Revisit SVG output only if Takumi exposes it or a second renderer path is
      worth the added complexity.
- [ ] Keep PNG as the supported output format for now.

### Blob backgrounds

Research notes, biased toward CSS-Tricks:

- CSS-Tricks “Blobs!” points to SVG paths as the common authoring route, with
  Blobmaker-style generated shapes as a practical starting point.
- CSS-Tricks “Shape Blobbing in CSS” uses CSS `blur()` plus high `contrast()`.
  That works for simple black/white blobs, but it needs an explicit background
  and does not handle transparency or multi-color content well.
- CSS-Tricks “The Gooey Effect” uses SVG filters: blur the source graphic with
  `feGaussianBlur`, raise alpha contrast with `feColorMatrix`, then blend or
  composite the original source back in.

Implementation direction:

- [x] Prefer SVG blob overlays over CSS filter blobs for Takumi output.
- [x] Use deterministic organic paths instead of plain rounded divs.
- [x] Use SVG filters for blur and gooey variants.
- [x] Add solid-color and duotone blob presets.
- [ ] Add user-facing blob options once the default presets have enough visual
      testing.

### Code snippet images

Potential future mode, once the OG generator is stable:

```sh
deno task og --template code \
  --code ./src/main.ts \
  --language ts \
  --highlight 8-14 \
  --terminal mac \
  --out dist/snippet.png
```

Possible features:

- source file, stdin, or inline code input
- Shiki syntax highlighting if Deno/npm support stays simple
- terminal frame reuse
- language, theme, line numbers, highlighted lines, filename, and prompt text
