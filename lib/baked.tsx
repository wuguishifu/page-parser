import React from 'react';

export const baked: Record<string, React.FC<{
    className?: string;
    children: React.ReactNode
    value?: string;
}>> = {
    "p": ({ value, className }) => <p className={className} dangerouslySetInnerHTML={{ __html: value ?? '' }} />,
    "br": () => <br />,
    "div": ({ children, className }) => <div className={className}>{children}</div>,
};