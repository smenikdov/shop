interface ValidSuccesResult {
    isValid: true;
}
interface ValidPrimitiveErrorResult {
    isValid: false;
    error: string;
}

interface ValidObjectError {
    [key: string]: string | ValidObjectError;
}
interface ValidObjectErrorResult {
    isValid: false;
    error: ValidObjectError;
}
export type ValidPrimitiveResult = ValidSuccesResult | ValidPrimitiveErrorResult;
export type ValidObjectResult = ValidSuccesResult | ValidObjectErrorResult;

export interface ValidationRule {
    validateFunction: (value: any) => boolean;
    error: string;
}

export interface INumberValidator {
    validate(value: number): ValidPrimitiveResult;
}

export interface IStringValidator {
    validate(value: string): ValidPrimitiveResult;
}

export interface IDateValidator {
    validate(value: Date): ValidPrimitiveResult;
}

export interface IFileValidator {
    validate(value: File): ValidPrimitiveResult;
}
export interface IObjectValidator {
    validate(value: object): ValidObjectResult;
}

export type AnyValidator =
    | INumberValidator
    | IStringValidator
    | IDateValidator
    | IFileValidator
    | IObjectValidator;

export interface ObjectFieldsVlidators {
    [key: string]: AnyValidator;
}
