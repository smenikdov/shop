'use client';

import React from 'react';
import './Checkbox.scss';
import classNames from 'classnames';
import CheckboxContext from './Checkbox.context';
import FormContext from '@/components/form/Form/Form.context';
import FormItemContext from '@/components/form/FormItem/FormItem.context';
import { CheckboxProps } from './Checkbox.types';

const Checkbox = (props: CheckboxProps) => {
    const {
        className,
        children,
        indeterminate = false,
        style,
        disabled = false,
        readOnly = false,
        ...otherProps
    } = props;

    const formContext = React.useContext(FormContext);
    const formItemContext = React.useContext(FormItemContext);
    const checkboxContext = React.useContext(CheckboxContext);

    const mergedDisabled = formContext?.disabled || checkboxContext?.disabled || disabled;
    const mergedReadOnly = formContext?.readOnly || checkboxContext?.readOnly || readOnly;

    const medgedProps = { ...otherProps };
    if (checkboxContext) {
        medgedProps.onChange = (...args) => {
            if (otherProps.onChange) {
                otherProps.onChange(...args);
            }
            if (checkboxContext.onChange && medgedProps.value) {
                checkboxContext.onChange(medgedProps.value);
            }
        };
        if (checkboxContext.name) {
            medgedProps.name = checkboxContext.name;
        }
        if (otherProps.value) {
            medgedProps.checked = checkboxContext.value.includes(otherProps.value);
        }
    }
    if (formItemContext) {
        if (formItemContext.name) {
            medgedProps.name = formItemContext.name;
        }
    }

    const mergedCls = classNames(
        'checkbox',
        {
            'checkbox-checked': medgedProps.checked,
            'checkbox-disabled': mergedDisabled,
            'checkbox-readonly': mergedReadOnly,
            'checkbox-indeterminate': indeterminate,
        },
        className
    );
    const ariaChecked = indeterminate ? 'mixed' : undefined;
    return (
        <label className={mergedCls} style={style}>
            <input
                aria-checked={ariaChecked}
                {...medgedProps}
                type="checkbox"
                disabled={mergedDisabled}
                readOnly={mergedReadOnly}
            />
            {children && <span>{children}</span>}
        </label>
    );
};

export default Checkbox;
