import {
    ValidationRule,
    ValidObjectResult,
    ValidPrimitiveResult,
    IObjectValidator,
    AnyValidator,
    ValidObjectError,
    ObjectFieldsVlidators,
} from '@/utils/validate/typings';

export class ObjectValidator implements IObjectValidator {
    public fieldsValidators;

    constructor(fieldsValidators: ObjectFieldsVlidators) {
        this.fieldsValidators = fieldsValidators;
    }

    validate(object: object): ValidObjectResult {
        const allErrors: ValidObjectError = {};
        let isAllValid = true;
        for (let fieldKey of Object.keys(this.fieldsValidators)) {
            const validator = this.fieldsValidators[fieldKey];
            if (fieldKey in object) {
                const validationResult = validator.validate(
                    object[fieldKey as keyof typeof object]
                );
                if (!validationResult.isValid) {
                    isAllValid = false;
                    if ('error' in validationResult) {
                        allErrors[fieldKey] = validationResult.error;
                    }
                }
            } else {
                allErrors[fieldKey] = 'Обязательное поле';
                isAllValid = false;
            }
        }
        return {
            isValid: isAllValid,
            error: allErrors,
        };
    }
}
