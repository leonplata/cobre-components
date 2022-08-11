import { html } from 'lit-html';
import { ref, createRef } from 'lit-html/directives/ref.js';
import '../oneup-snackbar.js';

export default {
  title: 'oneup-snackbar'
};

export const Default = () => {
  const snackbarRef = createRef();
  const showSnackbar = () => snackbarRef.value?.show();
  
  return html`
    <button @click=${showSnackbar}>
      Show
    </button>
    <oneup-snackbar ${ref(snackbarRef)}>
      <div>
        This is the content.
      </div>
    </oneup-snackbar>
  `;
}
