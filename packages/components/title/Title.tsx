import { createComponentFactory } from '@starry-ui/hooks';
import clsx from 'clsx';
import { type FlowProps } from 'solid-js';
import type { StarryTitleProps } from './title-type';

export function Title(props: FlowProps<StarryTitleProps>) {
    const {
        props: TitleProps,
        otherProps,
        classes,
    } = createComponentFactory({
        name: 'title',
        props: props,
        selfPropNames: ['bold', 'size', 'class'],
        classes: (ownerState) => ({
            bold: [ownerState.bold && 'bold'],
        }),
    });

    return (
        <div class={clsx(classes.base, classes.bold, TitleProps.class)} {...otherProps}>
            {props.children}
        </div>
    );
}
