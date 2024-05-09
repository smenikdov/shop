'use client';

import React from 'react';
import './Radio.scss';
import classNames from 'classnames';
import RadioContext from './Radio.context';
import FormContext from '@/components/form/Form/Form.context';
import FormItemContext from '@/components/form/FormItem/FormItem.context';
import { RadioProps } from './Radio.types';

const Radio = (props: RadioProps) => {
    const { className, children, style, disabled = false, readOnly = false, ...otherProps } = props;

    const formContext = React.useContext(FormContext);
    const formItemContext = React.useContext(FormItemContext);
    const radioContext = React.useContext(RadioContext);

    const mergedDisabled = formContext?.disabled || radioContext?.disabled || disabled;
    const mergedReadOnly = formContext?.readOnly || radioContext?.readOnly || readOnly;

    const medgedProps = { ...otherProps };
    if (radioContext) {
        medgedProps.onChange = (...args) => {
            if (otherProps.onChange) {
                otherProps.onChange(...args);
            }
            if (radioContext.onChange && otherProps.value) {
                radioContext.onChange(otherProps.value);
            }
        };
        if (radioContext.name) {
            medgedProps.name = radioContext.name;
        }
        medgedProps.checked = radioContext.value === otherProps.value;
    }
    if (formItemContext) {
        if (formItemContext.name) {
            medgedProps.name = formItemContext.name;
        }
    }

    const mergedCls = classNames(
        'radio',
        {
            'radio-checked': medgedProps.checked,
            'radio-disabled': mergedDisabled,
            'radio-readonly': mergedReadOnly,
        },
        className
    );
    return (
        <label className={mergedCls} style={style}>
            <input
                {...medgedProps}
                type="radio"
                disabled={mergedDisabled}
                readOnly={mergedReadOnly}
            />
            {children && <span>{children}</span>}
        </label>
    );
};

export default Radio;
