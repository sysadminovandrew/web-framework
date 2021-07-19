import MainPage from "../../src/pageObjects/MainPage";
import SearchPage from "../../src/pageObjects/SearchPage";
import allureReporter from "@wdio/allure-reporter";
import api from "../../src/api/coreApi";
import {beforeEach} from "mocha";

let catDesc: any = { name: 'Агата', description: 'Глаза цвета Агата', gender: 'female' };

describe('Проверка списка выборки котов', async () => {
  before('Создание кота (если его еще нет)', async  () => {
    await api.addCat(catDesc);
  })

  beforeEach('Открытие главной страницы', async () => {
    await MainPage.open();
  });

  it('Поиск кота по точному соответствию', async () => {
    const searchInput = await browser.$('//input[@placeholder]');
    const findCatNameBtn = await browser.$('//button[@type="submit"]');

    await searchInput.setValue(catDesc.name);
    await findCatNameBtn.click();

    const searchResults = await browser.$$('div .tags > span');

    const searchResultsNames: string[] = [];
    for (const cat of searchResults) {
      const name = await cat.getText();
      searchResultsNames.push(name);
    }
    expect([catDesc.name]).toEqual(searchResultsNames);
  });

  it('Поиск кота по точному соответствию 2', async () => {
    const searchInput = await MainPage.searchInput;
    const findCatNameBtn = await MainPage.findCatNameBtn;

    await searchInput.addValue(catDesc.name);
    await findCatNameBtn.click();

    const searchResults = await SearchPage.searchResults;

    const searchResultsNames: string[] = [];
    for (const cat of searchResults) {
      const name = await cat.getText();
      searchResultsNames.push(name);
    }

    expect([catDesc.name]).toEqual(searchResultsNames);
  });

  it('Поиск кота по точному соответствию 3', async () => {
    const searchInput = await MainPage.searchInput;
    const findCatNameBtn = await MainPage.findCatNameBtn;

    await searchInput.addValue(catDesc.name);
    await findCatNameBtn.click();

    const searchResults = await SearchPage.searchResults;

    const searchResultsNames: string[] = [];
    for (const cat of searchResults) {
      const name = await cat.getText();
      searchResultsNames.push(name);
    }

    allureReporter.startStep('Сравнение поисковой выдачи');
    allureReporter.addAttachment('Ожидаемое значение', JSON.stringify([catDesc.name]), 'text/plain');
    allureReporter.addAttachment('Фактическое значение', JSON.stringify(searchResultsNames), 'text/plain')
    expect([catDesc.name]).toEqual(searchResultsNames);
    allureReporter.endStep();
  });
});
