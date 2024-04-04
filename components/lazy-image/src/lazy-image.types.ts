export interface ILazyImageDefaultSettings {
  readonly alt: string;
  readonly src: string;
  readonly placeholderSrc: string;
}

export interface ILazyImageProps {
  placeholderSrc?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: boolean;
  fluid?: boolean;
  bgColor?: string;
  bgSize?: string;
  placeholderBlurFactor?: number;
  placeholderScaleFactor?: number;
}
