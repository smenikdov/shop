import React from 'react';
import './Property.scss';
import classNames from 'classnames';
import Flex from '@/components/Flex';

import type { PropertyProps } from './Property.types';

const Property = (props: PropertyProps) => {
    const { className, name, value, ...otherProps } = props;

    const mergedCls = classNames(className, 'property');

    return (
        <Flex {...otherProps} wrap="nowrap" className={mergedCls} component="dl">
            <dt className="property-name">
                <div>{name}</div>
            </dt>
            <dd className="property-value">
                <div>{value}</div>
            </dd>
        </Flex>
    );
};

export default Property;
