import { createComponentFactory } from '@starry-ui/hooks';
import { IconX } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { type FlowProps, Show } from 'solid-js';

import type { StarryTagProps } from './tag-type';

export function Tag(props: FlowProps<StarryTagProps>) {
    const {
        classes,
        otherProps,
        props: TagProps,
        directives,
        rootStyle,
    } = createComponentFactory({
        name: 'tag',
        selfPropNames: [
            'colorType',
            'loading',
            'size',
            'disabled',
            'bold',
            'closable',
            'maxWidth',
            'round',
            'left',
            'right',
            'class',
        ],
        props: props,
        propDefaults: {
            size: 'medium',
            colorType: 'primary',
        },
        classes: (state) => ({
            type: [state.colorType],
            size: [state.size],
            closeIcon: [state.closable && 'close'],
            round: [state.round && 'round'],
            bold: [state.bold && 'bold'],
            disabled: [state.disabled && 'disabled'],
            left: [state.left ? 'left' : false],
            right: [state.right ? 'right' : false],
            value: ['value'],
        }),
    });

    const iconSize = () => {
        switch (TagProps.size) {
            case 'small':
                return '12';
            case 'medium':
                return '14';
            case 'large':
                return '16';
            default:
                return '14';
        }
    };

    const handleClick = (
        event: MouseEvent & {
            currentTarget: HTMLDivElement;
            target: Element;
        },
    ) => {
        if (props.disabled || !props.onClick) return;
        props.onClick(event);
    };
    const handleClose = (
        event: MouseEvent & {
            currentTarget: SVGSVGElement;
            target: Element;
        },
    ) => {
        event.stopPropagation();
        if (props.disabled || !props.onClose) return;
        props.onClose(event);
    };
    return (
        <div
            ref={directives}
            class={clsx(
                classes.base,
                classes.size,
                classes.type,
                classes.round,
                classes.bold,
                classes.disabled,
                classes.propsClass,
            )}
            style={rootStyle()}
            onClick={handleClick}
            {...otherProps}
        >
            <div class={classes.left}>{TagProps.left}</div>
            <div class={classes.value}>{props.children}</div>
            <div class={classes.right}>{TagProps.right}</div>
            <Show when={TagProps.closable}>
                <div class={classes.closeIcon}>
                    <IconX onClick={handleClose} size={iconSize()} />
                </div>
            </Show>
        </div>
    );
}
