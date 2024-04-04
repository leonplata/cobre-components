import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { WipBase } from './wip.base.js';
import style from './wip.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-wip': Wip;
  }
}

@customElement('cobre-wip')
export class Wip extends WipBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Wip;
