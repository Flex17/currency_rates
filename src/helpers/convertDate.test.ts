import {convertDate} from "./convertDate";

describe('convertDate', () => {
    // Positive test case
    it('Должен вернуть дату в правильном формате', () => {
        const inputDate = '2023-06-17T11:30:00+03:00';
        const expectedOutput = '17.06.2023';
        const convertedDate = convertDate(inputDate);
        expect(convertedDate).toEqual(expectedOutput);
    });
    // Negative test case
    it('Должен вернуть пустую строку, если приходят некорректные данные', () => {
        const inputDate = 'invalid-date';
        const convertedDate = convertDate(inputDate);
        expect(convertedDate).toEqual('');
    });
});
