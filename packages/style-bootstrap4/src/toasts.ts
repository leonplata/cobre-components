import { unsafeCSS } from 'lit';
export const TOASTS_CSS = unsafeCSS(
  `.toast{max-width:350px;overflow:hidden;font-size:0.875rem;background-color:rgba(255, 255, 255, 0.85);background-clip:padding-box;border:1px solid rgba(0, 0, 0, 0.1);box-shadow:0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);backdrop-filter: blur(10px);opacity:0}.toast:not(:last-child){margin-bottom:0.75rem}.toast.showing{opacity:1}.toast.show{display:block;opacity:1}.toast.hide{display:none}.toast-header{display:flex;align-items:center;padding:0.25rem 0.75rem;color:#6c757d;background-color:rgba(255, 255, 255, 0.85);background-clip:padding-box;border-bottom:1px solid rgba(0, 0, 0, 0.05)}.toast-body{padding:0.75rem}`
);
