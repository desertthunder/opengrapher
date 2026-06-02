import type { FontDefinition } from "../core/types.ts";

const IBM_PLEX_SANS_REGULAR =
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.2.8/files/ibm-plex-sans-latin-400-normal.woff";

const IBM_PLEX_SANS_BOLD =
  "https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.2.8/files/ibm-plex-sans-latin-700-normal.woff";

export async function loadPhaseOneFonts(): Promise<FontDefinition[]> {
  const [regular, bold] = await Promise.all([
    fetchFont(IBM_PLEX_SANS_REGULAR),
    fetchFont(IBM_PLEX_SANS_BOLD),
  ]);

  return [
    { name: "IBM Plex Sans", data: regular, weight: 400, style: "normal" },
    { name: "IBM Plex Sans", data: bold, weight: 700, style: "normal" },
  ];
}

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch font: ${url} (${response.status})`);
  }

  return await response.arrayBuffer();
}
