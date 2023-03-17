import { Accessor, createContext, useContext } from 'solid-js';
import { Props } from 'tippy.js';
import { StarryPopoverRef } from '../popover';

export interface CascaderContextValue {
    label: Accessor<string>;
    setLabel: (next: string | ((prev: string) => string)) => void;
    multiple: boolean;
    popoverRef: Accessor<StarryPopoverRef | undefined>;
    checkList: Accessor<Array<{ value: Props['cascaderValue']; label: string }>>;
    setCheckList: (
        next:
            | Array<{ value: Props['cascaderValue']; label: string }>
            | ((
                  v: Array<{ value: Props['cascaderValue']; label: string }>,
              ) => Array<{ value: Props['cascaderValue']; label: string }>),
    ) => void;
}

export const CascaderContext = createContext<CascaderContextValue>();
export function useCascaderContext() {
    const context = useContext(CascaderContext);
    return context;
}
