import { extname } from "jsr:@std/path/extname";
import { parse as parseToml } from "jsr:@std/toml/parse";
import { getBackground, getBackgroundNames, isBackgroundPresetName } from "./bg.ts";
import { getTerminalTheme, isTerminalStyleName } from "./frames.ts";
import { getFontPreset, isFontPresetName } from "./presets.ts";
import type {
  GenerateOptions,
  OutputFormat,
  ResolvedGenerateOptions,
  TemplateName,
  ThemeOptions,
} from "./types.ts";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

const defaultTheme = {
  accent: "#2563eb",
  surface: "#ffffff",
  ink: "#0f172a",
  muted: "#475569",
  highlight: "#facc15",
};

const allowedKeys = new Set([
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
  "fontPreset",
  "background",
  "terminal",
  "template",
  "theme",
]);

const allowedThemeKeys = new Set(["accent", "surface", "ink", "muted", "highlight"]);

export function resolveOptions(options: GenerateOptions): ResolvedGenerateOptions {
  const format = resolveFormat(options.format, options.out);
  const fontPreset = getFontPreset(options.fontPreset);
  const background = getBackground(options.background);
  const terminal = getTerminalTheme(options.terminal);

  return {
    title: options.title ?? "Opengrapher",
    description: options.description ?? "Bespoke Open Graph images from a small TSX template.",
    eyebrow: options.eyebrow ?? options.path ?? "opengrapher",
    site: options.site ?? "",
    repo: options.repo ?? "",
    path: options.path ?? "",
    out: options.out ?? `dist/og.${format}`,
    format,
    width: options.width ?? DEFAULT_WIDTH,
    height: options.height ?? DEFAULT_HEIGHT,
    fontPreset: fontPreset.name,
    typography: fontPreset.typography,
    background,
    terminal: terminal.name,
    template: resolveTemplate(options.template),
    theme: { ...defaultTheme, ...options.theme },
  };
}

export async function loadConfigFile(path?: string): Promise<GenerateOptions> {
  if (!path) return {};

  const text = await readConfig(path);
  const extension = extname(path).toLowerCase();
  const parsed = extension === ".toml" ? parseToml(text) : parseJsonConfig(text, extension, path);

  return normalizeConfig(parsed, path);
}

function resolveFormat(format?: OutputFormat, out?: string): OutputFormat {
  if (format) return format;
  if (out?.endsWith(".svg")) {
    throw new Error(
      "SVG output is not supported by the Takumi renderer yet. Use a .png output path.",
    );
  }
  return "png";
}

function resolveTemplate(template?: TemplateName): TemplateName {
  return template ?? "card";
}

function parseJsonConfig(text: string, extension: string, path: string): unknown {
  if (extension !== ".json") {
    throw new Error(`Unsupported config file: ${path}. Expected .toml or .json.`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Could not parse JSON config ${path}: ${getMessage(error)}`);
  }
}

async function readConfig(path: string): Promise<string> {
  try {
    return await Deno.readTextFile(path);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(`Config file not found: ${path}`);
    }
    throw error;
  }
}

function normalizeConfig(value: unknown, path: string): GenerateOptions {
  if (!isRecord(value)) {
    throw new Error(`Config ${path} must be an object.`);
  }

  assertKnownKeys(value, allowedKeys, `Config ${path}`);

  return {
    title: optionalString(value.title, "title"),
    description: optionalString(value.description, "description"),
    eyebrow: optionalString(value.eyebrow, "eyebrow"),
    site: optionalString(value.site, "site"),
    repo: optionalString(value.repo, "repo"),
    path: optionalString(value.path, "path"),
    out: optionalString(value.out, "out"),
    format: optionalFormat(value.format),
    width: optionalNumber(value.width, "width"),
    height: optionalNumber(value.height, "height"),
    fontPreset: optionalFontPreset(value.fontPreset),
    background: optionalBackground(value.background),
    terminal: optionalTerminal(value.terminal),
    template: optionalTemplate(value.template),
    theme: optionalTheme(value.theme),
  };
}

function optionalTheme(value: unknown): ThemeOptions | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value)) throw new Error("Config key theme must be an object.");
  assertKnownKeys(value, allowedThemeKeys, "Config theme");

  return {
    accent: optionalString(value.accent, "theme.accent"),
    surface: optionalString(value.surface, "theme.surface"),
    ink: optionalString(value.ink, "theme.ink"),
    muted: optionalString(value.muted, "theme.muted"),
    highlight: optionalString(value.highlight, "theme.highlight"),
  };
}

function optionalString(value: unknown, key: string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "string") return value;
  throw new Error(`Config key ${key} must be a string.`);
}

function optionalNumber(value: unknown, key: string): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  throw new Error(`Config key ${key} must be a number.`);
}

function optionalFormat(value: unknown): OutputFormat | undefined {
  if (value === undefined) return undefined;
  if (value === "png") return value;
  throw new Error(`Config key format must be "png".`);
}

function optionalFontPreset(value: unknown) {
  if (value === undefined) return undefined;
  if (typeof value === "string" && isFontPresetName(value)) return value;
  throw new Error(`Config key fontPreset must be IBM, Vercel, or Monaspace.`);
}

function optionalBackground(value: unknown) {
  if (value === undefined) return undefined;
  if (typeof value === "string" && isBackgroundPresetName(value)) return value;

  throw new Error(`Config key background must be one of: ${getBackgroundNames()}.`);
}

function optionalTerminal(value: unknown) {
  if (value === undefined) return undefined;
  if (typeof value === "string" && isTerminalStyleName(value)) return value;
  throw new Error(`Config key terminal must be mac, windows, gnome, or win95.`);
}

function optionalTemplate(value: unknown): TemplateName | undefined {
  if (value === undefined) return undefined;
  if (value === "card" || value === "terminal") return value;
  throw new Error(`Config key template must be card or terminal.`);
}

function assertKnownKeys(
  value: Record<string, unknown>,
  allowed: Set<string>,
  label: string,
): void {
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) {
    throw new Error(
      `${label} has unknown key${unknown.length === 1 ? "" : "s"}: ${unknown.join(", ")}.`,
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
