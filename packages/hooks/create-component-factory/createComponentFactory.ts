// https://github.com/swordev/suid/blob/main/packages/base/src/createComponentFactory.ts
import { createComputed, batch, mergeProps, splitProps } from 'solid-js';
import { createMutable } from 'solid-js/store';
import type { CommonProps } from '@starry-ui/types';
import composeClasses from './composeClasses';
import { createDangerousStringForStyles } from '@starry-ui/utils';

export function createComponentFactory<
    C extends CommonProps,
    CS extends Record<string, (string | false | undefined)[]>,
    S extends Record<string, (string | false | undefined)[]>,
>(options: {
    props: C;
    propDefaults?: Omit<C, 'children'>;
    selfPropNames: Exclude<keyof C, S>[];
    name: string;
    baseClass?: (option: typeof options) => string;
    classes?: (ownerState: C) => CS;
}) {
    type IProps = C;
    function splitInProps(allProps: IProps) {
        const selfPropNames: (keyof C)[] = [...options.selfPropNames, 'class', 'style'];
        const [props, otherProps] = splitProps(allProps, selfPropNames);
        return { allProps, props, otherProps };
    }

    function useClasses(ownerState: C) {
        const haveSlotClasses = !!options.classes;

        const compose = () => {
            if (!options.classes) throw new Error(`'classes' option is not defined`);

            let baseClass = (ownerState as any)['class'] ?? '';

            if (options.baseClass) {
                baseClass = baseClass + ' ' + options.baseClass(options);
            }

            return composeClasses(options.name, options.classes(ownerState), baseClass, ownerState.class) as {
                [K in keyof CS]: string;
            };
        };

        const classes: {
            [K in keyof CS]: string;
        } = createMutable({} as any);

        if (haveSlotClasses)
            createComputed(() => {
                const result = compose();
                batch(() => {
                    for (const slot in result) classes[slot] = result[slot];
                });
            });

        type _ClassesType = typeof classes;

        return classes as Readonly<_ClassesType & { base: string; baseView: string; propsClass: string }>;
    }

    function useProps(props: IProps, propDefaults?: IProps) {
        return splitInProps(mergeProps(...[...(propDefaults ? [propDefaults] : []), props]) as IProps);
    }
    function useDirectives(props: C) {
        const directiveList = props.directives || [];

        return function directives(el: HTMLElement) {
            directiveList.map((directive) => directive(el));
        };
    }
    function rootStyle(style: CommonProps['style'] = {}) {
        if (typeof props.style === 'string') {
            return createDangerousStringForStyles(style) + ';' + props.style;
        }
        return mergeProps(style, props.style as any);
    }

    const directives = useDirectives(options.props);
    const { props, allProps, otherProps } = useProps(options.props, options.propDefaults as any);

    const classes = useClasses(props as C);

    return {
        classes,
        props,
        allProps,
        otherProps,
        directives,
        rootStyle,
    };
}
