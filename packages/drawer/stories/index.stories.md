```js script
import { html } from '@open-wc/demoing-storybook';
import '../oneup-drawer.js';

export default {
  title: '<oneup-drawer>',
  component: 'oneup-drawer',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# OneupDrawer

## How to use

### Installation

```bash
npm install @oneup/oneup-drawer
```

```bash
yarn add @oneup/oneup-drawer
```

```js
import '@oneup/oneup-drawer/oneup-drawer.js';
```

## Scenarios

###### Open from the right

```js preview-story
function openDrawerSimple() {
  document.querySelector('#oneup-drawer-simple').open();
}
export const OpenFromTheRight = () => html`
  <button @click=${openDrawerSimple}>OPEN DRAWER FROM THE RIGHT</button>
  <oneup-drawer id="oneup-drawer-simple">
    Drawer content here...
  </oneup-drawer>
`;
```

###### Open from the left

```js preview-story
function openDrawerCustom() {
  document.querySelector('#oneup-drawer-custom').open();
}
export const OpenFromTheLeft = () => html`
  <button @click=${openDrawerCustom}>OPEN DRAWER FROM THE LEFT</button>
  <oneup-drawer id="oneup-drawer-custom" from-left>
    Drawer content here...
  </oneup-drawer>
`;
```
