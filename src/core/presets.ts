import type { FontPreset } from "../fonts/types.ts";

export const IBM: FontPreset = {
  name: "IBM",
  typography: {
    heading: "IBM Plex Serif",
    sans: "IBM Plex Sans",
    mono: "IBM Plex Mono",
  },
  fonts: [
    {
      provider: "fontsource",
      family: "IBM Plex Serif",
      package: "@fontsource/ibm-plex-serif",
      version: "5.2.7",
      file: "ibm-plex-serif-latin-700-normal.woff",
      weight: 700,
      style: "normal",
    },
    {
      provider: "fontsource",
      family: "IBM Plex Sans",
      package: "@fontsource/ibm-plex-sans",
      version: "5.2.8",
      file: "ibm-plex-sans-latin-400-normal.woff",
      weight: 400,
      style: "normal",
    },
    {
      provider: "fontsource",
      family: "IBM Plex Sans",
      package: "@fontsource/ibm-plex-sans",
      version: "5.2.8",
      file: "ibm-plex-sans-latin-700-normal.woff",
      weight: 700,
      style: "normal",
    },
    {
      provider: "fontsource",
      family: "IBM Plex Mono",
      package: "@fontsource/ibm-plex-mono",
      version: "5.2.7",
      file: "ibm-plex-mono-latin-400-normal.woff",
      weight: 400,
      style: "normal",
    },
  ],
};

export const Vercel: FontPreset = {
  name: "Vercel",
  typography: {
    heading: "Instrument Serif",
    sans: "Geist Sans",
    mono: "Geist Mono",
  },
  fonts: [
    {
      provider: "fontsource",
      family: "Instrument Serif",
      package: "@fontsource/instrument-serif",
      version: "5.2.8",
      file: "instrument-serif-latin-400-normal.woff",
      weight: 400,
      style: "normal",
    },
    {
      provider: "fontsource",
      family: "Geist Sans",
      package: "@fontsource/geist-sans",
      version: "5.2.5",
      file: "geist-sans-latin-400-normal.woff",
      weight: 400,
      style: "normal",
    },
    {
      provider: "fontsource",
      family: "Geist Sans",
      package: "@fontsource/geist-sans",
      version: "5.2.5",
      file: "geist-sans-latin-700-normal.woff",
      weight: 700,
      style: "normal",
    },
    {
      provider: "fontsource",
      family: "Geist Mono",
      package: "@fontsource/geist-mono",
      version: "5.2.8",
      file: "geist-mono-latin-400-normal.woff",
      weight: 400,
      style: "normal",
    },
  ],
};

const monaspaceRelease = {
  provider: "github-release" as const,
  owner: "githubnext",
  repo: "monaspace",
  version: "v1.101",
  asset: "monaspace-v1.101.zip",
  weight: 400 as const,
  style: "normal" as const,
};

export const Monaspace: FontPreset = {
  name: "Monaspace",
  typography: {
    heading: "Monaspace Radon",
    sans: "Monaspace Neon",
    mono: "Monaspace Argon",
  },
  fonts: [
    {
      ...monaspaceRelease,
      family: "Monaspace Radon",
      path: "monaspace-v1.101/fonts/otf/MonaspaceRadon-Regular.otf",
    },
    {
      ...monaspaceRelease,
      family: "Monaspace Neon",
      path: "monaspace-v1.101/fonts/otf/MonaspaceNeon-Regular.otf",
    },
    {
      ...monaspaceRelease,
      family: "Monaspace Argon",
      path: "monaspace-v1.101/fonts/otf/MonaspaceArgon-Regular.otf",
    },
  ],
};

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

export function isFontPresetName(name: string): name is keyof typeof fontPresets {
  return name in fontPresets;
}
