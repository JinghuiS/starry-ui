import { JSX } from "solid-js";
import { CommonProps } from "../type";

export interface StarryModalProps extends CommonProps {
  visible: boolean;
  height?: number | string;
  width?: number | string;
  title?: JSX.Element;
  onMaskClick?: () => void;
  maskClose?: boolean;
  onClose?: () => void;
}
