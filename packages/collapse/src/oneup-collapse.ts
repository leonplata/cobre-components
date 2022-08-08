import { customElement } from 'lit/decorators.js';
import { OneupCollapseBase } from './oneup-collapse.base.js';
import { styles } from './oneup-collapse.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-collapse': OneupCollapseBase;
  }
}

@customElement('oneup-collapse')
export class OneupCollapse extends OneupCollapseBase {
  static readonly styles = styles;
}
