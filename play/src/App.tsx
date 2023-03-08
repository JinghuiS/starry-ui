import { Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Button } from "@starry-ui/components";

const App: Component = () => {
  const [loading, setLoading] = createSignal(false);
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <Button
          loading={loading()}
          onClick={() => {
            setLoading(true);
          }}
        >
          1
        </Button>
      </header>
    </div>
  );
};

export default App;
