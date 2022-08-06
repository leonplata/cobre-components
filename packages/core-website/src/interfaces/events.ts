import * as Entities from './entities';

export const REQUEST_CURRENT_ROUTE_EVENT_NAME = 'request-current-route';
export interface RouteRequesterDetail {
  requestRoute(route: Entities.Route | null): void;
}
