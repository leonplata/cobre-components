import { unsafeCSS } from 'lit';
export const BREADCRUMB_CSS = unsafeCSS(
  `.breadcrumb{display:flex;flex-wrap:wrap;padding:0.75rem 1rem;margin-bottom:1rem;list-style:none;background-color:#e9ecef}.breadcrumb-item + .breadcrumb-item{padding-left:0.5rem}.breadcrumb-item + .breadcrumb-item::before{display:inline-block;padding-right:0.5rem;color:#6c757d;content:"/"}.breadcrumb-item + .breadcrumb-item:hover::before{text-decoration:underline}.breadcrumb-item + .breadcrumb-item:hover::before{text-decoration:none}.breadcrumb-item.active{color:#6c757d}`
);
