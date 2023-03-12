import { Accessor, createSignal, onMount } from 'solid-js';
import { makeResizeObserver } from '../external';

export function createObserverElementSize(target: Accessor<Element | undefined | false | null>) {
    const [element, setElement] = createSignal<Element>();

    function handleObserverCallback(entries: ResizeObserverEntry[]) {
        for (const entry of entries) {
            setElement(entry.target);
        }
    }

    const { observe } = makeResizeObserver(handleObserverCallback);

    onMount(() => {
        const t = target();
        if (t) {
            observe(t);
        }
    });

    return element;
}
