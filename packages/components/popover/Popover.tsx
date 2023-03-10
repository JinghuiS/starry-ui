import { type FlowProps, onMount } from "solid-js";
import tippy, { type Instance, type Props } from "tippy.js";
import { createComponentFactory } from "../utils/createComponentFactory";
import type { StarryPopoverProps } from "./popover-type";

export function Popover(props: FlowProps<StarryPopoverProps>) {
  let instance: Instance<Props>;
  let triggerRef: HTMLLabelElement;
  let bodyRef: HTMLDivElement;

  const {
    classes,
    props: PopoverProps,
    otherProps,
  } = createComponentFactory({
    props: props,
    name: "popover",
    selfPropNames: ["popoverBody"],
    propDefaults: {
      placement: "top",
    },
    classes: () => ({
      trigger: ["trigger"],
      body: ["body"],
    }),
  });

  onMount(() => {
    instance = tippy(triggerRef, {
      theme: "light",
      content: bodyRef,
      animation: "shift-away-subtle",
      interactive: true,
      arrow: false,
      appendTo: () => document.body,
      allowHTML: true,
      maxWidth: "none",
      onShow(instance) {
        const node = document.getElementsByTagName("html")[0];
        if (node.classList.contains("starry-dark")) {
          instance.popper.children[0].setAttribute("data-theme", "dark");
        } else {
          instance.popper.children[0].setAttribute("data-theme", "light");
        }
      },
    });
  });

  const show = () => {
    return instance.show;
  };
  const hide = () => {
    return instance.hide;
  };

  const popoverBody = () => {
    if (!PopoverProps.popoverBody) {
      return "";
    }
    return PopoverProps.popoverBody({
      show: show,
      hide: hide,
    });
  };

  return (
    <div class={classes.base}>
      <label ref={(el) => (triggerRef = el)} style="font-size: 0px">
        <div class={classes.trigger}>{props.children}</div>
      </label>

      <div ref={(el) => (bodyRef = el)} class={classes.body}>
        {popoverBody()}
      </div>
    </div>
  );
}