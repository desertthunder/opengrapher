export type GraphPaperBackgroundName =
  | "graph-paper-light"
  | "graph-paper-dark"
  | "graph-paper-indigo"
  | "graph-paper-warm";

export type BlobBackgroundName = "blobs-soft" | "blobs-gooey" | "blobs-editorial";
export type BackgroundPresetName = GraphPaperBackgroundName | BlobBackgroundName;

export type BlobShape = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  radius: string;
};

export type GraphPaperBackground = {
  kind: "graph-paper";
  name: GraphPaperBackgroundName;
  backgroundColor: string;
  lineColor: string;
  accentColor: string;
  opacity: number;
  gridSize: number;
};

export type BlobBackground = {
  kind: "blobs";
  name: BlobBackgroundName;
  backgroundColor: string;
  accentColor: string;
  lineColor: string;
  opacity: number;
  gridSize: number;
  gooey: boolean;
  blur: number;
  layers: BlobShape[];
};

export type BackgroundPreset = GraphPaperBackground | BlobBackground;

const graphPaperBackgrounds: Record<GraphPaperBackgroundName, GraphPaperBackground> = {
  "graph-paper-light": graphPaper("graph-paper-light", "#f8fafc", "#dbe3ef", "#2563eb", 1),
  "graph-paper-dark": graphPaper("graph-paper-dark", "#0f172a", "#334155", "#38bdf8", 0.42),
  "graph-paper-indigo": graphPaper("graph-paper-indigo", "#eef2ff", "#c7d2fe", "#4f46e5", 0.8),
  "graph-paper-warm": graphPaper("graph-paper-warm", "#fff7ed", "#fed7aa", "#ea580c", 0.7),
};

const blobBackgrounds: Record<BlobBackgroundName, BlobBackground> = {
  "blobs-soft": {
    kind: "blobs",
    name: "blobs-soft",
    backgroundColor: "#f8fafc",
    accentColor: "#2563eb",
    lineColor: "#dbe3ef",
    opacity: 0.34,
    gridSize: 42,
    gooey: false,
    blur: 34,
    layers: [
      blob(845, 58, 300, 250, "#60a5fa", 0.34, "58% 42% 62% 38%"),
      blob(670, 335, 420, 260, "#a78bfa", 0.26, "44% 56% 41% 59%"),
      blob(50, 410, 340, 240, "#2dd4bf", 0.24, "62% 38% 53% 47%"),
    ],
  },
  "blobs-gooey": {
    kind: "blobs",
    name: "blobs-gooey",
    backgroundColor: "#0f172a",
    accentColor: "#38bdf8",
    lineColor: "#334155",
    opacity: 0.28,
    gridSize: 42,
    gooey: true,
    blur: 42,
    layers: [
      blob(740, 90, 260, 260, "#38bdf8", 0.38, "50%"),
      blob(910, 120, 250, 250, "#818cf8", 0.36, "50%"),
      blob(820, 250, 330, 240, "#22d3ee", 0.28, "50%"),
      blob(92, 402, 300, 250, "#4ade80", 0.18, "50%"),
    ],
  },
  "blobs-editorial": {
    kind: "blobs",
    name: "blobs-editorial",
    backgroundColor: "#fff7ed",
    accentColor: "#ea580c",
    lineColor: "#fed7aa",
    opacity: 0.36,
    gridSize: 42,
    gooey: false,
    blur: 22,
    layers: [
      blob(785, 40, 330, 290, "#fb923c", 0.28, "61% 39% 51% 49%"),
      blob(960, 300, 250, 230, "#facc15", 0.3, "46% 54% 40% 60%"),
      blob(65, 430, 360, 220, "#f472b6", 0.18, "53% 47% 65% 35%"),
    ],
  },
};

export function getBackground(name = "graph-paper-light"): BackgroundPreset {
  if (isGraphPaperBackgroundName(name)) return graphPaperBackgrounds[name];
  if (isBlobBackgroundName(name)) return blobBackgrounds[name];

  throw new Error(`Unknown background: ${name}. Expected one of: ${getBackgroundNames()}.`);
}

export function isBackgroundPresetName(name: string): name is BackgroundPresetName {
  return isGraphPaperBackgroundName(name) || isBlobBackgroundName(name);
}

export function isBlobBackgroundName(name: string): name is BlobBackgroundName {
  return name in blobBackgrounds;
}

export function isGraphPaperBackgroundName(name: string): name is GraphPaperBackgroundName {
  return name in graphPaperBackgrounds;
}

export function getBackgroundNames(): string {
  return [...Object.keys(graphPaperBackgrounds), ...Object.keys(blobBackgrounds)].join(", ");
}

export function backgroundImage(background: BackgroundPreset): string {
  const line = hexToRgba(background.lineColor, background.opacity);
  return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`;
}

export function blobColor(shape: BlobShape): string {
  return hexToRgba(shape.color, Math.min(shape.opacity + 0.18, 0.8));
}

function graphPaper(
  name: GraphPaperBackgroundName,
  backgroundColor: string,
  lineColor: string,
  accentColor: string,
  opacity: number,
): GraphPaperBackground {
  return {
    kind: "graph-paper",
    name,
    backgroundColor,
    lineColor,
    accentColor,
    opacity,
    gridSize: 42,
  };
}

function blob(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  opacity: number,
  radius: string,
): BlobShape {
  return { x, y, width, height, color, opacity, radius };
}

function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
