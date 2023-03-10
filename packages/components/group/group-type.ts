import { CommonProps, StarrySizeType } from '@starry-ui/types';
import { JSX } from 'solid-js';

interface StarryGroupOptions extends CommonProps {
    position?: 'left' | 'right' | 'center' | 'apart';
    grow?: boolean;
    noWrap?: boolean;
    spacing?: StarrySizeType | number;
    /** Defines align-items css property */
    align?: JSX.CSSProperties['align-items'];
}

export type StarryGroupProps = StarryGroupOptions & JSX.HTMLElementTags['div'];
