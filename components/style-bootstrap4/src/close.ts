import { unsafeCSS } from 'lit';
export const CLOSE_CSS = unsafeCSS(
  `.close{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:0.5}.close:hover{color:#000;text-decoration:none}.close:not(:disabled):not(.disabled):focus,.close:not(:disabled):not(.disabled):hover{opacity:0.75}button.close{padding:0;background-color:transparent;border:0;appearance:none}a.close.disabled{pointer-events:none}`
);
