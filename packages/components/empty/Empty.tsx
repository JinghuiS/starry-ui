import { createComponentFactory } from '@starry-ui/hooks';
import { IconMoodEmpty } from '@tabler/icons-solidjs';
import clsx from 'clsx';

import { Result } from '../result';
import type { StarryEmptyProps } from './empty-type';

export function Empty(props: StarryEmptyProps) {
    const {
        props: EmptyProps,
        otherProps,
        classes,
    } = createComponentFactory({
        name: 'empty',
        props,
        propDefaults: {
            size: 50,
            title: '暂无数据',
        },
        selfPropNames: ['size', 'content', 'title', 'icon'],
        classes: () => ({}),
    });
    return (
        <Result
            state="normal"
            icon={EmptyProps.icon ? EmptyProps.icon : <IconMoodEmpty size={EmptyProps.size} />}
            {...EmptyProps}
            {...otherProps}
            class={clsx(classes.base, classes.propsClass)}
        >
            {props.children}
        </Result>
    );
}
