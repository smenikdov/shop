import React from 'react';
import './Col.scss';
import classNames from 'classnames';

import type { ColProps } from './Col.types';

const Col = (props: ColProps) => {
    const {
        className,
        children,
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
        component: Component = 'div',
        ...othersProps
    } = props;

    const mergedCls = classNames(
        className,
        'col',
        { [`col-xs-${xs}`]: xs },
        { [`col-sm-${sm}`]: sm },
        { [`col-md-${md}`]: md },
        { [`col-lg-${lg}`]: lg },
        { [`col-xl-${xl}`]: xl },
        { [`col-xxl-${xxl}`]: xxl }
    );

    return (
        <Component className={mergedCls} {...othersProps}>
            {children}
        </Component>
    );
};

export default Col;
