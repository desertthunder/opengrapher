import { ensureDir } from "jsr:@std/fs@1.0.24/ensure-dir";
import { dirname } from "jsr:@std/path@1.1.5/dirname";
import { resolveOptions } from "../core/config.ts";
import { getFontPreset } from "../core/presets.ts";
import { renderImage } from "../core/render.ts";
import type { GenerateOptions, ResolvedGenerateOptions } from "../core/types.ts";
import { resolveFonts } from "../fonts/provider.ts";
import { ProjectCard } from "./card.tsx";
import { TerminalCard } from "./term.tsx";

export async function generateOg(options: GenerateOptions = {}): Promise<void> {
  const resolved = resolveOptions(options);
  const fonts = await resolveFonts(getFontPreset(resolved.fontPreset));
  const image = await renderImage({
    element: renderTemplate(resolved),
    fonts,
    width: resolved.width,
    height: resolved.height,
    format: resolved.format,
  });

  await ensureDir(dirname(resolved.out));
  await Deno.writeFile(resolved.out, image);

  console.log(`Wrote ${resolved.out}`);
}

function renderTemplate(options: ResolvedGenerateOptions) {
  if (options.template === "terminal") return <TerminalCard {...options} />;
  return <ProjectCard {...options} />;
}
