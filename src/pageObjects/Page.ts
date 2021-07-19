/**
 * Главный класс Page, который должен содержать все методы и селекторы
 * доступные дочерним страницам
 */
import log from '../log';
import allureReporter from '@wdio/allure-reporter';

export default class Page {
  constructor(name: string) {
    this.name = name;
  }

  public name;
  /**
   * Открывает внутреннюю страницу относительно корневого url baseUrl
   * @param path путь до внутренней страницы (например, /path/to/page.html)
   */
  open(path?: string) {
    log.info(`Загружается страница [${this.name}]`);
    allureReporter.addStep(`Выполнен переход на страницу [${this.name}]`);
    if (path) {
      return browser.url(`${browser.config.baseUrl}${path}`);
    } else {
      return browser.url(`${browser.config.baseUrl}`);
    }
  }

  waitForLoaded() {
    allureReporter.addStep(`Выполнено ожидание загрузки страницы  [${this.name}]`)
    log.info(`Выполняется ожидание загрузки страницы [${this.name}]`);
  }
}
