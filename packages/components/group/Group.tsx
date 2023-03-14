import { createComponentFactory } from '@starry-ui/hooks';
import { clsx } from 'clsx';
import { type FlowProps } from 'solid-js';
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children';
import type { StarryGroupProps } from './group-type';

export const GROUP_POSITIONS = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    apart: 'space-between',
};

export function Group(props: FlowProps<StarryGroupProps>) {
    const {
        classes,
        otherProps,
        rootStyle,
        props: GroupProps,
    } = createComponentFactory({
        props: props,
        name: 'group',
        selfPropNames: ['grow', 'noWrap', 'position', 'spacing', 'align'],
        propDefaults: {
            position: 'left',
            spacing: 'medium',
            align: 'center',
        },
        classes: (state) => ({
            maxWidth: [state.grow && 'max-width'],
        }),
    });

    const filteredChildren = filterFalsyChildren(props.children);

    return (
        <div
            style={rootStyle({
                '--starry-group-align-items': GroupProps.align,
                '--starry-group-flex-wrap': GroupProps.noWrap ? 'nowrap' : 'wrap',
                '--starry-group-justify-content': GroupProps.position
                    ? GROUP_POSITIONS[GroupProps.position]
                    : 'flex-start',
                '--starry-group-flex-grow': GroupProps.grow ? 1 : 0,
                '--starry-group-gap': `var(--starry-spacing-${GroupProps.spacing})`,
                '--starry-group-item-max-width': GroupProps.grow
                    ? `calc(${100 / filteredChildren.length}% - (var(--starry-group-gap) - var(--starry-group-gap) / ${
                          filteredChildren.length
                      }))`
                    : undefined,
            })}
            class={clsx(classes.base, classes.propsClass)}
            {...otherProps}
        >
            {filteredChildren}
        </div>
    );
}
