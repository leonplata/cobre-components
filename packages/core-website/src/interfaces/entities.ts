export interface InjectableElement<D extends object> {
  new (dependencies: D): HTMLElement;
}

export interface RawRoute {
  readonly slug: string;
  readonly title: string;
  readonly children: RawRoute[];
  readonly pageId?: number;
  readonly imageURL?: string;
  readonly description?: string;
  readonly category?: string[];
}

export interface Route extends RawRoute {
  readonly path: string[];
  readonly children: Route[];
  readonly parent: Route | null;
}

export interface Page {
  readonly id: number;
  readonly html: string;
}
