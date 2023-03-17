import { CommonProps, StarrySizeType } from '@starry-ui/types';
import { JSX } from 'solid-js';
import { Props } from 'tippy.js';
export interface StarryCascaderOptionsProps extends CommonProps {
    value: string | number;
    label: string;
    children?: StarryCascaderOptionsProps[];
    disabled?: boolean;
    multiple?: boolean;
    checkValue?: Props['cascaderValue'];
    onClickMimultiple?: (...args: any) => void;
}
export interface StarryCascaderProps extends CommonProps {
    value?: Props['cascaderValue'];
    placement?: Props['placement'];
    trigger?: Props['trigger'];
    multiple?: boolean;
    align?: JSX.CSSProperties['text-align'];
    showIcon?: boolean;
    size?: StarrySizeType;
    placeholder?: string;
    disabled?: boolean;
    filterable?: boolean;
    header?: JSX.Element;
    options: StarryCascaderOptionsProps[];
}

export interface StarryCascaderOptionsForProps extends CommonProps {
    options?: StarryCascaderOptionsProps[];
    multiple?: boolean;
    onSelect?: (...args: any) => void;
}

export type valueProps = Props['cascaderValue'];
