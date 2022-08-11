import { css } from 'lit';

export const styles = [
  css`
    :host {
      display: inline-block;
    }
    .social-icon {
      display: inline-block;
      text-decoration: none !important;
      padding: 10px;
      transition: all 0.2s ease-out;
      color: white;
      border-radius: 3px;
      margin: 4px;
    }
    .social-icon.hover-effect-true:not(:hover) {
      color: #deac5d;
      background: initial !important;
    }
  `,
];
