import Page from './page';
import Element from '../elements/Element';

/**
 * Главная страница
 */
class MainPage extends Page {
  /**
   * Объявление селекторов до элементов
   */
  get searchInput() {
    const element = new Element({ name: 'Поле ввода', locator: '//input[@placeholder]' });
    return browser.element(element);
  }

  get findCatNameBtn() {
    const element = new Element({ name: 'Кнопка найти', locator: '//button[@type="submit"]' });
    return browser.element(element);
  }

  async open() {
    const go = await super.open();
    await this.waitForLoaded();
    return go;
  }
  waitForLoaded() {
    super.waitForLoaded();
    return browser.waitUntil(
      async () => {
        return (await this.searchInput).isExisting();
      },
      { timeoutMsg: 'Страница не загрузилась' }
    );
  }
}

export default new MainPage('Главная страница');
