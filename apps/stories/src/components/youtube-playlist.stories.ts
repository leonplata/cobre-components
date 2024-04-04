import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components';
import type { IYouTubePlayListProps } from '@cobre/cobre-youtube-playlist';
import '@cobre/cobre-youtube-playlist';

const meta = {
  title: 'Youtube Playlist',
  render: (args: IYouTubePlayListProps) => html`
    <cobre-youtube-playlist
      .playlist=${args.playlist}
      .playlistUrl=${args.playlistUrl}
      .title=${args.title ?? ''}
    >
    </cobre-youtube-playlist>
  `,
} satisfies Meta<IYouTubePlayListProps>;

export default meta;

export const Default: StoryObj<IYouTubePlayListProps> = {
  args: {
    title: 'YouTubePlaylist',
    playlist: [
      {
        id: 'jNQXAC9IVRw',
        title: ' Me at the zoo ',
        duration: '0:19',
        thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg?sqp=-oaymwE2COADEI4CSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgBvgKAAvABigIMCAAQARhUIFgoZTAP&rs=AOn4CLAHco1ePh7zuyezLqp1OdcgxX4ykg'
      },
      {
        id: "tPEE9ZwTmy0",
        title: " Shortest Video on Youtube ",
        duration: "0:00",
        thumbnail: 'https://i.ytimg.com/vi/tPEE9ZwTmy0/hqdefault.jpg?sqp=-oaymwE2COADEI4CSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB1AaAAtYDigIMCAAQARhyIGYoNjAP&rs=AOn4CLB5T3zW2LS7LuFufMj2MQxOoFTdSg'
      },
      {
        id: "J---aiyznGQ",
        title: "Charlie Schmidt's Keyboard Cat! - THE ORIGINAL!",
        duration: "0:54",
        thumbnail: 'https://i.ytimg.com/vi/J---aiyznGQ/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAOQMW48-gAzdgnDi3ZI4DGsTojZQ'
      }
    ]
  },
};
