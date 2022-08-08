import { html } from 'lit-html';
import '../oneup-collapse.js';

export default {
  title: 'oneup-collapse'
};

export const Default = () => {
  
  return html`
    <oneup-collapse
      title="This is the title"
      opened
    >
      <div>
        This is the content.
      </div>
    </oneup-collapse>
  `;
}
