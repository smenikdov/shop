'use client';

import React, { useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { InputCounterProps } from './InputCounter.types';

import Flex from '@/components/Flex';
import Button from '@/components/Button';

import { MdRemove, MdAdd } from 'react-icons/md';

import classNames from 'classnames';

import './InputCounter.scss';

const InputCounter = (props: InputCounterProps) => {
    const {
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
        value,
        step = 1,
        onChange,
        className,
        ...otherProps
    } = props;

    const [controlledValue, onControlledChange] = useUncontrolledProp(value, 0, onChange);

    const mergedCls = classNames('input-counter', className, {
        'input-counter-min': min === Number(controlledValue),
        'input-counter-max': max === Number(controlledValue),
    });

    const handleStep = (changer: number) => {
        const newValue = controlledValue + changer;
        onControlledChange(newValue);
    };

    const DecrementButton = (
        <Button
            className="input-counter-decrement"
            icon={<MdRemove />}
            onClick={() => handleStep(-step)}
        />
    );
    const IncrementButton = (
        <Button
            className="input-counter-increment"
            onClick={() => handleStep(+step)}
            icon={<MdAdd />}
        />
    );

    return (
        <Flex {...otherProps} className={mergedCls} align="center">
            {DecrementButton}
            <div className="input-counter-value">{controlledValue}</div>
            {IncrementButton}
        </Flex>
    );
};

export default InputCounter;
