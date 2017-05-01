import { AirlinesAppPage } from './app.po';

describe('airlines-app App', function() {
  let page: AirlinesAppPage;

  beforeEach(() => {
    page = new AirlinesAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
