import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ICollapseProps } from '@cobre/cobre-collapse';
import '@cobre/cobre-collapse';

const meta = {
  title: 'Collapse',
  render: (args: ICollapseProps) => html`
    <cobre-collapse
      .opened=${args.opened ?? false}
      .title=${args.title ?? ''}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim
        vel dolor eu elementum. Nunc eget cursus urna, nec pretium nulla.
        Integer efficitur tincidunt nibh a rhoncus. Curabitur interdum bibendum
        purus, id vestibulum libero molestie a. Suspendisse in risus sed ipsum
        euismod mollis. Quisque sagittis semper magna, vel facilisis sem semper
        nec. Morbi tincidunt tortor non massa posuere, at rutrum mauris
        ultrices. Quisque eget turpis est.
      </p>
    </cobre-collapse>
  `,
} satisfies Meta<ICollapseProps>;

export default meta;

export const Closed: StoryObj<ICollapseProps> = {
  args: {
    opened: false,
    title: 'Closed',
  },
};


export const Opened: StoryObj<ICollapseProps> = {
  args: {
    opened: true,
    title: 'Opened',
  },
};
