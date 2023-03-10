import { createEffect, createSignal, type FlowProps, Show } from "solid-js";

export function SlowShow<T>(
  props: FlowProps<{
    when: T | undefined | null | false;
  }>
) {
  const [when, setWhen] = createSignal(props.when);
  let whenTimer: number | undefined;

  createEffect(() => {
    if (props.when) {
      setWhen(props.when as any);
    } else {
      clearTimeout(whenTimer);
      whenTimer = setTimeout(() => {
        setWhen(props.when as any);
      }, 250);
    }
  });

  return <Show when={when()}>{props.children}</Show>;
}