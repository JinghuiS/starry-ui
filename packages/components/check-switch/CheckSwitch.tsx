import clsx from "clsx";
import { createSignal } from "solid-js";
import { createComponentFactory } from "../utils/createComponentFactory";
import type { StarryCheckSwitchProps } from "./check-switch-type";

export function CheckSwitch(props: StarryCheckSwitchProps) {
  const CheckSwitchValue: () => boolean = () =>
    (props.value != null ? props.value : false) as boolean;

  const [value, setValue] = createSignal(CheckSwitchValue());
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
    if (!props.onClick) return;
    props.onClick(value());
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
