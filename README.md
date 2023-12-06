# Page Parser

This is a package that allows you to use TeX syntax to quickly create React webpages. You can build a custom component library, then build your pages using TeX syntax. This library will then compile your TeX code into React components to be displayed on your website.

## Version 1.0.1

Currently, div, p, and br default classes are implemented. Tree works with componentDefinition and DefaultComponent.

## Installation

NPM:

```.
npm i @wuguishifu/page-parser
```

## Usage with Tailwind CSS

This package lets you define class names in the tex files. If you want to use Tailwind CSS, add "tex" to your tailwind.config.js as follows:

```js
export default {
    content: [
        ...,
        "./index.html",
-       "./src/**/*.{js,ts,jsx,tsx}"
+       "./src/**/*.{js,ts,jsx,tsx,tex}"
    ],
    ...
};
```

## Documentation

### Data

Data to be parsed must be a string in latex format (with spaces). This can be an inline variable, or it can be imported from a separate file. You can also pass in a dictionary for custom components defined in your Tex tree. You can also pass in a default component JSX function. Here's an example usage in Vite with React:

#### App.tsx

```tsx
import definition from './definition.tex?raw';
import { Tree } from 'page-parser';

export default function App() {
    return (
        <Tree
            file={definition}
            componentDefinitions={{
                Card: ({children, className}) => (
                    <div className={`flex flex-1 flex-col items-center py-4 bg-blue-200 rounded-lg ${className}`}>
                        {children}
                    </div>
                ),
                Split: ({children, className}) => (
                    <div className={`w-full flex flex-row items-center gap-8 px-8 ${className}`}>
                        {children}
                    </div>
                )
            }}
            DefaultComponent={({children, className}) => (
                <div className={className}>
                    {children}
                </div>
            )}
        />
    );
}
```

#### definition.tex

```tex
\begin{Split}
    \begin{Card}
        Card 1
    \end{Card}
    \begin{Card}
        Card 2
    \end{Card}
\end{Split}
```

#### output

![preview.png](preview.png)

### Todo

- Add more prebaked components for standard components like img, pre, etc.
- Add support for custom tex-like commands, for example \image{filepath.png}[className]

### Credit

Built by Bo Bramer. Copyright 2023-2024 Bo Bramer (<bbramer@uci.edu>)
