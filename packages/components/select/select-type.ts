import { CommonProps, StarrySizeType } from '@starry-ui/types';
import { JSX } from 'solid-js';
import { Props } from 'tippy.js';

export interface StarrySelectProps extends CommonProps {
    value?: string | number | Array<string> | Array<number>;
    placement?: Props['placement'];
    trigger?: Props['trigger'];
    multiple?: boolean;
    align?: JSX.CSSProperties['text-align'];
    showIcon?: boolean;
    size?: StarrySizeType;
    placeholder?: string;
    disabled?: boolean;
    filterable?: boolean;
}

export interface StarrySelectOptionProps extends CommonProps {
    value: string | number;
    disabled?: boolean;
    label: string;
    children?: JSX.Element;
}
