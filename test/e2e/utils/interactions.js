import Element from './element';

const CollapseAddImporter = 'div[data-test="CollapseAddImporter"]';
const AddScrapers = `${CollapseAddImporter} div[data-test]`;

export default class Interactions {
  constructor(client) {
    this.client = client;
  }

  async clickCollapseAddImporter() {
    const json = await this.client.$(CollapseAddImporter);
    console.log(json);
    const element = new Element(this.client, json.value);
    return element.click();
  }

  async getAddScrapers() {
    return (await this.client.$$(AddScrapers))
      .map((element) => new Element(this.client, element));
  }
}
