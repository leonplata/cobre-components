import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { LazyImageBase } from './lazy-image.base.js';
import style from './lazy-image.style.scss?inline';
import type { ILazyImageDefaultSettings } from './lazy-image.types.js'

declare global {
  interface HTMLElementTagNameMap {
    'cobre-lazy-image': LazyImage;
  }
}

@customElement('cobre-lazy-image')
export class LazyImage extends LazyImageBase {
  static readonly styles = [
    unsafeCSS(style),
  ];

  protected readonly defaultSettings: ILazyImageDefaultSettings = {
    alt: '',
    src: '',
    placeholderSrc: '',
  };
}

export default LazyImage;
