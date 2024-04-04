import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import '@cobre/cobre-sticky';

const meta = {
  title: 'Sticky',
  render: () => html`
    <div style="padding: 2rem 1rem;">Header</div>
    <cobre-sticky>
      <div style="padding: 2rem 1rem;">
        Hello, I'm a sticky element, I remain on top when scrolling
      </div>
    </cobre-sticky>
    <div style="height: 200vh;"></div>
  `,
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
