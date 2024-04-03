import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { boundMethod } from 'autobind-decorator';
import type { ResponsiveWidthChanged } from './layout.types.js';

export abstract class LayoutBase extends LitElement {

  @state()
  protected responsiveness: ResponsiveWidthChanged = 'enteredXS';

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      'responsive-width-changed',
      this._listenResponsiveWidthChanged as EventListener
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      'responsive-width-changed',
      this._listenResponsiveWidthChanged as EventListener
    );
  }

  render() {
    return html`
      ${this.responsiveness === 'enteredMD' ||
      this.responsiveness === 'enteredSM' ||
      this.responsiveness === 'enteredXS'
        ? html`
            <cobre-sticky>
              <div class="header-container">
                <div class="container">
                  <div class="header-wrapper">
                    <slot name="header"></slot>
                  </div>
                </div>
              </div>
            </cobre-sticky>
          `
        : html`
            <div class="header-container">
              <div class="container">
                <div class="header-wrapper">
                  <slot name="header"></slot>
                </div>
              </div>
            </div>
          `}
      <div class="d-none d-lg-block">
        <cobre-sticky>
          <div class="navigation-container">
            <div class="container">
              <slot name="navigation"></slot>
            </div>
          </div>
        </cobre-sticky>
      </div>
      <div class="main-container">
        <div class="container">
          <slot name="breadcrumbs"></slot>
        </div>
        <slot name="main"></slot>
      </div>
      <div class="footer-container">
        <div class="container">
          <slot name="footer"></slot>
        </div>
      </div>
      <div class="credits-container">
        <div class="container">
          <slot name="credits"></slot>
        </div>
      </div>
      <cobre-drawer class="d-lg-none">
        <slot name="drawer"></slot>
      </cobre-drawer>
    `;
  }

  @boundMethod
  _listenResponsiveWidthChanged(event: CustomEvent<ResponsiveWidthChanged>) {
    this.responsiveness = event.detail;
  }
}

export default LayoutBase;
