import { getGraphPaperBackground } from "../backgrounds/index.ts";
import { getTerminalTheme } from "../frames/index.ts";
import { getFontPreset } from "../presets/index.ts";
import type {
  GenerateOptions,
  OutputFormat,
  ResolvedGenerateOptions,
  TemplateName,
} from "./types.ts";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

export function resolveOptions(options: GenerateOptions): ResolvedGenerateOptions {
  const format = resolveFormat(options.format, options.out);
  const fontPreset = getFontPreset(options.fontPreset);
  const background = getGraphPaperBackground(options.background);
  const terminal = getTerminalTheme(options.terminal);

  return {
    title: options.title ?? "Opengrapher",
    description: options.description ?? "Bespoke Open Graph images from a small TSX template.",
    out: options.out ?? `dist/og.${format}`,
    format,
    width: options.width ?? DEFAULT_WIDTH,
    height: options.height ?? DEFAULT_HEIGHT,
    fontPreset: fontPreset.name,
    typography: fontPreset.typography,
    background,
    terminal: terminal.name,
    template: resolveTemplate(options.template),
  };
}

function resolveFormat(format?: OutputFormat, out?: string): OutputFormat {
  if (format) return format;
  if (out?.endsWith(".svg")) return "svg";
  return "png";
}

function resolveTemplate(template?: TemplateName): TemplateName {
  return template ?? "card";
}
