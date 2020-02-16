import Element from './element';

const CollapseAddImporter = 'div[data-test="CollapseAddImporter"]';
const CollapseAddImporterButton = 'div[data-test="CollapseAddImporter"] div[role="button"]';
const AddScrapers = `${CollapseAddImporter} div[data-test]`;
const DrawerLeftToggle = 'button[data-test="drawerLeftToggle"]';

export default class Interactions {
  constructor(client) {
    this.client = client;
  }

  async click(json) {
    const element = json.ELEMENT || json.value.ELEMENT;
    return this.client.elementIdClick(element);
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

  async toggleLeftDrawer() {
    await this.client.$(DrawerLeftToggle).then((json) => this.click(json.value));
    await this.client.waitForVisible(CollapseAddImporter, 1000);
  }

  async clickCollapseAddImporter() {
    await this.client.$(CollapseAddImporterButton).then((json) => this.click(json));
    return this.client.waitForVisible(AddScrapers, 1000);
  }
}
