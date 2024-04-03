export interface IYouTubePlayListVideo {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
}

export interface IYouTubePlayList {
  list: IYouTubePlayListVideo[];
}
