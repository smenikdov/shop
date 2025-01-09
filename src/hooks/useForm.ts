import { IObjectValidator } from '@/utils/validate/typings';
import { useEffect, useState } from 'react';
import { AnyObject } from '@/typings';

interface UseFormOptions<FormState> {
    schema?: IObjectValidator;
    initialState: FormState;
}

interface RegisterOption<S = any> {
    fromInputToState: (value: any) => S;
    fromStateToInput: (value: S) => any;
}

export const useForm = <FormState extends AnyObject>(options: UseFormOptions<FormState>) => {
    const [error, setError] = useState<{
        [key: string]: string;
    }>({});

    const [state, setState] = useState<FormState>(options.initialState);

    const register = (fieldKey: string, registerOptions: RegisterOption = baseInput) => {
        return {
            name: fieldKey,
            value: registerOptions.fromStateToInput(state[fieldKey]),
            error: fieldKey in error ? error[fieldKey] : undefined,

            onChange: (inputValue: any) => {
                const stateValue = registerOptions.fromInputToState(inputValue);

                setState((prevState) => ({
                    ...prevState,
                    [fieldKey]: stateValue,
                }));
            },

            onBlur: () => {
                if (options.schema && fieldKey in options.schema) {
                    const validationResult = options.schema.validateField(
                        fieldKey,
                        state[fieldKey]
                    );
                    if (!validationResult.isValid) {
                        setError((error) => ({ ...error, [fieldKey]: validationResult.error }));
                    }
                }
            },
        };
    };

    const validate = (): { isValid: boolean } => {
        setError({});

        if (!options.schema) {
            return { isValid: true };
        }

        const result = { isValid: true };

        for (let fieldKey of Object.keys(state)) {
            const validationResult = options.schema.validateField(fieldKey, state[fieldKey]);
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
        state,
        setState,
        error,
    };
};

export const baseInput: RegisterOption = {
    fromInputToState: <T>(value: T) => value,
    fromStateToInput: <T>(value: T) => value,
};

export const textInput: RegisterOption<string> = {
    fromInputToState: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value,
    fromStateToInput: (value: string) => value,
};

export const phoneInput: RegisterOption = {
    fromInputToState: (value: string) => value.replace(/[^0-9]/g, ''),
    fromStateToInput: (value: string) => value,
};
