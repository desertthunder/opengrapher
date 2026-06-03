export type TerminalStyleName = "mac" | "windows" | "gnome" | "win95";

export type TerminalFrameTheme = {
  name: TerminalStyleName;
  chromeHeight: number;
  borderRadius: number;
  border: string;
  background: string;
  titleBar: string;
  titleColor: string;
  body: string;
  bodyColor: string;
  shadow: string;
  control: "stoplight" | "windows" | "gnome" | "win95";
};

export const terminalThemes = {
  mac: {
    name: "mac",
    chromeHeight: 54,
    borderRadius: 22,
    border: "1px solid rgba(148, 163, 184, 0.36)",
    background: "#ffffff",
    titleBar: "#f8fafc",
    titleColor: "#475569",
    body: "#0f172a",
    bodyColor: "#dbeafe",
    shadow: "0 26px 70px rgba(15, 23, 42, 0.24)",
    control: "stoplight",
  },
  windows: {
    name: "windows",
    chromeHeight: 52,
    borderRadius: 16,
    border: "1px solid rgba(30, 64, 175, 0.34)",
    background: "#eff6ff",
    titleBar: "#dbeafe",
    titleColor: "#1e3a8a",
    body: "#0b1220",
    bodyColor: "#e0f2fe",
    shadow: "0 26px 70px rgba(30, 64, 175, 0.24)",
    control: "windows",
  },
  gnome: {
    name: "gnome",
    chromeHeight: 58,
    borderRadius: 18,
    border: "1px solid rgba(36, 31, 49, 0.22)",
    background: "#f6f5f4",
    titleBar: "#f6f5f4",
    titleColor: "#3d3846",
    body: "#241f31",
    bodyColor: "#f6f5f4",
    shadow: "0 26px 70px rgba(36, 31, 49, 0.26)",
    control: "gnome",
  },
  win95: {
    name: "win95",
    chromeHeight: 44,
    borderRadius: 0,
    border: "4px solid #c0c0c0",
    background: "#c0c0c0",
    titleBar: "#000080",
    titleColor: "#ffffff",
    body: "#000000",
    bodyColor: "#00ff66",
    shadow: "10px 10px 0 rgba(15, 23, 42, 0.22)",
    control: "win95",
  },
} as const satisfies Record<TerminalStyleName, TerminalFrameTheme>;

export function getTerminalTheme(name = "mac"): TerminalFrameTheme {
  if (isTerminalStyleName(name)) return terminalThemes[name];

  const available = Object.keys(terminalThemes).join(", ");
  throw new Error(`Unknown terminal style: ${name}. Expected one of: ${available}.`);
}

export function isTerminalStyleName(name: string): name is TerminalStyleName {
  return name in terminalThemes;
}
