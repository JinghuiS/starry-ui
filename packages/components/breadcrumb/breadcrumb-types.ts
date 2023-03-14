import { CommonProps } from '@starry-ui/types';
import { JSX } from 'solid-js';
export interface StarryBreadCrumbItemProps {
    label: JSX.Element;
    to?: string;
}
export interface StarryBreadCrumbProps extends CommonProps {
    items: StarryBreadCrumbItemProps[];
    separator?: JSX.Element;
    maxCount?: number;
    onClick?: (data: StarryBreadCrumbItemProps, index: number) => void;
}
