import { createComponentFactory, createControllableSignal } from '@starry-ui/hooks';
import { IconCircleX, IconEye, IconEyeOff } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { createMemo, createSignal } from 'solid-js';
import { Show } from 'solid-js';

import { getTextLength } from './hook';
import type { StarryInputProps } from './input-type';

export function Input(props: StarryInputProps) {
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
            showCount: false,
            showPassword: false,
        },
        selfPropNames: [
            'size',
            'autoWidth',
            'align',
            'showCount',
            'showPassword',
            'maxLength',
            'niceCount',
            'onInput',
            'onFocus',
            'onClear',
            'value',
            'focusSelect',

            'type',
            'clearable',
        ],
        classes: (state) => ({
            view: ['view'],
            size: [`view-${state.size}`],
            readonly: [state.readOnly && 'view-readonly'],
            disabled: [state.disabled && 'view-disabled'],
            autoWidth: [state.autoWidth && 'view-auto-width'],
            align: [state.align && `view-${state.align}`],
            controls: ['controls'],
            controlsShow: [
                (value() && state.showPassword) ||
                (value() && state.clearable) ||
                (state.showCount && !state.clearable && !state.showPassword) ||
                (state.showCount && state.maxLength)
                    ? 'controls-show'
                    : false,
            ],
            showPassword: ['show-password'],
            showCount: ['show-count'],
            clear: ['clear'],
        }),
    });

    const [_type, setType] = createSignal(InputProps.type);

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

    const handleInput: StarryInputProps['onInput'] = (event) => {
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
    const handleClear = (): void => {
        if (InputProps.onClear) {
            InputProps.onClear('');
        }
        setValue('');
    };

    const handleFocus: StarryInputProps['onFocus'] = (event) => {
        if (InputProps.focusSelect) {
            event.currentTarget.select();
        }
        if (!InputProps.onFocus) return;
        InputProps.onFocus(event);
    };
    const showPasswordFn = (): void => {
        setType((v) => (v === 'text' ? 'password' : 'text'));
    };

    return (
        <div
            style={rootStyle()}
            class={clsx(
                classes.view,
                classes.size,
                classes.readonly,
                classes.disabled,
                classes.autoWidth,
                classes.propsClass,
            )}
        >
            <input
                ref={directives}
                value={value()}
                onInput={handleInput}
                onFocus={handleFocus}
                type={_type()}
                {...otherProps}
            />
            <Show when={InputProps.autoWidth}>
                <label class="input-auto-width">{value()}</label>
            </Show>

            <Show when={InputProps.showCount || InputProps.showPassword || InputProps.clearable}>
                <div class={clsx(classes.controls, classes.controlsShow)}>
                    <Show when={getCheckNumStr()}>
                        <div class={classes.showCount}>{getCheckNumStr()}</div>
                    </Show>

                    <Show when={InputProps.showPassword}>
                        <div onClick={showPasswordFn} class={clsx(classes.showPassword)}>
                            <Show when={_type() === 'text'}>
                                <IconEye size={16} />
                            </Show>
                            <Show when={_type() === 'password'}>
                                <IconEyeOff size={16} />
                            </Show>
                        </div>
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
