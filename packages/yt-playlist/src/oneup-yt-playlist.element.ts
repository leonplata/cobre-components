import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';

/**
 * `oneup-yt-playlist`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class OneupYouTubePlaylistElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .playlist-container {
          display: flex;
          flex-direction: row;
          padding-bottom: 48px;
          width: 100%;
        }
        .player {
          flex: 1;
          background: black;
          overflow: hidden;
        }
        iframe {
          width: 100%;
        }
        .playlist {
          display: flex;
          flex-direction: column;
          margin: 0 10px;
          flex: 1;
        }
        .playlist-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
          margin-left: 5px;
        }
        .playlist-list-container {
          position: relative;
          flex: 1;
          overflow-y: auto;
        }
        .playlist-list {
          position: absolute;
          left: 0;
          right: 0;
        }
        .playlist-item {
          display: flex;
          flex-direction: row;
          cursor: pointer;
          margin: 5px;
          padding: 5px;
          transition: all 0.2s ease-out;
          background: #f5f5f5;
        }
        .playlist-item.selected-false:hover {
          background: #ddd;
        }
        .playlist-item.selected-true {
          color: white;
          background: #74510d;
        }
        .playlist-item .playlist-item-thumbnail {
          min-width: 120px; /* <-- Safari 9 fix */
          margin-right: 10px;
        }
        .playlist-item-info {
          font-family: 'Open Sans';
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .playlist-item-title {
          font-weight: 500;
        }
        .playlist-item-duration {
          font-weight: bold;
        }
        .playlist-status {
          text-align: right;
        }
        @media screen and (max-width: 767px) {
          .playlist-container {
            flex-direction: column;
          }
          .playlist-list-container {
            min-height: 400px;
          }
          .playlist,
          .playlist-item {
            margin-left: 0;
            margin-right: 0;
          }
        }
      </style>
      <div class="playlist-container">
        <div id="player" class="player">
          <template is="dom-if" if="[[currentVideo]]">
            <iframe
              height="315"
              src$="https://www.youtube.com/embed/[[currentVideo.id]]?enablejsapi=1"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >
            </iframe>
          </template>
        </div>
        <div id="playlist" class="playlist">
          <!--<div class="playlist-title">
            [[playlist.title]]
          </div>-->
          <div class="playlist-status">
            Reproduciendo: [[currentVideoIndex]] / [[playlist.list.length]]
          </div>
          <div class="playlist-list-container">
            <div class="playlist-list">
              <template is="dom-repeat" items="[[playlist.list]]">
                <div
                  class$="playlist-item selected-[[equal(currentVideo, item)]]"
                  on-click="_handlePlaylistItemSelect"
                >
                  <div class="playlist-item-thumbnail">
                    <img src$="data:image/jpeg;base64,[[item.thumbnail]]" />
                  </div>
                  <div class="playlist-item-info">
                    <div class="playlist-item-title">
                      [[item.title]]
                    </div>
                    <div class="playlist-item-duration">
                      [[item.duration]]
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  static get properties() {
    return {
      title: String,
      currentVideo: Object,
      parentRect: {
        type: Object,
      },
      playlist: {
        type: Object,
        observer: '_observePlaylist',
      },
      playlistUrl: {
        type: String,
        reflectToAttribute: true,
        observer: '_observePlaylistUrl',
      },
      currentVideoIndex: {
        type: Number,
        computed: '_computeCurrentVideoIndex(playlist, currentVideo)',
      },
    };
  }

  currentVideo: any;
  parentRect: any;
  parentElement: any;
  playlist: any;

  constructor() {
    super();
    this._handleResize = this._handleResize.bind(this);
  }

  equal(a: any, b: any) {
    return a === b;
  }

  _observePlaylist(playlist: any) {
    const video = playlist && playlist.list && playlist.list[0];
    if (video) this.currentVideo = video;
  }

  async _observePlaylistUrl(url: string) {
    const response = await fetch(url);
    const content = await response.json();
    this.playlist = content;
  }

  _handlePlaylistItemSelect(event: any) {
    const video = event.model.item;
    this.currentVideo = video;
    const iframe = this.$.player.querySelector('iframe');
    if (!iframe) return;
    iframe.addEventListener('load', () => this._playCurrentVideo(iframe), {
      once: true,
    });
  }

  _playCurrentVideo(iframe: any) {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: [],
      }),
      '*'
    );
  }

  _computeCurrentVideoIndex(playlist: any, currentVideo: any) {
    return playlist && playlist.list.indexOf(currentVideo) + 1;
  }

  _handleResize() {
    this.parentRect = this.parentElement.getBoundingClientRect();
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
}
