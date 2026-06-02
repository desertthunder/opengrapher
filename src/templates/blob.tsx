import { blobColor } from "../core/bg.ts";
import type { BlobBackground } from "../core/bg.ts";

export type BlobBackdropProps = {
  background: BlobBackground;
};

export function BlobBackdrop({ background }: BlobBackdropProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {background.layers.map((layer, index) => (
        <div
          key={`${background.name}-${index}`}
          style={{
            position: "absolute",
            left: layer.x,
            top: layer.y,
            width: layer.width,
            height: layer.height,
            borderRadius: 999,
            background: blobColor(layer),
          }}
        />
      ))}
    </div>
  );
}
