import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ILinkProps } from '@cobre/cobre-link';
import '@cobre/cobre-link'

const meta = {
  title: 'Link',
  render: (args: ILinkProps) => html`
    <cobre-link
      .href=${args.href ?? ''}
      .target=${args.target}
    >
      Press here
    </cobre-link>
  `,
} satisfies Meta<ILinkProps>;

export default meta;

export const CustomNavigation: StoryObj<ILinkProps> = {
  args: {
    href: 'https://www.w3.org/',
  },
};
