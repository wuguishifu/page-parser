import React from 'react';

type PageProps = {
    text: string;
    components: {
        [key: string]: React.FC<{ className: string, content: string[] }>;
    }
}

export function Page({ text, components }: PageProps): React.ReactNode {

};