import React from 'react';
import './Flex.scss';
import classNames from 'classnames';

import type { FlexProps } from './Flex.types';

const Flex = (props: FlexProps) => {
    const {
        className,
        style,
        gapX,
        gapY,
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
        `flex-align-${align}`,
        {
            [`flex-gap-x-${gapX}`]: gapX,
            [`flex-gap-y-${gapY}`]: gapY,
        }
    );

    const mergedStyle = { ...style };

    return (
        <Component className={mergedCls} style={mergedStyle} {...othersProps}>
            {children}
        </Component>
    );
};

export default Flex;
