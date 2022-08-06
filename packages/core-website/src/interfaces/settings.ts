export const PICTURE_DEFAULT_SETTINGS_PROVIDER = Symbol('PICTURE_DEFAULT_SETTINGS_PROVIDER');
export interface PictureDefaultSettings {
  readonly alt: string;
  readonly src: string;
  readonly placeholderSrc: string;
}
