import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ILazyImageProps } from '@cobre/cobre-lazy-image';
import '@cobre/cobre-lazy-image';
import demo01Jpeg from '../assets/demo-01.jpeg'
import demo01ThumbJpeg from '../assets/demo-01-thumb.jpg'

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
    src: demo01Jpeg,
    placeholderSrc: demo01ThumbJpeg,
    alt: 'Two best friends',
    fluid: true,
  },
};
