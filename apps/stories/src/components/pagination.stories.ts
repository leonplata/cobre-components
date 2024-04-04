import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { IPaginationProps } from '@cobre/cobre-pagination';
import '@cobre/cobre-pagination';

const meta = {
  title: 'Pagination',
  render: (args: IPaginationProps) => html`
    <cobre-pagination
      .autoScroll=${args.autoScroll ?? false}
      .currentPage=${args.currentPage ?? 1}
      .total=${args.total ?? 1}
      .perPage=${args.perPage ?? 10}
      .max=${args.max ?? 5}
    >
      <div slot="prev">PREV</div>
      <div slot="next">NEXT</div>
    </cobre-pagination>
  `,
} satisfies Meta<IPaginationProps>;

export default meta;

export const Default: StoryObj<IPaginationProps> = {
  args: {
    total: 100,
    perPage: 10,
    max: 5,
    currentPage: 1,
  },
};
