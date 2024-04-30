import type { ObjectFieldsVlidators } from './typings';
import { NumberValidator } from './number';
import { StringValidator } from './string';
import { ObjectValidator } from './object';

export const string = () => new StringValidator();
export const number = () => new NumberValidator();
export const object = (fields: ObjectFieldsVlidators) => new ObjectValidator(fields);

export const email = () =>
    string()
        .required()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Неверный адрес электронной почты');

export const phone = () =>
    string()
        .required()
        .pattern(/^7\d\d\d\d\d\d\d\d\d\d$/, 'Неверный номер телефона');

export const password = () =>
    string()
        .required()
        .min(8, 'Минимальный размер пароля - 8 символов')
        .pattern(/[a-zA-Zа-яА-Я]/, 'Пароль должен содержать хотя бы одну букву')
        .pattern(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
        .pattern(/^[\s].+$/, 'Пароль не должен содержать пробелов');
// TODO
// export const createValidatingSchema = () => {};
