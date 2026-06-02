# Opengrapher

A CLI for generating bespoke Open Graph images from TSX templates.

Phase 1 renders a `1200x630` project card with Satori, rasterizes PNG output
with Resvg, and can also write SVG output for previews/debugging.

## Usage

```sh
deno task og \
  --title "Opengrapher" \
  --description "Bespoke Open Graph images from TSX templates." \
  --out dist/og.png
```

Write SVG by using a `.svg` output path or `--format svg`:

```sh
deno task og --title "Opengrapher" --out dist/og.svg
```

## CLI options

- `--title <text>`: image title
- `--description <text>`: image description
- `--out, -o <path>`: output path, defaults to `dist/og.png`
- `--format <png|svg>`: output format
- `--width <number>`: width, defaults to `1200`
- `--height <number>`: height, defaults to `630`
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
React, Resvg, and dprint.

Types should be declared with `type`, not `interface`.

## Current source layout

```txt
src/
  cli.ts
  mod.ts
  core/
    config.ts
    generate.tsx
    render.ts
    types.ts
  fonts/
    ibm.ts
  templates/
    project-card.tsx
```
