interface IValidResult {
    isValid: boolean;
    error?: string;
}

export class Validator {
    private rules: Array<(value: string) => IValidResult>;

    constructor() {
        this.rules = [];
    }

    addRule(validateFunction: (value: string) => boolean, error: string) {
        this.rules.push((value: string) => {
            const isValid = validateFunction(value);
            if (isValid) {
                return {
                    isValid: false,
                    error,
                };
            }
            return {
                isValid: true,
            };
        });
    }

    required(error?: string) {
        const validateFunction = (value: string) => !!value.trim();
        this.addRule(validateFunction, error || 'Обязательно поле');
        return this;
    }

    min(minLength: number, error?: string) {
        const validateFunction = (value: string) => value.length >= minLength;
        this.addRule(validateFunction, error || `Минимиальная длинна поля - ${minLength}`);
        return this;
    }

    max(maxLength: number, error?: string) {
        const validateFunction = (value: string) => value.length <= maxLength;
        this.addRule(validateFunction, error || `Максимальная длинна поля - ${maxLength}`);
        return this;
    }

    pattern(reg: RegExp, error?: string) {
        const validateFunction = (value: string) => reg.test(value);
        this.addRule(validateFunction, error || 'Неверное значение поля');
        return this;
    }

    validate(value: string): IValidResult {
        for (let rule of this.rules) {
            const validResult = rule(value);
            if (!validResult.isValid) {
                return validResult;
            }
        }
        return {
            isValid: true,
        };
    }
}

export const EmailValidator = new Validator()
    .required()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Неверный адрес электронной почты');

// TODO
// export const createValidatingSchema = () => {};
