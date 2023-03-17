import { createSignal, type FlowProps } from 'solid-js';
import type { StarryInputProps } from '../input';
import { StarryCascaderProps } from './cascader-type';

export function useCascaderFilterable(props: FlowProps<StarryCascaderProps>) {
    const [filterValue, setFilterValue] = createSignal('');

    const optionArrayIsUndefined = () => false;

    const visible = (label: string) => {
        return label.toLowerCase().indexOf(filterValue().toLowerCase()) >= 0;
    };

    const cascaderInputProps: StarryInputProps = {
        value: filterValue(),
        onInput: (v) => {
            setFilterValue(v.currentTarget.value);
        },
    };

    return { filterValue, setFilterValue, visible, cascaderInputProps, optionArrayIsUndefined };
}
