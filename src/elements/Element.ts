export default class Element {
  constructor(element: { name: string; locator: string }) {
    this.name = element.name;
    this.locator = element.locator;
  }

  public name;
  public locator;
}
