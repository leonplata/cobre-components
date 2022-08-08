import { css } from 'lit';

export const styles = [
  css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .gallery {
      display: flex;
      flex-wrap: wrap;
      max-width: 100%;
    }
    .full {
      min-height: 500px;
      height: 90vh;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      background-color: #2A2421;
      margin: 2px;
    }
    .full-2 {
      min-height: 400px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      background-color: #2A2421;
      margin: 2px;
      cursor: zoom-in;
    }
    .thumb {
      position: relative;
      min-width: 200px;
      min-height: 200px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      background-color: #2A2421;
      margin: 2px;
      cursor: pointer;
    }
    .thumb::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      pointer-events: none;
      background: #fff;
      opacity: 0;
      transition: all 0.2s ease-out;
    }
    .content {
      flex: 1;
      position: relative;
      overflow: hidden;
      width: 100%;
    }
    .content .button {
      opacity: 0;
    }
    .content:hover .button {
      opacity: 1;
    }
    .thumb:hover::after {
      opacity: 0.4;
    }
    .button {
      color: white;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
      height: 24px;
      width: 24px;
      padding: 12px;
      border-radius: 50%;
      background-color: #2A2421;
      transition: all 0.2s ease-out;
    }
    .button:hover {
      background-color: rgba(255, 255, 255, 0.3);
      color: black;
    }
    .button-left {
      left: 10px;
    }
    .button-right {
      right: 10px;
    }
    .cache {
      filter: blur(0.5rem);
      overflow: hidden;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: opacity 0.5s ease-out;
    }
    .loading-false {
      opacity: 0;
    }
    .loader {
      display: none;
    }
    .normal {
      position: relative;
      display: flex;
      width: 500px;
    }
    .fixed {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, .75);
      display: flex;
      align-items: center;
      animation: fade-in .2s ease-out;
    }
    .controls {
      position: absolute;
      top: 0;
      left: 2px;
      right: 2px;
      height: 48px;
      background: black;
      color: white;
      display: flex;
      z-index: 1001;
    }
    .control-button {
      width: 48px;
      height: 48px;
      padding: 10px;
      user-select: none;
      cursor: pointer;
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
];
