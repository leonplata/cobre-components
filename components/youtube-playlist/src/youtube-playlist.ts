import { unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { YouTubePlaylistBase } from './youtube-playlist.base.js';
import style from './youtube-playlist.style.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'cobre-youtube-playlist': YouTubePlaylist;
  }
}

@customElement('cobre-youtube-playlist')
export class YouTubePlaylist extends YouTubePlaylistBase {
  static readonly styles = [
    unsafeCSS(style),
  ];
}

export default YouTubePlaylist;
