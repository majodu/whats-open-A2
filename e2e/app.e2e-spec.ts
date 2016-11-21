import { WhatsOpenA2Page } from './app.po';

describe('whats-open-a2 App', function() {
  let page: WhatsOpenA2Page;

  beforeEach(() => {
    page = new WhatsOpenA2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
