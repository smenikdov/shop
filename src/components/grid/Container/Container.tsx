import React from 'react';
import './Container.scss';
import classNames from 'classnames';

import type { ContainerProps } from './Container.types';

const Container = (props: ContainerProps) => {
    const {
        className,
        children,
        fluid = false,
        component: Component = 'div',
        ...othersProps
    } = props;

    const mergedCls = classNames(className, { container: !fluid }, { 'container-fluid': fluid });

    return (
        <Component className={mergedCls} {...othersProps}>
            {children}
        </Component>
    );
};

export default Container;
