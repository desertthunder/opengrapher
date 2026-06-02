export type TerminalStyleName = "mac" | "windows" | "gnome" | "win95";

export type TerminalFrameTheme = {
  name: TerminalStyleName;
  chromeHeight: number;
  borderRadius: number;
  border: string;
  background: string;
  titleBar: string;
  titleColor: string;
  body: string;
  bodyColor: string;
  shadow: string;
  control: "stoplight" | "windows" | "gnome" | "win95";
};
