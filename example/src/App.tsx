import './index.css';
import { parse } from '../../lib';
import { Page } from '../../lib';
import testString from './test.tex?raw';

export default function App() {
    console.log(parse(testString));

    return (
        <Page
            text={testString}
            components={{
                test: testComponent
            }}
        />
    );
};

function testComponent({ className, content }: { className: string, content: string[] }) {
    return (
        <div className={className} style={{ border: '1px solid black' }}>
            {content.map((i, n) => <p key={n}>{i}</p>)}
        </div>
    );
}