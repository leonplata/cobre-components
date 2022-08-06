import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { boundMethod } from 'autobind-decorator';

export const MAX_TOUCH_MOVE_SNAPSHOTS = 10;

export const EXPECTED_TOUCH_MOVE_SPEED_AVERAGE = 10;

function calculateSpeed(values: number[]): number[] {
  return values.map((v, i) => values[i] - (values[i-1] || 0));
}

function calculateAverage(values: number[]): number {
  return values.reduce((total, next) => total + next) / values.length;
}

export class OneupDrawerElement extends LitElement {

  @property({
    type: Boolean,
    reflect: true,
  })
  opened: boolean = false;

  @property({
    type: Boolean,
    attribute: 'from-left',
    reflect: true,
  })
  fromLeft: boolean = false;

  @property({
    type: Object,
  })
  target: Element = window.document.body;

  private _initialTouchPositionX: number = 0;

  private _touchMoveSnapshots: number[] = [];

  static styles = css`
    :host {
      display: contents;
      --drawer-width: 300px;
      --drawer-background: white;
      --drawer-box-shadow: 0 10px 20px rgba(0,0,0,0.38), 0 6px 6px rgba(0,0,0,0.46);
      --backdrop-background: black;
      --backdrop-opacity: .5;
      --backdrop-transition-speed: .2s;
    }
    .drawer {
      box-sizing: border-box;
      position: fixed;
      z-index: 101;
      right: 0;
      top: 0;
      bottom: 0;
      width: var(--drawer-width);
      background: var(--drawer-background);
      transition: transform var(--backdrop-transition-speed) ease-out;
      box-shadow: var(--drawer-box-shadow);
    }
    .drawer.opened-false {
      transform: translateX(var(--drawer-width));
      box-shadow: none;
    }
    .drawer.from-left-true {
      right: initial;
      left: 0;
    }
    .drawer.opened-false.from-left-true {
      -ms-transform: translateX(- var(--drawer-width));
      transform: translateX(calc(0.001px - var(--drawer-width)));
    }
    .backdrop {
      z-index: 100;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: var(--backdrop-opacity);
      background: var(--backdrop-background);
      transition: opacity var(--backdrop-transition-speed) ease-out;
    }
    .backdrop.opened-false {
      opacity: 0;
      pointer-events: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.target.addEventListener('open-oneup-drawer', this.open);
    this.target.addEventListener('close-oneup-drawer', this.close);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.target.removeEventListener('open-oneup-drawer', this.open);
    this.target.removeEventListener('close-oneup-drawer', this.close);
  }

  @boundMethod
  open() {
    this.opened = true;
    this.target.classList.add('oneup-drawer-opened');
    this.target.addEventListener('touchstart', this._listenTouchStart);
  }

  @boundMethod
  close() {
    this.opened = false;
    this.target.classList.remove('oneup-drawer-opened');
    this.target.removeEventListener('touchstart', this._listenTouchStart);
    this.target.removeEventListener('touchmove', this._listenTouchMove);
    this.target.removeEventListener('touchend', this._listenTouchEnd);
  }

  render() {
    return html`
      <div class="drawer opened-${this.opened} from-left-${this.fromLeft}">
        <slot></slot>
      </div>
      <div class="backdrop opened-${this.opened}" @click=${this.close}></div>
    `;
  }

  @boundMethod
  private _listenTouchStart(event: TouchEvent) {
    this._touchMoveSnapshots = [];
    const firstTouch = event.touches.item(0);
    if (firstTouch) {
      this._initialTouchPositionX = firstTouch.screenX;
      this.target.addEventListener('touchmove', this._listenTouchMove);
      this.target.addEventListener('touchend', this._listenTouchEnd);
    }
  }

  @boundMethod
  private _listenTouchMove(event: TouchEvent) {
    const firstTouch = event.touches.item(0);
    if (firstTouch) {
      const currentPositionX = firstTouch.screenX - this._initialTouchPositionX;
      this._touchMoveSnapshots.push(currentPositionX);
      if (this._touchMoveSnapshots.length > MAX_TOUCH_MOVE_SNAPSHOTS) {
        this._touchMoveSnapshots.shift();
      }
    }
  }

  @boundMethod
  private _listenTouchEnd(event: TouchEvent) {
    this.target.removeEventListener('touchmove', this._listenTouchMove);
    this.target.removeEventListener('touchend', this._listenTouchEnd);
    const touchMoveSpeed = calculateSpeed(this._touchMoveSnapshots);
    if (touchMoveSpeed.length) {
      const direction = this.fromLeft ? -1 : 1;
      const average = calculateAverage(touchMoveSpeed) * direction;
      if (average > EXPECTED_TOUCH_MOVE_SPEED_AVERAGE) {
        this.close();
      }
    }
  }
}
