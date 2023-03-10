import { StarryColorType, CommonProps, StarrySizeType } from '@starry-ui/types';
import { Component, JSX } from 'solid-js';

export type StarryTagTypes = StarryColorType;

export interface StarryTagOptions extends CommonProps {
    colorType?: StarryTagTypes;
    size?: StarrySizeType;
    loading?: boolean;
    round?: boolean;
    maxWidth?: string | number;
    closable?: boolean;
    disabled?: boolean;
    bold?: boolean;
    left?: JSX.Element;
    right?: JSX.Element;
    onClose?: (
        event: MouseEvent & {
            currentTarget: HTMLDivElement;
            target: Element;
        },
    ) => void;
}

export type StarryTagProps = StarryTagOptions;
