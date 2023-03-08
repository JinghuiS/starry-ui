import { onMount } from "solid-js";
import tippy, { Instance, Props } from "tippy.js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      tooltip: Partial<Props>;
    }
  }
}

function tooltip(el: Element, content: () => Partial<Props>) {
  let instance: Instance<Props>;

  onMount(() => {
    instance = tippy(el, {
      ...content(),
      maxWidth: 250,
      appendTo: () => document.body,
      animation: "shift-away-subtle",
      interactive: true,
      onShow(_instance) {
        _instance.setContent(content().content || "");
        const node = document.getElementsByTagName("html")[0];
        if (node.classList.contains("lew-dark")) {
          _instance.popper.children[0].setAttribute("data-theme", "dark");
        } else {
          _instance.popper.children[0].setAttribute("data-theme", "light");
        }
      },
    });

    instance.popper.children[0].setAttribute("data-lew", "tooltip");
  });
}

export { tooltip };
