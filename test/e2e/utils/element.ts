export default class Element {
  constructor(client, jsonElement) {
    this.client = client;
    this.id = jsonElement.ELEMENT;
    this.json = jsonElement;
  }

  async click() {
    return this.client.elementIdClick(this.id);
  }

  async isVisible() {
    return this.client.elementIdDisplayed(this.id)
      .then((result) => result.value);
  }
}
