import type { FontPreset } from "../fonts/types.ts";

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
