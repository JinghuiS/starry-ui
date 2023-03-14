import { Select as _Select } from './Select';

import { SelectOption } from './SelectOption';

const Select = Object.assign(_Select, {
    Option: SelectOption,
});

export { Select, SelectOption };
