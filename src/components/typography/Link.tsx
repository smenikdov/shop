import React from 'react';
import type { LinkProps } from './Typography.types';
import Typography from './Typography';

const Link = ({ rel, ...otherProps }: LinkProps) => {
    const mergedProps = {
        ...otherProps,
        rel: rel === undefined && otherProps.target === '_blank' ? 'noopener noreferrer' : rel,
    };

    // @ts-expect-error: https://github.com/ant-design/ant-design/issues/26622
    delete mergedProps.navigate;

    return <Typography {...mergedProps} component="a" />;
};

export default Link;
