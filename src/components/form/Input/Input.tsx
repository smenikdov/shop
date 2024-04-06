'use client';

import React, { useState } from 'react';
import './Input.scss';
import classNames from 'classnames';
import { InputProps } from './Input.types';

const Input = (props: InputProps) => {
    const {
        className,
        disabled = false,
        color,
        multiline = false,
        addonBefore,
        addonAfter,
        type: typeProp,
        rows,
        // minRows,
        // maxRows,
        style,
        variant = 'outlined',
        maxLength,
        onFocus,
        onBlur,
        ...otherProps
    } = props;

    const [focused, setFocused] = useState(false);

    const type = !multiline ? typeProp ?? 'text' : undefined;
    const mergedDisabled = disabled;

    const InputComponent = multiline ? 'textarea' : 'input';

    const medgedProps = { ...otherProps };

    const mergedCls = classNames(
        'input',
        {
            'input-disabled': mergedDisabled,
            'input-focus': focused,
            [`input-${color}`]: color,
        },
        `input-${variant}`,
        className
    );

    const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFocus?.(event);
        setFocused(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onBlur?.(event);
        setFocused(false);
    };

    return (
        <div className={mergedCls} style={style}>
            {addonBefore && <div className="input-addon">{addonBefore}</div>}
            <InputComponent
                {...medgedProps}
                type={type}
                disabled={mergedDisabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {addonAfter && <div className="input-addon">{addonAfter}</div>}
        </div>
    );
};

export default Input;
