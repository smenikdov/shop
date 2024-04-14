import React from 'react';
import './Image.scss';
import classNames from 'classnames';
import NextImage from 'next/image';

import type { ImageProps } from './Image.types';

const Image = (props: ImageProps) => {
    const { className, ...othersProps } = props;

    const mergedCls = classNames(className, 'image');
    return <NextImage className={mergedCls} {...othersProps} />;
};

export default Image;
