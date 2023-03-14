import { createComponentFactory, createControllableSignal } from '@starry-ui/hooks';
import { IconCircleX } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { createMemo, Show } from 'solid-js';

import { getTextLength } from './hook';
import type { StarryTextareaProps } from './input-type';

export function Textarea(props: StarryTextareaProps) {
    const [value, setValue] = createControllableSignal({
        value: () => props.value,
    });

    const {
        classes,
        directives,
        props: InputProps,
        otherProps,
        rootStyle,
    } = createComponentFactory({
        name: 'input',
        props: props,
        propDefaults: {
            size: 'medium',
            align: 'left',
            placeholder: '请输入',
            niceCount: false,
            clearable: false,
        },
        selfPropNames: [
            'size',
            'align',
            'showCount',
            'maxLength',
            'niceCount',
            'onInput',
            'onFocus',
            'onClear',
            'value',
            'focusSelect',
            'resize',
            'clearable',
        ],
        classes: (state) => ({
            view: ['view'],
            textarea: ['view-textarea'],
            size: [`view-${state.size}`],
            readonly: [state.readOnly && 'view-readonly'],
            disabled: [state.disabled && 'view-disabled'],
            align: [state.align && `view-${state.align}`],
            controls: ['controls'],
            controlsShow: [
                (value() && state.clearable) ||
                (state.showCount && !state.clearable) ||
                (state.showCount && state.maxLength)
                    ? 'controls-show'
                    : false,
            ],

            resize: ['resize-' + state.resize],
            showCount: ['show-count'],
            clear: ['clear'],
        }),
    });

    const handleClear = (): void => {
        if (InputProps.onClear) {
            InputProps.onClear('');
        }
        setValue('');
    };

    const getCheckNumStr = createMemo(() => {
        const v = value() || '';
        if (InputProps.showCount && InputProps.maxLength) {
            return getTextLength(v, InputProps.niceCount) + ' / ' + props.maxLength;
        } else if (InputProps.showCount) {
            return getTextLength(v, InputProps.niceCount);
        } else {
            return false;
        }
    });

    const handleInput: StarryTextareaProps['onInput'] = (event) => {
        const newEvent = event;
        const v = event.currentTarget.value;
        if (InputProps.maxLength) {
            if (v.length <= InputProps.maxLength) {
                setValue(v);
            }
            for (let i = 0; i <= v.length - 1; i++) {
                if (getTextLength(v.slice(0, i), InputProps.niceCount) >= InputProps.maxLength) {
                    newEvent.currentTarget.value = v.slice(0, i);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    newEvent.target.value = v.slice(0, i);
                    setValue(v.slice(0, i));
                }
            }
        } else {
            setValue(v);
        }

        if (!InputProps.onInput) return;
        InputProps.onInput(newEvent);
    };

    const handleFocus: StarryTextareaProps['onFocus'] = (event) => {
        if (InputProps.focusSelect) {
            event.currentTarget.select();
        }
        if (!InputProps.onFocus) return;
        InputProps.onFocus(event);
    };

    return (
        <div
            style={rootStyle()}
            class={clsx(
                classes.view,
                classes.textarea,
                classes.size,
                classes.readonly,
                classes.disabled,
                classes.propsClass,
            )}
        >
            <textarea
                class={classes.resize}
                ref={directives}
                value={value()}
                onInput={handleInput}
                onFocus={handleFocus}
                {...otherProps}
            />

            <Show when={InputProps.showCount || InputProps.clearable}>
                <div class={clsx(classes.controls, classes.controlsShow)}>
                    <Show when={getCheckNumStr()}>
                        <div class={classes.showCount}>{getCheckNumStr()}</div>
                    </Show>

                    <Show when={InputProps.clearable}>
                        <div onClick={handleClear} class={classes.clear}>
                            <IconCircleX size={16} />
                        </div>
                    </Show>
                </div>
            </Show>
        </div>
    );
}
