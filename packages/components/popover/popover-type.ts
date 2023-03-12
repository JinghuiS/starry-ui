import { CommonProps } from '@starry-ui/types';
import { JSX } from 'solid-js';
import { Props } from 'tippy.js';

export type StarryPopoverEvent = {
    show: () => void;
    hide: () => void;
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StarryPopoverProps extends Partial<Props> {}

type StarryPopoverRef = HTMLDivElement & { show: () => void; hide: () => void };

interface StarryPopoverProps extends CommonProps {
    popoverBody?: (event: StarryPopoverEvent) => JSX.Element | JSX.Element;
    ref?: (v: StarryPopoverRef) => void;
}

export { StarryPopoverProps, StarryPopoverRef };
