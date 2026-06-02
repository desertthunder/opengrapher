import type { ReactNode } from "react";
import { render } from "takumi-js";
import type { FontDefinition, OutputFormat } from "./types.ts";

export type RenderOptions = {
  element: ReactNode;
  fonts: FontDefinition[];
  width: number;
  height: number;
  format: OutputFormat;
};

export async function renderImage(options: RenderOptions): Promise<Uint8Array> {
  const image = await render(options.element, {
    width: options.width,
    height: options.height,
    format: options.format,
    fonts: options.fonts,
  });

  return image instanceof Uint8Array ? image : new Uint8Array(image);
}
