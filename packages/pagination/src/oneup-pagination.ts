import { customElement } from 'lit/decorators.js';
import { OneupPaginationBase } from './oneup-pagination.base.js';
import { styles } from './oneup-pagination.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-pagination': OneupPagination;
  }
}

@customElement('oneup-pagination')
export class OneupPagination extends OneupPaginationBase {
  static readonly styles = styles;
}
