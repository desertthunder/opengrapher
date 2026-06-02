import type { CSSProperties } from "react";

export type Style = CSSProperties;

export function flexColumn(style: Style = {}): Style {
  return { display: "flex", flexDirection: "column", ...style };
}

export function flexRow(style: Style = {}): Style {
  return { display: "flex", flexDirection: "row", ...style };
}
