import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchPage extends Page {
  get searchResults() {
    return browser.$$('div .tags > span');
  }

  get searchResultBlock() {
    return browser.$('//section[.//*[contains(@class,"cats-list_names")]]');
  }

  get addNewCat() {
    return browser.$('//a[contains(@class, "button is-warning")]');
  }

  getCatByName(name: string) {
    return browser.$(`//a[contains(@class,"link") and text()='${name}']`);
  }

  open(searchString) {
    return super.open(`/search/${searchString}`);
  }

  waitForLoaded() {
    super.waitForLoaded();
    return browser.waitUntil(async () => {
      return (await this.searchResults).length > 0 || (await this.addNewCat).isExisting();
    });
  }
}

export default new SearchPage('Страница поиска');
