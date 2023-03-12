import { createComponentFactory } from '@starry-ui/hooks';
import { addUnit } from '@starry-ui/utils';
import clsx from 'clsx';
import { createMemo, type FlowProps } from 'solid-js';
import type { StarryFlexProps } from './flex-type';

export function Flex(props: FlowProps<StarryFlexProps>) {
    const { classes, props: FlexProps } = createComponentFactory({
        name: 'flex',
        props,
        propDefaults: {
            direction: 'x',
            x: 'center',
            y: 'center',
            wrap: false,
            gap: 10,
        },
        selfPropNames: ['direction', 'x', 'y', 'wrap', 'gap', 'width', 'class'],
        classes: (state) => ({
            direction: [state.direction],
            wrap: [state.wrap && 'wrap'],
            x: [`x-${state.x}`],
            y: [`y-${state.y}`],
            mode: [state.mode && `mode-${state.mode}`],
        }),
    });

    const styleObj = createMemo(() => ({
        gap: addUnit(FlexProps.gap),
        width: addUnit(FlexProps.width),
    }));

    return (
        <div
            style={styleObj()}
            class={clsx(classes.direction, classes.wrap, classes.x, classes.y, classes.mode, FlexProps.class)}
        >
            {props.children}
        </div>
    );
}
