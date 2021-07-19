import Page from './Page';
import Element from '../elements/Element';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CatInfoPage extends Page {
  get description() {
    const element = new Element({
      name: 'Описание',
      locator: '//div[contains(text(),"Значение имени")]/following::div[text()]|//textarea',
    });
    return browser.element(element);
  }

  get saveDescription() {
    const element = new Element({
      name: 'Сохранить описание',
      locator: '//button[.= "Сохранить описание"]',
    });
    return browser.element(element);
  }

  get editDescription() {
    const element = new Element({
      name: 'Изменить описание',
      locator: '//a[.= "Изменить описание"]',
    });
    return browser.element(element);
  }

  open(id) {
    return super.open(`/cats/${id}`);
  }

  waitForLoaded() {
    super.waitForLoaded();
    return browser.waitUntil(async () => {
      return (await browser.$('//figure')).isExisting();
    });
  }
}

export default new CatInfoPage('Страница информации о коте');
