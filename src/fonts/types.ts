import type { FontDefinition, FontWeight } from "../core/types.ts";

export type FontStyle = "normal" | "italic";
export type FontRole = "heading" | "sans" | "mono";
export type FontProvider = "fontsource" | "github-release";
export type FontPresetName = "IBM" | "Vercel" | "Monaspace";

export type TypographyTriad = { heading: string; sans: string; mono: string; };

export type FontSourceSpec = {
  provider: "fontsource";
  family: string;
  package: string;
  version: string;
  file: string;
  weight: FontWeight;
  style: FontStyle;
};

export type GitHubReleaseFontSpec = {
  provider: "github-release";
  family: string;
  owner: string;
  repo: string;
  version: string;
  asset: string;
  path: string;
  weight: FontWeight;
  style: FontStyle;
};

export type FontSpec = FontSourceSpec | GitHubReleaseFontSpec;

export type FontPreset = { name: FontPresetName; typography: TypographyTriad; fonts: FontSpec[]; };

export type CachedFontMetadata = {
  family: string;
  style: FontStyle;
  weight: FontWeight;
  provider: FontProvider;
  version: string;
  sourceUrl: string;
  path: string;
  checksum: string;
};

export type ResolvedFont = FontDefinition;
