import type { ObjectFieldsVlidators, IValidator } from './typings';
import { NumberValidator } from './number';
import { StringValidator } from './string';
import { DateValidator } from './date';
import { ObjectValidator } from './object';
import { ArrayValidator } from './array';
import { FileValidator } from './file';
import { BooleanValidator } from './boolean';

export const string = (error = 'Значение должно быть строкой') => new StringValidator({
    rules: [{
        validateFunction: (value: any) => typeof value === 'string',
        error, 
    }],
});

export const number = (error = 'Значение должно быть числом') => new NumberValidator({
    rules: [{
        validateFunction: (value: any) => typeof value === 'number',
        error, 
    }],
});

export const date = (error = 'Значение должно быть датой') => new DateValidator({
    rules: [{
        validateFunction: (value: any) => value instanceof Date,
        error,
    }],
});

export const file = (error = 'Значение должно быть файлом') => new FileValidator({
    rules: [{
        validateFunction: (value: any) => value instanceof File,
        error,
    }],
});

export const object = (fields: ObjectFieldsVlidators, error = 'Значние должно быть объектом') => new ObjectValidator(fields, {
    rules: [{
        validateFunction: (value: any) => value instanceof Object,
        error,
    }],
});

export const array = (validator: IValidator, error = 'Значение должно быть массивом') => new ArrayValidator(validator, {
    rules: [{
        validateFunction: (value: any) => value instanceof Array,
        error,
    }],
});

export const boolean = (error = 'Значение должно быть логическим') => new BooleanValidator({
    rules: [{
        validateFunction: (value: any) => typeof value === 'boolean',
        error,
    }],
});

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