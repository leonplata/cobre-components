import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LayoutBase } from './layout.base.js';
import style from './layout.style.scss?inline';
import './layout.setup.js';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-layout': Layout;
  }
}

@customElement('cobre-layout')
export class Layout extends LayoutBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Layout;
