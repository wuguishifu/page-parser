import { TreeNode } from './Tree';

export function parse(text: string): any {
    const queue: string[] = text
        .replace(/\r\n|\n/g, '\n')
        .replace(/ {2,}/g, '')
        .split(/\\/g)
        .filter(i => i)
        .map(i => ('\\' + i).trim())
        .flatMap(i => i.split(/\n\n/g))
        .map(i => i.replace(/\n/g, ' '))
        .flatMap(i => i.split(/(\\.*?(?:{.*?}){1,}(?:\[.*?\]){0,})/gm))
        .map(i => i.trim())
        .filter(i => i)

    const root: TreeNode = {
        name: 'root',
        children: []
    };

    const stack = [root];
    let current: TreeNode = root;

    for (const item of queue) {
        switch (true) {
            case item.startsWith('\\begin'): {
                const [name, ...values] = item.match(/\{.*?\}/g)?.map(i => i.substring(1, i.length - 1)) ?? [];
                const className = item.match(/\[(.*)\]/);
                const node: TreeNode = {
                    name,
                    className: className ? className[1] : undefined,
                    values: values?.length ? values : undefined,
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

            case item.startsWith('\\'): {
                const name = item.match(/\\(.*?)\{/);
                const values = item.match(/\{.*?\}/g)?.map(i => i.substring(1, i.length - 1));
                const className = item.match(/\[(.*)\]/);
                const node: TreeNode = {
                    name: name ? name[1] : '',
                    values: values ?? undefined,
                    className: className ? className[1] : undefined,
                };

                current = stack[stack.length - 1];
                if (!current.children) throw new Error(`invalid syntax near ${item}`);
                current.children.push(node);
                break;
            }

            default: {
                if (stack.length === 1) continue; // no text in root
                current = stack[stack.length - 1];
                if (!current.children) throw new Error(`invalid syntax near ${item}`);

                const formatted = item
                    .replaceAll('_ _', '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<i>$1</i>')
                    .replace(/__(.*?)__/g, '<u>$1</u>');

                current.children.push({
                    name: 'p',
                    values: [formatted]
                });
            }
        }
    }

    return root;
};