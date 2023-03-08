export default function composeClasses<ClassKey extends string>(
  name: string,
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,

  classes: Record<string, string> | undefined
): Record<ClassKey, string> {
  const output: Record<ClassKey, string> = {
    base: `starry-${name} ${classes} `,
  } as any;

  Object.keys(slots).forEach(
    // `Objet.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (slot: ClassKey) => {
      output[slot] = slots[slot]
        .reduce((acc, key) => {
          if (key) {
            acc.push(`starry-${name}-${key}`);
          }
          return acc;
        }, [] as string[])
        .join(" ");
    }
  );

  return output;
}
