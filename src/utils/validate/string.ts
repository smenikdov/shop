import { Validator } from '@/utils/validate/validator';
import type {
    ValidationRule,
    ValidResult,
    IStringValidator,
} from '@/utils/validate/typings';

export class StringValidator extends Validator implements IStringValidator {
    addRule(rule: ValidationRule) {
        return new StringValidator({ ...this, rules: [...this.rules, rule] });
    }

    pattern(reg: RegExp, error: string = 'Неверное значение поля') {
        return this.addRule({
            validateFunction: (value: string) => reg.test(value),
            error,
        });
    }

    required(error: string = 'Обязательно поле') {
        return this.addRule({
            validateFunction: (value: string) => !!value,
            error,
        });
    }

    min(minLength: number, error?: string) {
        return this.addRule({
            validateFunction: (value: string) => value.length >= minLength,
            error: error || `Минимальная длинна - ${minLength}`,
        });
    }

    max(maxLength: number, error?: string) {
        return this.addRule({
            validateFunction: (value: string) => value.length <= maxLength,
            error: error || `Максимальная длинна - ${maxLength}`,
        });
    }

    in(list: Array<string>, error?: string) {
        return this.addRule({
            validateFunction: (value: string) => list.includes(value),
            error: error || `Значение поля должно быть одно из: ${list.join(', ')}`,
        });
    }
}
