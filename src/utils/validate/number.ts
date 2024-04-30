import { Validator } from '@/utils/validate/validator';
import type {
    ValidationRule,
    ValidPrimitiveResult,
    INumberValidator,
} from '@/utils/validate/typings';

export class NumberValidator extends Validator implements INumberValidator {
    validate(value: number): ValidPrimitiveResult {
        return super.validate(value);
    }

    safeParse(value: any): ValidPrimitiveResult {
        if (typeof value !== 'number') {
            value = Number(value);
        }
        return super.validate(value);
    }

    addRule(rule: ValidationRule) {
        return new NumberValidator([...this.rules, rule]);
    }

    min(minValue: number, error?: string) {
        return this.addRule({
            validateFunction: (value: number) => value >= minValue,
            error: error || `Минимальное значение - ${minValue}`,
        });
    }

    max(maxValue: number, error?: string) {
        return this.addRule({
            validateFunction: (value: number) => value <= maxValue,
            error: error || `Максимальное значение - ${maxValue}`,
        });
    }
}
