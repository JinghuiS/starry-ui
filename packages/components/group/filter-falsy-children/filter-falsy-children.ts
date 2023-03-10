import { JSX, children } from 'solid-js';

export function filterFalsyChildren(_children: JSX.Element) {
    return children(() => _children)
        .toArray()
        .filter(Boolean);
}
