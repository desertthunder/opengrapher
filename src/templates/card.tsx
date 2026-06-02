import { graphPaperBackgroundImage } from "../backgrounds/index.ts";
import type { ResolvedGenerateOptions } from "../core/types.ts";
import { tokens } from "../theme/tokens.ts";

export function ProjectCard(
  { title, description, eyebrow, site, repo, path, typography, background, theme, width, height }:
    ResolvedGenerateOptions,
) {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: background.backgroundColor,
        backgroundImage: graphPaperBackgroundImage(background),
        backgroundSize: `${background.gridSize}px ${background.gridSize}px`,
        fontFamily: typography.sans,
        color: theme.ink,
      }}
    >
      <div
        style={{
          width: 980,
          minHeight: 390,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          border: `1px solid ${tokens.color.border}`,
          borderRadius: tokens.radius.card,
          background: theme.surface,
          boxShadow: tokens.shadow.card,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: theme.muted,
            fontSize: 28,
            fontFamily: typography.mono,
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: theme.accent,
            }}
          />
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 82,
              lineHeight: 0.95,
              letterSpacing: "-0.065em",
              fontFamily: typography.heading,
              fontWeight: typography.heading === "Instrument Serif" ? 400 : 700,
              color: theme.ink,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 760,
              fontSize: 34,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
              color: theme.muted,
            }}
          >
            {description}
          </p>
        </div>

        {(site || repo || path) && (
          <div
            style={{
              display: "flex",
              gap: 22,
              color: theme.muted,
              fontFamily: typography.mono,
              fontSize: 22,
            }}
          >
            {repo && <span>{repo}</span>}
            {site && <span>{site}</span>}
            {path && <span>{path}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
