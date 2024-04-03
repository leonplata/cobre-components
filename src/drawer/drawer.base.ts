import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { boundMethod } from 'autobind-decorator';
import { calculateAverage, calculateSpeed } from './drawer.utils';

export abstract class DrawerBase extends LitElement {

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

  @property({
    type: Number,
    attribute: 'max-touch-move-snapshots',
  })
  maxTouchMoveSnapshots: number = 10;

  @property({
    type: Number,
    attribute: 'expected-touch-move-speed-average',
  })
  expectedTouchMoveSpeedAverage: number = 10;

  private _initialTouchPositionX: number = 0;

  private _touchMoveSnapshots: number[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.target.addEventListener('open-cobre-drawer', this.open);
    this.target.addEventListener('close-cobre-drawer', this.close);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.target.removeEventListener('open-cobre-drawer', this.open);
    this.target.removeEventListener('close-cobre-drawer', this.close);
  }

  @boundMethod
  open() {
    this.opened = true;
    this.target.classList.add('cobre-drawer-opened');
    this.target.addEventListener('touchstart', this._listenTouchStart);
  }

  @boundMethod
  close() {
    this.opened = false;
    this.target.classList.remove('cobre-drawer-opened');
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
  private _listenTouchStart(event: Event) {
    if (!(event instanceof TouchEvent)) {
      return
    }
    this._touchMoveSnapshots = [];
    const firstTouch = event.touches.item(0);
    if (firstTouch) {
      this._initialTouchPositionX = firstTouch.screenX;
      this.target.addEventListener('touchmove', this._listenTouchMove);
      this.target.addEventListener('touchend', this._listenTouchEnd);
    }
  }

  @boundMethod
  private _listenTouchMove(event: Event) {
    if (!(event instanceof TouchEvent)) {
      return
    }
    const firstTouch = event.touches.item(0);
    if (firstTouch) {
      const currentPositionX = firstTouch.screenX - this._initialTouchPositionX;
      this._touchMoveSnapshots.push(currentPositionX);
      if (this._touchMoveSnapshots.length > this.maxTouchMoveSnapshots) {
        this._touchMoveSnapshots.shift();
      }
    }
  }

  @boundMethod
  private _listenTouchEnd(event: Event) {
    this.target.removeEventListener('touchmove', this._listenTouchMove);
    this.target.removeEventListener('touchend', this._listenTouchEnd);
    if (!(event instanceof TouchEvent)) {
      return
    }
    const touchMoveSpeed = calculateSpeed(this._touchMoveSnapshots);
    if (touchMoveSpeed.length) {
      const direction = this.fromLeft ? -1 : 1;
      const average = calculateAverage(touchMoveSpeed) * direction;
      if (average > this.expectedTouchMoveSpeedAverage) {
        this.close();
      }
    }
  }
}

export default DrawerBase;
