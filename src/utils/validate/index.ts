import type { ObjectFieldsVlidators } from './typings';
import { NumberValidator } from './number';
import { StringValidator } from './string';
import { DateValidator } from './date';
import { ObjectValidator } from './object';
import { FileValidator } from './file';

export const string = (error = 'Значение должно быть текстом') =>
    new StringValidator({
        rules: [
            {
                validateFunction: (value: any) => typeof value === 'string',
                error,
            },
        ],
    });

export const number = (error = 'Значение должно быть числом') =>
    new NumberValidator({
        rules: [
            {
                validateFunction: (value: any) => typeof value === 'number',
                error,
            },
        ],
    });

export const date = (error = 'Значение должно быть датой') =>
    new DateValidator({
        rules: [
            {
                validateFunction: (value: any) => value instanceof Date,
                error,
            },
        ],
    });

export const file = (error = 'Значение должно быть файлом') =>
    new FileValidator({
        rules: [
            {
                validateFunction: (value: any) => value instanceof File,
                error,
            },
        ],
    });

// TODO доделать проерку типа
export const object = (fields: ObjectFieldsVlidators) => new ObjectValidator(fields);

export const email = (error = 'Неверный адрес электронной почты') =>
    string()
        .required()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, error);

export const phone = (error = 'Неверный номер телефона') =>
    string()
        .required()
        .pattern(/^7\d\d\d\d\d\d\d\d\d\d$/, error);

export const password = () =>
    string()
        .required()
        .min(8, 'Минимальный размер пароля - 8 символов')
        .pattern(/[a-zA-Zа-яА-Я]/, 'Пароль должен содержать хотя бы одну букву')
        .pattern(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
        .addRule({
            validateFunction: (val: string) => !/\s/.test(val),
            error: 'Пароль не должен содержать пробелов',
        });

export const id = () => number().integer().gte(0);
export const quantity = () => number().integer().gte(0);
export const page = () => number().integer().gte(1);
