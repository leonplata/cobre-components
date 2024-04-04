import { unsafeCSS } from 'lit';
export const POSITION_CSS = unsafeCSS(
  `.position-static{position:static !important}.position-relative{position:relative !important}.position-absolute{position:absolute !important}.position-fixed{position:fixed !important}.position-sticky{position:sticky !important}.fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}@supports (position: sticky){.sticky-top{position:sticky;top:0;z-index:1020}}`
);
