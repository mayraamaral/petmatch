export type ButtonVariant =
  | "primary"
  | "tertiary"
  | "success"
  | "danger"
  | "warning"
  | "iconText"
  | "link"
  | "icon";

export type ButtonShape = "rounded" | "pill";
export type ButtonSize = "sm" | "md" | "lg";

export const BUTTON_DEFAULT_VARIANT: ButtonVariant = "primary";
export const BUTTON_DEFAULT_SIZE: ButtonSize = "md";
export const BUTTON_DEFAULT_FULL_WIDTH = true;
export const BUTTON_DEFAULT_ICON_NAME = "help-circle-outline";

export const BUTTON_SHAPE_STYLE_KEY_BY_SHAPE = {
  rounded: undefined,
  pill: "pillShape",
} as const;

export const BUTTON_LABEL_STYLE_KEY_BY_VARIANT = {
  primary: "primaryLabel",
  tertiary: "tertiaryLabel",
  success: "successLabel",
  danger: "dangerLabel",
  warning: "warningLabel",
  iconText: "primaryLabel",
  link: "linkLabel",
  icon: "noLabel",
} as const;

export const BUTTON_CONTAINER_SIZE_STYLE_KEY_BY_SIZE = {
  sm: "sizeSm",
  md: "sizeMd",
  lg: "sizeLg",
} as const;

export const BUTTON_ICON_CONTAINER_SIZE_STYLE_KEY_BY_SIZE = {
  sm: "iconSizeSm",
  md: "iconSizeMd",
  lg: "iconSizeLg",
} as const;

export const BUTTON_LABEL_SIZE_STYLE_KEY_BY_SIZE = {
  sm: "labelSm",
  md: "labelMd",
  lg: "labelLg",
} as const;

export const BUTTON_ICON_GLYPH_SIZE_BY_SIZE = {
  sm: 20,
  md: 24,
  lg: 28,
} as const;
