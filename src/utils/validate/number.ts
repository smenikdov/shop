import { Validator } from '@/utils/validate/validator';
import type {
    ValidationRule,
    ValidResult,
    INumberValidator,
} from '@/utils/validate/typings';

export class NumberValidator extends Validator implements INumberValidator {
    addRule(rule: ValidationRule) {
        return new NumberValidator({ ...this, rules: [...this.rules, rule] });
    }

    gt(option: number, error?: string) {
        return this.addRule({
            validateFunction: (value: number) => value > option,
            error: error || `Число должно быть больше, чем ${option}`,
        });
    }

    gte(option: number, error?: string) {
        return this.addRule({
            validateFunction: (value: number) => value >= option,
            error: error || `Число должно быть больше или равно - ${option}`,
        });
    }

    lt(option: number, error?: string) {
        return this.addRule({
            validateFunction: (value: number) => value < option,
            error: error || `Число должно быть меньше, чем ${option}`,
        });
    }

    lte(option: number, error?: string) {
        return this.addRule({
            validateFunction: (value: number) => value <= option,
            error: error || `Число должно быть меньше или равно - ${option}`,
        });
    }

    integer(error?: string) {
        return this.addRule({
            validateFunction: (value: number) => Number.isInteger(value),
            error: error || 'Значение должно быть целым числом',
        });
    }
}
