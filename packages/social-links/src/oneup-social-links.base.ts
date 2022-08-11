import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import '@polymer/iron-icon/iron-icon.js';
import '@oneup/iron-icons-fa/social-brand.icons.js';

export abstract class OneupSocialLinksBase extends LitElement {
  @property({ type: Boolean, attribute: 'hover-effect', reflect: true })
  hoverEffect = false;

  @property({ type: String, attribute: 'facebook-href' })
  facebookHref = '';

  @property({ type: String, attribute: 'instagram-href' })
  instagramHref = '';

  @property({ type: String, attribute: 'twitter-href' })
  twitterHref = '';

  @property({ type: String, attribute: 'youtube-href' })
  youtubeHref = '';

  render() {
    return html`
      ${this.facebookHref ? html`
        <a
          target="_blank"
          class="social-icon hover-effect-${this.hoverEffect}"
          .href=${this.facebookHref}
          style="background-color: #4267b2;"
          title="Facebook"
        >
          <iron-icon icon="social-brand:facebook"></iron-icon>
        </a>
      `:null}
      ${this.instagramHref ? html`
        <a
          target="_blank"
          class="social-icon hover-effect-${this.hoverEffect}"
          .href=${this.instagramHref}
          style="background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);"
          title="Instagram"
        >
          <iron-icon icon="social-brand:instagram"></iron-icon>
        </a>
      `:null}
      ${this.twitterHref ? html`
        <a
          target="_blank"
          class="social-icon hover-effect-${this.hoverEffect}"
          .href=${this.twitterHref}
          style="background-color: #38a1f3;"
          title="Twitter"
        >
          <iron-icon icon="social-brand:twitter"></iron-icon>
        </a>
      `:null}
      ${this.youtubeHref ? html`
        <a
          target="_blank"
          class="social-icon hover-effect-${this.hoverEffect}"
          .href=${this.youtubeHref}
          style="background-color: #ff0000;"
          title="YouTube"
        >
          <iron-icon icon="social-brand:youtube"></iron-icon>
        </a>
      `:null}
    `;
  }
}
