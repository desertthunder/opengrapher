export type OutputFormat = "png" | "svg";

export type GenerateOptions = {
  title?: string;
  description?: string;
  out?: string;
  format?: OutputFormat;
  width?: number;
  height?: number;
};

export type ResolvedGenerateOptions = {
  title: string;
  description: string;
  out: string;
  format: OutputFormat;
  width: number;
  height: number;
};

export type FontWeight =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export type FontDefinition = {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight;
  style: "normal" | "italic";
};
