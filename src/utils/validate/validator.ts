import type { ValidationRule, ValidPrimitiveResult } from '@/utils/validate/typings';

export class Validator {
    public rules: ValidationRule[];

    constructor(rules: ValidationRule[] = []) {
        this.rules = [...rules];
    }

    validate(value: any): ValidPrimitiveResult {
        for (let rule of this.rules) {
            const isValid = rule.validateFunction(value);
            if (!isValid) {
                return {
                    isValid: false,
                    error: rule.error,
                };
            }
        }
        return {
            isValid: true,
        };
    }
}
