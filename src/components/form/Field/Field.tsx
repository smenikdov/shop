'use client';

import React, { useState } from 'react';
import './Field.scss';
import classNames from 'classnames';
import { FieldProps } from './Field.types';

const Field = (props: FieldProps<keyof JSX.IntrinsicElements>) => {
    const {
        className,
        disabled = false,
        color,
        addonBefore,
        addonAfter,
        style,
        variant = 'outlined',
        maxLength,
        onFocus,
        onBlur,
        component: Component = 'input',
        ...otherProps
    } = props;

    const [focused, setFocused] = useState(false);

    const mergedDisabled = disabled;

    const medgedProps = { ...otherProps };

    const mergedCls = classNames(
        'field',
        {
            'field-disabled': mergedDisabled,
            'field-focus': focused,
            [`field-${color}`]: color,
        },
        `field-${variant}`,
        className
    );

    const handleFocus = (event: React.FocusEvent) => {
        onFocus?.(event);
        setFocused(true);
    };

    const handleBlur = (event: React.FocusEvent) => {
        onBlur?.(event);
        setFocused(false);
    };

    return (
        <div className={mergedCls} style={style}>
            {addonBefore && <div className="field-addon">{addonBefore}</div>}
            <Component
                {...medgedProps}
                disabled={mergedDisabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {addonAfter && <div className="field-addon">{addonAfter}</div>}
        </div>
    );
};

export default Field;
