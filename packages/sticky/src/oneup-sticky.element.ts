import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { boundMethod } from 'autobind-decorator';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('oneup-sticky')
export class OneupStickyElement extends LitElement {

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        .sticky {
          z-index: 100;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
      `,
    ];
  }

  private _ticking: boolean = false;

  @property({ type: Object })
  protected rect: DOMRect = this.getBoundingClientRect();

  @boundMethod
  private _handleScroll() {
    if (!this._ticking) {
      window.requestAnimationFrame(() => {
        this.rect = this.getBoundingClientRect();
        this._ticking = false;
      });
    }
    this._ticking = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleScroll();
    window.addEventListener('scroll', this._handleScroll);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._handleScroll);
  }

  render() {
    const isSticky = this.rect.y < 0;
    return html`
      <div class=${classMap({
        sticky: isSticky,
      })}>
        <slot></slot>
      </div>
      <div style=${styleMap({
        height: isSticky ? `${this.rect.height}px` : '0',
      })}>
      </div>
    `;
  }
}
