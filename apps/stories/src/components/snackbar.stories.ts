import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ISnackbarProps } from '@cobre/cobre-snackbar';
import '@cobre/cobre-snackbar';

const meta = {
  title: 'Snackbar',
  render: (args: ISnackbarProps) => {
    function show() {
      const snackbar = document.querySelector('cobre-snackbar')
      if (!snackbar) return
      snackbar.show()
    }
    return html`
      <button @click=${show}>Show</button>
      <cobre-snackbar
        .backgroundColor=${args.backgroundColor ?? ''}
        .duration=${args.duration ?? 5000}
      >
        Alert message
      </cobre-snackbar>
    `
  },
} satisfies Meta<ISnackbarProps>;

export default meta;

export const Default: StoryObj<ISnackbarProps> = {
  args: {
    backgroundColor: 'red',
    duration: 5000,
  },
};
