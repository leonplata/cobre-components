import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { lazyInject } from '@cobre/cobre-di';
import { LinkBase } from './link.base.js';
import style from './link.style.scss?inline';
import type { ILinkNavigationService } from './link.types';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-link': Link;
  }
}

export const LinkNavigationServiceProviderKey = Symbol('LinkNavigationServiceProvider');

@customElement('cobre-link')
export class Link extends LinkBase {
  static readonly styles = [
    unsafeCSS(style),
  ];

  @lazyInject(LinkNavigationServiceProviderKey)
  protected readonly navigationService!: ILinkNavigationService;
}

export default Link;
