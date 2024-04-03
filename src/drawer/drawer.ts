import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DrawerBase } from './drawer.base.js';
import style from './drawer.style.scss?inline';
import './drawer.setup.js';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-drawer': Drawer;
  }
}

@customElement('cobre-drawer')
export class Drawer extends DrawerBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Drawer;
