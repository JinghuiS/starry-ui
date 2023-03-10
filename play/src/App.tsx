import { type Component, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import {
  Button,
  CheckSwitch,
  Input,
  Modal,
  Popover,
  Tag,
  Textarea,
  Title,
} from "@starry-ui/components";
import { tooltip, starryLoading } from "@starry-ui/directives";

const App: Component = () => {
  const [loading, setLoading] = createSignal(false);

  const [v, setV] = createSignal("111");

  return (
    <div class={styles.App}>
      <div use:tooltip={{ content: v }}>112121</div>
      <div>
        <Input
          value={v()}
          onInput={(v) => {
            setV(v.currentTarget.value);
          }}
          showCount
          maxLength={5}
        />
      </div>
      <Modal
        onClose={() => {
          setLoading(false);
        }}
        visible={loading()}
      >
        <div>12121</div>
      </Modal>

      <Popover popoverBody={() => <div>测试k</div>}>
        <Button
          onClick={() => {
            setV("点了");
            setLoading(!loading());
          }}
        >
          1
        </Button>
      </Popover>

      <Button colorType={"success"}>ces</Button>

      <Title bold>121211212</Title>

      <div use:starryLoading={{ isShow: loading() }} style={{ width: "300px" }}>
        <CheckSwitch />
        <Textarea showCount maxLength={5} style={{ "margin-top": "20px" }} />
      </div>
    </div>
  );
};

export default App;
