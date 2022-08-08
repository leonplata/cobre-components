export interface YouTubePlayListVideo {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
}

export interface YouTubePlayList {
  list: YouTubePlayListVideo[];
}
