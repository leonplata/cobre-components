import { LitElement, html, PropertyValueMap } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref, createRef } from 'lit/directives/ref.js';
import type { IYouTubePlayListProps, IYouTubeVideo } from './youtube-playlist.types.js';

export abstract class YouTubePlaylistBase extends LitElement implements IYouTubePlayListProps {

  @property({ type: String })
  title = '';

  @property({ type: Array, attribute: 'playlist' })
  playlist?: IYouTubeVideo[] = [];

  @state()
  currentVideo?: IYouTubeVideo = undefined;

  @state()
  protected parentRect?: DOMRect = undefined;

  @state()
  currentVideoIndex = -1;

  private iframeRef = createRef<HTMLIFrameElement>();

  constructor() {
    super();
    this._handleResize = this._handleResize.bind(this);
  }

  protected willUpdate(changedProperties: PropertyValueMap<YouTubePlaylistBase>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('playlist')) {
      this._observePlaylist(this.playlist);
    }
    if (changedProperties.has('playlist') && changedProperties.has('currentVideo') && this.playlist && this.currentVideo) {
      this.currentVideoIndex = this._computeCurrentVideoIndex(this.playlist, this.currentVideo);
    }
  }

  _observePlaylist(playlist: any) {
    const video = playlist && playlist.list && playlist.list[0];
    if (video) this.currentVideo = video;
  }

  _handlePlaylistItemSelect(video: IYouTubeVideo) {
    this.currentVideo = video;
    const iframe = this.iframeRef.value;
    if (!iframe) {
      return;
    }
    iframe.addEventListener('load', () => this._playCurrentVideo(iframe), {
      once: true,
    });
  }

  _playCurrentVideo(iframe: HTMLIFrameElement) {
    iframe.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: [],
      }),
      '*'
    );
  }

  _computeCurrentVideoIndex(playlist: IYouTubeVideo[], currentVideo: IYouTubeVideo) {
    return playlist && playlist.indexOf(currentVideo) + 1;
  }

  _handleResize() {
    this.parentRect = this.parentElement?.getBoundingClientRect();
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleResize();
    window.addEventListener('resize', this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._handleResize);
  }

  render() {
    return html`
      <div class="playlist-container">
        <div id="player" class="player">
          ${this.currentVideo ? html`
            <iframe
              ${ref(this.iframeRef)}
              height="315"
              .src=${`https://www.youtube.com/embed/${this.currentVideo.id}?enablejsapi=1`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >
            </iframe>
          `:null}
        </div>
        <div id="playlist" class="playlist">
          <div class="playlist-status">
            Reproduciendo: ${this.currentVideoIndex} / ${this.playlist?.length ?? 0}
          </div>
          <div class="playlist-list-container">
            <div class="playlist-list">
              ${this.playlist?.map(video => html`
                <div
                  class=${classMap({
                    'playlist-item': true,
                    [`selected-${this.currentVideo === video}`]: true,
                  })}
                  @click=${() => this._handlePlaylistItemSelect(video)}
                >
                  <div class="playlist-item-thumbnail">
                    <img .src=${'data:image/jpeg;base64,' + video.thumbnail}>
                  </div>
                  <div class="playlist-item-info">
                    <div class="playlist-item-title">
                      ${video.title}
                    </div>
                    <div class="playlist-item-duration">
                      ${video.duration}
                    </div>
                  </div>
                </div>
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default YouTubePlaylistBase;
