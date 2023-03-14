import { createComponentFactory } from '@starry-ui/hooks';
import clsx from 'clsx';
import { createEffect, For, Show } from 'solid-js';
import { Popover } from '../popover';
import { Tag } from '../tag';
import type { StarryBreadCrumbItemProps, StarryBreadCrumbProps } from './breadcrumb-types';

export function Breadcrumb(props: StarryBreadCrumbProps) {
    const {
        classes,
        props: BreadcrumbProps,
        rootStyle,
    } = createComponentFactory({
        name: 'breadcrumb',
        selfPropNames: ['items', 'separator', 'maxCount', 'onClick'],
        props: props,
        propDefaults: {
            separator: '/',
            items: [],
            maxCount: 0,
        },
        classes: () => ({
            isPath: ['isPath'],
            item: ['item'],
            parting: ['parting'],
            active: ['active'],
            ellipsis: ['ellipsis'],
            tag: ['tag'],
            tagItem: ['tagItem'],
        }),
    });

    function onClick(item: StarryBreadCrumbItemProps, index: number) {
        BreadcrumbProps.onClick && BreadcrumbProps.onClick(item, index);
        location.href = location.origin + item.to;
    }
    const _maxCount = () => BreadcrumbProps.maxCount || 0;
    const leftCount = () => parseInt((_maxCount() / 2).toString());
    const rightCount = () => _maxCount() - leftCount();
    const len = () => BreadcrumbProps.items.length;
    const displayItems = () =>
        len() > _maxCount()
            ? [...BreadcrumbProps.items.slice(0, leftCount()), ...BreadcrumbProps.items.slice(len() - rightCount())]
            : BreadcrumbProps.items;

    return (
        <>
            <div class={clsx(classes.base, classes.propsClass)} style={rootStyle()}>
                <div class={classes.item}>
                    <For each={displayItems()}>
                        {(item, index) => (
                            <>
                                <span
                                    class={index() === len() - 1 ? classes.active : ''}
                                    onClick={() => onClick(item, index())}
                                >
                                    {item.label}
                                </span>
                                <Show when={index() < len() - 1 ? true : false}>
                                    <div class={classes.parting}>
                                        {BreadcrumbProps.separator || (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="icon icon-tabler icon-tabler-chevron-right"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M9 6l6 6l-6 6"></path>
                                            </svg>
                                        )}
                                    </div>
                                </Show>

                                <Show when={len() > _maxCount() && index() === leftCount()}>
                                    <Popover
                                        popoverBody={() => (
                                            <div class={classes.tag}>
                                                <For
                                                    each={BreadcrumbProps.items.slice(
                                                        leftCount(),
                                                        len() - rightCount(),
                                                    )}
                                                >
                                                    {(item) => <Tag class={classes.tagItem}>{item.label}</Tag>}
                                                </For>
                                            </div>
                                        )}
                                    >
                                        <span class={classes.ellipsis}>...</span>
                                    </Popover>
                                </Show>
                            </>
                        )}
                    </For>
                </div>
            </div>
        </>
    );
}
