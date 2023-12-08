import { Tree } from 'page-parser';
import testString from './test.tex?raw';

import './index.css';

export default function App() {
    return (
        <>
            <Tree
                file={testString}
                componentDefinitions={{
                    Card: ({ children, className }) => (
                        <div className={`flex flex-1 flex-col items-center py-4 bg-blue-200 rounded-lg ${className}`}>
                            {children}
                        </div>
                    ),
                    Split: ({ children, className }) => (
                        <div className={`w-full flex flex-row items-center gap-8 px-8 ${className}`}>
                            {children}
                        </div>
                    )
                }}
            />
        </>
    );
};