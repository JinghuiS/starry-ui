import { CommonProps, StarryStateType } from '@starry-ui/types';
import { JSX } from 'solid-js';

interface StarryResultOptions extends CommonProps {
    state?: StarryStateType;
    title?: JSX.Element;
    content?: JSX.Element;
    icon?: JSX.Element;
}

export type StarryResultProps = StarryResultOptions & JSX.HTMLElementTags['div'];
