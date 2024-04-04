import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { IAlbum } from '@cobre/cobre-album';
import '@cobre/cobre-album';

const meta = {
  title: 'Album',
  render: (args: IAlbum) => html`
    <cobre-album
      .album=${args.album}
      .slideshow=${args.slideshow ?? false}
      slideshow-delay=${args.slideshowDelay ?? 10000}
    >
    </cobre-album>
  `,
} satisfies Meta<IAlbum>;

export default meta;

export const Default: StoryObj<IAlbum> = {
  args: {
    album: [
      {
        "full": "https://alp.oneupsoft.com/uploads/Programa_general_a62c27b925.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_Programa_general_a62c27b925.jpg",
        "description": "Lorem Ipsum"
      },
      {
        "full": "https://alp.oneupsoft.com/uploads/1_34d96a5316.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_1_34d96a5316.jpg"
      },
      {
        "full": "https://alp.oneupsoft.com/uploads/2_b7c8ef7c01.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_2_b7c8ef7c01.jpg"
      },
      {
        "full": "https://alp.oneupsoft.com/uploads/3_4c95834861.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_3_4c95834861.jpg"
      },
      {
        "full": "https://alp.oneupsoft.com/uploads/4_beed0707e4.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_4_beed0707e4.jpg"
      },
      {
        "full": "https://alp.oneupsoft.com/uploads/5_36f0093b5c.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_5_36f0093b5c.jpg"
      },
      {
        "full": "https://alp.oneupsoft.com/uploads/6_ef45f68ee8.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_6_ef45f68ee8.jpg"
      },
      {
        "full": "https://alp.oneupsoft.com/uploads/7_376f3e193e.jpg",
        "thumb": "https://alp.oneupsoft.com/uploads/thumbnail_7_376f3e193e.jpg"
      }
    ]
  },
};
