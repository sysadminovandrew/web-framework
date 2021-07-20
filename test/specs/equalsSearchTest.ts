import CatInfoPage from '../../src/pageObjects/CatInfoPage';
import MainPage from "../../src/pageObjects/MainPage";
import log from '../../src/log';
import SearchPage from "../../src/pageObjects/SearchPage";

describe('Проверка списка выборки котов', async () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await MainPage.open();
  })

  it('Поиск кота по точному соответствию 1', async () => {
    const mock = await browser.mock('**/api/core/cats/get-by-id**');

    const cat = {
      id: 1,
      name: 'Мокер',
      description: 'Мок в описании',
      tags: null,
      gender: 'male',
      likes: 80000000,
      dislikes: 1500000,
    };

    await mock.respond({ cat }, { statusCode: 200 });

    await CatInfoPage.open(1);
    await CatInfoPage.waitForLoaded();

    const storeText = await (await CatInfoPage.description).getText();
    expect(storeText).toEqual(cat.description);
  });

  ['WiFi', 'GPRS'].forEach((network: any) => {
    it(`Троттлинг, сеть : ${network}`, async () => {
      await browser.throttle(network);
      console.time(network);
      log.info(network);

      await browser.url('https://meowle.qa-fintech.ru/all-names');

      await SearchPage.waitForLoaded();

      console.timeEnd(network);
    });
  });
});
