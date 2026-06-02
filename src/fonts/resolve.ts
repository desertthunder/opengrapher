import { loadFontsourceFont } from "./fontsource.ts";
import { loadGitHubReleaseFont } from "./github.ts";
import type { FontPreset, FontSpec, ResolvedFont } from "./types.ts";

export async function resolveFonts(preset: FontPreset): Promise<ResolvedFont[]> {
  return await Promise.all(preset.fonts.map(resolveFont));
}

async function resolveFont(spec: FontSpec): Promise<ResolvedFont> {
  const data = spec.provider === "fontsource"
    ? await loadFontsourceFont(spec)
    : await loadGitHubReleaseFont(spec);

  return {
    name: spec.family,
    data,
    weight: spec.weight,
    style: spec.style,
  };
}
