import { ParaCaballerosPage } from './app.po';

describe('para-caballeros App', function() {
  let page: ParaCaballerosPage;

  beforeEach(() => {
    page = new ParaCaballerosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
