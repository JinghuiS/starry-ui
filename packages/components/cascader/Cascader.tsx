import { createComponentFactory, createControllableSignal } from '@starry-ui/hooks';
import { IconChevronDown } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { Empty } from '../empty';
import { Group } from '../group';
import { Popover, type StarryPopoverRef } from '../popover';
import { Tag } from '../tag';
import { type valueProps, type StarryCascaderOptionsProps, type StarryCascaderProps } from './cascader-type';
import { CascaderContext, type CascaderContextValue } from './CascaderContext';
import { CascaderOptionFor } from './CascaderOptionsFor';

export function Cascader(props: StarryCascaderProps) {
    const [checkList, setCheckList] = createSignal<Array<{ value: valueProps; label: string }>>([]);
    const [popoverRef, setPopoverRef] = createSignal<StarryPopoverRef>();
    const [cascaderRef, setCascaderRef] = createSignal<HTMLDivElement>();
    const [showOptions, setShowOptions] = createSignal(false);
    const [label, setLabel] = createSignal<string>('');
    const {
        props: CascaderProps,
        classes,
        otherProps,
        rootStyle,
    } = createComponentFactory({
        name: 'cascader',
        props,
        selfPropNames: [
            'options',
            'align',
            'multiple',
            'placement',
            'showIcon',
            'size',
            'trigger',
            'value',
            'style',
            'class',
            'placeholder',
            'filterable',
            'header',
        ],
        propDefaults: {
            options: [],
            placement: 'bottom-start',
            trigger: 'click',
            multiple: false,
            align: 'left',
            showIcon: true,
            size: 'medium',
            filterable: false,
        },
        classes: (state) => ({
            icon: ['icon'],
            focus: [showOptions() && 'focus'],
            size: [state.size],
            align: [state.align],
            placeholder: ['placeholder'],
            label: [state.multiple ? 'label-multiple' : 'label-single'],
            optionsBox: ['options-box', state.filterable && 'options-margin'],
            header: ['header'],
            body: ['body', `body-${state.size}`, state.multiple && 'multiple-body', `body-align-${state.align}`],
            empty: ['options-empty'],
            tag: [state.multiple && 'tag'],
        }),
    });

    const context: CascaderContextValue = {
        multiple: CascaderProps.multiple as boolean,
        label,
        setLabel,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        popoverRef: popoverRef,
        setCheckList,
        checkList,
    };
    ``;
    return (
        <CascaderContext.Provider value={context}>
            <Popover
                placement={CascaderProps.placement}
                trigger={CascaderProps.trigger}
                onShow={() => {
                    setShowOptions(true);
                }}
                onHide={() => {
                    setShowOptions(false);
                }}
                popoverBody={() => (
                    <div class={clsx(classes.body)}>
                        <div class={classes.optionsBox}>
                            <CascaderOptionFor
                                style={CascaderProps.style}
                                class={CascaderProps.class}
                                options={CascaderProps.options}
                                multiple={CascaderProps.multiple}
                            ></CascaderOptionFor>
                            <label>
                                <Empty class={classes.empty} />
                            </label>
                        </div>
                    </div>
                )}
                ref={setPopoverRef}
                class={clsx(classes.baseView, classes.focus)}
                style={{ width: '100%' }}
            >
                <div
                    ref={setCascaderRef}
                    style={rootStyle()}
                    class={clsx(classes.base, classes.size, classes.align, classes.propsClass)}
                >
                    <IconChevronDown class={classes.icon} size={16} />
                    <Show when={!checkList().length}>
                        <div class={classes.placeholder}>{CascaderProps.placeholder}</div>
                    </Show>
                    <Show when={!CascaderProps.multiple && checkList().length > 0}>
                        <div class={classes.label}>{label()}</div>
                    </Show>

                    <Show when={CascaderProps.multiple && checkList().length}>
                        <Switch>
                            <Match when={checkList().length < 3}>
                                <For each={checkList()}>
                                    {(item) => (
                                        <Tag class={classes.tag} closable>
                                            {item.label}
                                        </Tag>
                                    )}
                                </For>
                            </Match>
                            <Match when={checkList().length >= 0}>
                                <Tag class={classes.tag} closable>
                                    {checkList()[0].label}
                                </Tag>
                                <Popover
                                    popoverBody={() => (
                                        <Group>
                                            <For each={checkList().slice(1, checkList().length)}>
                                                {(item) => (
                                                    <Tag class={classes.tag} closable>
                                                        {item.label}
                                                    </Tag>
                                                )}
                                            </For>
                                        </Group>
                                    )}
                                >
                                    <Tag class={classes.tag} closable>
                                        +{checkList().length}...
                                    </Tag>
                                </Popover>
                            </Match>
                        </Switch>
                    </Show>
                </div>
            </Popover>
        </CascaderContext.Provider>
    );
}
