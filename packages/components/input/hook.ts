/**
 * 获取字符长度
 * @param val
 */
export const getTextLength = (val: any, niceCount: boolean | undefined) => {
  if (!niceCount) {
    return val.length;
  } else {
    let len = 0;
    for (let i = 0; i <= val.length - 1; i++) {
      let length = val.charCodeAt(i);
      if (length >= 0 && length <= 128) {
        len += 0.5;
      } else {
        len += 1;
      }
    }
    return Math.trunc(len);
  }
};
