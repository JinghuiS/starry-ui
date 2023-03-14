import { createComponentFactory } from '@starry-ui/hooks';
import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';
import type { StarrySelectOptionProps } from './select-type';
import { useSelectContext } from './SelectContext';

export function SelectOption(props: StarrySelectOptionProps) {
    const selectContext = useSelectContext();

    const { classes, props: SelectOptionProps } = createComponentFactory({
        name: 'select-option',
        props,
        propDefaults: {
            value: '',
            label: '',
        },
        selfPropNames: ['class', 'directives', 'disabled', 'label', 'style', 'value'],
        classes: (state) => ({
            disabled: [state.disabled && 'disabled'],
            label: ['label'],
            slot: ['slot'],
            checked: [state.value === selectContext?.value() && 'checked'],
        }),
    });

    const getChecked = (value: string | number) => {
        SelectOptionProps.value === selectContext?.value();
    };

    const handleChangeValue = () => {
        selectContext?.setValue(SelectOptionProps.value);
        if (SelectOptionProps.label) {
            selectContext?.setLabel(SelectOptionProps.label);
        }
        selectContext?.popoverRef()?.hide();
    };

    const isVisible = () => selectContext?.visible(SelectOptionProps.label);

    const optionVisibleStyle = () => {
        if (isVisible()) {
            return '';
        } else {
            return {
                display: 'none',
            };
        }
    };

    return (
        <Show when={isVisible()}>
            <label>
                <div class={clsx(classes.base, classes.disabled, classes.checked)}>
                    <Show when={!props.children} fallback={<div class={classes.slot}></div>}>
                        <Switch>
                            <Match when={!selectContext?.multiple}>
                                <div onClick={handleChangeValue} class={classes.label}>
                                    {SelectOptionProps.label}
                                </div>
                            </Match>
                        </Switch>
                    </Show>
                </div>
            </label>
        </Show>
    );
}
