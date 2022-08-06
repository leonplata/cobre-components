import { customElement } from 'lit/decorators.js';
import { lazyInject } from '@oneup/core-website/index.js';
import * as Services from '@oneup/core-website/interfaces/services.js';
import { OneupLinkBase } from './oneup-link.base.js';
import { styles } from './oneup-link.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-link': OneupLink;
  }
}

@customElement('oneup-link')
export class OneupLink extends OneupLinkBase {
  static readonly styles = styles;

  @lazyInject(Services.NAVIGATION_SERVICE_PROVIDER)
  protected readonly navigationService: Services.NavigationService;
}
