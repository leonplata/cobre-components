import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { IDrawerProps } from '@cobre/cobre-drawer';
import '@cobre/cobre-drawer';

const meta = {
  title: 'Drawer',
  render: (args: IDrawerProps) => {

    function toggle(state: boolean) {
      const element = document.querySelector('cobre-drawer')
      if (!element) return
      element.opened = state
    }

    return html`
      <button @click=${() => toggle(true)}>
        Open
      </button>
      <cobre-drawer
        .fromLeft=${args.fromLeft ?? false}
        .opened=${args.opened ?? false}
      >
        <button @click=${() => toggle(false)}>
          Close
        </button>
      </cobre-drawer>
    `
  },
} satisfies Meta<IDrawerProps>;

export default meta;

export const Right: StoryObj<IDrawerProps> = {
  args: {
    fromLeft: false,
    opened: true,
  },
};

export const Left: StoryObj<IDrawerProps> = {
  args: {
    fromLeft: true,
    opened: true,
  },
};
