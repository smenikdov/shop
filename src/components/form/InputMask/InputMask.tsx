'use client';

import React, { useState } from 'react';
import { useIMask } from 'react-imask';

import './InputMask.scss';
import classNames from 'classnames';
import { InputMaskProps } from './InputMask.types';
import Input from '../Input';

const InputMask = (props: InputMaskProps) => {
    const { className, mask, value, onChange, ...otherProps } = props;

    const onAccept = (value: string) => {
        onChange?.(value);
    };

    const [options, setOptions] = useState({ mask });
    const { ref } = useIMask(options, { onAccept, defaultValue: value });

    return <Input {...otherProps} ref={ref} />;
};

export default InputMask;
