'use client';

import React, { useState } from 'react';
import './Field.scss';
import classNames from 'classnames';
import FormContext from '@/components/form/Form/Form.context';
import FormItemContext from '@/components/form/FormItem/FormItem.context';
import { FieldProps } from './Field.types';

const Field = (props: FieldProps<keyof JSX.IntrinsicElements>) => {
    const {
        className,
        disabled = false,
        readOnly = false,
        color = 'primary',
        addonBefore,
        addonAfter,
        style,
        variant = 'outlined',
        maxLength,
        size = 'md',
        onFocus,
        onBlur,
        component: Component = 'input',
        ...otherProps
    } = props;

    const formContext = React.useContext(FormContext);
    const formItemContext = React.useContext(FormItemContext);

    const [focused, setFocused] = useState(false);
    const mergedDisabled = formContext?.disabled || disabled;
    const mergedReadOnly = formContext?.readOnly || readOnly;

    const medgedProps = { ...otherProps };

    if (formItemContext) {
        if (formItemContext.name) {
            medgedProps.name = formItemContext.name;
        }
    }

    const mergedCls = classNames(
        'field',
        {
            'field-disabled': mergedDisabled,
            'field-readonly': mergedReadOnly,
            'field-focus': focused,
        },
        `field-${size}`,
        `field-${color}`,
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
                className="field-input"
                disabled={mergedDisabled}
                readOnly={mergedReadOnly}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {addonAfter && <div className="field-addon">{addonAfter}</div>}
        </div>
    );
};

export default Field;
