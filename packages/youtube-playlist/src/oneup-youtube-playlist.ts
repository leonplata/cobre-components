import { customElement } from 'lit/decorators.js';
import { OneupYouTubePlaylistBase } from './oneup-youtube-playlist.base.js';
import { styles } from './oneup-youtube-playlist.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'oneup-youtube-playlist': OneupYouTubePlaylist;
  }
}

@customElement('oneup-youtube-playlist')
export class OneupYouTubePlaylist extends OneupYouTubePlaylistBase {
  static readonly styles = styles;
}
