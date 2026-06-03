import type { ReactNode } from "react";
import { backgroundImage } from "../core/bg.ts";
import { getTerminalTheme } from "../core/frames.ts";
import type { TerminalFrameTheme } from "../core/frames.ts";
import type { ResolvedGenerateOptions } from "../core/types.ts";
import { BlobBackdrop } from "./blob.tsx";
import { FluentIcon } from "./icons.tsx";

export type TerminalFrameProps = {
  title?: string;
  theme: TerminalFrameTheme;
  children: ReactNode;
};

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
  const baseTerminalTheme = getTerminalTheme(terminal);
  const terminalTheme = terminal === "gnome"
    ? baseTerminalTheme
    : {
      ...baseTerminalTheme,
      border: `1px solid ${theme.accent}`,
      background: theme.surface,
      titleBar: theme.surface,
      titleColor: theme.muted,
      body: baseTerminalTheme.body,
      bodyColor: baseTerminalTheme.bodyColor,
    };
  const label = eyebrow || path || repo || site || `terminal / ${terminalTheme.name}`;
  const gridUnit = background.gridSize;
  const sidePadding = gridUnit * 1.5;
  const topPadding = 72;
  const innerWidth = width - sidePadding * 2;
  const innerHeight = height - topPadding - sidePadding;

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        overflow: "hidden",
        justifyContent: "center",
        backgroundColor: background.backgroundColor,
        backgroundImage: backgroundImage(background),
        backgroundSize: `${background.gridSize}px ${background.gridSize}px`,
        fontFamily: typography.sans,
        color: theme.ink,
      }}>
      {background.kind === "blobs" ? <BlobBackdrop background={background} /> : null}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: innerWidth,
          height: innerHeight,
          marginTop: topPadding,
          gap: 18,
        }}>
        <div
          style={{
            display: "flex",
            color: theme.accent,
            fontFamily: typography.mono,
            fontSize: 24,
          }}>
          {label}
        </div>

        <TerminalFrame title={site || "opengrapher"} theme={terminalTheme}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              fontFamily: typography.mono,
            }}>
            <div style={{ display: "flex", fontSize: 28 }}>
              <span style={{ color: theme.accent }}>$</span>
              <span>&nbsp;{path || "deno task og --template terminal"}</span>
            </div>

            <h1
              style={{
                display: "flex",
                margin: 0,
                color: theme.accent,
                fontFamily: typography.heading,
                fontSize: 72,
                fontWeight:
                  typography.heading === "Instrument Serif"
                    || typography.heading.startsWith("Monaspace")
                    ? 400
                    : 700,
                letterSpacing: "-0.055em",
                lineHeight: 0.95,
              }}>
              {title}
            </h1>

            <div
              style={{
                display: "flex",
                color: terminalTheme.bodyColor,
                fontSize: 34,
                lineHeight: 1.28,
              }}>
              {description}
            </div>
            {repo || site
              ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 32,
                    width: "100%",
                    color: terminalTheme.bodyColor,
                    fontSize: 22,
                  }}>
                  {repo ? <span>{repo}</span> : <span />}
                  {site ? <span style={{ textAlign: "right" }}>{site}</span> : null}
                </div>
              )
              : null}
          </div>
        </TerminalFrame>
      </div>
    </div>
  );
}

export function TerminalFrame({ title = "opengrapher", theme, children }: TerminalFrameProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        overflow: "hidden",
        border: theme.border,
        borderRadius: theme.borderRadius,
        background: theme.background,
        boxShadow: theme.shadow,
      }}>
      <div
        style={{
          height: theme.chromeHeight,
          display: "flex",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          background: theme.titleBar,
          color: theme.titleColor,
          fontSize: 22,
          fontWeight: 700,
        }}>
        {renderControls(theme)}
        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>{title}</div>
        {renderTrailingControls(theme)}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 34,
          minHeight: 260,
          background: theme.body,
          color: theme.bodyColor,
        }}>
        {children}
      </div>
    </div>
  );
}

function renderControls(theme: TerminalFrameTheme) {
  if (theme.control === "stoplight") {
    return (
      <div style={{ display: "flex", gap: 10, width: 86 }}>
        {controlDot("#ff5f57")}
        {controlDot("#ffbd2e")}
        {controlDot("#28c840")}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: theme.control === "windows" || theme.control === "win95" ? 112 : 86,
      }} />
  );
}

function renderTrailingControls(theme: TerminalFrameTheme) {
  if (theme.control === "windows") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 16,
          width: 112,
        }}>
        <FluentIcon name="minimize" />
        <FluentIcon name="maximize" />
        <FluentIcon name="close" />
      </div>
    );
  }

  if (theme.control === "win95") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, width: 112 }}>
        {win95Button("minimize")}
        {win95Button("maximize")}
        {win95Button("close")}
      </div>
    );
  }

  if (theme.control === "gnome") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", width: 86 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 999,
            color: "#3d3846",
            background: "#deddda",
          }}>
          <FluentIcon name="close" size={16} />
        </div>
      </div>
    );
  }

  return <div style={{ display: "flex", width: 86 }} />;
}

function win95Button(name: "minimize" | "maximize" | "close") {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 22,
        borderTop: "2px solid #ffffff",
        borderLeft: "2px solid #ffffff",
        borderRight: "2px solid #404040",
        borderBottom: "2px solid #404040",
        color: "#000000",
        background: "#c0c0c0",
      }}>
      <FluentIcon name={name} size={14} />
    </div>
  );
}

function controlDot(color: string) {
  return <div style={{ width: 14, height: 14, borderRadius: 999, background: color }} />;
}
