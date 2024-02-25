import React from 'react';
import './Divider.scss';
import classNames from 'classnames';

import type { DividerProps } from './Divider.types';

const Divider = (props: DividerProps) => {
    const { vertical, className, dashed, ...othersProps } = props;

    const mergedCls = classNames(
        'divider',
        {
            'divider-horizontal': !vertical,
            'divider-vertical': !!vertical,
            'divider-dashed': !!dashed,
        },
        className
    );

    return <div className={mergedCls} {...othersProps} role="separator" />;
};

export default Divider;
