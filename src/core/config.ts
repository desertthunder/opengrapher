import { getFontPreset } from "../presets/index.ts";
import type { GenerateOptions, OutputFormat, ResolvedGenerateOptions } from "./types.ts";

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

export function resolveOptions(options: GenerateOptions): ResolvedGenerateOptions {
  const format = resolveFormat(options.format, options.out);
  const fontPreset = getFontPreset(options.fontPreset);

  return {
    title: options.title ?? "Opengrapher",
    description: options.description ?? "Bespoke Open Graph images from a small TSX template.",
    out: options.out ?? `dist/og.${format}`,
    format,
    width: options.width ?? DEFAULT_WIDTH,
    height: options.height ?? DEFAULT_HEIGHT,
    fontPreset: fontPreset.name,
    typography: fontPreset.typography,
  };
}

function resolveFormat(format?: OutputFormat, out?: string): OutputFormat {
  if (format) return format;
  if (out?.endsWith(".svg")) return "svg";
  return "png";
}
