import * as Entities from './entities.js';

export const PAGE_SERVICE_PROVIDER = Symbol('PAGE_SERVICE_PROVIDER');
export interface PageService {
  getPageById(pageId: number): Promise<Entities.Page>;
}

export const ROUTE_SERVICE_PROVIDER = Symbol('ROUTE_SERVICE_PROVIDER');
export interface RouteService {
  readonly rootRoute: Entities.RawRoute;

  readonly routeParams: { [key: string]: string };

  loadRoutes(callback: (pathRoute: Entities.Route) => void): void;
}

export const NAVIGATION_SERVICE_PROVIDER = Symbol('NAVIGATION_SERVICE_PROVIDER');
export interface NavigationService {
  navigate(route: string): void;
}
