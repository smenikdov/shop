'use client';

import React, { useState } from 'react';
import './TextArea.scss';
import Field from '../Field';
import classNames from 'classnames';
import { TextAreaProps } from './TextArea.types';

const TextArea = (props: TextAreaProps) => {
    const {
        // minRows,
        // maxRows,
        ...otherProps
    } = props;

    return <Field {...otherProps} component="textarea" />;
};

export default TextArea;
