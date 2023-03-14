import { type Component, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {
    Button,
    CheckSwitch,
    Input,
    Modal,
    Popover,
    Radio,
    RadioGroup,
    Select,
    SelectOption,
    Tag,
    Textarea,
    Title,
    Breadcrumb,
    type StarryBreadCrumbItemProps,
    InputTag,
} from '@starry-ui/components';
import { tooltip, starryLoading } from '@starry-ui/directives';

const App: Component = () => {
    const [loading, setLoading] = createSignal(false);

    const [v, setV] = createSignal('111');
    const options = [
        { label: '宋朝', value: '1' },
        { label: '唐朝', value: '2' },
        { label: '明朝', value: '3' },
        { label: '清朝', value: '4' },
    ];
    const [breadcrumbs, setBreadcrumbs] = createSignal<StarryBreadCrumbItemProps[]>([
        {
            label: 'Avatar',
            to: '/Avatar',
        },
        {
            label: 'Breadcrumb',
            to: '/Breadcrumb',
        },
        {
            label: 'Input',
            to: '/Input',
        },
        {
            label: 'Dialog',
            to: '/Dialog',
        },
        {
            label: 'Flex',
            to: '/Flex',
        },
    ]);
    const v1 = '';
    const [radioV, setRadioV] = createSignal('');
    return (
        <div class={styles.App}>
            <div use:tooltip={{ content: v }}>112121</div>
            <div>
                <Input clearable type="password" showPassword />
            </div>

            <Popover popoverBody={() => <div>测试k</div>}>
                <Button
                    onClick={() => {
                        setV('点了');
                        setLoading(!loading());
                        setBreadcrumbs((pre) => [...pre, { label: 'test', to: '' }]);
                    }}
                >
                    1
                </Button>
            </Popover>

            <Button colorType={'success'}>ces</Button>

            <Title bold>F</Title>

            <div use:starryLoading={{ isShow: loading() }} style={{ width: '300px' }}>
                <CheckSwitch
                    ref={(e) => {
                        console.log(e);
                    }}
                />

                <Select filterable>
                    <SelectOption label="测试" value={'1'} />
                    <SelectOption label="测试2" value={'2'} />
                    <SelectOption label="测33" value={'d'} />
                    <SelectOption label="试5" value={'a'} />
                </Select>
                <Textarea clearable showCount style={{ 'margin-top': '20px' }} />
            </div>

            <Radio label="测试" iconable />
            <RadioGroup
                onClick={(e) => {
                    console.log(e);
                }}
            >
                <Radio label="测试" iconable value={'abc'} />
                <Radio label="测试" iconable value={'111111'} />
                <Radio label="测试" iconable value={'abssssc'} />
            </RadioGroup>
            <Breadcrumb items={breadcrumbs()} maxCount={5}></Breadcrumb>
            <InputTag tagType="success"></InputTag>
        </div>
    );
};

export default App;
