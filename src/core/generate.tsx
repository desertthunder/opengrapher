import { ensureDir } from "jsr:@std/fs@1.0.24/ensure-dir";
import { dirname } from "jsr:@std/path@1.1.5/dirname";
import { loadPhaseOneFonts } from "../fonts/ibm.ts";
import { ProjectCard } from "../templates/project-card.tsx";
import { resolveOptions } from "./config.ts";
import { renderImage } from "./render.ts";
import type { GenerateOptions } from "./types.ts";

export async function generateOg(options: GenerateOptions = {}): Promise<void> {
  const resolved = resolveOptions(options);
  const fonts = await loadPhaseOneFonts();
  const image = await renderImage({
    element: <ProjectCard {...resolved} />,
    fonts,
    width: resolved.width,
    height: resolved.height,
    format: resolved.format,
  });

  await ensureDir(dirname(resolved.out));
  await Deno.writeFile(resolved.out, image);

  console.log(`Wrote ${resolved.out}`);
}
