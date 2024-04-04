import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { IAlbumProps } from '@cobre/cobre-album';
import '@cobre/cobre-album';

const meta = {
  title: 'Collapse',
  render: (args: IAlbumProps) => html`
    <cobre-album
      .album=${args.album}
      .slideshow=${args.slideshow ?? false}
      slideshow-delay=${args.slideshowDelay ?? 10000}
    >
    </cobre-album>
  `,
} satisfies Meta<IAlbumProps>;

export default meta;

export const Default: StoryObj<IAlbumProps> = {
  args: {
    album: []
  },
};
