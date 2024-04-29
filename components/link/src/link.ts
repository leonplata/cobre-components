import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LinkBase } from './link.base.js';
import style from './link.style.scss?inline';
import type { ILinkNavigationService } from './link.types';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-link': Link;
  }
}

@customElement('cobre-link')
export class Link extends LinkBase {
  static readonly styles = [
    unsafeCSS(style),
  ];

  protected readonly navigationService: ILinkNavigationService = {
    navigate(url: string) {
      window.location.href = url;
    }
  };
}

export default Link;
