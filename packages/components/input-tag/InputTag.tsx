import { createComponentFactory } from '@starry-ui/hooks';
import { IconPlus } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { Input } from '../input/Input';
import { Tag } from '../tag';
import type { StarryInputTagProps } from './input-tag-types';
export function InputTag(props: StarryInputTagProps) {
    const {
        props: InputTagProps,
        classes,
        rootStyle,
    } = createComponentFactory({
        name: 'input-tag',
        selfPropNames: ['tagType'],
        propDefaults: {
            tagType: 'primary',
        },
        props,
        classes: () => ({
            button: ['button'],
        }),
    });

    const [isInput, setIsInput] = createSignal<boolean>(false);
    const [inputValue, setInputValue] = createSignal('');
    const [delDownTimer, setDelDownTime] = createSignal<any>();
    const [delDownCheck, setDelDownCheck] = createSignal<number>(0);
    const [tagsValue, setTagsValue] = createSignal<any[]>([]);
    const [isEnter, setIsEnter] = createSignal<boolean>(false);

    let lewInputRef: any;
    const openInput = () => {
        setIsInput(true);

        document.onkeydown = function (event) {
            if (inputValue() === '') {
                if (event.keyCode === 8 || event.keyCode === 46) {
                    clearTimeout(delDownTimer());
                    setDelDownTime(
                        setTimeout(() => {
                            setDelDownCheck(0);
                        }, 500),
                    );
                    setDelDownCheck(delDownCheck() + 1);
                    if (delDownCheck() >= 2) {
                        setTagsValue(tagsValue().slice(0, tagsValue().length - 1));
                        setDelDownCheck(0);
                    }
                }
                setIsEnter(false);
            } else {
                if (event.keyCode === 13) {
                    setIsEnter(true);
                    addTag();
                }
            }
        };
    };
    const blurFn = (e?: any) => {
        setIsInput(false);
        document.onkeydown = null;
        addTag();

        if (isEnter()) {
            openInput();
        }
        if (!inputValue()) {
            setIsInput(false);
        }

        setIsEnter(false);
    };
    const addTag = () => {
        if (inputValue()) {
            setTagsValue([...tagsValue(), inputValue()]);
        }
        setInputValue('');
    };

    function delTag(index: number) {
        setTagsValue(tagsValue().filter((v: any, i: number) => index !== i));
    }
    return (
        <div style={rootStyle()} class={clsx(classes.baseView, classes.propsClass)}>
            <For each={tagsValue()}>
                {(item, index) => (
                    <Tag colorType={InputTagProps.tagType} closable onClose={() => delTag(index())}>
                        {item}
                    </Tag>
                )}
            </For>

            <Switch>
                <Match when={!isInput()}>
                    <label class={classes.button} onClick={openInput}>
                        <IconPlus size={24} />
                    </label>
                </Match>
                <Match when={isInput()}>
                    <Input
                        ref={lewInputRef}
                        value={inputValue()}
                        autoWidth
                        size="small"
                        class={classes.base}
                        onInput={(e: any) => setInputValue(e.target.value.trim())}
                        onBlur={blurFn}
                        onFocus={addTag}
                    ></Input>
                </Match>
            </Switch>
        </div>
    );
}
