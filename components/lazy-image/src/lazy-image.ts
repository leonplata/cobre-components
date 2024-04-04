import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { lazyInject } from '@cobre/cobre-di';
import { LazyImageBase } from './lazy-image.base.js';
import style from './lazy-image.style.scss?inline';
import type { ILazyImageDefaultSettings } from './lazy-image.types.js'

declare global {
  interface HTMLElementTagNameMap {
    'cobre-lazy-image': LazyImage;
  }
}

export const LazyImageDefaultSettingsProviderKey = Symbol('LazyImageDefaultSettingsProvider');

@customElement('cobre-lazy-image')
export class LazyImage extends LazyImageBase {
  static readonly styles = [
    unsafeCSS(style),
  ];

  @lazyInject(LazyImageDefaultSettingsProviderKey)
  protected readonly defaultSettings!: ILazyImageDefaultSettings;
}

export default LazyImage;
