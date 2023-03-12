import { createComponentFactory } from '@starry-ui/hooks';
import { IconMoodEmpty } from '@tabler/icons-solidjs';

import { Result } from '../result';
import type { StarryEmptyProps } from './empty-type';

export function Empty(props: StarryEmptyProps) {
    const { props: EmptyProps, otherProps } = createComponentFactory({
        name: 'empty',
        props,
        propDefaults: {
            size: 60,
            title: '暂无数据',
        },
        selfPropNames: ['size', 'content', 'title', 'icon'],
    });
    return (
        <Result
            state="info"
            icon={EmptyProps.icon ? EmptyProps.icon : <IconMoodEmpty size={EmptyProps.size} />}
            {...EmptyProps}
            {...otherProps}
        >
            {props.children}
        </Result>
    );
}
