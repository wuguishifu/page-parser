import { TreeNode } from './types';

export function parse(text: string): any {
    const queue: string[] = text
        .replace(/\r\n|\n/g, '\n')
        .replace(/ {2,}/g, '')
        .replace(/\n\n/g, '<br>')
        .replace(/\n/g, ' ')
        .split(/\\/g)
        .filter(i => i)
        .flatMap(i => ('\\' + i).split(/(\\.*?(?:{.*?}){1,}(?:\[.*?\]){0,})/gm))
        .map(i => i.trim())
        .filter(i => i && i !== '<br>')
        .flatMap(i => i.split(/<br>/g));

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
                console.log({ name, values });
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
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                    .replace(/\*(.*?)\*/g, '<i>$1</i>')
                    .replace(/__(.*?)__/g, '<u>$1</u>')

                current.children.push({
                    name: 'p',
                    values: [formatted]
                });
            }
        }
    }

    return root;
};