import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import '@cobre/cobre-wip';

const meta = {
  title: 'Work in progress',
  render: () => html`
    <cobre-wip>
      En construcción
    </cobre-wip>
  `,
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
