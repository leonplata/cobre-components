import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { boundMethod } from 'autobind-decorator';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export abstract class StickyBase extends LitElement {

  private _ticking: boolean = false;

  @state()
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

export default StickyBase;
