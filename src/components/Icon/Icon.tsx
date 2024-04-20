import React, { useMemo } from 'react';
import './Icon.scss';
import classNames from 'classnames';
import type { IconProps } from './Icon.types';

const Icon = (props: IconProps) => {
    const { className, color, style, icon, size } = props;

    const mergedCls = classNames(
        'icon',
        {
            [`icon-${color}`]: color,
        },
        className
    );

    // TODO size={size}
    const mergedStyle = {
        ...style,
    };

    return (
        <div className={mergedCls} style={mergedStyle}>
            {icon}
        </div>
    );
};

export default Icon;
