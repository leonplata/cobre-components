import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SnackbarBase } from './snackbar.base.js';
import style from './snackbar.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-snackbar': Snackbar;
  }
}

@customElement('cobre-snackbar')
export class Snackbar extends SnackbarBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Snackbar;
