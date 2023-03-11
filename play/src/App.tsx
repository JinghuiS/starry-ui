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
    Tag,
    Textarea,
    Title,
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
    const v1 = '';
    const [radioV, setRadioV] = createSignal('');
    return (
        <div class={styles.App}>
            <div use:tooltip={{ content: v }}>112121</div>
            <div>
                <Input clearable type="password" showPassword />
            </div>
            <Modal
                onClose={() => {
                    setLoading(false);
                }}
                visible={loading()}
            >
                <div>12121</div>
            </Modal>

            <Popover popoverBody={() => <div>测试k</div>}>
                <Button
                    onClick={() => {
                        setV('点了');
                        setLoading(!loading());
                    }}
                >
                    1
                </Button>
            </Popover>

            <Button colorType={'success'}>ces</Button>

            <Title bold>121211212</Title>

            <div use:starryLoading={{ isShow: loading() }} style={{ width: '300px' }}>
                <CheckSwitch
                    ref={(e) => {
                        console.log(e);
                    }}
                />
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
        </div>
    );
};

export default App;
