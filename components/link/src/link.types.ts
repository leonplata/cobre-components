export interface ILinkProps {
  href?: string;
  target?: '_blank'|'_self'|'_parent'|'_top';
  unstyled?: boolean;
  noPointer?: boolean;
  skipFirstTouch?: boolean;
}
