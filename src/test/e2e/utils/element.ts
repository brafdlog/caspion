import { SpectronClient } from '../type';

export default class Element {
  client: SpectronClient;

  id: string;

  json: WebdriverIO.Element;

  constructor(client: SpectronClient, jsonElement: WebdriverIO.Element) {
    this.client = client;
    this.id = jsonElement.ELEMENT;
    this.json = jsonElement;
  }

  async click() {
    return this.client.elementIdClick(this.id);
  }

  async isVisible(): Promise<boolean> {
    return this.client.elementIdDisplayed(this.id);
  }
}
