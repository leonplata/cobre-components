import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { IAlbumProps } from '@cobre/cobre-album';
import '@cobre/cobre-album';

const meta = {
  title: 'Album',
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
    album: [
      {
        "full": "images/demo-01.jpg",
        "thumb": "images/demo-01-thumb.jpg",
        "description": "Two best friends",
      },
      {
        "full": "images/demo-02.jpg",
        "thumb": "images/demo-02-thumb.jpg",
        "description": "Dachshund",
      },
      {
        "full": "images/demo-03.jpg",
        "thumb": "images/demo-03-thumb.jpg",
        "description": "Doxie",
      },
      {
        "full": "images/demo-04.jpg",
        "thumb": "images/demo-04-thumb.jpg",
        "description": "Wiener dog",
      },
      {
        "full": "images/demo-05.jpg",
        "thumb": "images/demo-05-thumb.jpg",
        "description": "Teckel",
      },
    ]
  },
};
