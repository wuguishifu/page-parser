import React from 'react';

export const baked: Record<string, React.FC<{
    className?: string;
    children: React.ReactNode
    values?: string[];
}>> = {
    p: ({ values, className }) => <p className={className} dangerouslySetInnerHTML={{ __html: values?.[0] ?? '' }} />,
    br: () => <br />,
    div: ({ children, className }) => <div className={className}>{children}</div>,
    image: ({ values, className }) => <img className={className} src={values?.[0]} />,
    url: ({ values, className }) => <a href={values?.[0]} className={className}>{values?.[1]}</a>,
    vspace: ({ values }) => <div style={{ height: values?.[0] }} />,
    hspace: ({ values }) => <div style={{ width: values?.[0] }} />,
};