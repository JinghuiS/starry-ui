import { CommonProps, StarrySizeType } from "@starry-ui/types";
import { JSX } from "solid-js";

export type StarryInputType = "input" | "textarea";

type StarryInputEvent = InputEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};
type StarryInputFocusEvent = FocusEvent & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export type StarryTextareaResize =
  | "horizontal"
  | "vertical"
  | "both"
  | "inline"
  | "none";

export type StarryInputAlign = "left" | "right" | "center";

export interface StarryInputOptions extends CommonProps {
  size?: StarrySizeType;
  disabled?: boolean;
  clearable?: boolean;

  autoWidth?: boolean;
  align?: StarryInputAlign;
  showPassword?: boolean;
  showCount?: boolean;
  niceCount?: boolean;
  focusSelect?: boolean;
  onClear?: (value: string) => void;
}
interface StarryTextareaOptions extends StarryInputOptions {
  resize?: StarryTextareaResize;
  rows?: number;
  cols?: number;
  onFocus?: (
    event: FocusEvent & {
      currentTarget: HTMLTextAreaElement;
      target: Element;
    }
  ) => void;
  onInput?: (
    event: InputEvent & {
      currentTarget: HTMLTextAreaElement;
      target: Element;
    }
  ) => void;
}

export type StarryTextareaProps = JSX.HTMLElementTags["textarea"] &
  StarryTextareaOptions;

export type StarryInputProps = JSX.HTMLElementTags["input"] &
  StarryInputOptions & {
    onFocus?: (event: StarryInputFocusEvent) => void;
    onInput?: (event: StarryInputEvent) => void;
  };
