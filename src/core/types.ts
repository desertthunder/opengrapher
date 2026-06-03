import type { FontPresetName, TypographyTriad } from "../fonts/types.ts";
import type { BackgroundPreset, BackgroundPresetName } from "./bg.ts";
import type { TerminalStyleName } from "./frames.ts";

export type OutputFormat = "png";
export type TemplateName = "card" | "terminal";

export type ThemeOptions = {
  accent?: string;
  surface?: string;
  ink?: string;
  muted?: string;
  highlight?: string;
};

export type ResolvedTheme = Required<ThemeOptions>;

export type GenerateOptions = {
  title?: string;
  description?: string;
  eyebrow?: string;
  site?: string;
  repo?: string;
  path?: string;
  out?: string;
  format?: OutputFormat;
  width?: number;
  height?: number;
  fontPreset?: FontPresetName;
  background?: BackgroundPresetName;
  terminal?: TerminalStyleName;
  template?: TemplateName;
  theme?: ThemeOptions;
};

export type ResolvedGenerateOptions = {
  title: string;
  description: string;
  eyebrow: string;
  site: string;
  repo: string;
  path: string;
  out: string;
  format: OutputFormat;
  width: number;
  height: number;
  fontPreset: FontPresetName;
  typography: TypographyTriad;
  background: BackgroundPreset;
  terminal: TerminalStyleName;
  template: TemplateName;
  theme: ResolvedTheme;
};

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type FontDefinition = {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight;
  style: "normal" | "italic";
};
