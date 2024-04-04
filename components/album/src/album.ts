import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import AlbumBase from './album.base.js';
import style from './album.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-album': Album;
  }
}

@customElement('cobre-album')
export class Album extends AlbumBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default Album;
