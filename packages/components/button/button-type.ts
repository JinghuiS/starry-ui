import { StarryColorType, CommonProps, StarrySizeType } from "@starry-ui/types";
import { Component, JSX } from "solid-js";

export type StarryButtonTypes = StarryColorType;

export interface StarryButtonOptions extends CommonProps {
  colorType?: StarryButtonTypes;
  size?: StarrySizeType;
  loading?: boolean;
  round?: boolean;
  disabled?: boolean;
}

export type StarryButtonProps = JSX.HTMLElementTags["button"] &
  StarryButtonOptions;
