import type { ReactNode } from "react";
import type { TerminalFrameTheme } from "./types.ts";

export type TerminalFrameProps = {
  title?: string;
  theme: TerminalFrameTheme;
  children: ReactNode;
};

export function TerminalFrame({ title = "opengrapher", theme, children }: TerminalFrameProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "hidden",
        border: theme.border,
        borderRadius: theme.borderRadius,
        background: theme.background,
        boxShadow: theme.shadow,
      }}
    >
      <div
        style={{
          height: theme.chromeHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          background: theme.titleBar,
          color: theme.titleColor,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        {renderControls(theme)}
        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>{title}</div>
        {renderTrailingControls(theme)}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 34,
          minHeight: 260,
          background: theme.body,
          color: theme.bodyColor,
        }}
      >
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

  if (theme.control === "gnome") {
    return <div style={{ display: "flex", width: 86, fontSize: 24 }}>●</div>;
  }

  return <div style={{ display: "flex", width: 86 }} />;
}

function renderTrailingControls(theme: TerminalFrameTheme) {
  if (theme.control === "windows") {
    return <div style={{ display: "flex", justifyContent: "flex-end", width: 86 }}>— ×</div>;
  }

  if (theme.control === "win95") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 28,
          height: 24,
          borderTop: "2px solid #ffffff",
          borderLeft: "2px solid #ffffff",
          borderRight: "2px solid #404040",
          borderBottom: "2px solid #404040",
          color: "#000000",
          background: "#c0c0c0",
          fontSize: 18,
        }}
      >
        ×
      </div>
    );
  }

  return <div style={{ display: "flex", width: 86 }} />;
}

function controlDot(color: string) {
  return <div style={{ width: 14, height: 14, borderRadius: 999, background: color }} />;
}
