import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ILinkProps } from './link.types';

export abstract class LinkBase extends LitElement implements ILinkProps {

  @property({ type: String, attribute: 'href', reflect: true })
  href: string = '';

  @property({ type: String, attribute : 'target', reflect: true })
  target: ILinkProps['target'] = '_self';

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
        .target=${this.target ?? '_self'}
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
    if (!this.target || this.target === '_self') {
      event.preventDefault();
      const customEvent = new CustomEvent('link-pressed', {
        bubbles: true,
        composed: true,
        detail: {
          href: this.href,
        }
      });
      this.dispatchEvent(customEvent);
    }
  }

  private _listenLinkTouchStart() {
    this._touchCount += 1;
  }
}

export default LinkBase;
