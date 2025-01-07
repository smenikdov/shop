import type {
    ValidationRule,
    ValidationOptions,
    ValidResult,
    IValidator,
} from '@/utils/validate/typings';

export class Validator implements IValidator{
    public rules: ValidationRule[];
    public options: ValidationOptions;

    constructor({
        rules = [],
        options,
    }: {
        rules?: ValidationRule[];
        options?: ValidationOptions;
    } = {}) {
        this.rules = [...rules];
        this.options = {
            optional: options?.optional || false,
            nullable: options?.nullable || false,
        };
    }

    validate(value: any): ValidResult {
        if (this.options.optional && value === undefined) {
            return {
                isValid: true,
                isPermanent: true,
            };
        }

        if (this.options.nullable && value === null) {
            return {
                isValid: true,
                isPermanent: true,
            };
        }

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

    addRule(rule: ValidationRule) {
        return new Validator({ ...this, rules: [...this.rules, rule] });
    }

    optional() {
        this.options.optional = true;
        return this;
    }

    nullable() {
        this.options.nullable = true;
        return this;
    }
}
