import { CommonProps } from '@starry-ui/types';
import { JSX } from 'solid-js';

export interface StarryModalProps extends CommonProps {
    visible: boolean;
    height?: number | string;
    width?: number | string;
    title?: JSX.Element;
    onMaskClick?: () => void;
    maskClose?: boolean;
    onClose?: () => void;
    destroyOnClose?: boolean;
}
