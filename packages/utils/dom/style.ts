import { CommonProps } from '@starry-ui/types';
import { isNumber, isString, isStringNumber } from '../types';

export function addUnit(value?: any, defaultUnit = 'px') {
    if (!value) return '';
    if (isNumber(value) || isStringNumber(value)) {
        return `${value}${defaultUnit}`;
    } else if (isString(value)) {
        return value;
    }
}

//https://github.com/facebook/react/blob/main/packages/react-dom-bindings/src/client/CSSPropertyOperations.js
export function createDangerousStringForStyles(styles: CommonProps['style']) {
    let serialized = ''; // 序列化后的CSS字符串
    let delimiter = ''; // CSS间隔符，一开始为空字符串，后为;
    if (typeof styles === 'string') {
        return styles;
    }
    for (const styleName in styles) {
        // 遍历styles对象的所有key
        // eslint-disable-next-line no-prototype-builtins
        if (!styles.hasOwnProperty(styleName)) {
            continue;
        }

        const styleValue = styles[styleName as keyof CommonProps['style']];
        if (styleValue != null) {
            // 拼接属性名，如果是CSS自定义属性，直接拼接上去即可
            // 若是原生属性，将驼峰式命名转换成CSS的短横式命名
            serialized += delimiter + styleName + ':';
            // 拼接属性值，dangerousStyleValue方法将一个值转换成规范的css属性值
            serialized += styleValue;

            delimiter = ';';
        }
    }
    return serialized || null;
}
