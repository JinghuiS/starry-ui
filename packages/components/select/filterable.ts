import { createSignal, type FlowProps } from 'solid-js';
import type { StarryInputProps } from '../input';
import type { StarrySelectProps } from './select-type';

export function useSelectFilterable(props: FlowProps<StarrySelectProps>) {
    const [filterValue, setFilterValue] = createSignal('');

    const optionArrayIsUndefined = () => false;

    const visible = (label: string) => {
        return label.toLowerCase().indexOf(filterValue().toLowerCase()) >= 0;
    };

    const selectInputProps: StarryInputProps = {
        value: filterValue(),
        onInput: (v) => {
            setFilterValue(v.currentTarget.value);
        },
    };

    return { filterValue, setFilterValue, visible, selectInputProps, optionArrayIsUndefined };
}
