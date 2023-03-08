import { Component, JSX } from "solid-js";

/**
 * All HTML and SVG elements.
 */
export type DOMElements = keyof JSX.IntrinsicElements;
/**
 * Represent any HTML element or SolidJS component.
 */
export type ElementType<Props = any> = DOMElements | Component<Props>;

export interface CommonProps {
  class?: string;
  onClick?: (event: Event) => void;
}

export type StarrySizeType = "small" | "medium" | "large";
export type StarryColorType =
  | "primary"
  | "normal"
  | "success"
  | "error"
  | "warning";
