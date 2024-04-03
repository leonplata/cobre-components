import { LitElement, html } from 'lit';

export class WipBase extends LitElement {
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
