import React, { useMemo } from 'react';
import './Badge.scss';
import classNames from 'classnames';

import type { BadgeProps } from './Badge.types';

const Badge = (props: BadgeProps) => {
    const { children, color = 'dark', offset = [0, 0], className, style, ...otherProps } = props;

    const mergedCls = classNames('badge', `badge-${color}`, className);

    const mergedStyle = useMemo<React.CSSProperties>(() => {
        const offsetStyle: React.CSSProperties = { marginRight: offset[0], marginTop: offset[1] };
        return { ...offsetStyle, ...style };
    }, [offset, style]);

    return (
        <bdi {...otherProps} className={mergedCls} style={mergedStyle}>
            {children}
        </bdi>
    );
};

export default Badge;
