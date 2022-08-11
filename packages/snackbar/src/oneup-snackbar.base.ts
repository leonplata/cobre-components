import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export abstract class OneupSnackbarBase extends LitElement {
  @property({ type: Number })
  duration = 3000;

  @property({ type: String, attribute: 'background-color' })
  backgroundColor = '#333';

  show() {
    const snackbar = this.shadowRoot?.querySelector('.snackbar');
    if (snackbar) {
      snackbar.classList.add('show');
      setTimeout(() => snackbar.classList.remove('show'), this.duration);
    }
  }

  render() {
    return html`
      <div class="snackbar" style="background-color: ${this.backgroundColor};">
        <slot></slot>
      </div>
    `;
  }
}
