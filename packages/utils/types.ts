export const isString = (v: unknown) =>
  Object.prototype.toString.call(v) === "[object String]";

export const isNumber = (v: unknown) =>
  typeof v === "number" &&
  Object.prototype.toString.apply(v) === "[object Number]";

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
// Function assertions
export function isFunction<T extends Function = Function>(
  value: any
): value is T {
  return typeof value === "function";
}
