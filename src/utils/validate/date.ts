import { Validator } from '@/utils/validate/validator';
import type {
    ValidationRule,
    ValidPrimitiveResult,
    IDateValidator,
} from '@/utils/validate/typings';
import { formatDate } from '../date';

export class DateValidator extends Validator implements IDateValidator {
    validate(value: Date): ValidPrimitiveResult {
        return super.validate(value);
    }

    addRule(rule: ValidationRule) {
        return new DateValidator([...this.rules, rule]);
    }

    required(error: string = 'Обязательно поле') {
        return this.addRule({
            // TODO
            validateFunction: (value: string) => !!value,
            error,
        });
    }

    gt(option: Date, error?: string) {
        return this.addRule({
            validateFunction: (value: Date) => value > option,
            error: error || `Дата должна быть больше, чем ${formatDate(option, 'dd.MM.yyyy')}`,
        });
    }

    gte(option: Date, error?: string) {
        return this.addRule({
            validateFunction: (value: Date) => value >= option,
            error:
                error || `Дата должна быть больше или равна - ${formatDate(option, 'dd.MM.yyyy')}`,
        });
    }

    lt(option: Date, error?: string) {
        return this.addRule({
            validateFunction: (value: Date) => value < option,
            error: error || `Дата должна быть меньше, чем ${formatDate(option, 'dd.MM.yyyy')}`,
        });
    }

    lte(option: Date, error?: string) {
        return this.addRule({
            validateFunction: (value: Date) => value <= option,
            error:
                error || `Дата должна быть меньше или равна - ${formatDate(option, 'dd.MM.yyyy')}`,
        });
    }

    past(error: string = 'Дата не может быть будущим') {
        return this.lte(new Date(), error);
    }

    future(error: string = 'Дата не может быть прошлым') {
        return this.gte(new Date(), error);
    }
}
