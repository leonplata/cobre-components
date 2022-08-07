import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-collapse/iron-collapse.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/hardware-icons.js";
import "@aeb/aeb-shared-styles/aeb-shared-styles.js";

class OneupCollapseElement extends PolymerElement {
  static get template() {
    return html`
      <style include="aeb-shared-styles">
        :host {
          display: block;
          margin: 20px 0;
        }
        iron-icon {
          margin-right: 25px;
          transition: all 0.2s ease-out;
        }
        .collapse-bar {
          cursor: pointer;
          background: #f8f8f8;
          height: 64px;
          display: flex;
          align-items: center;
          padding: 0 25px;
          font-weight: bold;
          border: 1px solid #f4f4f4;
          user-select: none;
        }
        .collapse-title {
          flex: 1;
          text-align: center;
          margin-left: -48px;
        }
        .collapsed-false {
          transform: rotate(-90deg);
        }
        @media screen and (max-width: 767px) {
          .collapse-bar {
            height: 48px;
            font-size: 14px;
          }
        }
      </style>
      <div class="collapse-bar" on-click="_toggle">
        <iron-icon
          class$="collapsed-[[opened]]"
          icon="hardware:keyboard-arrow-down"
        ></iron-icon>
        <div class="collapse-title"><i>[[title]]</i></div>
      </div>

      <iron-collapse opened="[[opened]]">
        <slot></slot>
      </iron-collapse>
    `;
  }

  static get properties() {
    return {
      title: {
        type: String,
        reflectToAttribute: true,
      },
      opened: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false,
      },
    };
  }

  opened: any;

  _toggle() {
    this.opened = !this.opened;
  }
}

window.customElements.define("oneup-collapse", OneupCollapseElement);
