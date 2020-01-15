import utils from '../utils';

describe('Launch', () => {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('shows the proper application title', () => this.app.client.getTitle()
    .then((title) => {
      expect(title).to.equal('israeli-bank-scrapers-desktop');
    }));
});
