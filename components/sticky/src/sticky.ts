import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StickyBase } from './sticky.base.js';
import style from './sticky.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-sticky': Sticky;
  }
}

@customElement('cobre-sticky')
export class Sticky extends StickyBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Sticky;
