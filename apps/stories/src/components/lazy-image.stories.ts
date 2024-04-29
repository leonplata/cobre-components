import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ILazyImageProps } from '@cobre/cobre-lazy-image';
import '@cobre/cobre-lazy-image';

const meta = {
  title: 'Lazy Image',
  render: (args: ILazyImageProps) => html`
    <cobre-lazy-image
      .placeholderSrc=${args.placeholderSrc ?? ''}
      .src=${args.src ?? ''}
      .alt=${args.alt ?? ''}
      .fluid=${args.fluid ?? false}
      .width=${args.width ?? 1}
      .height=${args.height ?? 1}
    >
    </cobre-lazy-image>
  `,
} satisfies Meta<ILazyImageProps>;

export default meta;

export const Default: StoryObj<ILazyImageProps> = {
  args: {
    src: 'images/demo-01.jpg',
    placeholderSrc: 'images/demo-01-thumb.jpg',
    alt: 'Two best friends',
    fluid: true,
  },
};
