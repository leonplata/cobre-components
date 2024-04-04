import { LitElement, html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import GearsIcon from '@fortawesome/fontawesome-free/svgs/solid/gears.svg';
import PaintRollerIcon from '@fortawesome/fontawesome-free/svgs/solid/paint-roller.svg';
import PenRulerIcon from '@fortawesome/fontawesome-free/svgs/solid/pen-ruler.svg';

export class WipBase extends LitElement {
  render() {
    return html`
    <div class="wrapper" role="alert">
      <div class="content">
        <slot></slot>
      </div>
      <div class="icons" aria-hidden="true">
        <div class="circle">
          ${unsafeSVG(PenRulerIcon)}
        </div>
        <div class="circle">
          ${unsafeSVG(PaintRollerIcon)}
        </div>
        <div class="circle">
          ${unsafeSVG(GearsIcon)}
        </div>
      </div>
    </div>
    `;
  }
}
