import { IObjectValidator } from '@/utils/validate/typings';
import { Response, RequestErrorResponse } from '@/utils/actions/responses';
import { deepClone } from '@/utils/helpers';

interface RouteParams {
    schema?: IObjectValidator;
    handler: (...args: any[]) => Promise<Response>;
}

export function createRoute({ schema, handler }: RouteParams) {
    return async function (formData: FormData): Promise<Response> {
        const object = Object.fromEntries(formData.entries());
        if (schema) {
            const validationResult = schema.validate(object);
            if (!validationResult.isValid) {
                const error = validationResult.errors;
                const response = new RequestErrorResponse({
                    message: 'Не валидно',
                    error,
                });
                return deepClone(response);
            }
        }
        const response = await handler(object);
        return deepClone(response);
    };
}
