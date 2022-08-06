import { unsafeCSS } from 'lit';
export const STRETCHED_LINK_CSS = unsafeCSS(
  `.stretched-link::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;pointer-events:auto;content:"";background-color:rgba(0, 0, 0, 0)}`
);
