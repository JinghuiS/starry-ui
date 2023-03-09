import clsx from "clsx";
import { createSignal } from "solid-js";
import { Show } from "solid-js";
import { createComponentFactory } from "../utils/createComponentFactory";
import { getTextLength } from "./hook";
import type { StarryInputProps } from "./input-type";

export function Input(props: StarryInputProps) {
  const inputValue: () => string = () =>
    (props.value != null ? props.value : "") as string;

  const [value, setV] = createSignal(inputValue());

  const {
    classes,
    directives,
    props: InputProps,
    otherProps,
  } = createComponentFactory({
    name: "input",
    props: props,
    propDefaults: {
      size: "medium",
      align: "left",
      placeholder: "请输入",
      niceCount: false,
    },
    selfPropNames: [
      "size",
      "autoWidth",
      "align",
      "showCount",
      "showPassword",
      "maxLength",
      "niceCount",
      "onInput",
      "onFocus",
      "onClear",
      "value",
      "focusSelect",
      "style",
      "class",
    ],
    classes: (state) => ({
      view: ["view"],
      size: [`view-${state.size}`],
      readonly: [state.readOnly && "view-readonly"],
      disabled: [state.disabled && "view-disabled"],
      autoWidth: [state.autoWidth && "view-auto-width"],
      align: [state.align && `view-${state.align}`],

      controls: ["controls"],
      controlsShow: [
        (value() && state.showPassword) ||
        (value() && state.clearable) ||
        (state.showCount && !state.clearable && !state.showPassword) ||
        (state.showCount && state.maxLength)
          ? "controls-show"
          : false,
      ],
      showPassword: ["show-password"],
      showCount: ["show-count"],
    }),
  });

  const getCheckNumStr = () => {
    if (InputProps.showCount && InputProps.maxLength) {
      return (
        getTextLength(value(), InputProps.niceCount) + " / " + props.maxLength
      );
    } else if (InputProps.showCount) {
      return getTextLength(value(), InputProps.niceCount);
    } else {
      return false;
    }
  };

  const handleInput: StarryInputProps["onInput"] = (event) => {
    let v = event.currentTarget.value;
    if (InputProps.maxLength) {
      setV(v);
      for (let i = 0; i <= v.length - 1; i++) {
        if (
          getTextLength(v.slice(0, i), InputProps.niceCount) >=
          InputProps.maxLength
        ) {
          setV(v.slice(0, i));
        }
      }
    } else {
      setV(v);
    }

    if (!InputProps.onInput) return;
    let newEvent = event;
    newEvent.currentTarget.value = value();
    //@ts-ignore
    newEvent.target.value = value();
    InputProps.onInput(newEvent);
  };

  const handleFocus: StarryInputProps["onFocus"] = (event) => {
    if (InputProps.focusSelect) {
      event.currentTarget.select();
    }
    if (!InputProps.onFocus) return;
    InputProps.onFocus(event);
  };

  return (
    <div
      style={InputProps.style}
      class={clsx(
        classes.view,
        classes.size,
        classes.readonly,
        classes.disabled,
        classes.autoWidth
      )}
    >
      <input
        ref={directives}
        value={value()}
        onInput={handleInput}
        onFocus={handleFocus}
        {...otherProps}
      />
      <Show when={InputProps.autoWidth}>
        <label class="input-auto-width">{value()}</label>
      </Show>

      <Show
        when={
          InputProps.showCount ||
          InputProps.showPassword ||
          InputProps.clearable
        }
      >
        <div class={clsx(classes.controls, classes.controlsShow)}>
          <div class={classes.showCount}>{getCheckNumStr()}</div>
        </div>
      </Show>
    </div>
  );
}
