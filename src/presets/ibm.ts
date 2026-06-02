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
