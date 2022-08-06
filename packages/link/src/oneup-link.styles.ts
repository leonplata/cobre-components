import { css } from 'lit';

export const styles = [
  css`
    :host {
      display: contents;
    }
    a.unstyled {
      color: inherit;
      text-decoration: none;
    }
    a.no-pointer {
      cursor: default;
    }
  `
];
