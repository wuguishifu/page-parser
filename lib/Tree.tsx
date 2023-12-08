import React from 'react';
import { baked } from './baked';
import { TreeNode } from "./types"
import { parse } from './parser';

type BranchProps = { node: TreeNode } & BaseProps;

type TreeProps = { file: string } & BaseProps;

type BaseProps = {
    componentDefinitions?: Record<string, React.FC<{
        className?: string;
        children?: React.ReactNode;
        values?: string[]
    }>>;
    DefaultComponent?: React.FC<{
        className?: string;
        children: React.ReactNode;
    }>
}

export function TreeBranch(props: BranchProps) {
    const { node, componentDefinitions: components, DefaultComponent } = props;
    const Component = components?.[node.name] ?? baked[node.name] ?? DefaultComponent ?? Default;

    return (
        <Component className={node.className} values={node.values}>
            {node.children?.map((child, i) => (
                <TreeBranch
                    key={i}
                    node={child}
                    componentDefinitions={components}
                    DefaultComponent={DefaultComponent}
                />
            ))}
        </Component>
    );
};

export function Default({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export function Tree({ file, componentDefinitions, DefaultComponent }: TreeProps) {
    return <TreeBranch
        node={parse(file)}
        componentDefinitions={componentDefinitions}
        DefaultComponent={DefaultComponent}
    />;
}

export function Debug({ file }: { file: string }) {
    return (
        <pre>
            {JSON.stringify(parse(file), null, 4)}
        </pre>
    )
}