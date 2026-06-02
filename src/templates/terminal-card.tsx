import { graphPaperBackgroundImage } from "../backgrounds/index.ts";
import type { ResolvedGenerateOptions } from "../core/types.ts";
import { getTerminalTheme } from "../frames/index.ts";
import { TerminalFrame } from "../frames/terminal.tsx";

export function TerminalCard(
  {
    title,
    description,
    eyebrow,
    site,
    repo,
    path,
    typography,
    background,
    terminal,
    theme,
    width,
    height,
  }: ResolvedGenerateOptions,
) {
  const terminalTheme = getTerminalTheme(terminal);
  const label = eyebrow || path || repo || site || `terminal / ${terminalTheme.name}`;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 72,
        backgroundColor: background.backgroundColor,
        backgroundImage: graphPaperBackgroundImage(background),
        backgroundSize: `${background.gridSize}px ${background.gridSize}px`,
        fontFamily: typography.sans,
        color: theme.ink,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 980, gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              color: theme.accent,
              fontFamily: typography.mono,
              fontSize: 24,
            }}
          >
            {label}
          </div>
          <h1
            style={{
              display: "flex",
              margin: 0,
              color: terminalTheme.name === "mac" ? theme.ink : theme.accent,
              fontFamily: typography.heading,
              fontSize: 64,
              fontWeight: typography.heading === "Instrument Serif" ? 400 : 700,
              letterSpacing: "-0.055em",
              lineHeight: 0.95,
            }}
          >
            {title}
          </h1>
        </div>
        <TerminalFrame title={site || "opengrapher"} theme={terminalTheme}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              fontFamily: typography.mono,
            }}
          >
            <div style={{ display: "flex", fontSize: 28 }}>
              <span style={{ color: theme.accent }}>$</span>
              <span>&nbsp;{path || "deno task og --template terminal"}</span>
            </div>
            <div style={{ display: "flex", fontSize: 34, lineHeight: 1.28 }}>{description}</div>
            {(repo || site) && (
              <div style={{ display: "flex", gap: 20, color: theme.muted, fontSize: 22 }}>
                {repo && <span>{repo}</span>}
                {site && <span>{site}</span>}
              </div>
            )}
          </div>
        </TerminalFrame>
      </div>
    </div>
  );
}
