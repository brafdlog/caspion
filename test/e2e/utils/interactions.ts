import { SpectronClient } from '../type';
import Element from './element';

const CollapseAddImporter = 'aside[data-test="ToggleAddImporter"]';
const CollapseAddImporterButton = 'button[data-test="CollapseAddImporter"]';
const AddScrapers = `${CollapseAddImporter} div:nth-of-type(1) [data-test]`;
const DrawerLeftToggle = 'button[data-test="drawerLeftToggle"]';

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class Interactions {
  client: SpectronClient

  constructor(client: SpectronClient) {
    this.client = client;
  }

  async click(elem: WebdriverIO.Element) {
    const element = elem.ELEMENT;
    return this.client.elementIdClick(element);
  }

  async getCollapseAddImporter() {
    const json = await this.client.$(CollapseAddImporter);
    return new Element(this.client, json.value);
  }

  async getAddScrapers() {
    // return this.client.elements(AddScrapers).then(({value}) => value.map((el) => new Element(this.client, el)))
    return Promise.all(this.client.$$(AddScrapers))
      .then((elements) => elements.map(({ value }) => new Element(this.client, value)));
  }

  waitForAddScrapersVisible() {
    return this.client.waitForVisible(AddScrapers, 1000);
  }

  async toggleLeftDrawer() {
    await this.client.$(DrawerLeftToggle).then((json) => this.click(json.value));
    await wait(1000);
  }

  async clickCollapseAddImporter() {
    await this.client.$(CollapseAddImporterButton).then((json) => this.click(json.value));
    return this.client.waitForVisible(`${AddScrapers}`, 1000);
  }
}
