import { createComponentFactory } from '@starry-ui/hooks';

import { createSignal, For, Show } from 'solid-js';
import type { StarryCascaderOptionsForProps, StarryCascaderOptionsProps, valueProps } from './cascader-type';
import { useCascaderContext } from './CascaderContext';
import { CascaderOption } from './CascaderOption';
export function CascaderOptionFor(props: StarryCascaderOptionsForProps) {
    const cascaderContext = useCascaderContext();
    const { classes, props: CascaderOptionForProps } = createComponentFactory({
        name: 'cascader-options-for',
        props,
        propDefaults: { options: [] },
        selfPropNames: ['options', 'style', 'class', 'multiple'],
        classes: () => ({}),
    });
    const [value, setValue] = createSignal<valueProps>();
    const [visible, setVisible] = createSignal<boolean>(false);
    const [options, setOptions] = createSignal<StarryCascaderOptionsProps[]>();
    /**
     * 点击事件
     * @param props 点击的参数
     */
    const handleChangeValue = (props: StarryCascaderOptionsProps) => {
        if (!CascaderOptionForProps.multiple) {
            saveCheck(props.value, props.label);
        }
        setVisible(false);
        setOptions([]);
        if (props.children && props.children.length) {
            setOptions(props.children);
            setVisible(true);
        }
    };

    /**
     * 处理点击时保存当前点击内容
     * @param _v 点击value
     * @param l 点击label
     */
    const saveCheck = (_v: valueProps, l: string) => {
        cascaderContext?.setCheckList((v) => {
            const index = v.findIndex((it) => it.value === value());
            return [...v.slice(0, index != -1 ? index : v.length), { value: _v, label: l }];
        });
        setValue(_v);
    };
    /**
     * 点击多选选择框后事件
     * @param props 当前选择的参数
     */
    const onClickMimultiple = (props: StarryCascaderOptionsProps, checked: boolean) => {
        cascaderContext?.setCheckList((v) => {
            return [...checkChildren(props, v)];
        });
    };

    const checkChildren = (props: StarryCascaderOptionsProps, _list: Array<{ value: valueProps; label: string }>) => {
        _list.push({ label: props.label, value: props.value });
        if (props.children && props.children.length) {
            props.children.forEach((it) => {
                checkChildren(it, _list);
            });
        }
        return _list;
    };

    return (
        <>
            <div class={classes.base}>
                <For each={CascaderOptionForProps.options}>
                    {(option) => (
                        <CascaderOption
                            label={option.label}
                            value={option.value}
                            children={option.children}
                            disabled={option.disabled}
                            onClick={handleChangeValue}
                            multiple={CascaderOptionForProps.multiple}
                            checkValue={value()}
                            onClickMimultiple={onClickMimultiple}
                        ></CascaderOption>
                    )}
                </For>
            </div>
            <Show when={visible()}>
                <CascaderOptionFor multiple={CascaderOptionForProps.multiple} options={options()}></CascaderOptionFor>
            </Show>
        </>
    );
}
