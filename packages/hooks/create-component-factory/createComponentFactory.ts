// https://github.com/swordev/suid/blob/main/packages/base/src/createComponentFactory.ts
import { createComputed, batch, mergeProps, splitProps } from "solid-js";
import { createMutable } from "solid-js/store";
import type { CommonProps } from "@starry-ui/types";
import composeClasses from "./composeClasses";

export function createComponentFactory<
  C extends CommonProps,
  S extends Record<string, (string | false | undefined)[]>
>(options: {
  props: C;
  propDefaults?: Omit<C, "children">;
  selfPropNames: Exclude<keyof C, "children">[];
  name: string;
  baseClass?: (option: typeof options) => string;
  classes?: (ownerState: C) => S;
}) {
  type IProps = Omit<C, "children">;
  function splitInProps(allProps: IProps) {
    const [props, otherProps] = splitProps(allProps, options.selfPropNames);
    return { allProps, props, otherProps };
  }

  function useClasses(ownerState: C) {
    const haveSlotClasses = !!options.classes;

    const compose = () => {
      if (!options.classes) throw new Error(`'classes' option is not defined`);

      let baseClass = (ownerState as any)["class"] ?? "";

      if (options.baseClass) {
        baseClass = baseClass + " " + options.baseClass(options);
      }

      return composeClasses(
        options.name,
        options.classes(ownerState),
        baseClass
      ) as { [K in keyof S]: string };
    };

    const classes: {
      [K in keyof S]: string;
    } = createMutable({} as any);

    if (haveSlotClasses)
      createComputed(() => {
        const result = compose();
        batch(() => {
          for (const slot in result) classes[slot] = result[slot];
        });
      });

    type _ClassesType = typeof classes;

    return classes as Readonly<
      _ClassesType & { base: string; baseView: string }
    >;
  }

  function useProps(props: IProps, propDefaults?: IProps) {
    return splitInProps(
      mergeProps(...[...(propDefaults ? [propDefaults] : []), props]) as IProps
    );
  }
  function useDirectives(props: C) {
    const directiveList = props.directives || [];

    return function directives(el: HTMLElement) {
      directiveList.map((directive) => directive(el));
    };
  }

  const directives = useDirectives(options.props);
  const { props, allProps, otherProps } = useProps(
    options.props,
    options.propDefaults
  );

  const classes = useClasses(props as C);

  return {
    classes,
    props,
    allProps,
    otherProps,
    directives,
  };
}
