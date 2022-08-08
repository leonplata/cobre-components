import { html } from 'lit-html';
import '../oneup-youtube-playlist.js';

export default {
  title: 'oneup-youtube-playlist'
};

export const Default = () => html`
  <oneup-youtube-playlist playlist-url="/demo-youtube-playlist.json"></oneup-youtube-playlist>
`;
