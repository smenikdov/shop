import { IObjectValidator } from '@/utils/validate/typings';
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
    const [error, setError] = useState<{
        [key: string]: string;
    }>({});
    const [clientState, setClientState] = useState<FormState>(options.initialState); // TODO
    const [serverState, setServerState] = useState<FormState>(options.initialState);

    const setState = (payload: FormState) => {
        setServerState(payload); // TODO
        setClientState(payload);
    };

    const register = (fieldKey: string, registerOptions: RegisterOptions = baseInput) => {
        return {
            name: fieldKey,
            value: clientState[fieldKey],
            onChange: (newValue: any) => {
                newValue = registerOptions.format(newValue);
                setClientState((prevState) => ({ ...prevState, [fieldKey]: newValue }));
                setServerState((prevState) => ({ ...prevState, [fieldKey]: newValue }));
            },
            onBlur: () => {
                if (options.schema && fieldKey in options.schema) {
                    const validationResult = options.schema.validateField(
                        fieldKey,
                        serverState[fieldKey]
                    );
                    if (!validationResult.isValid) {
                        setError((error) => ({ ...error, [fieldKey]: validationResult.error }));
                    }
                }
            },
            error: fieldKey in error ? error[fieldKey] : undefined,
        };
    };

    const validate = (): { isValid: boolean } => {
        setError({});

        if (!options.schema) {
            return { isValid: true };
        }

        const result = { isValid: true };

        for (let fieldKey of Object.keys(serverState)) {
            const validationResult = options.schema.validateField(fieldKey, serverState[fieldKey]);
            if (!validationResult.isValid) {
                setError((error) => ({ ...error, [fieldKey]: validationResult.error }));
                result.isValid = false;
            }
        }
        return result;
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
