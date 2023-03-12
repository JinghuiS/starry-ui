import { CommonProps } from '@starry-ui/types';
import { JSX } from 'solid-js';

export type StarryFlexLocation = 'start' | 'end' | 'center';
export type StarryFlexModal = 'around' | 'between';

interface FlexOptions extends CommonProps {
    direction?: 'x' | 'y';
    wrap?: boolean;
    y?: StarryFlexLocation;
    x?: StarryFlexLocation;
    mode?: StarryFlexModal;
    gap?: string | number;
    width?: string | number;
}

export type StarryFlexProps = FlexOptions & JSX.HTMLElementTags['div'];
