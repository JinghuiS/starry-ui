import { createComponentFactory, createControllableSignal } from "@starry-ui/hooks";
import clsx from "clsx";
import { type FlowProps } from "solid-js";
import type { StarryRadioGroupProps } from "./radio-type";
import { RadioGroupContext, type RadioGroupContextValue, useRadioGroupContext } from "./RadioContent";
export function RadioGroup(props: FlowProps<StarryRadioGroupProps>) {
    const [value, setValue] = createControllableSignal({
        value: () => props.value,
        onChange: (value) => {
            if (props.disabled) return;
            if (props.onChange) {
                props.onChange(value)
            }
            if (!props.onClick) return;
            props.onClick(value);
        },
    });
    const {
        classes,
        otherProps,
        directives,
    } = createComponentFactory({
        name: "radio-group",
        selfPropNames: [
            "size",
            "block",
            "iconable",
            "value",
            "direction",
            'disabled',
            "onChange",
            "onClick"
        ],
        props: props,
        propDefaults: {
            value: '',
            iconable: true
        },
        classes: (state) => ({
            direction: [state.direction],
            size: [state.size]
        }),
    });

    const context: RadioGroupContextValue = {
        value,
        setValue,
        disabled: props.disabled
    }
    return (
        <RadioGroupContext.Provider value={context} >
            <div
                ref={directives}
                class={clsx(
                    classes.base,
                    classes.size,
                    classes.direction
                )}
                {...otherProps}
            >
                {props.children}
                <input value={value()} style={{ display: 'none' }} />
            </div>
        </RadioGroupContext.Provider>
    );
}
