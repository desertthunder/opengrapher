import { gnome } from "./gnome.ts";
import { mac } from "./mac.ts";
import type { TerminalStyleName } from "./types.ts";
import { win95 } from "./win95.ts";
import { windows } from "./windows.ts";

export const terminalThemes = {
  mac,
  windows,
  gnome,
  win95,
} as const;

export function getTerminalTheme(name = "mac") {
  if (isTerminalStyleName(name)) return terminalThemes[name];

  const available = Object.keys(terminalThemes).join(", ");
  throw new Error(`Unknown terminal style: ${name}. Expected one of: ${available}.`);
}

export function isTerminalStyleName(name: string): name is TerminalStyleName {
  return name in terminalThemes;
}

export type { TerminalFrameTheme, TerminalStyleName } from "./types.ts";
