import { kernel } from '@oneup/core-website/index.js';
import * as Settings from '@oneup/core-website/interfaces/settings.js';
import type { OneupPicture } from './oneup-picture.js';

import './oneup-picture.js';

declare const expect: Chai.ExpectStatic;

const TEST_IMAGE_SERVER = 'http://localhost:3100/';

kernel
  .bind<Settings.PictureDefaultSettings>(
    Settings.PICTURE_DEFAULT_SETTINGS_PROVIDER,
  )
  .toConstantValue({
    alt: 'A square',
    src: TEST_IMAGE_SERVER + 'default.placeholder.svg',
    placeholderSrc: TEST_IMAGE_SERVER + 'default.placeholder.jpg',
  });

describe('<oneup-picture>', () => {

  let element: OneupPicture | null;

  beforeEach(() => {
    element = document.querySelector<OneupPicture>('#fixture-1');
  });

  it('should have a default alt message', async () => {
    expect(element?.alt).to.be.equal('A square');
  });
});
