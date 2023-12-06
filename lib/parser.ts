const regex: RegExp = /(\\begin{[^}]+}(?:\[.*\])?)|(\\end{[^}]+})/g;
import { TreeNode } from './types';

export function parse(text: string): any {
    const queue: string[] = text.split(regex).filter(i => i?.length).map(i => i.replace(/\r\n/g, '\n'));
    const root: TreeNode = {
        name: 'root',
        children: []
    };

    const stack = [root];
    let current: TreeNode = root;

    for (const item of queue) {
        switch (true) {
            case item.startsWith('\\begin'): {
                const name = item.match(/\{(.*)\}/);
                const className = item.match(/\[(.*)\]/);
                const node: TreeNode = {
                    name: name ? name[1] : '',
                    className: className ? className[1] : undefined,
                    children: [],
                };

                current = stack[stack.length - 1];
                if (!current.children) throw new Error(`invalid syntax near ${item}`);
                current.children.push(node);
                stack.push(node);
                break;
            }

            case item.startsWith('\\end'): {
                stack.pop();
                break;
            }

            default: {
                if (stack.length === 1) continue; // no text in root
                const children = item
                    .replace(/^\n|\n+$/g, '')
                    .split(/\n/g)
                    .map(i => i.trim())
                    .map(i => i.replaceAll('_ _', ''))
                    .filter(i => i?.length);
                if (!children?.length) continue;

                if (children[children.length - 1] === '<br>') children.pop();

                current = stack[stack.length - 1];
                if (!current.children) throw new Error(`invalid syntax near ${item}`);
                for (const child in children) {
                    current.children.push({
                        name: 'p',
                        value: children[child],
                    });
                }
            }
        }
    }

    return root;
};