import { JSX } from 'solid-js';
import { StarryResultProps } from '../result';

export interface StarryEmptyProps extends Omit<StarryResultProps, 'state'> {
    size?: number;
    children?: JSX.Element;
}
