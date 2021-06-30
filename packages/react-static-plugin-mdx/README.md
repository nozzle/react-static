# react-static-plugin-mdx

A [React-Static](https://react-static.js.org) plugin that adds loader support for [mdx](https://github.com/mdx-js/mdx)

## Installation

- In an existing react-static site run:

```bash
$ yarn add react-static-plugin-mdx
```

- Then add the plugin to your `static.config.js`:

```javascript
export default {
  plugins: ["react-static-plugin-mdx"]
};
```

- You can now use `.md` or `.mdx` files in your `/pages` directory and route components.

## With Options

```javascript
export default {
  plugins: [
    [
      "react-static-plugin-mdx",
      {
        includePaths: [/* ... */], // Additional include paths on top of the default jsLoader paths
        extensions: ['.md', '.mdx'], // NOTE: these are the default extensions
        mdxOptions: {
          remarkPlugins: [/* ... */],
          rehypePlugins: [/* ... */],
        },
        parseFrontMatter: false, // Extract front matter from markdown. Disabled by default.
      }
    ]
  ]
};
```


## MDXProvider

You are likely to want to customize the components you want to use in MDX.

```bash
yarn add @mdx-js/react
```

and to use it you just need to add a provider somewhere in your tree:

```js
import { MDXProvider } from '@mdx-js/react'
import { Root, Routes } from "react-static"
import { Router } from "@reach/router"
import React from "react"

const Wrapper = ({children}) => <main style={{ padding: '20px'}} children={children} />
const H1 = ({children}) => <h1 style={{ padding: '1rem', background: 'linear-gradient(to right, #1565C0, #b92b27)' }} children={children} />


function App() {
  return (
    <Root>
      <React.Suspense fallback={<em>Loading...</em>}>
        <MDXProvider components={{ wrapper: Wrapper, h1: H1 }}>
          <Router>
            <Routes path="*" />
          </Router>
        </MDXProvider>
      </React.Suspense>
    </Root>
  )
}
```

Typescript typings: https://github.com/mdx-js/mdx/issues/616

## Frontmatter
With `parseFrontMatter` enabled, if you have a markdown file like
```markdown
---
title: Awesome!
---
# About page
```
Then you can write a React component like
```javascript
import about, { frontMatter } from 'path/to/about.md';
console.log(frontMatter); // Will output { title: 'Awesome!' }

export default about; // A React component for (<h1>About page</h1>)
```
