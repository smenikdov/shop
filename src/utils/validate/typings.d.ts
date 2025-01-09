import type { AnyObject } from "@/typings";

export interface ValidSuccesResult {
    isValid: true;
    isPermanent?: true;
}

export interface ValidErrorResult {
    isValid: false;
    error: string;
}

export type ValidResult = ValidSuccesResult | ValidErrorResult;

export interface ValidationRule {
    validateFunction: (value: any) => boolean;
    error: string;
}

export interface ValidationOptions {
    optional: boolean;
    nullable: boolean;
}

export interface IValidator {
    validate(value: any): ValidResult;
}

export interface INumberValidator extends IValidator {
    validate(value: number): ValidResult;
}

export interface IStringValidator extends IValidator {
    validate(value: string): ValidResult;
}

export interface IDateValidator extends IValidator {
    validate(value: Date): ValidResult;
}

export interface IFileValidator extends IValidator {
    validate(value: File): ValidResult;
}

export interface IObjectValidator extends IValidator {
    validate(value: AnyObject): ValidResult;
    validateField(fieldKey: string, value: any): ValidResult;
}

export interface IArrayValidator extends IValidator {
    validate(value: Array<any>): ValidResult;
}

export interface IBooleanValidator extends IValidator {
    validate(value: boolean): ValidResult;
}

export interface ObjectFieldsVlidators {
    [key: string]: IValidator;
}