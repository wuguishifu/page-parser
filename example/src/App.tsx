import { Debug, Tree } from '@wuguishifu/page-parser';
import testString from './test.tex?raw';

import './index.css';
import Page from './page';
import Card from './components/Card';
import Split from './components/Split';

export default function App() {
    return (
        <main className='pb-4'>
            <Section>
                <h1 className='text-center text-3xl pb-4 font-semibold'>embeded custom components</h1>
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
            </Section>
            <Section>
                <h1 className='text-center text-3xl pb-4 font-semibold'>file defined custom components</h1>
                <Tree
                    file={testString}
                    componentDefinitions={{
                        Card,
                        Split
                    }}
                />
            </Section>
            <Section>
                <h1 className='text-center text-3xl pb-4 font-semibold'>compiled via npx</h1>
                <Page />
            </Section>
            <Section>
                <h1 className='text-center text-3xl pb-4 font-semibold'>debug tree</h1>
                <Debug file={testString} />
            </Section>
        </main>
    );
};

function Section({ children }: { children: React.ReactNode }) {
    return (
        <div className='mt-4 px-4'>
            <div className='py-4 rounded-lg bg-white shadow'>
                {children}
            </div>
        </div>
    );
}