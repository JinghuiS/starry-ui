import { type Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { Button, Input, Tag, Textarea } from "@starry-ui/components";
import { tooltip } from "@starry-ui/directives";

const App: Component = () => {
  const [loading, setLoading] = createSignal(false);

  return (
    <div class={styles.App}>
      <Button>1</Button>
      <div
        use:tooltip={{
          content: "111",
        }}
      >
        11
      </div>
      <div style={{ width: "300px" }}>
        <Input showCount maxLength={5} />
        <Textarea showCount maxLength={5} style={{ "margin-top": "20px" }} />
      </div>
    </div>
  );
};

export default App;
