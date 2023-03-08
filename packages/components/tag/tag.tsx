import clsx from "clsx";
import { type FlowProps, Show } from "solid-js";
import { createComponentFactory } from "../utils/createComponentFactory";
import type { StarryTagProps } from "./tag-type";

export function Tag(props: FlowProps<StarryTagProps>) {
  const {
    classes,
    otherProps,
    props: TagProps,
    directives,
  } = createComponentFactory({
    name: "tag",
    selfPropNames: [
      "colorType",
      "loading",
      "size",
      "disabled",
      "bold",
      "closable",
      "maxWidth",
      "round",
      "left",
      "right",
    ],
    props: props,
    propDefaults: {
      size: "medium",
      colorType: "primary",
    },
    classes: (state) => ({
      type: [state.colorType],
      size: [state.size],
      closableIcon: [
        state.closable && "closable-icon",
        state.closable && !state.disabled && "closable-icon-show",
      ],
      round: [state.round && "round"],
      bold: [state.bold && "bold"],
      disabled: [state.disabled && "disabled"],
      left: [state.left ? "left" : false],
      right: [state.right ? "right" : false],
      value: ["value"],
    }),
  });

  const handleClick = (
    event: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) => {
    if (props.disabled || !props.onClick) return;
    props.onClick(event);
  };
  const handleClose = (
    event: MouseEvent & {
      currentTarget: HTMLDivElement;
      target: Element;
    }
  ) => {
    event.stopPropagation();
    if (props.disabled || !props.onClose) return;
    props.onClose(event);
  };
  return (
    <div
      ref={directives}
      class={clsx(
        classes.base,
        classes.size,
        classes.type,
        classes.round,
        classes.bold,
        classes.disabled
      )}
      onClick={handleClick}
      {...otherProps}
    >
      <div class={classes.left}>{TagProps.left}</div>
      <div class={classes.value}>{props.children}</div>
      <div class={classes.right}>{TagProps.right}</div>
      <Show when={TagProps.closable}>
        <div class={classes.closableIcon} onClick={handleClose} />
      </Show>
    </div>
  );
}
