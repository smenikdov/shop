import React, { useMemo } from 'react';
import './Icon.scss';
import classNames from 'classnames';
import type { IconProps } from './Icon.types';

const Icon = (props: IconProps) => {
    const { className, color, style, icon: Component, size } = props;

    const mergedCls = classNames(
        'icon',
        {
            [`icon-${color}`]: color,
        },
        className
    );

    return <Component className={mergedCls} style={style} size={size} />;
};

export default Icon;
