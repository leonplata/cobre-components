import { customElement } from 'lit/decorators.js';
import { OneupAlbumBase } from './oneup-album.base.js';
import { styles } from './oneup-album.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-album': OneupAlbum;
  }
}

@customElement('oneup-album')
export class OneupAlbum extends OneupAlbumBase {
  static readonly styles = styles;
}
