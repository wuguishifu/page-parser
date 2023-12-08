type CardProps = {
    children?: React.ReactNode;
    className?: string;
    values?: string[]
};

export default function Card({ children, className }: CardProps) {
    return (
        <div className={`flex flex-1 flex-col items-center py-4 bg-blue-200 rounded-lg ${className}`}>
            {children}
        </div>
    );
};