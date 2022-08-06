import { customElement } from 'lit/decorators.js';
import { lazyInject } from '@oneup/core-website/index.js';
import { OneupPictureBase } from './oneup-picture.base.js';
import { styles } from './oneup-picture.styles.js';
import * as Settings from '@oneup/core-website/interfaces/settings.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-picture': OneupPicture;
  }
}

@customElement('oneup-picture')
export class OneupPicture extends OneupPictureBase {
  static readonly styles = styles;
  
  @lazyInject(Settings.PICTURE_DEFAULT_SETTINGS_PROVIDER)
  protected readonly pictureDefaultSettings: Settings.PictureDefaultSettings;
}
