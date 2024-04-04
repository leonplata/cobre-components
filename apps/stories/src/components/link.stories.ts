import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import { type ILinkProps, type ILinkNavigationService, LinkNavigationServiceProviderKey } from '@cobre/cobre-link';
import { container, injectable } from '@cobre/cobre-di'
import '@cobre/cobre-link'

@injectable()
class LinkNavigationService implements ILinkNavigationService {
  navigate(route: string): void {
    alert(route)
  }
}

container.bind(LinkNavigationServiceProviderKey).to(LinkNavigationService)

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
