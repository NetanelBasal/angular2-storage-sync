import { Ng2storagePage } from './app.po';

describe('ng2storage App', function() {
  let page: Ng2storagePage;

  beforeEach(() => {
    page = new Ng2storagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
