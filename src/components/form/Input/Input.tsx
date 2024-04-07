'use client';

import React, { useState } from 'react';
import './Input.scss';
import Field from '../Field/Field';
import classNames from 'classnames';
import { InputProps } from './Input.types';

const Input = (props: InputProps) => {
    const { ...otherProps } = props;

    return <Field {...otherProps} component="input" />;
};

export default Input;
