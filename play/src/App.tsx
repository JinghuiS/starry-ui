import { type Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import {
  Button,
  CheckSwitch,
  Input,
  Tag,
  Textarea,
} from "@starry-ui/components";
import { tooltip, starryLoading } from "@starry-ui/directives";

const App: Component = () => {
  const [loading, setLoading] = createSignal(false);

  const [v, setV] = createSignal("111");

  return (
    <div class={styles.App}>
      <div use:tooltip={{ content: v }}>112121</div>
      <CheckSwitch />
      <Button
        onClick={() => {
          setV("点了");
          setLoading(!loading());
        }}
      >
        1
      </Button>
      <div use:starryLoading={{ isShow: loading() }} style={{ width: "300px" }}>
        <Input showCount maxLength={5} />
        <Textarea showCount maxLength={5} style={{ "margin-top": "20px" }} />
      </div>
    </div>
  );
};

export default App;
