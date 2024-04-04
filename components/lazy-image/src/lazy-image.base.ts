import { LitElement, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { ILazyImageDefaultSettings } from './lazy-image.types.js'

export abstract class LazyImageBase extends LitElement {

  protected abstract readonly defaultSettings: ILazyImageDefaultSettings;

  @property({ type: String, attribute: 'placeholder-src', reflect: true })
  placeholderSrc?: string;

  @property({ type: String, attribute: 'src', reflect: true })
  src?: string;

  @property({ type: String, attribute: 'alt', reflect: true })
  alt?: string;

  @property({ type: Number })
  width: number = 1;

  @property({ type: Number })
  height: number = 1;

  @property({ type: Boolean })
  loading?: boolean;

  @property({ type: Boolean, attribute: 'fluid', reflect: true })
  fluid: boolean = false;

  @property({ type: String, attribute: 'bg-color', reflect: true })
  bgColor: string = 'initial';

  @property({ type: String, attribute: 'bg-size', reflect: true })
  bgSize: string = 'cover';

  @property({ type: Number })
  placeholderBlurFactor: number = 30;

  @property({ type: Number })
  placeholderScaleFactor: number = 1.15;

  firstUpdated() {
    this._preloadImage();
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('src')) {
      this._preloadImage();
    }
    super.willUpdate(changedProperties);
  }

  private _preloadImage() {
    if (!this.src) {
      return
    }
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
    return Math.ceil(Math.min(width, height) / this.placeholderBlurFactor);
  }

  render() {
    const src = this.src || this.defaultSettings?.src || '';
    const placeholderSrc = this.placeholderSrc || this.defaultSettings?.placeholderSrc || '';
    const blur = this.loading
      ? this._calculateBlurDepth()
      : 0;
    const scale = this.loading
      ? this.placeholderScaleFactor
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

export default LazyImageBase;
