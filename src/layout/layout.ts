import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LayoutBase } from './layout.base.js';
import style from './layout.style.scss?inline';
import './layout.setup.js';

import { GRID_CSS } from '@/style-bootstrap4/grid.js';
import { DISPLAY_CSS } from '@/style-bootstrap4/utilities/display.js';
import '@/sticky/sticky.js';
import '@/drawer/drawer.js';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-layout': Layout;
  }
}

@customElement('cobre-layout')
export class Layout extends LayoutBase {
  static readonly styles = [
    GRID_CSS,
    DISPLAY_CSS,
    unsafeCSS(style),
  ];
}

export default Layout;
