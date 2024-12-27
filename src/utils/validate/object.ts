import { Validator } from '@/utils/validate/validator';
import type {
    ValidationRule,
    ValidResult,
    IObjectValidator,
    ValidationOptions,
    ObjectFieldsVlidators,
} from '@/utils/validate/typings';
import type { AnyObject } from "@/typings";

export class ObjectValidator extends Validator implements IObjectValidator {
    public fieldsValidators;

    constructor(fieldsValidators: ObjectFieldsVlidators, superData: {
        rules?: ValidationRule[];
        options?: ValidationOptions;
    } = {}) {
        super(superData);
        this.fieldsValidators = fieldsValidators;
    }

    validate(object: AnyObject): ValidResult {
        if (!(object instanceof Object)) {
            return { isValid: false, error: 'Значение должно быть объектом' };
        }

        for (let fieldKey of Object.keys(this.fieldsValidators)) {
            const validator = this.fieldsValidators[fieldKey];
            const validationResult = validator.validate(object[fieldKey as keyof typeof object]);
            if (!validationResult.isValid) {
                return {
                    isValid: false,
                    error: `${fieldKey} - ${validationResult.error}`,
                };
            }
        }
        return {
            isValid: true,
        };
    }

    addRule(rule: ValidationRule) {
        return new ObjectValidator(this.fieldsValidators, { ...this, rules: [...this.rules, rule] });
    }
}
