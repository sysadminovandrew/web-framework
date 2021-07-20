import MainPage from '../../src/pageObjects/MainPage';
import SearchPage from '../../src/pageObjects/SearchPage';
import CatInfoPage from '../../src/pageObjects/CatInfoPage';
import { after } from 'mocha';
import api from '../../src/api/coreApi';

let storeText = null;
const catDesc: any = { name: 'Агата', description: 'Глаза цвета Агата', gender: 'female' };

describe('Редактирование кота', async () => {
  before('Создание кота (если его еще нет)', async  () => {
    await api.addCat(catDesc);
  })

  it('Проверка редактирования описания', async () => {
    await MainPage.open();
    const searchInput = await MainPage.searchInput;
    const findCatNameBtn = await MainPage.findCatNameBtn;

    await searchInput.addValue(catDesc.name);
    await findCatNameBtn.click();

    const cat = await SearchPage.getCatByName(catDesc.name);

    await cat.click();
    await CatInfoPage.waitForLoaded();

    storeText = await (await CatInfoPage.description).getText();

    await (await CatInfoPage.editDescription).click();
    await (await CatInfoPage.description).click();
    await (await CatInfoPage.description).addValue(' Это очень хорошее имя');
    await (await CatInfoPage.saveDescription).click();
    const text = await (await CatInfoPage.description).getText();
    expect(text).not.toEqual(storeText);
  });

  after(async () => {
    await (await CatInfoPage.editDescription).click();
    await (await CatInfoPage.description).setValue(storeText);
    await (await CatInfoPage.saveDescription).click();
    const text = await (await CatInfoPage.description).getText();
    expect(text).toEqual(storeText);
  });
});
