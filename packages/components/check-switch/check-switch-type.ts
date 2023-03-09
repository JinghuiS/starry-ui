import { JSX } from "solid-js";
import { CommonProps } from "../type";

interface StarryCheckSwitchOptions extends CommonProps {
  round?: boolean;
  disabled?: boolean;
  loading?: boolean;
  value?: boolean;
  onClick?: (v: boolean) => void;
}

export type StarryCheckSwitchProps = JSX.HTMLElementTags["input"] &
  StarryCheckSwitchOptions;
