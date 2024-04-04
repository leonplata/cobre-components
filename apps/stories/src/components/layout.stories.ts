import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import '@cobre/cobre-layout';

const meta = {
  title: 'Layout',
  render: () => html`
    <cobre-layout>
      <header slot="header" style="padding: 2rem 1rem;">
        Header
      </header>
      <section slot="navigation" style="padding: 2rem 1rem;">
        Navigation
      </section>
      <section slot="drawer" style="padding: 2rem 1rem;">
      </section>
      <main slot="main" style="padding: 2rem 1rem; height: 200vh;">
        Main content
      </main>
      <footer slot="footer" style="padding: 2rem 1rem;">
        Footer
      </footer>
    </cobre-layout>
  `,
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};
