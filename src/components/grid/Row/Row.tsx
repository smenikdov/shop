import React from 'react';
import './Row.scss';
import classNames from 'classnames';

import type { RowProps } from './Row.types';

const Row = (props: RowProps) => {
    const { className, children, component: Component = 'div', ...othersProps } = props;

    const mergedCls = classNames(className, 'row');

    return (
        <Component className={mergedCls} {...othersProps}>
            {children}
        </Component>
    );
};

export default Row;
