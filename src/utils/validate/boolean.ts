import { Validator } from '@/utils/validate/validator';
import type {
    ValidationRule,
    ValidResult,
    IBooleanValidator,
} from '@/utils/validate/typings';

export class BooleanValidator extends Validator implements IBooleanValidator {
    addRule(rule: ValidationRule) {
        return new BooleanValidator({ ...this, rules: [...this.rules, rule] });
    }

    true(error: string = 'Неверное значение поля') {
        return this.addRule({
            validateFunction: (value: boolean) => value === true,
            error,
        });
    }

    false(error: string = 'Неверное значение поля') {
        return this.addRule({
            validateFunction: (value: boolean) => value === false,
            error,
        });
    }
}