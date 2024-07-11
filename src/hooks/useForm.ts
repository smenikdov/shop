import { IObjectValidator, ValidObjectResult } from '@/utils/validate/typings';
import { useEffect, useState } from 'react';
import { AnyObject } from '@/typings';

interface UseFormOptions<FormState> {
    schema?: IObjectValidator;
    initialState: FormState;
}

interface RegisterOptions {
    format: (value: any) => any;
}

export const useForm = <FormState extends AnyObject>(options: UseFormOptions<FormState>) => {
    const [error, setError] = useState({});
    const [clientState, setClientState] = useState<FormState>(options.initialState); // TODO
    const [serverState, setServerState] = useState<FormState>(options.initialState);

    const setState = (payload: FormState) => {
        setServerState(payload); // TODO
        setClientState(payload);
    };

    const register = (fieldName: string, options: RegisterOptions =  baseInput) => {
        return {
            name: fieldName,
            value: clientState[fieldName],
            onChange: (newValue: any) => {
                newValue = options.format(newValue);
                setClientState((prevState) => ({ ...prevState, [fieldName]: newValue }));
                setServerState((prevState) => ({ ...prevState, [fieldName]: newValue }));
            },
            error: fieldName in error ? error[fieldName] : undefined,
        };
    };

    const validate = (): ValidObjectResult => {
        if (!options.schema) {
            return {
                isValid: true,
            };
        }
        const validationResult = options.schema.validate(serverState);
        if (!validationResult.isValid) {
            const error = validationResult.error;
            setError(error);
        }
        return validationResult;
    };

    return {
        register,
        validate,
        clientState,
        serverState,
        setState,
        error,
    };
};

export const baseInput = {
    format: <T>(value: T): T => value,
};

export const textInput = {
    format: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value,
};

export const phoneInput = {
    format: (value: string) => value.replace(/[^0-9]/g, ''),
};

export const numberInput = {
    format: (value: number) => value,
};
