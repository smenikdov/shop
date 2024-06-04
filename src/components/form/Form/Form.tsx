'use client';
import React from 'react';
import './Form.scss';
import classNames from 'classnames';
import type { FormProps } from './Form.types';
import FormContext from './Form.context';

const Form = (props: FormProps) => {
    const {
        className,
        style,
        children,
        disabled = false,
        readOnly = false,
        action,
        ...othersProps
    } = props;

    const mergedCls = classNames(className, 'form');

    const formContext = { disabled, readOnly };

    return (
        <form className={mergedCls} style={style} action={action} noValidate {...othersProps}>
            <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
        </form>
    );
};

export default Form;
