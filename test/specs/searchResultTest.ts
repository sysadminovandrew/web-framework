import MainPage from '../../src/pageObjects/MainPage';
import api from '../../src/api/coreApi';
import log from '../../src/log';

const searchPattern = 'А';
let searchResultsNamesByApi = null;

describe('Перебор списка выборки котов', async () => {
  before(async () => {
    searchResultsNamesByApi = await api.getCatsNameBySearchPattern(searchPattern);
  });

  beforeEach(async () => {
    await MainPage.open();
  });


  it('Проверка получения списка котов поисковой выдачи по части имени (puppeteer)', async () => {
    const puppeteer = await browser.getPuppeteer();
    const page = (await puppeteer.pages())[0];
    await (await page.$('input[placeholder]')).type(searchPattern);
    await (await page.$('button[type=submit]')).click();
    await page.waitForSelector('div .tags > span');
    // @ts-ignore
    const searchResultsNamesByScript = await page.evaluate(() => [...document.querySelectorAll('div .tags > span')].map((el) => el.textContent))
    log.info(searchResultsNamesByApi, searchResultsNamesByScript);
    expect(searchResultsNamesByApi).toEqual(searchResultsNamesByScript);
  });
});
