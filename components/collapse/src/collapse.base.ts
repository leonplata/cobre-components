import { LitElement, html, type PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ICollapseProps } from './collapse.types';

export abstract class CollapseBase extends LitElement implements ICollapseProps {

  @property({ type: String, reflect: true, attribute: 'header' })
  header = '';

  @property({ type: Boolean, reflect: true, attribute: 'opened' })
  opened = false;

  protected willUpdate(changedProperties: PropertyValueMap<CollapseBase> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('opened')) {
      const detail = { value: this.opened };
      const event = new CustomEvent('opened-changed', { detail });
      this.dispatchEvent(event);
    }
  }

  protected toggle() {
    this.opened = !this.opened;
  }

  render() {
    return html`
      <div
        class="collapse-bar"
        @click=${() => this.toggle()}
      >
        <iron-icon
          class=${classMap({
            ['collapsed-' + this.opened]: true
          })}
          icon="hardware:keyboard-arrow-down"
        ></iron-icon>
        <div class="collapse-title">
          <span>${this.header}</span>
        </div>
      </div>
      <iron-collapse .opened=${this.opened}>
        <slot></slot>
      </iron-collapse>
    `;
  }
}

export default CollapseBase;
