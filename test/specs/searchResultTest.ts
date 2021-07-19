import MainPage from '../../src/pageObjects/MainPage';
import SearchPage from '../../src/pageObjects/SearchPage';
import api from '../../src/api/coreApi';

const searchPattern = 'А';
let searchResultsNamesByApi = null;

describe('Перебор списка выборки котов', async () => {
  before(async () => {
    searchResultsNamesByApi = await api.getCatsNameBySearchPattern(searchPattern);
  });

  beforeEach(async () => {
    await MainPage.open();
  });

  it('Проверка получения списка котов поисковой выдачи по части имени (iterator)', async () => {
    const searchInput = await MainPage.searchInput;
    const findCatNameBtn = await MainPage.findCatNameBtn;

    await searchInput.setValue(searchPattern);
    await findCatNameBtn.click();
    await SearchPage.waitForLoaded();

    const searchResults = await SearchPage.searchResults;
    // Перебор
    const searchResultsNames: string[] = [];
    for (const cat of searchResults) {
      const name = await cat.getText();
      searchResultsNames.push(name);
    }

    // // Или так
    // for (let i = 0; i < searchResults.length; i++) {
    //   const name = await searchResults[i].getText();
    //   searchResultsNames.push(name);
    // }

    // // ! Так делать нельзя https://habr.com/ru/post/435084/
    // searchResults.forEach(async (cat) => {
    //   console.log(await cat.getText());
    // });

    expect(searchResultsNamesByApi).toEqual(searchResultsNames);
  });

  it('Проверка получения списка котов поисковой выдачи по части имени (get parent node text)', async () => {
    const searchInput = await MainPage.searchInput;
    const findCatNameBtn = await MainPage.findCatNameBtn;

    await searchInput.setValue(searchPattern);
    await findCatNameBtn.click();
    await SearchPage.waitForLoaded();

    const allResultBlockText = await (await SearchPage.searchResultBlock).getText();
    const searchResultsNames = allResultBlockText.split('\n').filter((name) => name.length !== 1);

    expect(searchResultsNamesByApi).toEqual(searchResultsNames);
  });

  it('Проверка получения списка котов поисковой выдачи по части имени (script)', async () => {
    const searchInput = await MainPage.searchInput;
    const findCatNameBtn = await MainPage.findCatNameBtn;

    await searchInput.setValue(searchPattern);
    await findCatNameBtn.click();
    await SearchPage.waitForLoaded();

    const searchResultsSelector: any = (await SearchPage.searchResults).selector;

    const searchResultsNamesByScript = await browser.execute(
        // @ts-ignore
      (selector) => [...document.querySelectorAll(selector)].map((el) => el.textContent),
      searchResultsSelector
    );
    expect(searchResultsNamesByApi).toEqual(searchResultsNamesByScript);
  });

  it('xpath vs css', async () => {
    await browser.url(browser.config.baseUrl + 'search/А');
    await SearchPage.waitForLoaded();

    console.time('xPathSearch');
    await browser.execute(() => {
      // @ts-ignore
      const xPathResult = document.evaluate('//a[contains(@class,"link")]', document, null, XPathResult.ANY_TYPE, null);
      const names = [];
      let node = xPathResult.iterateNext();
      while (node) {
        names.push(node.textContent);
        node = xPathResult.iterateNext();
      }
      return names;
    });
    console.timeEnd('xPathSearch');

    console.time('cssSearch');
    // @ts-ignore
    await browser.execute(() => [...document.querySelectorAll('div .tags > span')].map((el) => el.textContent));
    console.timeEnd('cssSearch');
  });
});
