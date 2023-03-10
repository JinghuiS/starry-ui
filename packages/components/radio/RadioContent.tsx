import { type Accessor, createContext, useContext } from 'solid-js';

export interface RadioGroupContextValue {
    value: Accessor<string | undefined>;
    setValue: (next: string | ((prev: string) => string)) => void;
    disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue>();
export function useRadioGroupContext() {
    const context = useContext(RadioGroupContext);

    // if (context === undefined) {
    //     throw new Error(
    //         "[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component"
    //     );
    // }

    return context;
}
