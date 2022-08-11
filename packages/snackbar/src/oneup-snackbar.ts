import { customElement } from 'lit/decorators.js';
import { OneupSnackbarBase } from './oneup-snackbar.base.js';
import { styles } from './oneup-snackbar.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-snackbar': OneupSnackbar;
  }
}

@customElement('oneup-snackbar')
export class OneupSnackbar extends OneupSnackbarBase {
  static readonly styles = styles;
}
