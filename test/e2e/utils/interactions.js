const CollapseAddImporter = 'div[data-test="CollapseAddImporter"]';
const AddScrapers = `${CollapseAddImporter} div[data-test]`;

export default class Interactions {

  constructor(client) {
    this.client = client;
  }

  async clickCollapseAddImporter() {
    return this.client.findElement(CollapseAddImporter).click();
  }

  async getAddScrapers() {
    return this.client.findElements(AddScrapers);
  }
}
