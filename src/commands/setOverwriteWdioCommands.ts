import allureReporter from '@wdio/allure-reporter';
import log from '../log';

/**
 *  Добавления логов и шагов Allure в некоторые часто используемые команды
 */
export default () => {
  browser.overwriteCommand('$', async function (origPauseFunction, selector) {
    log.info(`Выполняется поиск элемента [${selector}]`);
    allureReporter.startStep(`Выполнен поиск [${selector}]`);
    let findElement;
    try {
      findElement = await origPauseFunction(selector);
      allureReporter.endStep('passed');
    } catch (e) {
      log.error(`Не нашелся элемент [${selector}], error:\n${e}`);
      allureReporter.addAttachment('error', e, 'text/plain');
      allureReporter.endStep('failed');
    }
    return findElement;
  });

  browser.overwriteCommand(
    'click',
    async function (origPauseFunction) {
      log.info(`Выполняется click по элементу [${this.selector}]`);
      allureReporter.startStep(`Выполнен click по элементу [${this.selector}]`);
      let click;
      try {
        click = await origPauseFunction();
        allureReporter.endStep('passed');
      } catch (e) {
        log.error(`Не выполнился click по элементу [${this.selector}], error:\n${e}`);
        allureReporter.addAttachment('error', e, 'text/plain');
        allureReporter.endStep('failed');
      }
      return click;
    },
    true
  );

  browser.overwriteCommand(
    'getText',
    async function (origPauseFunction) {
      let getText;
      try {
        getText = await origPauseFunction();
        log.info(`Получен текст элемента [${this.selector}] => ${getText}`);
        allureReporter.startStep(`Получен текст элемента [${this.selector}] => ${getText}`);
        allureReporter.endStep('passed');
      } catch (e) {
        log.error(`Не удалось получить текст элемента [${this.selector}], error:\n${e}`);
        allureReporter.addAttachment('error', e, 'text/plain');
        allureReporter.endStep('failed');
      }
      return getText;
    },
    true
  );
};
