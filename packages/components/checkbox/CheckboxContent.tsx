import { type Accessor, createContext, useContext } from 'solid-js';

export interface CheckboxGroupContextValue {
    value: Accessor<Array<number | boolean | string> | undefined>;
    setValue: (
        next:
            | Array<string | boolean | number>
            | undefined
            | ((prev: Array<number | string | boolean> | undefined) => Array<boolean | number | string> | undefined),
    ) => void;
    disabled?: boolean;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue>();
export function useCheckboxGroupContext() {
    const context = useContext(CheckboxGroupContext);
    return context;
}
