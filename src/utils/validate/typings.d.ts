interface ValidSuccesResult {
    isValid: true;
}
interface ValidPrimitiveErrorResult {
    isValid: false;
    error: string;
}
interface ValidObjectErrorResult {
    isValid: false;
    errors?: {
        [key: string]: string;
    };
}
export type ValidPrimitiveResult = ValidSuccesResult | ValidPrimitiveErrorResult;
export type ValidObjectResult = ValidSuccesResult | ValidObjectErrorResult;

export interface ValidationRule {
    validateFunction: (value: any) => boolean;
    error: string;
}

export interface INumberValidator {
    validate(value: number): ValidPrimitiveResult;
    // safeParse: (object: any) => ValidPrimitiveResult;
}

export interface IStringValidator {
    validate(value: string): ValidPrimitiveResult;
    // safeParse: (object: any) => ValidPrimitiveResult;
}

export interface IObjectValidator {
    validate(value: object): ValidObjectResult;
    // safeParse: (object: object) => ValidObjectResult;
}

export type AnyValidator = INumberValidator | IStringValidator;

export interface ObjectFieldsVlidators {
    [key: string]: AnyValidator;
}
