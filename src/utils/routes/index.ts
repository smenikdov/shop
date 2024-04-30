import { IObjectValidator } from '../validate/typings';

interface RouteParams {
    schema?: IObjectValidator;
    handler: Function;
}

export function createRoute({ schema, handler }: RouteParams) {
    return function (formData: FormData) {
        const object = Object.fromEntries(formData.entries());
        if (schema) {
            const schemaValidation = schema.validate(object);
            if (!schemaValidation.isValid) {
                // const errros = schemaValidation.errors;
                return {
                    message: 'Не валидно',
                };
            }
        }
        return handler(object);
    };
}
