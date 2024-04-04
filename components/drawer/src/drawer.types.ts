export interface IDrawer {
  opened: boolean;
  fromLeft: boolean;
  target: Element;
  maxTouchMoveSnapshots: number;
  expectedTouchMoveSpeedAverage: number;
}
