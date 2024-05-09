'use client';
import React from 'react';
import './Form.scss';
import classNames from 'classnames';
import { useFormState } from 'react-dom';
import { RequestErrorResponse, type Response } from '@/utils/actions/responses';
import type { FormProps } from './Form.types';
import FormContext from './Form.context';
import { getCurrentDate } from '@/utils/date';
import useNotification from '@/features/notification/hooks/useNotification';

const Form = (props: FormProps) => {
    const {
        className,
        style,
        children,
        disabled = false,
        readOnly = false,
        action: propsAction,
        schema,
        ...othersProps
    } = props;

    const { notifyError, notifySuccess } = useNotification();

    const logResponse = (response: Response) => {
        let logInfo = `%c${getCurrentDate('hh:mm')} | request end with status ${response.statusCode}`;
        let logStyle = '';

        if (response.isSuccess) {
            logStyle =
                'background: #D5FFCA; font-weight: bold; color: black; font-size: 14px; padding: 3px 12px;';
            console.log(logInfo, logStyle);
            console.log('DATA', response.data);
        } else {
            logStyle =
                'background: #FFCACA; font-weight: bold; color: black; font-size: 14px; padding: 3px 12px;';
            console.log(logInfo, logStyle);
            console.log('ERROR', response.error);
        }
    };

    const handleAction = async (_: any, formData: FormData): Promise<Response> => {
        if (schema) {
            const object = Object.fromEntries(formData.entries());
            const validationResult = schema.validate(object);
            if (!validationResult.isValid) {
                const error = validationResult.errors;
                const response = new RequestErrorResponse({ error });
                return response;
            }
        }

        const response = await propsAction(formData);
        logResponse(response);

        if (!response) {
            return response;
        }

        if (!response.isSuccess) {
            if (response.message) {
                notifyError(response.message);
            }
        } else {
            if (response.message) {
                notifySuccess(response.message);
            }
        }

        return response;
    };

    const [response, action] = useFormState(handleAction, undefined);

    const mergedCls = classNames(className, 'form');

    const formContext = { disabled, readOnly, schema, response };

    return (
        <form className={mergedCls} style={style} action={action} {...othersProps}>
            <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
        </form>
    );
};

export default Form;
