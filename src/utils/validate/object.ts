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
        const baseValidationResult = super.validate(object);
        if (!baseValidationResult.isValid || baseValidationResult.isPermanent) {
            return baseValidationResult;
        }

        for (let fieldKey of Object.keys(this.fieldsValidators)) {
            const validationResult = this.validateField(fieldKey, object[fieldKey]);
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

    validateField(fieldKey: string, value: any): ValidResult {
        if (fieldKey in this.fieldsValidators) {
            const validator = this.fieldsValidators[fieldKey];
            const validationResult = validator.validate(value);
            return validationResult;
        }

        return { isValid: true };
    }

    addRule(rule: ValidationRule) {
        return new ObjectValidator(this.fieldsValidators, { ...this, rules: [...this.rules, rule] });
    }
}
