import { createComponentFactory } from '@starry-ui/hooks';
import { IconChevronRight } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { createSignal, Show } from 'solid-js';
import { Radio } from '../radio/Radio';
import type { StarryCascaderOptionsProps } from './cascader-type';
import { useCascaderContext } from './CascaderContext';
export function CascaderOption(props: StarryCascaderOptionsProps) {
    const cascaderContext = useCascaderContext();
    const [checked, setChecked] = createSignal<boolean>(false);
    const { classes, props: CascaderOptionProps } = createComponentFactory({
        name: 'cascader-option',
        props,
        propDefaults: {
            value: '',
            label: '',
        },
        selfPropNames: [
            'class',
            'directives',
            'disabled',
            'label',
            'style',
            'value',
            'children',
            'onClick',
            'onClickMimultiple',
            'multiple',
            'checkValue',
        ],
        classes: (state) => ({
            disabled: [state.disabled && 'disabled'],
            label: ['label'],
            slot: ['slot'],
            checked: [state.value == state.checkValue && 'checked'],
            labelIcon: ['label-icon'],
            radio: ['label-radio'],
            content: ['label-content'],
        }),
    });

    const handleChangeValue = (props: StarryCascaderOptionsProps) => {
        props.onClick && props.onClick(props);
        if (props.children && props.children.length) {
            return;
        }
        cascaderContext?.setLabel(
            cascaderContext
                .checkList()
                .map((it) => it.label)
                .join('/'),
        );
        if (!cascaderContext?.multiple) {
            cascaderContext?.popoverRef()?.hide();
        }
    };
    const handlerCheck = (props: StarryCascaderOptionsProps) => {
        console.log(2);
        setChecked(!checked());
        props.onClickMimultiple && props.onClickMimultiple(props, checked());
    };
    return (
        <div class="flex">
            <div class={clsx(classes.base, classes.disabled, classes.checked)}>
                <div onClick={() => handleChangeValue(CascaderOptionProps)} class={classes.label}>
                    <Show when={CascaderOptionProps.multiple}>
                        <Radio
                            class={classes.radio}
                            onClick={() => handlerCheck(CascaderOptionProps)}
                            checked={checked()}
                        ></Radio>
                    </Show>
                    <div class={classes.content}> {CascaderOptionProps.label}</div>
                    <Show when={CascaderOptionProps.children && CascaderOptionProps.children.length}>
                        <IconChevronRight size={16} class={classes.labelIcon} />
                    </Show>
                </div>
            </div>
        </div>
    );
}
