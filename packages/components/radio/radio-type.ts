import { CommonProps, StarrySizeType } from "@starry-ui/types";

export interface StarryRadioOptions extends CommonProps {
  size?: StarrySizeType;
  block?: boolean;
  label?: string;
  iconable?: boolean;
  checked?: boolean;
  value?: any;
  disabled?: boolean;
  onClick?: (value: any) => void;
}

export interface StarryRadioGroupOptions extends CommonProps {
  value?: string;
  block?: boolean;
  iconable?: boolean;
  direction?: string;
  size?: StarrySizeType;
  disabled?: boolean;
  onChange?: (value: string) => void;
  //   onClick?: (value: string) => void;
}

export type StarryRadioProps = StarryRadioOptions;
export type StarryRadioGroupProps = StarryRadioGroupOptions;
