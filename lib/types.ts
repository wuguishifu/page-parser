export type TreeNode = {
    name: string;
    className?: string;
    children?: TreeNode[];
    values?: string[];
};