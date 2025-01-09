'use client';

import React, { useState } from 'react';
import './Input.scss';
import classNames from 'classnames';
import FormContext from '@/components/form/Form/Form.context';
import { InputProps } from './Input.types';

import useBoolean from '@/hooks/useBoolean';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className,
        disabled = false,
        readOnly = false,
        addonBefore,
        addonAfter,
        style,
        variant = 'outlined',
        maxLength,
        size = 'md',
        onFocus,
        onBlur,
        error,
        ...otherProps
    } = props;

    if (otherProps.value === null) {
        otherProps.value = '';
    }

    const formContext = React.useContext(FormContext);

    const isFocused = useBoolean(false);
    const mergedDisabled = formContext?.disabled || disabled;
    const mergedReadOnly = formContext?.readOnly || readOnly;

    const mergedCls = classNames(
        'input',
        {
            'input-disabled': mergedDisabled,
            'input-readonly': mergedReadOnly,
            'input-focus': isFocused.value,
            'input-invalid': error,
        },
        `input-${size}`,
        `input-${variant}`
    );

    const handleFocus = (event: React.FocusEvent) => {
        onFocus?.(event);
        isFocused.setTrue();
    };

    const handleBlur = (event: React.FocusEvent) => {
        onBlur?.(event);
        isFocused.setFalse();
    };

    return (
        <div className={classNames('input-container', className)}>
            <div className={mergedCls} style={style}>
                {addonBefore && <div className="input-addon">{addonBefore}</div>}
                <input
                    {...otherProps}
                    className="input-field"
                    disabled={mergedDisabled}
                    readOnly={mergedReadOnly}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={ref}
                />
                {addonAfter && <div className="input-addon">{addonAfter}</div>}
            </div>
            {error && <div className="input-error">{error}</div>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;