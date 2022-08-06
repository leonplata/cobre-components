import 'reflect-metadata';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

export const kernel = new Container();
export const {
  lazyInject,
  lazyInjectNamed,
  lazyInjectTagged,
  lazyMultiInject,
} = getDecorators(kernel, false);

export * from './interfaces/entities';
export * from './interfaces/services';
export * from './interfaces/settings';
