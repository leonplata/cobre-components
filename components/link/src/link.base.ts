import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ILinkNavigationService } from './link.types';

export abstract class LinkBase extends LitElement {

  protected abstract readonly navigationService: ILinkNavigationService;

  @property({ type: String, attribute: 'href', reflect: true })
  href: string = '';

  @property({ type: String, attribute : 'target', reflect: true })
  target: '_blank'|'_self'|'_parent'|'_top' = '_self';

  @property({ type: Boolean, attribute: 'unstyled', reflect: true })
  unstyled: boolean = false;

  @property({ type: Boolean, attribute: 'no-pointer', reflect: true })
  noPointer: boolean = false;

  @property({ type: Boolean, attribute: 'skip-first-touch' })
  skipFirstTouch: boolean = false;

  private _touchCount: number = 0;

  render() {
    return html`
      <a
        class=${classMap({
          ['unstyled']: this.unstyled,
          ['no-pointer']: this.noPointer,
        })}
        .href=${this.href}
        .target=${this.target}
        @click=${this._listenLinkClick}
        @touchstart=${this._listenLinkTouchStart}
      >
        <slot></slot>
      </a>
    `;
  }

  private _listenLinkClick(event: Event) {
    if (this.skipFirstTouch && this._touchCount === 1) {
      event.preventDefault();
      return;
    }
    this._touchCount = 0;
    if (this.target === '_self') {
      event.preventDefault();
      this.navigationService.navigate(this.href);
    }
  }

  private _listenLinkTouchStart() {
    this._touchCount += 1;
  }
}

export default LinkBase;
