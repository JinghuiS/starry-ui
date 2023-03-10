import {
  createComponentFactory,
  createControllableBooleanSignal,
} from "@starry-ui/hooks";
import clsx from "clsx";
import { createEffect, createSignal } from "solid-js";

import type { StarryCheckSwitchProps } from "./check-switch-type";

export function CheckSwitch(props: StarryCheckSwitchProps) {
  const [value, setValue] = createControllableBooleanSignal({
    value: () => props.value,
    onChange: (value) => {
      if (!props.onClick) return;
      props.onClick(value);
    },
  });

  const {
    props: CheckSwitchProps,
    classes,
    otherProps,
    directives,
  } = createComponentFactory({
    name: "switch",
    props: props,
    selfPropNames: ["value", "round", "disabled", "loading", "onClick"],
    propDefaults: {
      round: true,
    },
    classes: (state) => ({
      round: [state.round && "round"],
      checked: [value() && "checked"],
      loading: [state.loading && "loading"],
      dot: ["dot"],
    }),
  });

  const handleClick = () => {
    if (props.disabled || props.loading) return;
    setValue(!value());
  };

  return (
    <div
      class={clsx(
        classes.baseView,
        classes.round,
        classes.checked,
        classes.loading
      )}
      onClick={handleClick}
    >
      <input
        ref={directives}
        style={{
          display: "none",
        }}
        type="checkbox"
        checked={value()}
        disabled={props.disabled}
        {...otherProps}
      />
      <div class={classes.dot} />
    </div>
  );
}
