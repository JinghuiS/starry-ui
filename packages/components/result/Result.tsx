import { createComponentFactory } from '@starry-ui/hooks';
import { IconAlertCircle, IconAlertTriangle, IconBell, IconInfoCircle, IconMoodSmile } from '@tabler/icons-solidjs';
import clsx from 'clsx';
import { Match, Switch, type FlowProps } from 'solid-js';
import { Flex } from '../flex';
import { Title } from '../title';
import type { StarryResultProps } from './result-type';

export function Result(props: FlowProps<StarryResultProps>) {
    const {
        classes,
        props: ResultProps,
        directives,
        otherProps,
        rootStyle,
    } = createComponentFactory({
        name: 'result',
        props,
        propDefaults: {
            state: 'info',
            title: '',
            content: '',
        },
        selfPropNames: ['state', 'title', 'content', 'icon', 'class'],
        classes: (state) => ({
            icon: ['icon', `icon-${state.state}`],
            title: ['title'],
            content: ['content'],
        }),
    });

    return (
        <Flex direction="y" class={clsx(classes.base, classes.propsClass)} style={rootStyle()} {...otherProps}>
            <Flex class={classes.icon}>
                <Switch>
                    <Match when={ResultProps.icon}>{ResultProps.icon}</Match>

                    <Match when={!ResultProps.icon && ResultProps.state === 'normal'}>
                        <IconInfoCircle size={60} />
                    </Match>
                    <Match when={!ResultProps.icon && ResultProps.state === 'warning'}>
                        <IconAlertTriangle size={60} />
                    </Match>
                    <Match when={!ResultProps.icon && ResultProps.state === 'success'}>
                        <IconMoodSmile size={60} />
                    </Match>
                    <Match when={!ResultProps.icon && ResultProps.state === 'error'}>
                        <IconAlertCircle size={60} />
                    </Match>
                    <Match when={!ResultProps.icon && ResultProps.state === 'info'}>
                        <IconBell size={60} />
                    </Match>
                </Switch>
            </Flex>
            <Title class={classes.title}>{ResultProps.title}</Title>
            <div class={classes.content}>{ResultProps.content}</div>
            <div>{props.children}</div>
        </Flex>
    );
}
