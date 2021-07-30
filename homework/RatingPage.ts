import Page from "../src/pageObjects/Page";
import Element from "../src/elements/Element";

class RatingPage extends Page {

    getLikesRating() {
        const element = new Element({
            name: 'Ячейка в таблице рейтинга лайков, хранящая количество лайков',
            locator: '//*/table[1]/tbody/*/td[3]', //либо '//table[1]/tbody//td[3]'
        });
        return browser.elements(element);
    }

    async open() {
        const go = await super.open('rating');
        await this.waitForLoaded();
        return go;
    }

    waitForLoaded() {
        super.waitForLoaded();
        return browser.waitUntil(async () => {
            return (await browser.$('//figure')).isExisting();
        });
    }
}

export default new RatingPage('Рейтинг имён котиков');