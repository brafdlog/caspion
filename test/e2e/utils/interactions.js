import Element from './element';

const CollapseAddImporter = 'div[data-test="CollapseAddImporter"]';
const AddScrapers = `${CollapseAddImporter} div[data-test]`;

export default class Interactions {
  constructor(client) {
    this.client = client;
  }

  async getCollapseAddImporter() {
    const json = await this.client.$(CollapseAddImporter);
    return new Element(this.client, json.value);
  }

  async getAddScrapers() {
    return (await this.client.$$(AddScrapers))
      .map((element) => new Element(this.client, element));
  }

  async waitForAddScrapersVisible() {
    return this.client.waitForVisible(AddScrapers, 1000);
  }
}
