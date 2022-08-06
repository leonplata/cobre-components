import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-if.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/hardware-icons.js";
import "@aeb/aeb-shared-styles/aeb-shared-styles.js";

export class OneupAlbumElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gallery {
          display: flex;
          flex-wrap: wrap;
          max-width: 100%;
        }
        .full {
          min-height: 500px;
          height: 90vh;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
          background-color: #2A2421;
          margin: 2px;
        }
        .full-2 {
          min-height: 400px;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
          background-color: #2A2421;
          margin: 2px;
          cursor: zoom-in;
        }
        .thumb {
          position: relative;
          min-width: 200px;
          min-height: 200px;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
          background-color: #2A2421;
          margin: 2px;
          cursor: pointer;
        }
        .thumb::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          pointer-events: none;
          background: #fff;
          opacity: 0;
          transition: all 0.2s ease-out;
        }
        .content {
          flex: 1;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .content .button {
          opacity: 0;
        }
        .content:hover .button {
          opacity: 1;
        }
        .thumb:hover::after {
          opacity: 0.4;
        }
        .button {
          color: white;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          cursor: pointer;
          height: 24px;
          width: 24px;
          padding: 12px;
          border-radius: 50%;
          background-color: #2A2421;
          transition: all 0.2s ease-out;
        }
        .button:hover {
          background-color: rgba(255, 255, 255, 0.3);
          color: black;
        }
        .button-left {
          left: 10px;
        }
        .button-right {
          right: 10px;
        }
        .cache {
          filter: blur(0.5rem);
          overflow: hidden;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          transition: opacity 0.5s ease-out;
        }
        .loading-false {
          opacity: 0;
        }
        .loader {
          display: none;
        }
        .normal {
          position: relative;
          display: flex;
          width: 500px;
        }
        .fixed {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, .75);
          display: flex;
          align-items: center;
          animation: fade-in .2s ease-out;
        }
        .controls {
          position: absolute;
          top: 0;
          left: 2px;
          right: 2px;
          height: 48px;
          background: black;
          color: white;
          display: flex;
          z-index: 1001;
        }
        .control-button {
          width: 48px;
          height: 48px;
          padding: 10px;
          user-select: none;
          cursor: pointer;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      </style>
      <div class="gallery">
        <template is="dom-if" if="[[grid]]">
          <template is="dom-repeat" items="[[album]]" as="image">
            <div class="thumb" style$="background-image: url([[image.thumb]])" on-click="_switchImage"><div>
          </template>
        </template>
        <template is="dom-if" if="[[!grid]]">
          <div class="normal">
            <div class="controls" style="z-index: 100;">
              <div style="padding: 8px;">[[_computeIndex(currentImage, album)]] / [[album.length]]</div>
              <div style="flex: 1;"></div>
            </div>
            <div class="content">
              <img class="loader" src="[[currentImage.full]]" on-load="_imageLoaded">
              <div class$="full-2 cache loading-[[loading]]" style$="background-image: url([[currentImage.thumb]])"  on-click="_showBig"></div>
              <div class="full-2" style$="background-image: url([[currentImage.full]])" on-click="_showBig"></div>
              <div class="button button-left" on-click="_goPrev">
                <iron-icon icon="hardware:keyboard-arrow-left"></iron-icon>
              </div>
              <div class="button button-right" on-click="_goNext">
                <iron-icon icon="hardware:keyboard-arrow-right"></iron-icon>
              </div>
            </div>
          </div>
        </template>
      </div>
      <template is="dom-if" if="[[show]]">
        <div class="fixed">
          <div class="controls">
            <div style="padding: 8px;">[[_computeIndex(currentImage, album)]] / [[album.length]]</div>
            <div style="flex: 1;"></div>
            <div class="control-button" on-click="_closeFixed">&#x2573;</div>
          </div>
          <div class="content">
            <img class="loader" src="[[currentImage.full]]" on-load="_imageLoaded">
            <div class$="full cache loading-[[loading]]" style$="background-image: url([[currentImage.thumb]])"></div>
            <div class="full" style$="background-image: url([[currentImage.full]])"></div>
            <div class="button button-left" on-click="_goPrev">
              <iron-icon icon="hardware:keyboard-arrow-left"></iron-icon>
            </div>
            <div class="button button-right" on-click="_goNext">
              <iron-icon icon="hardware:keyboard-arrow-right"></iron-icon>
            </div>
          </div>
        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      albumUrl: {
        type: String,
      },
      album: {
        type: Array,
        observer: "_updateCurrentImage",
      },
      currentImage: {
        type: Object,
        observer: "_toggleBlur",
      },
      loading: {
        type: Boolean,
        value: true,
      },
      show: {
        type: Boolean,
        value: false,
      },
      grid: {
        type: Boolean,
        value: false,
      },
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch(this.albumUrl);
    if (response.ok) {
      this.album = await response.json();
    }
  }

  _computeIndex(currentImage, album = []) {
    return album.indexOf(currentImage) + 1;
  }

  _switchImage(event) {
    this.currentImage = event.model.image;
    this.show = true;
  }

  _showBig() {
    this.show = true;
  }

  _closeFixed() {
    this.show = false;
  }

  _updateCurrentImage(album) {
    this.currentImage = album[0];
  }

  _goPrev() {
    const index = this.album.indexOf(this.currentImage);
    if (index > 0) {
      this.currentImage = this.album[index - 1];
    }
  }

  _goNext() {
    const index = this.album.indexOf(this.currentImage);
    if (index < this.album.length - 1) {
      this.currentImage = this.album[index + 1];
    }
  }

  _imageLoaded() {
    this.loading = false;
  }

  _toggleBlur() {
    this.loading = true;
  }
}

window.customElements.define("oneup-album", OneupAlbumElement);
