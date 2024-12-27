import type { ObjectFieldsVlidators, IValidator } from './typings';
import { NumberValidator } from './number';
import { StringValidator } from './string';
import { DateValidator } from './date';
import { ObjectValidator } from './object';
import { ArrayValidator } from './array';
import { FileValidator } from './file';

export const string = () => new StringValidator();
export const number = () => new NumberValidator();
export const date = () => new DateValidator();
export const file = () => new FileValidator();
export const object = (fields: ObjectFieldsVlidators) => new ObjectValidator(fields);
export const array = (validator: IValidator) => new ArrayValidator(validator);

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
export const sr = () => string().required();
export const sn = () => string().nullable();
export const ao = (fields: ObjectFieldsVlidators) => array(object(fields));
export const quantity = () => number().integer().gte(0);
export const page = () => number().integer().gte(1);
export const constant = (constant: { [key: string]: string }) =>
    string().in(Object.values(constant)).nullable();
