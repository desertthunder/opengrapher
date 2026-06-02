import type { FontPresetName } from "../fonts/types.ts";
import { IBM } from "./ibm.ts";
import { Monaspace } from "./monaspace.ts";
import { Vercel } from "./vercel.ts";

export const fontPresets = {
  IBM,
  Vercel,
  Monaspace,
} as const;

export type { FontPresetName } from "../fonts/types.ts";

export function getFontPreset(name: string = "IBM") {
  if (isFontPresetName(name)) return fontPresets[name];

  const available = Object.keys(fontPresets).join(", ");
  throw new Error(`Unknown font preset: ${name}. Expected one of: ${available}.`);
}

export function isFontPresetName(name: string): name is FontPresetName {
  return name in fontPresets;
}
