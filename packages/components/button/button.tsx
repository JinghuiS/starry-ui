import clsx from "clsx";
import type { FlowProps } from "solid-js";
import { createComponentFactory } from "../utils/createComponentFactory";
import type { StarryButtonProps } from "./button-type";

export function Button(props: FlowProps<StarryButtonProps>) {
  const {
    classes,
    otherProps,
    props: ButtonProps,
    directives,
  } = createComponentFactory({
    name: "button",
    selfPropNames: ["colorType", "loading", "size", "disabled", "round"],
    props: props,
    propDefaults: {
      size: "medium",
      colorType: "primary",
    },
    classes: (state) => ({
      type: [state.colorType],
      size: [state.size],
      loading: [state.loading && "loading"],
      loadingIcon: [
        state.loading && "loading-icon",
        state.loading && !state.disabled && "loading-icon-show",
      ],
      round: [state.round && "round"],
    }),
  });

  const handleClick = (
    event: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => {
    if (props.disabled || props.loading || !props.onClick) return;

    props.onClick(event);
  };

  return (
    <button
      ref={directives}
      class={clsx(
        classes.base,
        classes.size,
        classes.type,
        classes.loading,
        classes.round
      )}
      onClick={handleClick}
      {...otherProps}
    >
      {props.children}
      <div class={classes.loadingIcon} />
    </button>
  );
}
