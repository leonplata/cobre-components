export interface IDrawerProps {
  opened?: boolean;
  fromLeft?: boolean;
  target?: Element;
  maxTouchMoveSnapshots?: number;
  expectedTouchMoveSpeedAverage?: number;
}
