# Opengrapher

A CLI for generating bespoke Open Graph images from TSX templates.

The current build renders `1200x630` project cards with Satori, rasterizes PNG
output with Resvg, and can also write SVG output for previews/debugging.

## Usage

```sh
deno task og \
  --title "Opengrapher" \
  --description "Bespoke Open Graph images from TSX templates." \
  --font-preset IBM \
  --background graph-paper-light \
  --out dist/og.png
```

Write SVG by using a `.svg` output path or `--format svg`:

```sh
deno task og --title "Opengrapher" --out dist/og.svg
```

Render a terminal card:

```sh
deno task og \
  --template terminal \
  --terminal mac \
  --title "Mac Terminal" \
  --description "Reusable window chrome for OG images." \
  --out dist/mac.png
```

## Font presets

- `IBM`: IBM Plex Serif, IBM Plex Sans, IBM Plex Mono
- `Vercel`: Instrument Serif, Geist Sans, Geist Mono
- `Monaspace`: Monaspace Radon, Monaspace Neon, Monaspace Argon

Font files are fetched at runtime and cached in `.cache/opengrapher/fonts`.
Fontsource presets use pinned package versions. Monaspace uses the pinned GitHub
release asset `githubnext/monaspace@v1.101`.

## Background presets

All current backgrounds use Hero Patterns-inspired graph paper.

- `graph-paper-light`
- `graph-paper-dark`
- `graph-paper-indigo`
- `graph-paper-warm`

## Terminal styles

Use these with `--template terminal --terminal <name>`:

- `mac`: stoplight controls
- `windows`: title bar with window controls
- `gnome`: simple header bar with a single icon
- `win95`: pixel-style bevels and classic blue chrome

## CLI options

- `--title <text>`: image title
- `--description <text>`: image description
- `--out, -o <path>`: output path, defaults to `dist/og.png`
- `--format <png|svg>`: output format
- `--width <number>`: width, defaults to `1200`
- `--height <number>`: height, defaults to `630`
- `--font-preset <name>`: `IBM`, `Vercel`, or `Monaspace`
- `--background <name>`: graph paper background preset
- `--template <name>`: `card` or `terminal`
- `--terminal <name>`: `mac`, `windows`, `gnome`, or `win95`
- `--help, -h`: show help

## Development

```sh
deno task check
deno task fmt
deno task fmt:check
```

Formatting uses `dprint`, following the setup style from the `utility-api`
project. Deno Standard Library imports should use `jsr:` specifiers. npm imports
are still used where packages do not have a JSR equivalent, such as Satori,
React, Resvg, fflate, and dprint.

Types should be declared with `type`, not `interface`.

## Current source layout

```txt
src/
  cli.ts
  mod.ts
  backgrounds/
    graph-paper.ts
    index.ts
  core/
    config.ts
    render.ts
    types.ts
  fonts/
    cache.ts
    fontsource.ts
    github.ts
    resolve.ts
    types.ts
  frames/
    gnome.ts
    index.ts
    mac.ts
    terminal.tsx
    types.ts
    win95.ts
    windows.ts
  presets/
    ibm.ts
    index.ts
    monaspace.ts
    vercel.ts
  templates/
    card.tsx
    generated.tsx
    index.ts
    terminal-card.tsx
  theme/
    css.ts
    tokens.ts
```
