import { Resvg } from "@resvg/resvg-js";
import type { ReactNode } from "react";
import satori from "satori";
import type { FontDefinition, OutputFormat } from "./types.ts";

export type RenderOptions = {
  element: ReactNode;
  fonts: FontDefinition[];
  width: number;
  height: number;
  format: OutputFormat;
};

export async function renderImage(options: RenderOptions): Promise<Uint8Array> {
  const svg = await renderSvg(options);

  if (options.format === "svg") {
    return new TextEncoder().encode(svg);
  }

  const renderer = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: options.width,
    },
  });

  return renderer.render().asPng();
}

export async function renderSvg(options: Omit<RenderOptions, "format">): Promise<string> {
  return await satori(options.element, {
    width: options.width,
    height: options.height,
    fonts: options.fonts,
  });
}
