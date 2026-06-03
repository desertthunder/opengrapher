export type GraphPaperBackgroundName =
  | "graph-paper-light"
  | "graph-paper-dark"
  | "graph-paper-indigo"
  | "graph-paper-warm";

export type BlobBackgroundName =
  | "blobs-soft"
  | "blobs-gooey"
  | "blobs-editorial"
  | "blobs-solid"
  | "blobs-duotone";
export type BackgroundPresetName = GraphPaperBackgroundName | BlobBackgroundName;

export type BlobShape = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  color2?: string;
  opacity: number;
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
      blob(760, -96, 360, 250, "#60a5fa", 0.34),
      blob(1010, 190, 340, 280, "#a78bfa", 0.26),
      blob(170, 506, 420, 260, "#2dd4bf", 0.24),
      blob(-150, 180, 320, 260, "#93c5fd", 0.2),
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
      blob(-150, -140, 360, 360, "#38bdf8", 0.38),
      blob(35, -105, 260, 260, "#818cf8", 0.32),
      blob(-115, 55, 260, 260, "#22d3ee", 0.3),
      blob(990, -140, 360, 360, "#818cf8", 0.36),
      blob(905, -105, 260, 260, "#22d3ee", 0.3),
      blob(1055, 55, 260, 260, "#38bdf8", 0.28),
      blob(990, 410, 360, 360, "#22d3ee", 0.3),
      blob(905, 475, 260, 260, "#38bdf8", 0.26),
      blob(1055, 335, 260, 260, "#818cf8", 0.26),
      blob(-150, 410, 360, 360, "#4ade80", 0.22),
      blob(35, 475, 260, 260, "#38bdf8", 0.24),
      blob(-115, 335, 260, 260, "#22d3ee", 0.24),
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
      blob(785, 40, 330, 290, "#fb923c", 0.28),
      blob(960, 300, 250, 230, "#facc15", 0.3),
      blob(65, 430, 360, 220, "#f472b6", 0.18),
    ],
  },
  "blobs-solid": {
    kind: "blobs",
    name: "blobs-solid",
    backgroundColor: "#eff6ff",
    accentColor: "#2563eb",
    lineColor: "#bfdbfe",
    opacity: 0.44,
    gridSize: 42,
    gooey: false,
    blur: 0,
    layers: [
      blob(-115, -60, 340, 280, "#2563eb", 1),
      blob(960, -80, 360, 290, "#2563eb", 1),
      blob(940, 440, 380, 280, "#2563eb", 1),
      blob(-150, 430, 360, 280, "#2563eb", 1),
    ],
  },
  "blobs-duotone": {
    kind: "blobs",
    name: "blobs-duotone",
    backgroundColor: "#f8fafc",
    accentColor: "#7c3aed",
    lineColor: "#ddd6fe",
    opacity: 0.42,
    gridSize: 42,
    gooey: false,
    blur: 0,
    layers: [
      blob(-130, 80, 360, 300, "#7c3aed", 1, "#06b6d4"),
      blob(110, 500, 360, 220, "#7c3aed", 1, "#06b6d4"),
      blob(880, -90, 380, 300, "#06b6d4", 1, "#7c3aed"),
      blob(980, 300, 340, 300, "#06b6d4", 1, "#7c3aed"),
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

export function blobSvgDataUri(background: BlobBackground): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(blobSvg(background))}`;
}

function blobSvg(background: BlobBackground): string {
  const filterId = `${background.name}-filter`;
  const filter = background.gooey
    ? `<filter id="${filterId}" x="-300" y="-300" width="1800" height="1230" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${background.blur}" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
        <feBlend in="SourceGraphic" in2="goo"/>
      </filter>`
    : `<filter id="${filterId}" x="-300" y="-300" width="1800" height="1230" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${background.blur}"/>
      </filter>`;
  const gradients = background.layers.map((layer, index) => {
    const gradientId = `${background.name}-gradient-${index}`;
    const opacity = Math.min(layer.opacity + 0.18, 0.82);
    if (layer.color2) {
      return `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${escapeSvg(layer.color)}" stop-opacity="${layer.opacity}"/>
        <stop offset="100%" stop-color="${
        escapeSvg(layer.color2)
      }" stop-opacity="${layer.opacity}"/>
      </linearGradient>`;
    }

    return `<radialGradient id="${gradientId}" cx="35%" cy="28%" r="74%">
        <stop offset="0%" stop-color="${escapeSvg(layer.color)}" stop-opacity="${opacity}"/>
        <stop offset="100%" stop-color="${escapeSvg(layer.color)}" stop-opacity="${layer.opacity}"/>
      </radialGradient>`;
  }).join("\n");

  const renderedPaths = background.layers.map((layer, index) =>
    `<path d="${blobPath(layer, index)}" fill="url(#${background.name}-gradient-${index})"/>`
  ).join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" preserveAspectRatio="none">
    <defs>${filter}${gradients}</defs>
    <g filter="url(#${filterId})">${renderedPaths}</g>
  </svg>`;
}

function blobPath(shape: BlobShape, seed: number): string {
  const pointCount = shape.width > 320 ? 12 : 10;
  const centerX = shape.x + shape.width / 2;
  const centerY = shape.y + shape.height / 2;
  const radiusX = shape.width / 2;
  const radiusY = shape.height / 2;
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = (Math.PI * 2 * index) / pointCount;
    const jitter = 0.78 + seededUnit(seed, index) * 0.32;
    return {
      x: centerX + Math.cos(angle) * radiusX * jitter,
      y: centerY + Math.sin(angle) * radiusY * jitter,
    };
  });

  return points.map((point, index) => {
    if (index === 0) return `M ${round(point.x)} ${round(point.y)}`;

    const previous = points[index - 1];
    const previousPrevious = points[(index - 2 + pointCount) % pointCount];
    const next = points[(index + 1) % pointCount];
    const control1 = {
      x: previous.x + (point.x - previousPrevious.x) / 6,
      y: previous.y + (point.y - previousPrevious.y) / 6,
    };
    const control2 = {
      x: point.x - (next.x - previous.x) / 6,
      y: point.y - (next.y - previous.y) / 6,
    };
    return `C ${round(control1.x)} ${round(control1.y)} ${round(control2.x)} ${round(control2.y)} ${
      round(point.x)
    } ${round(point.y)}`;
  }).concat(closeCurve(points)).join(" ");
}

function closeCurve(points: Array<{ x: number; y: number; }>): string {
  const last = points.at(-1)!;
  const first = points[0];
  const previous = points.at(-2)!;
  const next = points[1];
  const control1 = {
    x: last.x + (first.x - previous.x) / 6,
    y: last.y + (first.y - previous.y) / 6,
  };
  const control2 = { x: first.x - (next.x - last.x) / 6, y: first.y - (next.y - last.y) / 6 };

  return `C ${round(control1.x)} ${round(control1.y)} ${round(control2.x)} ${round(control2.y)} ${
    round(first.x)
  } ${round(first.y)} Z`;
}

function seededUnit(seed: number, index: number): number {
  const value = Math.sin((seed + 1) * 97.13 + (index + 1) * 37.91) * 10000;
  return value - Math.floor(value);
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function escapeSvg(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;");
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
  color2?: string,
): BlobShape {
  return { x, y, width, height, color, color2, opacity };
}

function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
