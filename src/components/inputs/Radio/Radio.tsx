'use client';

import React from 'react';
import './Radio.scss';
import classNames from 'classnames';
import RadioContext from './Radio.context';
import { RadioProps } from './Radio.types';

const Radio = (props: RadioProps) => {
    const { className, children, style, disabled, ...otherProps } = props;
    const radioContext = React.useContext(RadioContext);

    // TODO
    // const contextDisabled = React.useContext(DisabledContext);
    const mergedDisabled = radioContext?.disabled || disabled;

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
    const mergedCls = classNames(
        'radio',
        {
            'radio-checked': medgedProps.checked,
            'radio-disabled': mergedDisabled,
        },
        className
    );
    return (
        <label className={mergedCls} style={style}>
            <input {...medgedProps} type="radio" disabled={mergedDisabled} />
            {children && <span>{children}</span>}
        </label>
    );
};

export default Radio;
