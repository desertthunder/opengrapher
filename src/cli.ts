import { parseArgs } from "jsr:@std/cli/parse-args";
import { isBackgroundPresetName } from "./backgrounds/index.ts";
import type { BackgroundPresetName } from "./backgrounds/index.ts";
import { loadConfigFile } from "./core/config-file.ts";
import type { GenerateOptions, OutputFormat, TemplateName } from "./core/types.ts";
import { isTerminalStyleName } from "./frames/index.ts";
import type { TerminalStyleName } from "./frames/index.ts";
import { isFontPresetName } from "./presets/index.ts";
import type { FontPresetName } from "./presets/index.ts";
import { generateOg } from "./templates/generated.tsx";

const args = parseArgs(Deno.args, {
  string: [
    "config",
    "title",
    "description",
    "eyebrow",
    "site",
    "repo",
    "path",
    "out",
    "format",
    "width",
    "height",
    "font-preset",
    "background",
    "terminal",
    "template",
  ],
  boolean: ["help"],
  alias: {
    h: "help",
    o: "out",
  },
});

if (args.help) {
  printHelp();
  Deno.exit(0);
}

const config = await loadConfigFile(args.config);
const flags = compactOptions({
  title: args.title,
  description: args.description,
  eyebrow: args.eyebrow,
  site: args.site,
  repo: args.repo,
  path: args.path,
  out: args.out,
  format: parseFormat(args.format),
  width: parseNumber(args.width),
  height: parseNumber(args.height),
  fontPreset: parseFontPreset(args["font-preset"]),
  background: parseBackground(args.background),
  terminal: parseTerminal(args.terminal),
  template: parseTemplate(args.template),
});

await generateOg({ ...config, ...flags });

function compactOptions(options: GenerateOptions): GenerateOptions {
  return Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined),
  ) as GenerateOptions;
}

function parseFormat(value: unknown): OutputFormat | undefined {
  if (value === undefined) return undefined;
  if (value === "png" || value === "svg") return value;
  throw new Error(`Unsupported format: ${value}. Expected "png" or "svg".`);
}

function parseFontPreset(value: unknown): FontPresetName | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string" && isFontPresetName(value)) return value;

  throw new Error(`Unsupported font preset: ${value}. Expected IBM, Vercel, or Monaspace.`);
}

function parseBackground(value: unknown): BackgroundPresetName | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string" && isBackgroundPresetName(value)) return value;

  throw new Error(
    `Unsupported background: ${value}. Expected graph-paper-light, graph-paper-dark, graph-paper-indigo, or graph-paper-warm.`,
  );
}

function parseTerminal(value: unknown): TerminalStyleName | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string" && isTerminalStyleName(value)) return value;

  throw new Error(`Unsupported terminal style: ${value}. Expected mac, windows, gnome, or win95.`);
}

function parseTemplate(value: unknown): TemplateName | undefined {
  if (value === undefined) return undefined;
  if (value === "card" || value === "terminal") return value;

  throw new Error(`Unsupported template: ${value}. Expected card or terminal.`);
}

function parseNumber(value: unknown): number | undefined {
  if (value === undefined) return undefined;

  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Expected a number, received: ${value}`);
  }

  return number;
}

function printHelp(): void {
  console.log(`opengrapher

Usage:
  deno task og --title "Opengrapher" --description "Bespoke OG images" --out dist/og.png

Options:
  --config <path>       TOML or JSON config file
  --title <text>        Image title
  --description <text>  Image description
  --eyebrow <text>      Small label above the title
  --site <text>         Site URL or label
  --repo <text>         Repository label
  --path <text>         Path label
  --out, -o <path>      Output path, defaults to dist/og.png
  --format <png|svg>    Output format. Inferred from .svg paths, otherwise png
  --width <number>      Width, defaults to 1200
  --height <number>     Height, defaults to 630
  --font-preset <name>  Font preset: IBM, Vercel, or Monaspace
  --background <name>   graph-paper-light, graph-paper-dark, graph-paper-indigo, or graph-paper-warm
  --terminal <name>     mac, windows, gnome, or win95
  --template <name>     card or terminal
  --help, -h            Show this help
`);
}
