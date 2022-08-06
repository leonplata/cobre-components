import { unsafeCSS } from 'lit';
export const CLEARFIX_CSS = unsafeCSS(
  `.clearfix::after{display:block;clear:both;content:""}`
);
