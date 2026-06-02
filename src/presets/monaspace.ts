import type { FontPreset } from "../fonts/types.ts";

const release = {
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
      ...release,
      family: "Monaspace Radon",
      path: "monaspace-v1.101/fonts/otf/MonaspaceRadon-Regular.otf",
    },
    {
      ...release,
      family: "Monaspace Neon",
      path: "monaspace-v1.101/fonts/otf/MonaspaceNeon-Regular.otf",
    },
    {
      ...release,
      family: "Monaspace Argon",
      path: "monaspace-v1.101/fonts/otf/MonaspaceArgon-Regular.otf",
    },
  ],
};
