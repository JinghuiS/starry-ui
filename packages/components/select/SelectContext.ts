import { Accessor, createContext, useContext } from 'solid-js';
import { StarryPopoverRef } from '../popover';
import { StarrySelectProps } from './select-type';

export interface SelectContextValue {
    value: Accessor<StarrySelectProps['value']>;
    label: Accessor<string>;
    setLabel: (next: string | ((prev: string) => string)) => void;
    setValue: (next: string | number | ((prev: StarrySelectProps['value']) => StarrySelectProps['value'])) => void;
    multiple: boolean;
    popoverRef: Accessor<StarryPopoverRef | undefined>;
    visible: (label: string) => boolean;
}

export const SelectContext = createContext<SelectContextValue>();
export function useSelectContext() {
    const context = useContext(SelectContext);
    return context;
}
