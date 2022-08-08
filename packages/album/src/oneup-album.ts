import { LitElement, html, css, PropertyValues } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/hardware-icons.js";
import type { AlbumItem } from './oneup-album.interfaces.js';

@customElement('oneup-album')
export class OneupAlbumElement extends LitElement {

  @property({ type: String, attribute: 'album-url' })
  albumUrl = '';

  @property({ type: Array, attribute: 'album' })
  album: AlbumItem[] = [];

  @state()
  protected currentImage?: AlbumItem;

  @state()
  protected loading = true;

  @state()
  protected show = false;

  @state()
  protected grid = false;

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('albumUrl')) {
      const newValue = this.albumUrl;
      setTimeout(() => this._loadAlbum(newValue));
    }
    if (changedProperties.has('album')) {
      const newValue = this.album;
      setTimeout(() => this._updateCurrentImage(newValue));
    }
    if (changedProperties.has('currentImage')) {
      setTimeout(() => this._toggleBlur());
    }
  }
  
  async _loadAlbum(albumUrl: string) {
    if (!albumUrl) {
      this.album = [];
      return;
    }
    const response = await fetch(this.albumUrl);
    if (response.ok) {
      this.album = await response.json();
    }
  }

  _computeIndex(currentImage: AlbumItem, album: AlbumItem[] = []) {
    return album.indexOf(currentImage) + 1;
  }

  _switchImage(image: AlbumItem) {
    this.currentImage = image;
    this.show = true;
  }

  _showBig() {
    this.show = true;
  }

  _closeFixed() {
    this.show = false;
  }

  _updateCurrentImage(album: AlbumItem[]) {
    this.currentImage = album[0];
  }

  _goPrev() {
    const index = this.currentImage ? this.album.indexOf(this.currentImage) : -1;
    if (index > 0) {
      this.currentImage = this.album[index - 1];
    }
  }

  _goNext() {
    const index = this.currentImage ? this.album.indexOf(this.currentImage) : -1;
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

  static styles = css`
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
  `;

  render() {
    return html`
      <div class="gallery">
        ${this.grid ? this.album.map(image => html`
          <div
            class="thumb"
            style=${styleMap({
              'background-image': `url(${image.thumb})`
            })}
            @click=${() => this._switchImage(image)}
          >
          </div>
        `):html`
          <div class="normal">
            <div class="controls" style="z-index: 100;">
              <div style="padding: 8px;">
                ${this.currentImage && this._computeIndex(this.currentImage, this.album)} / ${this.album.length}
              </div>
              <div style="flex: 1;"></div>
            </div>
            <div class="content">
              <img
                class="loader"
                .src=${this.currentImage?.full ?? ''}
                @load=${() => this._imageLoaded()}
              >
              <div
                class=${classMap({
                  'full-2': true,
                  'cache': true,
                  ['loading-' + this.loading]: true
                })}
                style=${styleMap({
                  'background-image': `url(${this.currentImage?.thumb ?? ''})`
                })}
                @click=${() => this._showBig()}
              >
              </div>
              <div
                class="full-2"
                style=${styleMap({
                  'background-image': `url(${this.currentImage?.full ?? ''})`
                })}
                @click=${() => this._showBig()}
              >
              </div>
              <div
                class="button button-left"
                @click=${() => this._goPrev()}
              >
                <iron-icon icon="hardware:keyboard-arrow-left"></iron-icon>
              </div>
              <div
                class="button button-right"
                @click=${() => this._goNext()}
              >
                <iron-icon icon="hardware:keyboard-arrow-right"></iron-icon>
              </div>
            </div>
          </div>
        `}
      </div>
      ${this.show ? html`
        <div class="fixed">
          <div class="controls">
            <div style="padding: 8px;">
              ${this.currentImage && this._computeIndex(this.currentImage, this.album)} / ${this.album.length}
            </div>
            <div style="flex: 1;"></div>
            <div
              class="control-button"
              @click=${() => this._closeFixed()}
            >&#x2573;</div>
          </div>
          <div class="content">
            <img
              class="loader"
              .src=${this.currentImage?.full ?? ''}
              @load=${() => this._imageLoaded()}
            >
            <div
              class=${classMap({
                'full': true,
                'cache': true,
                ['loading-' + this.loading]: true
              })}
              style=${styleMap({
                'background-image': `url(${this.currentImage?.thumb ?? ''})`
              })}
            >
            </div>
            <div
              class="full"
              style=${styleMap({
                'background-image': `url(${this.currentImage?.full ?? ''})`
              })}
            >
            </div>
            <div
              class="button button-left"
              @click=${() => this._goPrev()}
            >
              <iron-icon icon="hardware:keyboard-arrow-left"></iron-icon>
            </div>
            <div
              class="button button-right"
              @click=${() => this._goNext()}
            >
              <iron-icon icon="hardware:keyboard-arrow-right"></iron-icon>
            </div>
          </div>
        </div>
      `:null}
    `;
  }
}
