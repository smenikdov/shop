'use client';

import React, { useState } from 'react';
import './InputNumber.scss';
import classNames from 'classnames';
import { InputNumberProps } from './InputNumber.types';
import Input from '../Input';
import Button from '@/components/Button';

const InputNumber = (props: InputNumberProps) => {
    const {
        className,
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
        step = 1,
        onChange,
        onBlur,
        addonBefore,
        addonAfter,
        ...otherProps
    } = props;

    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const reg = /^-?\d*?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            setValue(inputValue);
            onChange?.(Number(inputValue) || 0);
        }
    };

    const handleBlur = (event: React.FocusEvent) => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        valueTemp = valueTemp.replace(/0*(\d+)/, '$1');
        setValue(valueTemp);
        onChange?.(Number(valueTemp));
        onBlur?.(event);
    };

    const handleStep = (changer: number) => {
        if (isNaN(Number(value))) {
            return;
        }
        const newValue = Number(value) + changer;
        setValue(newValue.toString());
        onChange?.(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const isArrowUp = event.keyCode === 38;
        const isArrowDown = event.keyCode === 40;
        if (isArrowUp || isArrowDown) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (isArrowUp) {
            handleStep(+step);
        }
        if (isArrowDown) {
            handleStep(-step);
        }
    };

    const mergedCls = classNames('input-number', className, {
        'input-number-min': min === Number(value),
        'input-number-max': max === Number(value),
    });

    const DecrementButton = (
        <Button
            color="primary"
            className="input-number-decrement"
            onClick={() => handleStep(-step)}
        >
            -
        </Button>
    );
    const IncrementButton = (
        <Button
            color="primary"
            className="input-number-increment"
            onClick={() => handleStep(+step)}
        >
            +
        </Button>
    );

    return (
        <Input
            {...otherProps}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={mergedCls}
            addonBefore={addonBefore || DecrementButton}
            addonAfter={addonAfter || IncrementButton}
        />
    );
};

export default InputNumber;
