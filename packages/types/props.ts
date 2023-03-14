import { JSX } from 'solid-js';

type Directive = (el: Element) => void;
export interface CommonProps {
    class?: string;
    onClick?: (...args: any) => void;
    style?: JSX.CSSProperties | string;
    directives?: Directive[];
}
