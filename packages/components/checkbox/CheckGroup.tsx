import { createComponentFactory, createControllableArraySignal, createControllableSignal } from '@starry-ui/hooks';
import clsx from 'clsx';
import { type FlowProps } from 'solid-js';
import type { StarryCheckboxGroupProps } from './checkbox-type';
import { CheckboxGroupContext, type CheckboxGroupContextValue } from './CheckboxContent';
export function CheckboxGroup(props: FlowProps<StarryCheckboxGroupProps>) {
    const [value, setValue] = createControllableArraySignal<string>({
        value: () => props.value,
        onChange: (v) => {
            if (props.disabled) return;
            if (props.onChange) {
                props.onChange(v);
            }
            if (!props.onClick) return;
            props.onClick(v);
        },
    });
    // const [value, setValue] = createSignal<string[]>([]);
    const { classes, otherProps, directives, rootStyle } = createComponentFactory({
        name: 'checkbox-group',
        selfPropNames: ['size', 'block', 'iconable', 'value', 'direction', 'disabled', 'onChange', 'onClick'],
        props: props,
        propDefaults: {
            value: [],
            iconable: true,
        },
        classes: (state) => ({
            direction: [state.direction],
            size: [state.size],
        }),
    });

    const context: CheckboxGroupContextValue = {
        value,
        setValue,
        disabled: props.disabled,
    };

    return (
        <CheckboxGroupContext.Provider value={context}>
            <div
                ref={directives}
                class={clsx(classes.base, classes.size, classes.direction, classes.propsClass)}
                style={rootStyle()}
                {...otherProps}
            >
                {props.children}
                <input value={value()} style={{ display: 'none' }} />
            </div>
        </CheckboxGroupContext.Provider>
    );
}
