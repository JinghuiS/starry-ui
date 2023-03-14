import { RadioGroup } from './RadioGroup';
import { Radio as _Radio } from './Radio';
export * from './radio-type';

const Radio = Object.assign(_Radio, {
    Group: RadioGroup,
});

export { RadioGroup, Radio };
