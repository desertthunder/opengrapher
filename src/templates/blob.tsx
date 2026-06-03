import { blobSvgDataUri } from "../core/bg.ts";
import type { BlobBackground } from "../core/bg.ts";

export type BlobBackdropProps = { background: BlobBackground; };

export function BlobBackdrop({ background }: BlobBackdropProps) {
  return (
    <img
      alt=""
      src={blobSvgDataUri(background)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "fill",
        pointerEvents: "none",
      }} />
  );
}
