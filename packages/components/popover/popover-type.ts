import { CommonProps } from '@starry-ui/types';
import { JSX } from 'solid-js';
import { Props } from 'tippy.js';

export type StarryPopoverEvent = {
    show: () => void;
    hide: () => void;
};
interface StarryPopoverProps extends Partial<Props> {}
interface StarryPopoverProps extends CommonProps {
    popoverBody?: (event: StarryPopoverEvent) => JSX.Element | JSX.Element;
}
export { StarryPopoverProps };
