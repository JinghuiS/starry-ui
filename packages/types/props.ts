import { JSX } from "solid-js";

type Directive = (el: Element) => void;
export interface CommonProps {
  class?: string;
  onClick?: (event: any) => void;
  style?: JSX.CSSProperties | string;
  directives?: Directive[];
}
