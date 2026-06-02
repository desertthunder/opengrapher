import { graphPaperBackgroundImage } from "../backgrounds/index.ts";
import type { ResolvedGenerateOptions } from "../core/types.ts";
import { getTerminalTheme } from "../frames/index.ts";
import { TerminalFrame } from "../frames/terminal.tsx";

export function TerminalCard(
  { title, description, typography, background, terminal, width, height }: ResolvedGenerateOptions,
) {
  const theme = getTerminalTheme(terminal);

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
        color: "#111827",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 980, gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              color: background.accentColor,
              fontFamily: typography.mono,
              fontSize: 24,
            }}
          >
            terminal / {theme.name}
          </div>
          <h1
            style={{
              display: "flex",
              margin: 0,
              color: theme.name === "mac" ? "#0f172a" : background.accentColor,
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
        <TerminalFrame title="opengrapher" theme={theme}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              fontFamily: typography.mono,
            }}
          >
            <div style={{ display: "flex", fontSize: 28 }}>
              <span style={{ color: background.accentColor }}>$</span>
              <span>&nbsp;deno task og --template terminal</span>
            </div>
            <div style={{ display: "flex", fontSize: 34, lineHeight: 1.28 }}>{description}</div>
          </div>
        </TerminalFrame>
      </div>
    </div>
  );
}
