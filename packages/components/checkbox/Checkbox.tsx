import { createComponentFactory } from '@starry-ui/hooks';
import clsx from 'clsx';
import { createSignal, Show } from 'solid-js';
import { useCheckboxGroupContext } from './CheckboxContent';
import { type StarryCheckboxProps } from './checkbox-type';

export function Checkbox(props: StarryCheckboxProps) {
    const checkboxContext = useCheckboxGroupContext();

    const [checked, setChecked] = createSignal<boolean>(
        checkboxContext ? checkboxContext.value()?.includes(props.value || '') || false : props.checked || false,
    );
    const {
        classes,
        otherProps,
        props: CheckboxProps,
        directives,
        rootStyle,
    } = createComponentFactory({
        name: 'checkbox',
        selfPropNames: [
            'label',
            'size',
            'block',
            'iconable',
            'checked',
            'disabled',
            'value',
            'onClick',
            'indeterminate',
        ],
        props: props,
        propDefaults: {
            label: '',
            size: 'medium',
            iconable: true,
            disabled: checkboxContext?.disabled,
        },
        classes: (state) => ({
            size: [state.size],
            block: [state.block && 'block'],
            checked: [checked() && 'checked'],
            indeterminate: [state.indeterminate && checked() && 'indeterminate'],
            iconable: [!state.iconable && 'unicon'],
            label: ['label'],
            disabled: [state.disabled && 'disabled'],
        }),
    });

    const handleChecked = (event: Event) => {
        event.stopPropagation();
        !props.disabled && !checkboxContext?.disabled && setChecked(!checked());
        if (checkboxContext) {
            checkboxContext?.setValue((o) => {
                if (!props.value) {
                    return o;
                }
                if (!o) {
                    return [props?.value];
                }
                if (o?.includes(props.value)) {
                    return o.filter((it) => it != props.value);
                } else {
                    return [...o, props.value];
                }
            });
        }

        props.onClick && props.onClick(checked());
    };

    return (
        <div
            ref={directives}
            class={clsx(
                classes.base,
                classes.size,
                classes.block,
                classes.iconable,
                classes.checked,
                classes.disabled,
                classes.propsClass,
                classes.indeterminate,
            )}
            style={rootStyle()}
            onClick={handleChecked}
            {...otherProps}
        >
            <Show when={CheckboxProps.iconable}>
                <div class="icon-checkbox-box">
                    <svg
                        class="icon-checkbox"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
            </Show>

            <input
                style={{
                    display: 'none',
                }}
                type="radio"
                disabled={CheckboxProps.disabled}
                checked={checked()}
            />
            <Show when={CheckboxProps.label}>
                <span class={clsx(classes.label)}> {CheckboxProps.label}</span>
            </Show>
        </div>
    );
}
