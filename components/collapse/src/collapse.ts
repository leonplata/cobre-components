import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CollapseBase } from './collapse.base.js';
import style from './collapse.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-collapse': Collapse;
  }
}

@customElement('cobre-collapse')
export class Collapse extends CollapseBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Collapse;
