# TODO: OG image generator

Build a developer-friendly tool for generating bespoke Open Graph images for
Astro projects and standalone repos. The tool should run well from Deno, but the
main priority is authoring experience: good presets, clear config, reusable
components, and helpful errors.

## Renderer choice

Use **Satori + Resvg** as the first implementation.

Why:

- Satori is a JS/TS package and is easier to run in Deno via npm imports.
- The output is SVG, which can be rasterized with `@resvg/resvg-js`.
- It has a mature ecosystem around React-like JSX OG image templates.
- It is already common in Astro/Next OG-image workflows.

Takumi-rs may still be worth tracking, but it is Rust-first. Unless its Deno
story is a clean npm/WASM package with font loading and image export support,
Satori will likely be simpler to ship and maintain in this project.

## Goals

- Generate `1200x630` OG images from a simple CLI.
- Support reusable templates, font presets, and config files.
- Fetch and cache fonts at runtime.
- Provide typography triads: heading, sans, mono.
- Provide terminal/window frame styles.
- Support patterned backgrounds, including Hero Patterns graph paper.
- Keep the tool easy to use from Astro projects and one-off scripts.

## Source structure

Optimize the source around the public authoring concepts: render, templates,
presets, fonts, backgrounds, and frames.

```txt
src/
  cli.ts                 # CLI entry: parse args, load config, call generateOg()
  mod.ts                 # optional internal exports

  core/
    render.ts            # Satori -> SVG -> Resvg PNG pipeline
    config.ts            # config loading, defaults, validation
    types.ts             # shared public types

  templates/
    generated.tsx        # high-level generateOg(config) orchestration
    card.tsx             # general title/description/url card
    terminal-card.tsx    # card with terminal/window frame
    split-card.tsx       # optional image/content split layout

  presets/
    index.ts
    ibm.ts               # IBM typography preset
    vercel.ts            # Geist + Instrument Serif typography preset
    monaspace.ts         # Monaspace typography preset

  fonts/
    cache.ts             # cache dir, read/write, metadata
    resolve.ts           # turn typography preset into Satori font objects
    fontsource.ts        # Fontsource fetcher
    github.ts            # GitHub release/archive fetcher
    types.ts

  backgrounds/
    index.ts
    graph-paper.ts       # Hero Patterns-inspired graph paper
    pattern.ts           # shared SVG pattern helpers

  frames/
    index.ts
    terminal.tsx         # shared frame component
    mac.ts
    windows.ts
    gnome.ts
    win95.ts

  theme/
    tokens.ts            # spacing, colors, shadows, radii
    css.ts               # small helpers for style objects

examples/
  garden.toml            # reference config, not built-in API
  website.toml
  marker.toml
  basic.json             # JSON config example
```

Config files should be treated as the main customization surface. The reference
projects are examples and visual tests, not hardcoded project presets.

Suggested package boundary:

- `src/cli.ts` is the public entry point.
- templates receive normalized config, never raw CLI args.
- font presets are plain objects so users can inspect and override them.
- reference project settings live in `examples/` as TOML/JSON configs.

## CLI sketch

```sh
deno task og \
  --config examples/garden.toml \
  --title "Project title" \
  --out ./public/og.png
```

Potential flags:

- `--config`
- `--title`
- `--description`
- `--eyebrow`
- `--url`
- `--theme`
- `--template`
- `--font-preset`
- `--terminal`
- `--background`
- `--out`
- `--width`
- `--height`

## Config files

Support TOML and JSON. TOML should be the friendlier hand-written format;
JSON should be available for generated configs and tool interop.

Example TOML:

```toml
title = "Read with intention."
description = "A mobile browser for reading and thinking."
eyebrow = "github.com/stormlightlabs/marker"
site = "marker.stormlightlabs.org"
out = "dist/marker.png"

template = "terminal"
fontPreset = "Vercel"
background = "graph-paper-light"
terminal = "mac"

[theme]
accent = "#2d6cdf"
surface = "#f6f5f0"
ink = "#111111"
muted = "#77736b"
highlight = "#ffd85a"
```

Rules:

- CLI flags override config values.
- Unknown keys should produce a helpful warning or error.
- Config examples should live in `examples/` and double as visual tests.

## Font system

### Runtime cache

- Create a cache directory, for example:
  - local project: `.cache/opengrapher/fonts`
  - user cache fallback: `~/.cache/opengrapher/fonts`
- Fetch fonts only when missing.
- Store metadata for each cached font:
  - family
  - style
  - weight
  - source URL
  - local file path
  - checksum if practical

### Fontsource support

Use Fontsource package/CDN URLs for common Google fonts. Fetch `.woff` or
`.woff2` files and pass font buffers to Satori.

Presets to support:

- `IBM`
  - heading: IBM Plex Serif or IBM Plex Sans Condensed
  - sans: IBM Plex Sans
  - mono: IBM Plex Mono
- `Vercel`
  - heading: Instrument Serif
  - sans: Geist Sans
  - mono: Geist Mono
- `Monaspace`
  - heading: Monaspace Radon or Xenon
  - sans: Monaspace Neon
  - mono: Monaspace Argon

### Monaspace fonts

Monaspace is not a standard Fontsource-only case. Fetch from GitHub release
assets and cache the files locally.

Tasks:

- [x] Identify stable Monaspace release URLs.
  - Using `githubnext/monaspace` release `v1.101` and asset
    `monaspace-v1.101.zip`.
- [x] Support GitHub release downloads.
- [x] Extract font files if release assets are zip archives.
- [x] Cache extracted fonts by version.

## Backgrounds

### Hero Patterns

Use https://heropatterns.com/ as inspiration/source for SVG background patterns.
Start with graph paper.

Tasks:

- [x] Implement a `graph-paper` background preset.
- [x] Support color, opacity, grid size, and background color options.
- [x] Allow patterns to be embedded in the generated SVG.
- [x] Add a few low-noise variants for readability.

Suggested presets:

- `graph-paper-light`
- `graph-paper-dark`
- `graph-paper-indigo`
- `graph-paper-warm`

## Terminal/window styles

Implement reusable frame components.

- `mac`
  - rounded window
  - red/yellow/green stoplight buttons
- `windows`
  - title bar
  - minimize/maximize/close controls
- `gnome`
  - simple header bar
  - single close/menu icon option
- `win95`
  - pixel border
  - grey bevels
  - blue title bar
  - blocky controls

Tasks:

- [x] Define shared terminal frame props.
- [x] Implement each terminal style as a preset.
- [x] Support title text and optional toolbar controls.
- [x] Support code/content slot inside the frame.

## Reference projects

Review these projects for visual direction and reusable ideas:

1. https://github.com/desertthunder/garden
   - One of my projects with an existing OG image.
   - Use as the first visual benchmark.
2. https://github.com/desertthunder/website
   - Review site identity, typography, and color usage.
3. https://github.com/stormlightlabs/marker/tree/main/website
   - Review layout patterns and project-card needs.

Research notes:

- `desertthunder/garden`
  - Current OG image is generated at `/og.png` through an Astro integration.
  - Uses a hand-authored SVG and Sharp for PNG output.
  - Visual direction: dark raised terminal/window card, stoplight buttons,
    dotted background, soft blobs, wavy accent lines, muted green/amber/salmon
    palette.
  - Copy fields: fixed title `Owais' Places`, subtitle, and site/path label.
  - Metadata convention: Starlight `head` entries set `og:image`, image type,
    width/height, `twitter:card`, and `twitter:image`.
- `desertthunder/website`
  - Current OG image is generated at `/og.png` through an Astro integration.
  - Uses `@takumi-rs/image-response` with React element trees.
  - Visual direction: full terminal UI, 0xProto mono font, blue-on-black theme,
    stoplight controls, header/footer bars, site/location metadata.
  - Copy fields: name/title, description, GitHub URL, site URL, and small
    metadata labels.
  - Metadata convention: shared layout emits canonical URL, `og:type`,
    `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`, and
    Twitter summary-large tags.
- `stormlightlabs/marker/website`
  - Current OG image is generated by `src/pages/og.png.ts`.
  - Uses a hand-authored SVG and Resvg for PNG output.
  - Visual direction: paper/reader feel, graph paper background, rough hand-drawn
    strokes, Lora heading, Sora UI text, yellow highlight, blue accent oval.
  - Copy fields: repository/site label, two-line headline, short description,
    and site URL.
  - Metadata convention: base layout emits canonical URL, title, description,
    `og:image`, explicit `og:image:width` and `og:image:height`, and Twitter
    summary-large tags.

Recurring fields to support in config files:

- title/headline
- description/subtitle
- site URL or path label
- repository label
- small eyebrow/kicker text
- optional location/status metadata
- theme palette
- typography triad
- template choice: card, terminal, or rough paper card

Tasks:

- [x] Inspect current OG images and metadata conventions.
- [x] Note recurring content fields across projects.
- [x] Create `examples/garden.toml`, `examples/website.toml`, and
      `examples/marker.toml`.
- [x] Generate comparison images from the example configs and iterate.

## Implementation phases

### Phase 1: Spike

- [x] Add Deno config/tasks.
- [x] Install or import Satori and Resvg.
- [x] Render a hard-coded `1200x630` PNG.
- [x] Load one local or fetched font.
- [x] Save output to `dist/og.png`.
- [x] Save SVG output when requested.

### Phase 2: Font cache

- [x] Implement cache directory resolution.
- [x] Implement Fontsource font fetching.
- [x] Add `IBM` preset.
- [x] Add `Vercel` preset.
- [x] Add `Monaspace` GitHub release support.

### Phase 3: Templates

- [x] Build a base project card template.
- [x] Build a terminal card template.
- [x] Add graph-paper background.
- [x] Add terminal style presets.
- [x] Add theme tokens for colors, spacing, radius, and shadows.

### Phase 4: CLI and config

- [x] Parse CLI flags.
- [x] Load JSON config files.
- [x] Load TOML config files.
- [x] Let CLI flags override config values.
- [x] Add richer shared fields: eyebrow, site, repo, path, and theme.
- [x] Write PNG/SVG output from config.
- [x] Add useful error messages for missing fonts, bad configs, or bad presets.

## Parking lot

### Blob, gooey, and liquid background effects

Blob effects could give the generator a softer visual mode alongside graph paper
and terminal chrome. The useful techniques are:

- CSS-style blurred blobs: layered circles/ellipses with large blur, opacity,
  and multiply/screen-like color choices. These are simple and likely to work
  well through Satori/Resvg if represented as SVG filters or soft radial shapes.
- SVG gooey filters: `feGaussianBlur` followed by `feColorMatrix` to make nearby
  circles merge into one liquid mass. This is best authored as an SVG overlay or
  background primitive, then rasterized by Resvg.
- Organic SVG paths: seeded blob paths made from points around a circle with
  jittered radii. This gives deterministic, reproducible blobs without relying
  on heavy filter effects.
- Masked gradients: radial gradients clipped to blob paths for softer editorial
  backgrounds.

Proposed integration:

- Add `src/backgrounds/blobs.ts` with deterministic blob presets.
- Add `src/backgrounds/svg-filter.ts` for reusable blur/gooey filter markup.
- Expose background names such as `blobs-soft`, `blobs-gooey`, and
  `blobs-editorial`.
- Add optional config fields under `[backgroundOptions]` later: `seed`, `count`,
  `blur`, `opacity`, and `palette`.
- Start with non-animated static SVG blobs. Animation is not useful for OG images.
- Prefer seeded organic paths for reliability; reserve gooey filters for presets
  that verify cleanly in Resvg.

### Freeze-style code snippet images

Consider a syntax-highlighted code image mode after the core OG generator is
stable. Treat it as a small Deno version of Freeze: give it code, a theme, a
window style, and an output path.

Possible CLI:

```sh
deno task og --template code \
  --code ./src/main.ts \
  --language ts \
  --highlight 8-14 \
  --terminal mac \
  --out dist/snippet.png
```

Possible direction:

- Accept a source file path, stdin, or an inline code string.
- Use Shiki for syntax highlighting if Deno/JSR/npm support stays simple.
- Reuse terminal styles: `mac`, `windows`, `gnome`, and `win95`.
- Support language, theme, line numbers, highlighted lines, filename, and prompt
  text.
- Output PNG/SVG like the OG templates.
- Keep it usable as a standalone snippet generator, not only as OG-image chrome.

Hold off until the normal card and config-file workflows are stable.

## Decisions

- Templates should use **TSX/JSX**.
  - It is the better authoring experience for visual layouts.
  - Satori already expects React-like element trees.
  - Components make terminal frames, typography, and layout variants easier to
    read than plain object trees.
  - Keep plain object trees internal-only if useful for generated/simple nodes.
- The project should ship as a **CLI**.
  - Keep internals modular, but optimize the public surface for commands and
    config files rather than a library API.
- Reference projects should be **examples, not built-in project presets**.
  - Add `examples/garden.toml`, `examples/website.toml`, and
    `examples/marker.toml`.
  - Keep built-in presets focused on reusable choices like fonts, backgrounds,
    and terminal styles.
- Cached fonts should be **pinned by version** for reproducibility.
  - Include the package/release version in cache keys and metadata.
  - Avoid silently changing generated images when upstream fonts change.
- Support **SVG and PNG** output.
  - SVG is useful for debugging, previews, and sharp scalable output.
  - PNG should remain the default for Open Graph usage.
