import { onCleanup } from 'solid-js';

export function useDOMCreate() {
    const node = document.createElement('div');

    document.body.appendChild(node);
    onCleanup(() => {
        if (node) document.body.removeChild(node);
    });
    return node;
}
