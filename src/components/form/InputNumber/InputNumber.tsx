'use client';

import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import { InputNumberProps } from './InputNumber.types';

import Input from '@/components/form/Input';
import Button from '@/components/Button';

import { MdRemove, MdAdd } from 'react-icons/md';

import './InputNumber.scss';

const InputNumber = (props: InputNumberProps) => {
    const {
        value,
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

    const numberToString = (number?: number): string => {
        if (!number) {
            return '';
        }
        number = Math.trunc(number);
        if (number < min) {
            number = min;
        }
        if (number > max) {
            number = max;
        }
        return number.toString();
    };

    const [displayValue, setDisplayValue] = useState(numberToString(value));

    useEffect(() => {
        const newValue = numberToString(props.value);
        if (displayValue !== newValue) {
            setDisplayValue(newValue);
        }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const reg = /^-?\d*?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            setDisplayValue(inputValue);
            onChange?.(Number(inputValue) || 0);
        }
    };

    const handleBlur = (event: React.FocusEvent) => {
        let valueTemp = displayValue;
        if (displayValue.charAt(displayValue.length - 1) === '.' || displayValue === '-') {
            valueTemp = displayValue.slice(0, -1);
        }
        valueTemp = valueTemp.replace(/0*(\d+)/, '$1');
        setDisplayValue(valueTemp);
        onChange?.(Number(valueTemp));
        onBlur?.(event);
    };

    const handleStep = (changer: number) => {
        const newValue = Number(displayValue) + changer;
        setDisplayValue(newValue.toString());
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
        'input-number-min': min === value,
        'input-number-max': max === value,
    });

    const DecrementButton = (
        <Button
            className="input-number-decrement"
            icon={<MdRemove />}
            onClick={() => handleStep(-step)}
        />
    );
    const IncrementButton = (
        <Button
            className="input-number-increment"
            icon={<MdAdd />}
            onClick={() => handleStep(+step)}
        />
    );

    return (
        <Input
            {...otherProps}
            value={displayValue}
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
