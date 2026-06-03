// Vendored from @fluentui/svg-icons 1.1.305:
// dismiss_16_regular.svg, square_16_regular.svg, subtract_16_regular.svg
// https://github.com/microsoft/fluentui-system-icons

export type FluentIconName = "close" | "maximize" | "minimize";

const paths: Record<FluentIconName, string> = {
  close:
    "m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z",
  maximize:
    "M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5v-7ZM4.5 3C3.67 3 3 3.67 3 4.5v7c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5h-7Z",
  minimize: "M3 8c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8Z",
};

export function FluentIcon({ name, size = 16 }: { name: FluentIconName; size?: number; }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "flex", flexShrink: 0 }}>
      <path d={paths[name]} />
    </svg>
  );
}
