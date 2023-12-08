type CardProps = {
    children?: React.ReactNode;
    className?: string;
    values?: string[]
};

export default function Split({ children, className }: CardProps) {
    return (
        <div className={`w-full flex flex-row items-center gap-8 px-8 ${className}`}>
            {children}
        </div>
    );
};