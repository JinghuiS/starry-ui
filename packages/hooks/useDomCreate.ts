import { onCleanup } from "solid-js";

export function useDOMCreate(nodeId: string) {
  const node = document.createElement("div");
  node.id = nodeId;
  document.body.appendChild(node);
  onCleanup(() => {
    if (node) document.body.removeChild(node);
  });

  return node;
}
