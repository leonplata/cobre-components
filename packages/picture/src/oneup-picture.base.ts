import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import * as Settings from '@oneup/core-website/interfaces/settings.js';

export abstract class OneupPictureBase extends LitElement {

  static get PLACEHOLDER_BLUR_FACTOR() {
    return 30;
  }

  static get PLACEHOLDER_SCALE_FACTOR() {
    return 1.15;
  }

  protected abstract readonly pictureDefaultSettings: Settings.PictureDefaultSettings;

  @property({ type: String, attribute: 'placeholder-src', reflect: true })
  placeholderSrc: string;

  @property({ type: String, attribute: 'src', reflect: true })
  src: string;

  @property({ type: String, attribute: 'alt', reflect: true })
  alt: string;

  @property({ type: Number })
  width: number;

  @property({ type: Number })
  height: number;

  @property({ type: Boolean })
  loading: boolean;

  @property({ type: Boolean, attribute: 'fluid', reflect: true })
  fluid: boolean = false;

  @property({ type: String, attribute: 'bg-color', reflect: true })
  bgColor: string = 'initial';

  @property({ type: String, attribute: 'bg-size', reflect: true })
  bgSize: string = 'cover';

  firstUpdated() {
    this._preloadImage();
  }

  private _preloadImage() {
    this.loading = true;
    const image = new Image();
    image.onload = () => this.loading = false;
    image.src = this.src;
  }

  private _calculateBlurDepth() {
    let width: number;
    let height: number;

    if (this.fluid && this.parentElement) {
      width = this.parentElement.offsetWidth;
      height = (this.height / this.width) * this.parentElement.offsetWidth;
    } else {
      width = this.width;
      height = this.height;
    }
    return Math.ceil(Math.min(width, height) / OneupPictureBase.PLACEHOLDER_BLUR_FACTOR);
  }

  render() {
    const src = this.src || this.pictureDefaultSettings?.src || '';
    const placeholderSrc = this.placeholderSrc || this.pictureDefaultSettings?.placeholderSrc || '';
    const blur = this.loading
      ? this._calculateBlurDepth()
      : 0;
    const scale = this.loading
      ? OneupPictureBase.PLACEHOLDER_SCALE_FACTOR
      : 1;
    const opacity = this.loading
      ? '1'
      : '0';

    const containerStyle = this.fluid
      ? styleMap({
        width: '100%',
        paddingTop: `${(this.height / this.width) * 100}%`,
      })
      : styleMap({
        width: `${this.width}px`,
        height: `${this.height}px`,
      });

    return html`
      <div
        class="picture-container"
        style=${containerStyle}
      >
        <div
          class="picture-content"
          style=${styleMap({
            backgroundImage: `url(${placeholderSrc})`,
            backgroundSize: this.bgSize,
            backgroundColor: this.bgColor,
          })}
        >
        </div>
        <div
          class="picture-content"
          style=${styleMap({
            backgroundImage: `url(${src})`,
            backgroundSize: this.bgSize,
            backgroundColor: this.bgColor,
            filter: `blur(${blur}px)`,
          })}
        >
        </div>
        <div
          class="picture-content"
          style=${styleMap({
            backgroundImage: `url(${placeholderSrc})`,
            backgroundSize: this.bgSize,
            backgroundColor: this.bgColor,
            filter: `blur(${blur}px)`,
            transform: `scale(${scale})`,
            opacity,
          })}
        >
        </div>
      </div>
    `;
  }
}
