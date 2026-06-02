# Opengrapher

A CLI for generating bespoke Open Graph images from TSX templates.

The current build renders `1200x630` project cards with `takumi-js`.

## Usage

```sh
deno task og \
  --title "Opengrapher" \
  --description "Bespoke Open Graph images from TSX templates." \
  --font-preset IBM \
  --background graph-paper-light \
  --out dist/og.png
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

- `graph-paper-light`
- `graph-paper-dark`
- `graph-paper-indigo`
- `graph-paper-warm`
- `blobs-soft`
- `blobs-gooey`
- `blobs-editorial`

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
- `--format <png>`: output format
- `--width <number>`: width, defaults to `1200`
- `--height <number>`: height, defaults to `630`
- `--font-preset <name>`: `IBM`, `Vercel`, or `Monaspace`
- `--background <name>`: background preset
- `--template <name>`: `card` or `terminal`
- `--terminal <name>`: `mac`, `windows`, `gnome`, or `win95`
- `--help, -h`: show help

## License

[MIT](./LICENSE)
