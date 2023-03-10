import { createComponentFactory } from '@starry-ui/hooks';
import { FlowProps } from 'solid-js';
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children';
import { StarryGroupProps } from './group-type';

export function Group(props: FlowProps<StarryGroupProps>) {
    const {} = createComponentFactory({
        name: 'group',
        props: props,
        selfPropNames: ['grow', 'noWrap', 'position', 'spacing'],
        propDefaults: {
            position: 'left',
            spacing: 'medium',
        },
    });

    const filteredChildren = filterFalsyChildren(props.children);
}
