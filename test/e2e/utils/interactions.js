export default class Interactions {
  constructor(client) {
    this.client = client;
  }

  async clickCollapseAddImporter() {
    return this.client.findElement('[data-test="CollapseAddImporter"]').click();
  }
}
