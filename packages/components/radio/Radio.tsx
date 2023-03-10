import {
  createComponentFactory,
  createControllableBooleanSignal,
} from "@starry-ui/hooks";
import clsx from "clsx";
import { type FlowProps, Show } from "solid-js";

import type { StarryRadioProps } from "./radio-type";
import { useRadioGroupContext } from "./RadioContent";

export function Radio(props: StarryRadioProps) {
  const radioContext = useRadioGroupContext();

  const [checked, setChecked] = createControllableBooleanSignal({
    value: () =>
      radioContext ? radioContext.value() === props.value : props.checked,
    onChange: (value) => {
      if (radioContext) {
        radioContext.setValue(props.value);
      }
      if (!props.onClick) return;
      props.onClick(value);
    },
  });
  const {
    classes,
    otherProps,
    props: RadioProps,
    directives,
  } = createComponentFactory({
    name: "radio",
    selfPropNames: [
      "label",
      "size",
      "block",
      "iconable",
      "checked",
      "disabled",
    ],
    props: props,
    propDefaults: {
      size: "medium",
      iconable: true,
      disabled: radioContext?.disabled,
    },
    classes: (state) => ({
      size: [state.size],
      block: [state.block && "block"],
      checked: [checked() && "checked"],
      iconable: [!state.iconable && "unicon"],
      label: ["label"],
      disabled: [state.disabled && "disabled"],
    }),
  });

  const handleChecked = () => {
    !props.disabled && !radioContext?.disabled && setChecked(true);
  };

  return (
    <div
      ref={directives}
      class={clsx(
        classes.base,
        classes.size,
        classes.block,
        classes.iconable,
        classes.checked,
        classes.disabled
      )}
      onClick={handleChecked}
      {...otherProps}
    >
      <Show when={RadioProps.iconable}>
        <div class="icon-radio-box">
          <div class="icon-radio"></div>
        </div>
      </Show>

      <input
        style={{
          display: "none",
        }}
        type="radio"
        disabled={RadioProps.disabled}
        checked={checked()}
      />
      <Show when={RadioProps.label}>
        <span class={clsx(classes.label)}> {RadioProps.label}</span>
      </Show>
    </div>
  );
}
