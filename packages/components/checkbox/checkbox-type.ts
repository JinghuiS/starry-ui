import { CommonProps, StarrySizeType } from '@starry-ui/types';

export interface StarryCheckboxOptions extends CommonProps {
    size?: StarrySizeType;
    block?: boolean;
    label: string;
    iconable?: boolean;
    checked?: boolean;
    disabled?: boolean;
    value?: string | number | boolean;
    indeterminate?: boolean;
}

export interface StarryCheckboxGroupOptions extends CommonProps {
    value?: Array<string | number | boolean>;
    block?: boolean;
    iconable?: boolean;
    direction?: string;
    size?: StarrySizeType;
    disabled?: boolean;
    onChange?: (...args: any) => void;
}

export type StarryCheckboxProps = StarryCheckboxOptions;
export type StarryCheckboxGroupProps = StarryCheckboxGroupOptions;
