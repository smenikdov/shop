'use client';
import React from 'react';
import './Form.scss';
import classNames from 'classnames';
import { useFormState } from 'react-dom';
import type { Response } from '@/utils/actions/responses';
import type { FormProps } from './Form.types';
import FormContext from './Form.context';

const Form = (props: FormProps) => {
    const {
        className,
        style,
        children,
        disabled = false,
        readonly = false,
        action,
        schema,
        ...othersProps
    } = props;

    const handleAction = async (_: any, formData: FormData): Promise<Response> => {
        const response = await action(formData);
        console.log('RESPONSE:', response);
        if (response && response.message) {
            alert(response.message);
        }
        return response;
    };

    const [formState, formAction] = useFormState(handleAction, undefined);

    const mergedCls = classNames(className, 'form');

    const formContext = {
        disabled: disabled,
        readonly: readonly,
        schema: schema,
    };

    return (
        <form className={mergedCls} style={style} action={formAction} {...othersProps}>
            <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
        </form>
    );
};

export default Form;
