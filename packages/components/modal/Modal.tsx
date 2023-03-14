import { Portal } from 'solid-js/web';
import { createComponentFactory, createControllableSignal, useDOMCreate } from '@starry-ui/hooks';
import { createEffect, mergeProps, type FlowProps } from 'solid-js';
import { type StarryModalProps } from './modal-type';

import clsx from 'clsx';

import { SlowShow } from '../SlowShow/SlowShow';
import { addUnit } from '@starry-ui/utils';

export function Modal(props: FlowProps<StarryModalProps>) {
    const node = useDOMCreate();
    const {
        props: ModalProps,
        classes,
        rootStyle,
    } = createComponentFactory({
        name: 'modal',
        props: props,
        propDefaults: {
            width: '50%',
            height: '20%',
            title: '',
            visible: false,
            maskClose: true,
            destroyOnClose: false,
        },
        selfPropNames: ['width', 'height', 'title', 'visible', 'onMaskClick', 'maskClose', 'onClose', 'destroyOnClose'],
        classes: (state) => ({
            box: ['box'],
        }),
    });

    const [visible, setVisible] = createControllableSignal({
        value: () => ModalProps.visible,
    });

    let visibleTimer: NodeJS.Timeout;

    createEffect(() => {
        if (!ModalProps.visible) {
            clearTimeout(visibleTimer);
            visibleTimer = setTimeout(() => {
                setVisible(false);
            }, 250);
        } else {
            setVisible(true);
        }
    });
    const show = () => {
        setVisible(true);
    };

    const hide = () => {
        setVisible(false);
        if (!ModalProps.onClose) return;
        ModalProps.onClose();
    };
    const ModalMaskStyles = () => {
        return {
            animation: visible() ? 'starryModalOpen 0.25s' : 'starryModalClose 0.25s',
        };
    };

    const ModalBoxStyles = () => {
        return {
            animation: visible() ? 'starryModalBoxOpen 0.25s' : 'starryModalBoxClose 0.25s',
            width: addUnit(ModalProps.width),
            height: addUnit(ModalProps.height),
        };
    };
    const handleMaskClick = () => {
        if (ModalProps.maskClose) {
            hide();
        }
        if (!ModalProps.onMaskClick) return;
        ModalProps.onMaskClick();
    };

    return (
        <Portal mount={node}>
            <SlowShow retainDOM={!ModalProps.destroyOnClose} when={visible()}>
                <div onClick={handleMaskClick} class={clsx(classes.base, classes.propsClass)} style={ModalMaskStyles()}>
                    <div class={clsx(classes.box, ModalProps.class)} style={rootStyle(ModalBoxStyles())}>
                        {props.children}
                    </div>
                </div>
            </SlowShow>
        </Portal>
    );
}
