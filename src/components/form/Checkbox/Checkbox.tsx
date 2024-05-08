'use client';

import React from 'react';
import './Checkbox.scss';
import classNames from 'classnames';
import CheckboxContext from './Checkbox.context';
import FormContext from '@/components/form/Form/Form.context';
import { CheckboxProps } from './Checkbox.types';

const Checkbox = (props: CheckboxProps) => {
    const { className, children, indeterminate = false, style, disabled, ...otherProps } = props;
    const checkboxContext = React.useContext(CheckboxContext);
    const formContext = React.useContext(FormContext);

    const mergedDisabled = formContext?.disabled || checkboxContext?.disabled || disabled;

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
    const mergedCls = classNames(
        'checkbox',
        {
            'checkbox-checked': medgedProps.checked,
            'checkbox-disabled': mergedDisabled,
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
            />
            {children && <span>{children}</span>}
        </label>
    );
};

export default Checkbox;
