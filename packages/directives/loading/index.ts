import { createEffect, onMount } from "solid-js";

type Props = {
  isShow: boolean;
  title: string;
};

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      starryLoading: Partial<Props>;
    }
  }
}

function starryLoading(el: Element, content: () => Partial<Props>) {
  let loadingBox: HTMLElement;
  onMount(() => {
    el.classList.add("starry-loading");
    loadingBox = document.createElement("div");
    loadingBox.classList.add("starry-loading-box");
    loadingBox.setAttribute("data-after", content().title || "");
    el.appendChild(loadingBox);
    if (content().isShow) {
      el.classList.add("starry-loading-show");
    }
  });
  createEffect(() => {
    const { title, isShow } = content();
    loadingBox.setAttribute("data-after", title || "");
    if (isShow) {
      el.classList.add("starry-loading-show");
    } else {
      el.classList.remove("starry-loading-show");
    }
  });
}

export { starryLoading };
