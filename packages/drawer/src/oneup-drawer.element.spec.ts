import { OneupDrawerElement } from './oneup-drawer.element.js';

declare const expect: Chai.ExpectStatic;

describe('<oneup-drawer>', () => {

  let element: OneupDrawerElement;

  beforeEach(() => {
    element = document.querySelector<OneupDrawerElement>('#fixture-1') as OneupDrawerElement;
  });

  it('should be displayed', async () => {
    expect(true).to.be.equal(true);
  });
});
