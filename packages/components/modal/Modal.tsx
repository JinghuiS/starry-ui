import { Portal } from "solid-js/web";
import { useDOMCreate } from "@starry-ui/hooks";
import {
  createEffect,
  createSignal,
  mergeProps,
  Show,
  type FlowProps,
} from "solid-js";
import { type StarryModalProps } from "./modal-type";
import { createComponentFactory } from "../utils/createComponentFactory";
import clsx from "clsx";
import { addUnit } from "../utils/dom/style";
import { SlowShow } from "../SlowShow/SlowShow";

export function Modal(props: FlowProps<StarryModalProps>) {
  const node = useDOMCreate("starry-modal");
  const { props: ModalProps, classes } = createComponentFactory({
    name: "modal",
    props: props,
    propDefaults: {
      width: "50%",
      height: "20%",
      title: "",
      visible: false,
      maskClose: true,
    },
    selfPropNames: [
      "width",
      "height",
      "title",
      "visible",
      "style",
      "class",
      "onMaskClick",
      "maskClose",
      "onClose",
    ],
    classes: (state) => ({
      box: ["box"],
    }),
  });

  const ModalPropsVisible: () => boolean = () =>
    (ModalProps.visible != null ? ModalProps.visible : false) as boolean;

  const [visible, setVisible] = createSignal(ModalPropsVisible());

  let visibleTimer: number | undefined;

  createEffect(() => {
    if (!props.visible) {
      clearTimeout(visibleTimer);
      visibleTimer = setTimeout(() => {
        setVisible(ModalPropsVisible());
      }, 250);
    } else {
      setVisible(ModalPropsVisible());
    }
  });

  const hide = () => {
    setVisible(false);
    if (!ModalProps.onClose) return;
    ModalProps.onClose();
  };
  const ModalMaskStyles = () => {
    return {
      animation: visible() ? "starryModalOpen 0.25s" : "starryModalClose 0.25s",
    };
  };

  const ModalBoxStyles = () => {
    return mergeProps(
      {
        animation: visible()
          ? "starryModalBoxOpen 0.25s"
          : "starryModalBoxClose 0.25s",
        width: addUnit(ModalProps.width),
        height: addUnit(ModalProps.height),
      },
      ModalProps.style
    );
  };
  const handleMaskClick = () => {
    if (ModalProps.maskClose) {
      hide();
    }
    if (!ModalProps.onMaskClick) return;
    ModalProps.onMaskClick();
  };

  return (
    <Portal mount={node}>
      <SlowShow when={visible()}>
        <div
          onClick={handleMaskClick}
          class={clsx(classes.base)}
          style={ModalMaskStyles()}
        >
          <div
            class={clsx(classes.box, ModalProps.class)}
            style={ModalBoxStyles()}
          >
            {props.children}
          </div>
        </div>
      </SlowShow>
    </Portal>
  );
}
