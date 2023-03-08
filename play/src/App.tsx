import { type Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Button, Tag } from "@starry-ui/components";
import { tooltip } from "@starry-ui/directives";

const App: Component = () => {
  const [loading, setLoading] = createSignal(false);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button
          directives={[
            (el) => {
              tooltip(el, () => ({
                content: "111",
                placement: "bottom",
              }));
            },
          ]}
        >
          1
        </Button>
        <div
          use:tooltip={{
            content: "111",
            placement: "bottom",
            trigger: "click",
          }}
        >
          11
        </div>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
