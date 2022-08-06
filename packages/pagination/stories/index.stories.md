```js script
import { html } from '@open-wc/demoing-storybook';
import '../oneup-pagination.js';

export default {
  title: '<oneup-pagination>',
  component: 'oneup-pagination',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# OneupPagination

## How to use

### Installation

```bash
npm install @oneup/oneup-pagination
```

```bash
yarn add @oneup/oneup-pagination
```

```js
import '@oneup/oneup-pagination/oneup-pagination.js';
```

## Scenarios

###### Show Pagination

```js preview-story
export const showPagination = () => html`
  <oneup-pagination
    max="5"
    total="150"
    per-page="5"
    current-page="30"
  >
    <div slot="prev">PREV</div>
    <div slot="next">NEXT</div>
  </oneup-pagination>
`;
```
