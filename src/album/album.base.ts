import { LitElement, html, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { IAlbum, IAlbumItem } from './album.types.js';
import ArrowRightIcon from '@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg';
import ArrowLeftIcon from '@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg';

export abstract class AlbumBase extends LitElement implements IAlbum {

  @property({ type: Array, attribute: 'album' })
  album?: IAlbumItem[];

  @property({ type: Boolean, attribute: 'slideshow' })
  slideshow = false;

  @property({ type: Number, attribute: 'slideshow-delay' })
  slideshowDelay = 1000 * 10;

  @state()
  protected show = false;

  @state()
  protected currentImage?: IAlbumItem;

  @state()
  protected loading = false;

  @state()
  protected grid = false;

  private _interval?: () => void;

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('album')) {
      this._updateCurrentImage(this.album);
      if (this.slideshow) {
        this._interval = this._setSlideshowInterval();
      }
    }
    if (changedProperties.has('currentImage')) {
      this._toggleBlur();
    }
    if (changedProperties.has('show')) {
      this._observeShow(this.show);
    }
    super.willUpdate(changedProperties);
  }

  private _setSlideshowInterval() {
    const interval = setInterval(() => this.goNext(), this.slideshowDelay);
    return () => clearInterval(interval);
  }

  private _observeShow(show: boolean) {
    if (show) {
      document.body.classList.add('alp-album-full');
    } else {
      document.body.classList.remove('alp-album-full');
    }
  }

  private _isFirst(currentImage: IAlbumItem, album: IAlbumItem[]) {
    return album.indexOf(currentImage) === 0;
  }

  private _isLast(currentImage: IAlbumItem, album: IAlbumItem[]) {
    return album.indexOf(currentImage) === album.length - 1;
  }

  private _computeIndex(currentImage: IAlbumItem, album: IAlbumItem[] = []) {
    return album.indexOf(currentImage) + 1;
  }

  private _switchImage(image: IAlbumItem) {
    this.currentImage = image;
    this.show = true;
  }

  protected showBig() {
    this.show = true;
  }

  protected closeFixed() {
    this.show = false;
  }

  private _updateCurrentImage(album?: IAlbumItem[]) {
    if (album) {
      this.currentImage = album[0];
    }
  }

  private _handleGoPrev() {
    if (this.slideshow) {
      if (this._interval) {
        this._interval();
      }
      this._interval = this._setSlideshowInterval();
    }
    this.goPrev();
  }

  private _handleGoNext() {
    if (this.slideshow) {
      if (this._interval) {
        this._interval();
      }
      this._interval = this._setSlideshowInterval();
    }
    this.goNext();
  }

  protected goPrev() {
    if (!this.album || !this.currentImage) {
      return;
    }
    const index = this.album.indexOf(this.currentImage);
    if (index > 0) {
      this.currentImage = this.album[index - 1];
    } else {
      this.currentImage = this.album[this.album!.length - 1];
    }
  }

  protected goNext() {
    if (!this.album || !this.currentImage) {
      return;
    }
    const index = this.album.indexOf(this.currentImage);
    if (index < this.album.length - 1) {
      this.currentImage = this.album[index + 1];
    } else {
      this.currentImage = this.album[0];
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
        ${this.grid ? this.album?.map(image => html`
          <div
            class="thumb"
            style=${styleMap({
              'background-image': `url(${image.thumb})`
            })}
            @click=${() => this._switchImage(image)}
          >
          </div>
        `) : this.currentImage ? html`
          <div class="normal">
            <div class="content">
              <img
                class="loader"
                .src=${this.currentImage.full}
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
              ></div>
              <div
                class="full-2"
                style=${styleMap({
                  'background-image': `url(${this.currentImage?.full ?? ''})`
                })}
                @click=${() => this.showBig()}
              ></div>
              <div
                class="button button-left"
                @click=${() => this._handleGoPrev()}
                .hidden=${this._isFirst(this.currentImage, this.album || [])}
              >
                ${unsafeSVG(ArrowLeftIcon)}
              </div>
              <div
                class="button button-right"
                @click=${() => this._handleGoNext()}
                .hidden=${this._isLast(this.currentImage, this.album || [])}
              >
                ${unsafeSVG(ArrowRightIcon)}
              </div>
              <div class="comment">
                <div class="dark-glass">
                  ${this.currentImage.description}
                </div>
              </div>
            </div>
            <div class="controls">
              <div style="padding: 8px;">
                ${this._computeIndex(this.currentImage, this.album)} / ${this.album?.length}
              </div>
              <div style="flex: 1;"></div>
            </div>
          </div>
        `: null}
      </div>
      ${this.show && this.currentImage ? html`
        <div class="fixed">
          <div class="content">
            <img
              class="loader"
              .src=${this.currentImage.full}
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
              .hidden=${this._isFirst(this.currentImage, this.album || [])}
              @click=${() => this._handleGoPrev()}
            >
              ${unsafeSVG(ArrowLeftIcon)}
            </div>
            <div
              class="button button-right"
              .hidden=${this._isLast(this.currentImage, this.album || [])}
              @click=${() => this._handleGoNext()}
            >
              ${unsafeSVG(ArrowRightIcon)}
            </div>
            <div class="comment">
              <div class="dark-glass">
                ${this.currentImage.description}
              </div>
            </div>
          </div>
          <div class="controls">
            <div style="padding: 8px;">
              ${this._computeIndex(this.currentImage, this.album)} / ${this.album?.length}
            </div>
            <div style="flex: 1;"></div>
            <div
              class="control-button"
              @click=${() => this.closeFixed()}
            >&#x2573;
            </div>
          </div>
        </div>
      `: null}
    `;
  }
}

export default AlbumBase;
