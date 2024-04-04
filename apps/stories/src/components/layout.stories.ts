import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import '@cobre/cobre-layout';

const meta = {
  title: 'Layout',
  render: () => html`
    <cobre-layout>
      <header slot="header">
        Header
      </header>
      <section slot="navigation">
        Navigation
      </section>
      <section slot="drawer">
      </section>
      <main slot="main" style="height: 200vh;">
        Main content
      </main>
      <footer slot="footer">
        Footer
      </footer>
    </cobre-layout>
  `,
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
