import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaginationBase } from './pagination.base.js';
import style from './pagination.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-pagination': Pagination;
  }
}

@customElement('cobre-pagination')
export class Pagination extends PaginationBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Pagination;
