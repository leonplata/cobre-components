import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { boundMethod } from 'autobind-decorator';
import {
  ResponsiveWidthChanged,
  initializeResponsiveEvents,
} from './responsiveness.js';

import { GRID_CSS } from '@oneup/style-bootstrap4/grid.js';
import { DISPLAY_CSS } from '@oneup/style-bootstrap4/utilities/display.js';
import '@oneup/oneup-sticky';
import '@oneup/oneup-drawer';

@customElement('oneup-layout')
export class OneupLayoutElement extends LitElement {
  static get styles() {
    return [
      GRID_CSS,
      DISPLAY_CSS,
      css`
        :host {
          --bg-color: white;
          --fg-color: black;
          --header-bg-color: black;
          --header-fg-color: orange;
          --nav-bg-color: orange;
          --nav-fg-color: black;
          --main-bg-color: white;
          --main-fg-color: black;
          --footer-bg-color: black;
          --footer-fg-color: orange;
          --credits-bg-color: white;
          --credits-fg-color: black;
          --footer-margin-top: 48px;
          overflow-x: hidden;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-color);
          color: var(--fg-color);
        }
        .header-container {
          background-color: var(--header-bg-color);
          color: var(--header-fg-color);
        }
        .header-container > .container {
          display: flex;
        }
        .header-container > .container > .header-wrapper {
          flex: 1;
        }
        .navigation-container {
          background-color: var(--nav-bg-color);
          color: var(--nav-fg-color);
        }
        .main-container {
          flex-grow: 1;
          flex: 1;
          background-color: var(--main-bg-color);
          color: var(--main-fg-color);
        }
        .footer-container {
          margin-top: var(--footer-margin-top);
          background-color: var(--footer-bg-color);
          color: var(--footer-fg-color);
        }
        .credits-container {
          background-color: var(--credits-bg-color);
          color: var(--credits-fg-color);
        }
      `,
    ];
  }

  @property({ type: String })
  responsiveness: ResponsiveWidthChanged = 'enteredXS';

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      'responsive-width-changed',
      this._listenResponsiveWidthChanged as EventListener
    );
    initializeResponsiveEvents();
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
            <oneup-sticky>
              <div class="header-container">
                <div class="container">
                  <div class="header-wrapper">
                    <slot name="header"></slot>
                  </div>
                </div>
              </div>
            </oneup-sticky>
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
        <oneup-sticky>
          <div class="navigation-container">
            <div class="container">
              <slot name="navigation"></slot>
            </div>
          </div>
        </oneup-sticky>
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
      <oneup-drawer class="d-lg-none">
        <slot name="drawer"></slot>
      </oneup-drawer>
    `;
  }

  @boundMethod
  _listenResponsiveWidthChanged(event: CustomEvent<ResponsiveWidthChanged>) {
    this.responsiveness = event.detail;
  }
}
