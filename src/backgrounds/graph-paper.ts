export type BackgroundPresetName =
  | "graph-paper-light"
  | "graph-paper-dark"
  | "graph-paper-indigo"
  | "graph-paper-warm";

export type GraphPaperBackground = {
  name: BackgroundPresetName;
  backgroundColor: string;
  lineColor: string;
  accentColor: string;
  opacity: number;
  gridSize: number;
};

export const graphPaperBackgrounds: Record<BackgroundPresetName, GraphPaperBackground> = {
  "graph-paper-light": {
    name: "graph-paper-light",
    backgroundColor: "#f8fafc",
    lineColor: "#dbe3ef",
    accentColor: "#2563eb",
    opacity: 1,
    gridSize: 42,
  },
  "graph-paper-dark": {
    name: "graph-paper-dark",
    backgroundColor: "#0f172a",
    lineColor: "#334155",
    accentColor: "#38bdf8",
    opacity: 0.42,
    gridSize: 42,
  },
  "graph-paper-indigo": {
    name: "graph-paper-indigo",
    backgroundColor: "#eef2ff",
    lineColor: "#c7d2fe",
    accentColor: "#4f46e5",
    opacity: 0.8,
    gridSize: 42,
  },
  "graph-paper-warm": {
    name: "graph-paper-warm",
    backgroundColor: "#fff7ed",
    lineColor: "#fed7aa",
    accentColor: "#ea580c",
    opacity: 0.7,
    gridSize: 42,
  },
};

export function getGraphPaperBackground(name = "graph-paper-light"): GraphPaperBackground {
  if (isBackgroundPresetName(name)) return graphPaperBackgrounds[name];

  const available = Object.keys(graphPaperBackgrounds).join(", ");
  throw new Error(`Unknown background: ${name}. Expected one of: ${available}.`);
}

export function isBackgroundPresetName(name: string): name is BackgroundPresetName {
  return name in graphPaperBackgrounds;
}

export function graphPaperBackgroundImage(background: GraphPaperBackground): string {
  const line = hexToRgba(background.lineColor, background.opacity);
  return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`;
}

function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
