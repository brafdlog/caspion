import Element from './element';

const CollapseAddImporter = 'div[data-test="CollapseAddImporter"]';
const AddScrapers = `${CollapseAddImporter} div[data-test]`;
const DrawerLeftToggle = 'button[data-test="drawerLeftToggle"]';

export default class Interactions {
  constructor(client) {
    this.client = client;
  }

  async click(json) {
    return this.client.elementIdClick(json.ELEMENT);
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

  async openLeftDrawer() {
    const visible = await this.getCollapseAddImporter().then((elem) => elem.isVisible());
    if (!visible) {
      await this.client.$(DrawerLeftToggle).then((json) => this.click(json));
      await this.client.waitForVisible(CollapseAddImporter, 1000);
    }
  }
}
