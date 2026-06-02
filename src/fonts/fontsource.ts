import { readCachedFont, writeCachedFont } from "./cache.ts";
import type { FontSourceSpec } from "./types.ts";

export async function loadFontsourceFont(spec: FontSourceSpec): Promise<ArrayBuffer> {
  const cached = await readCachedFont(spec);
  if (cached) return cached;

  const url = getFontsourceUrl(spec);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${spec.family} from Fontsource: ${url} (${response.status})`);
  }

  return await writeCachedFont(spec, await response.arrayBuffer(), url);
}

export function getFontsourceUrl(spec: FontSourceSpec): string {
  return `https://cdn.jsdelivr.net/npm/${spec.package}@${spec.version}/files/${spec.file}`;
}
