import {
    capitalizeText,
    getTruncateDescription,
    slugify,
    declineWord,
    formatPhoneNumber,
} from './text';

describe('capitalizeText', () => {
    test('капитализация первой буквы одного слова', () => {
        expect(capitalizeText('hello')).toBe('Hello');
    });

    test('преобразование всех остальных букв в нижний регистр', () => {
        expect(capitalizeText('hELLO')).toBe('Hello');
    });

    test('обработка пустой строки', () => {
        expect(capitalizeText('')).toBe('');
    });

    test('обработка строки с одним символом', () => {
        expect(capitalizeText('a')).toBe('A');
        expect(capitalizeText('A')).toBe('A');
    });

    test('обработка строки с несколькими словами', () => {
        expect(capitalizeText('hello world')).toBe('Hello world');
    });

    test('возврат той же строки, если первый символ не буква', () => {
        expect(capitalizeText('1hello')).toBe('1hello');
        expect(capitalizeText('@hello')).toBe('@hello');
    });
});
