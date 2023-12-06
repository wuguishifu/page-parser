const regex: RegExp = /\\begin{([^[\]}]+)}(?:\[(.*?)])?([\s\S]+?)\\end{\1}/g;

export function parseSingle(text: string) {
    const match = text.match(regex);
    if (!match) return null;

    const [, component, className, content] = match;

    return {
        component,
        className: className ?? null,
        content: content
            .replace(/^\r\n|\r\n+$/g, '')
            .replace(/^\n|\n+$/g, '')
            .split('\n')
            .map(i => i.trim())
    };
};

export function parse(text: string) {
    const environments = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        const [, component, className, content] = match;
        environments.push({
            component,
            className: className ?? null,
            content: content
                .replace(/^\r\n|\r\n+$/g, '')
                .replace(/^\n|\n+$/g, '')
                .split('\n')
                .map(i => i.trim())
        });
    }

    return environments;
};

// compile time stack impl
export function parseStack(text: string, ...options: string[]) {
    const tree = {
        root: {
            children: [],
            ...options
        }
    };
};