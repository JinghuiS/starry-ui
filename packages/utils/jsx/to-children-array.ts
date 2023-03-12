import { JSX, children } from 'solid-js';

export function toChildrenArray(_children: JSX.Element) {
    return children(() => _children).toArray();
}
