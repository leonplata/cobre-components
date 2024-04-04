export interface IYouTubeVideo {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
}

export interface IYouTubePlayListProps {
  title?: string
  playlist?: IYouTubeVideo[]
}
