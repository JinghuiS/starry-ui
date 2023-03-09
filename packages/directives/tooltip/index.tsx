import { type JSX, onMount, onCleanup } from "solid-js";
import { renderToString, render } from "solid-js/web";
import tippy, { type Instance, type Props } from "tippy.js";

interface TooltipProps extends Partial<Omit<Props, "content">> {
  content: JSX.Element;
  readonly maxWidth: number;
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      tooltip: TooltipProps;
    }
  }
}

function tooltip(el: Element, props: () => TooltipProps) {
  let instance: Instance<Props>;

  let contentBox: HTMLElement;

  onMount(() => {
    const { content, ..._props } = props();
    contentBox = document.createElement("div");
    render(() => <>{content}</>, contentBox);
    instance = tippy(el, {
      ..._props,
      content: contentBox,
      maxWidth: 250,
      appendTo: () => document.body,
      animation: "shift-away-subtle",
      interactive: true,
      onShow(_instance) {
        _instance.setContent(contentBox || "");
        const node = document.getElementsByTagName("html")[0];
        if (node.classList.contains("starry-dark")) {
          _instance.popper.children[0].setAttribute("data-theme", "dark");
        } else {
          _instance.popper.children[0].setAttribute("data-theme", "light");
        }
      },
    });
    instance.popper.children[0].setAttribute("data-starry", "tooltip");
    onCleanup(() => {
      //@ts-ignore
      instance = null;
    });
  });
}

export { tooltip };
