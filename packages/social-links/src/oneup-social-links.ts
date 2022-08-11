import { customElement } from 'lit/decorators.js';
import { OneupSocialLinksBase } from './oneup-social-links.base.js';
import { styles } from './oneup-social-links.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-social-links': OneupSocialLinks;
  }
}

@customElement('oneup-social-links')
export class OneupSocialLinks extends OneupSocialLinksBase {
  static readonly styles = styles;
}
