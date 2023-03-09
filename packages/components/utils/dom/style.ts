import { isNumber, isString, isStringNumber } from "../types";

export function addUnit(value?: any, defaultUnit = "px") {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
}
