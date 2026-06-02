import { parseArgs } from "jsr:@std/cli/parse-args";
import { generateOg } from "./core/generate.tsx";
import type { OutputFormat } from "./core/types.ts";

const args = parseArgs(Deno.args, {
  string: ["title", "description", "out", "format", "width", "height"],
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

await generateOg({
  title: args.title,
  description: args.description,
  out: args.out,
  format: parseFormat(args.format),
  width: parseNumber(args.width),
  height: parseNumber(args.height),
});

function parseFormat(value: unknown): OutputFormat | undefined {
  if (value === undefined) return undefined;
  if (value === "png" || value === "svg") return value;
  throw new Error(`Unsupported format: ${value}. Expected "png" or "svg".`);
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
  console.log(`opengrapher phase 1

Usage:
  deno task og --title "Opengrapher" --description "Bespoke OG images" --out dist/og.png

Options:
  --title <text>        Image title
  --description <text>  Image description
  --out, -o <path>      Output path, defaults to dist/og.png
  --format <png|svg>    Output format. Inferred from .svg paths, otherwise png
  --width <number>      Width, defaults to 1200
  --height <number>     Height, defaults to 630
  --help, -h            Show this help
`);
}
