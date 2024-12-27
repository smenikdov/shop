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
        if (!(array instanceof Array)) {
            return { isValid: false, error: 'Значение должно быть массивом' };
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
}
