import allureReporter from '@wdio/allure-reporter';
import log from '../log';
import Element from '../elements/Element';

export default () => {
  browser.addCommand('element', async function (element: Element) {
    log.info(`Выполняется поиск элемента [${element.name}]`);
    allureReporter.startStep(`Выполнен поиск элемента [${element.name}]`);
    let findElement;
    try {
      findElement = await browser.$(element.locator);
      allureReporter.endStep('passed');
    } catch (e) {
      log.error(`Не найден элемент [${element.name}] по селектору [${element.locator}], error:\n${e}`);
      allureReporter.addAttachment('error', e, 'text/plain');
      allureReporter.endStep('failed');
    }
    return findElement;
  });

  browser.addCommand('elements', async function (element: Element) {
    log.info(`Выполняется поиск элементов [${element.name}]`);
    allureReporter.startStep(`Выполнен поиск элементов [${element.name}]`);
    let findElements;
    try {
      findElements = await browser.$$(element.locator);
      allureReporter.endStep('passed');
    } catch (e) {
      log.error(`Не найдены элементы [${element.name}] по селектору [${element.locator}], error:\n${e}`);
      allureReporter.addAttachment('error', e, 'text/plain');
      allureReporter.endStep('failed');
    }
    return findElements;
  });
};
