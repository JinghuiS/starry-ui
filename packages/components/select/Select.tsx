import { createComponentFactory, createControllableSignal } from '@starry-ui/hooks';
import { createObserverElementSize } from '@starry-ui/utils';
import { IconChevronDown } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { createEffect, createMemo, createSignal, Match, onMount, Show, Switch, type FlowProps } from 'solid-js';
import { Popover, type StarryPopoverRef } from '../popover';
import { Tag } from '../tag';
import type { StarrySelectProps } from './select-type';
import { SelectContext, type SelectContextValue } from './SelectContext';

export function Select(props: FlowProps<StarrySelectProps>) {
    const [value, setValue] = createControllableSignal({
        value: () => props.value,
    });

    const [popoverRef, setPopoverRef] = createSignal<StarryPopoverRef>();
    const [selectRef, setSelectRef] = createSignal<HTMLDivElement>();
    const selectSize = createObserverElementSize(selectRef);

    const [showOptions, setShowOptions] = createSignal(false);

    const [label, setLabel] = createSignal('');

    const [multipleLabel, setMultipleLabel] = createSignal<string[]>([]);

    const {
        props: SelectProps,
        classes,
        otherProps,
    } = createComponentFactory({
        name: 'select',
        props,
        selfPropNames: [
            'align',
            'directives',
            'multiple',
            'placement',
            'showIcon',
            'size',
            'trigger',
            'value',
            'style',
            'class',
            'placeholder',
        ],
        propDefaults: {
            placement: 'bottom-start',
            trigger: 'click',
            multiple: false,
            align: 'left',
            showIcon: true,
            size: 'medium',
        },
        classes: (state) => ({
            icon: ['icon'],
            focus: [showOptions() && 'focus'],
            size: [state.size],
            align: [state.align],
            placeholder: ['placeholder'],
            label: [state.multiple ? 'label-multiple' : 'label-single'],
            optionsBox: ['options-box'],
            body: ['body', `body-${state.size}`, state.multiple && 'multiple-body', `body-align-${state.align}`],
        }),
    });

    const context: SelectContextValue = {
        value,
        multiple: SelectProps.multiple as boolean,
        label,
        setLabel,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setValue,
        popoverRef: popoverRef,
    };

    // onMount(() => {
    //     const dom = selectRef();
    //     if (!dom) return;
    //     setSelectWidth({ width: dom.offsetWidth - 18 + 'px' });
    // });

    const selectBoxWidth = createMemo(() => {
        const e = selectSize() as HTMLDivElement;
        if (e) {
            return e.offsetWidth - 12;
        } else {
            return 0;
        }
    });

    return (
        <SelectContext.Provider value={context}>
            <Popover
                placement={SelectProps.placement}
                trigger={SelectProps.trigger}
                onShow={() => {
                    setShowOptions(true);
                }}
                onHide={() => {
                    setShowOptions(false);
                }}
                popoverBody={() => (
                    <div class={clsx(classes.body)} style={{ width: selectBoxWidth() + 'px' }}>
                        <div class={classes.optionsBox}>{props.children}</div>
                    </div>
                )}
                ref={setPopoverRef}
                class={clsx(classes.baseView, classes.focus)}
                style={{ width: '100%' }}
            >
                <div ref={setSelectRef} class={clsx(classes.base, classes.size, classes.align)}>
                    <IconChevronDown class={classes.icon} size={16} />
                    <Show
                        when={
                            (!SelectProps.multiple && label().length === 0) ||
                            (SelectProps.multiple && multipleLabel().length === 0)
                        }
                    >
                        <div class={classes.placeholder}>{SelectProps.placeholder}</div>
                    </Show>

                    <Show when={SelectProps.multiple} fallback={<div class={classes.label}>{label()}</div>}>
                        <Switch>
                            <Match when={multipleLabel.length > 0}>
                                <Tag closable>{multipleLabel()[0]}</Tag>
                            </Match>
                        </Switch>
                    </Show>
                </div>
            </Popover>
        </SelectContext.Provider>
    );
}
