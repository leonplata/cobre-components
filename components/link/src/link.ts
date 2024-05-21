import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LinkBase } from './link.base.js';
import style from './link.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-link': Link;
  }
}

@customElement('cobre-link')
export class Link extends LinkBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Link;
