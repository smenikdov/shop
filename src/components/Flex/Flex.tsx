import React from 'react';
import './Flex.scss';
import classNames from 'classnames';

import type { FlexProps } from './Flex.types';

const Flex = (props: FlexProps) => {
    const {
        className,
        style,
        gap,
        children,
        direction = 'row',
        wrap = 'wrap',
        justify = 'flex-start',
        align = 'start',
        component: Component = 'div',
        ...othersProps
    } = props;

    const mergedCls = classNames(
        className,
        'flex',
        `flex-direction-${direction}`,
        `flex-wrap-${wrap}`,
        `flex-justify-${justify}`,
        `flex-align-${align}`
    );

    const mergedStyle: React.CSSProperties = { ...style };

    if (gap) {
        mergedStyle.gap = gap;
    }

    return (
        <Component className={mergedCls} style={mergedStyle} {...othersProps}>
            {children}
        </Component>
    );
};

export default Flex;
