import { css } from 'lit';

export const styles = [
  css`
    :host {
      display: block;
    }
    .playlist-container {
      display: flex;
      flex-direction: row;
      padding-bottom: 48px;
      width: 100%;
    }
    .player {
      flex: 1;
      background: black;
      overflow: hidden;
    }
    iframe {
      width: 100%;
    }
    .playlist {
      display: flex;
      flex-direction: column;
      margin: 0 10px;
      flex: 1;
    }
    .playlist-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      margin-left: 5px;
    }
    .playlist-list-container {
      position: relative;
      flex: 1;
      overflow-y: auto;
    }
    .playlist-list {
      position: absolute;
      left: 0;
      right: 0;
    }
    .playlist-item {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      margin: 5px;
      padding: 5px;
      transition: all 0.2s ease-out;
      background: #f5f5f5;
    }
    .playlist-item.selected-false:hover {
      background: #ddd;
    }
    .playlist-item.selected-true {
      color: white;
      background: #74510d;
    }
    .playlist-item .playlist-item-thumbnail {
      min-width: 120px; /* <-- Safari 9 fix */
      margin-right: 10px;
    }
    .playlist-item-info {
      font-family: 'Open Sans';
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .playlist-item-title {
      font-weight: 500;
    }
    .playlist-item-duration {
      font-weight: bold;
    }
    .playlist-status {
      text-align: right;
    }
    @media screen and (max-width: 767px) {
      .playlist-container {
        flex-direction: column;
      }
      .playlist-list-container {
        min-height: 400px;
      }
      .playlist,
      .playlist-item {
        margin-left: 0;
        margin-right: 0;
      }
    }
  `,
];
