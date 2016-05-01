# react-hogan

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

React component wrapping Hogan.js. Can be used to render client-provided templates.

[build-badge]: https://img.shields.io/travis/GregoryPotdevin/react-hogan/master.svg?style=flat-square
[build]: https://travis-ci.org/GregoryPotdevin/react-hogan

[npm-badge]: https://img.shields.io/npm/v/react-hogan.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-hogan

[coveralls-badge]: https://img.shields.io/coveralls/GregoryPotdevin/react-hogan/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/GregoryPotdevin/react-hogan

## Why ??

It may seem weird and redundant to want to use a templating engine with React. I currently use it for 2 different use cases :
- Simple string templating that an end user can edit, like `Hello {{name}}`
- To provide external templating capabilities when exposing React components with a pure-JS API (simple JS wrapper) 

## Installation

`npm install react-hogan --save`

## Features

- Render hogan template as a React component
- Lazy template compilation + re-rendering
- All props besides template and context are passed directly to the 

## Usage 

```
import Hogan from 'react-hogan'
```

```
<Hogan template="Hello {{name}}" context={{name: 'Gregory'}} />
```

## Props

- `template`, Mustache-compatible template
- `context`, JS object to inject in the template
- `Component`, component to use for the rendering (defaults to `div`)

## Example

Demo site with interactive example : http://gregorypotdevin.github.io/react-hogan/

## License

MIT
