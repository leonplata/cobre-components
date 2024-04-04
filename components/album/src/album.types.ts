export interface IAlbumProps {
  album?: IAlbumItem[];
  slideshow?: boolean;
  slideshowDelay?: number;
}

export interface IAlbumItem {
  id?: string;
  thumb: string;
  full: string;
  description?: string;
}
