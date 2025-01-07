import { Validator } from '@/utils/validate/validator';
import {
    ValidationRule,
    ValidResult,
    IArrayValidator,
    IValidator,
    ValidationOptions,
} from '@/utils/validate/typings';

export class ArrayValidator  extends Validator implements IArrayValidator  {
    public validator;

    constructor(validator: IValidator, superData: {
        rules?: ValidationRule[];
        options?: ValidationOptions;
    } = {}) {
        super(superData);
        this.validator = validator;
    }

    validate(array: any): ValidResult {
        const baseValidationResult = super.validate(array);
        if (!baseValidationResult.isValid || baseValidationResult.isPermanent) {
            return baseValidationResult;
        }

        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            const validationResult = this.validator.validate(element);
            if (!validationResult.isValid) {
                return {
                    isValid: false,
                    error: `#${i} - ${validationResult.error}`,
                };
            }
        }
        return {
            isValid: true,
        };
    }

    addRule(rule: ValidationRule) {
        return new ArrayValidator(this.validator, { ...this, rules: [...this.rules, rule] });
    }

    length(targetLength: number, error?: string) {
        return this.addRule({
            validateFunction: (value: Array<any>) => value.length === targetLength,
            error: error || `Длина массива должна быть равна ${ targetLength }`,
        });
    }
}
