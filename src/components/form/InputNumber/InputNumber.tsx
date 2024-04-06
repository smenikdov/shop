'use client';

import React, { useState } from 'react';
import './InputNumber.scss';
import classNames from 'classnames';
import { InputNumberProps } from './InputNumber.types';
import Input from '../Input';

const InputNumber = (props: InputNumberProps) => {
    const {
        className,
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
        ...otherProps
    } = props;

    const mergedCls = classNames('input-number', className);

    return <Input {...otherProps} className={mergedCls} />;
};

export default InputNumber;
