import { LitElement, html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/hardware-icons.js";
import type { AlbumItem } from './oneup-album.interfaces.js';

export class OneupAlbumBase extends LitElement {

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

  protected willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('albumUrl')) {
      this._loadAlbum(this.albumUrl);
    }
    if (changedProperties.has('album')) {
      this._updateCurrentImage(this.album);
    }
    if (changedProperties.has('currentImage')) {
      this._toggleBlur();
    }
  }
  
  private async _loadAlbum(albumUrl: string) {
    if (!albumUrl) {
      this.album = [];
      return;
    }
    const response = await fetch(this.albumUrl);
    if (response.ok) {
      this.album = await response.json();
    }
  }

  private _computeIndex(currentImage: AlbumItem, album: AlbumItem[] = []) {
    return album.indexOf(currentImage) + 1;
  }

  private _switchImage(image: AlbumItem) {
    this.currentImage = image;
    this.show = true;
  }

  protected showBig() {
    this.show = true;
  }

  protected closeFixed() {
    this.show = false;
  }

  private _updateCurrentImage(album: AlbumItem[]) {
    this.currentImage = album[0];
  }

  protected goPrev() {
    const index = this.currentImage ? this.album.indexOf(this.currentImage) : -1;
    if (index > 0) {
      this.currentImage = this.album[index - 1];
    }
  }

  protected goNext() {
    const index = this.currentImage ? this.album.indexOf(this.currentImage) : -1;
    if (index < this.album.length - 1) {
      this.currentImage = this.album[index + 1];
    }
  }

  private _imageLoaded() {
    this.loading = false;
  }

  private _toggleBlur() {
    this.loading = true;
  }

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
                @click=${() => this.showBig()}
              >
              </div>
              <div
                class="full-2"
                style=${styleMap({
                  'background-image': `url(${this.currentImage?.full ?? ''})`
                })}
                @click=${() => this.showBig()}
              >
              </div>
              <div
                class="button button-left"
                @click=${() => this.goPrev()}
              >
                <iron-icon icon="hardware:keyboard-arrow-left"></iron-icon>
              </div>
              <div
                class="button button-right"
                @click=${() => this.goNext()}
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
              @click=${() => this.closeFixed()}
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
              @click=${() => this.goPrev()}
            >
              <iron-icon icon="hardware:keyboard-arrow-left"></iron-icon>
            </div>
            <div
              class="button button-right"
              @click=${() => this.goNext()}
            >
              <iron-icon icon="hardware:keyboard-arrow-right"></iron-icon>
            </div>
          </div>
        </div>
      `:null}
    `;
  }
}
