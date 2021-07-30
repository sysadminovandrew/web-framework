import RatingPage from "./RatingPage";
import {before} from "mocha";
import log from '../src/log';
import allureReporter from "@wdio/allure-reporter";
import assert = require("assert");
import {notStrictEqual} from "assert";

describe ('Рейтинг имён', async () => {
    before('Открытие страницы рейтинга', async () => {
        await RatingPage.open();
    });

    it('Проверка сортировки имён по лайкам', async () => {

        allureReporter.startStep('Получение рейтинга лайков');
            const likesRating = await RatingPage.getLikesRating();

            allureReporter.startStep('Проверка, что в рейтинге больше одного имени');
                expect(likesRating.length).toBeGreaterThan(1);
                log.info('В рейтинге больше одного имени');
            allureReporter.endStep();

            const likesRatingNumbers : number[] = [];
            for (const likesString of likesRating) {
                const likesNumber = await likesString.getText();
                likesRatingNumbers.push(Number(likesNumber));
            }

            allureReporter.addAttachment('Рейтинг лайков', likesRatingNumbers.toString(), 'text/plain');
        allureReporter.endStep();
        log.info('Рейтинг лайков: ' + likesRatingNumbers.toString());

        allureReporter.startStep('Нахождение максимального и минимального элементов рейтинга');
            const maxLikes = Math.max.apply(null, likesRatingNumbers);
            const minLikes = Math.min.apply(null, likesRatingNumbers);
        allureReporter.endStep();

        log.info('Проверка, что котики в топе отсортированы согласно рейтингу');
        allureReporter.startStep('Проверка, что у первого кота в рейтинге больше всех лайков');
            const firstCatLikesCount = likesRatingNumbers[0];
            allureReporter.addAttachment('Ожидаемое (максимальное) значение', maxLikes.toString(), 'text/plain');
            allureReporter.addAttachment('Фактическое значение', firstCatLikesCount.toString(), 'text/plain');
            expect(maxLikes).toEqual(firstCatLikesCount);
        allureReporter.endStep();

        allureReporter.startStep('Проверка, что у последнего кота в рейтинге меньше всех лайков');
            const lastCatLikesCount = likesRatingNumbers[likesRatingNumbers.length - 1];
            allureReporter.addAttachment('Ожидаемое (минимальное) значение', minLikes.toString(), 'text/plain');
            allureReporter.addAttachment('Фактическое значение', lastCatLikesCount.toString(), 'text/plain');
            expect(minLikes).toEqual(lastCatLikesCount);
        allureReporter.endStep();
        log.info('У первого котика больше всех лайков, у последнего меньше всех лайков');
    });

});