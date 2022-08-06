import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@polymer/iron-icon/iron-icon.js';
import '@oneup/iron-icons-fa/common.icons.js';

@customElement('oneup-wip')
export class OneupWipElement extends LitElement {

  static get styles() {
    return [
      css`
        :host {
          --wip-primary-color: #ff2f15;
          --wip-background-color: #eeeeee;
          --wip-foreground-color: #333;
          --wip-font-family: sans-serif;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          padding: 20px 0;
          border: 3px dotted;
          border-color: var(--wip-foreground-color);
          background-color: var(--wip-background-color);
        }
        .content {
          font-weight: bold;
          font-family: var(--wip-font-family);
          text-transform: uppercase;
          margin-bottom: 20px;
          font-size: 24px;
        }
        .circle {
          border-radius: 100%;
          border: 3px solid;
          border-color: var(--wip-foreground-color);
          padding: 5px;
          margin: 10px;
          animation-duration: 1s;
          animation-name: grow;
          animation-iteration-count: infinite;
        }
        .icons {
          display: flex;
        }
        .circle:nth-child(2) {
          animation-delay: 0.2s;
        }
        .circle:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes grow {
          0% {
            transform: scale(1);
          }
          50% {
            border-color: var(--wip-primary-color);
            color: var(--wip-primary-color);
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="content">
        <slot></slot>
      </div>
      <div class="icons">
        <div class="circle">
          <iron-icon icon="common:cogs"></iron-icon>
        </div>
        <div class="circle">
          <iron-icon icon="common:wrench"></iron-icon>
        </div>
        <div class="circle">
          <iron-icon icon="common:paint-brush"></iron-icon>
        </div>
      </div>
    `;
  }
}
