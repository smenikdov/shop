import React from 'react';
import './Row.scss';
import classNames from 'classnames';
import Flex from '@/components/Flex';

import type { RowProps } from './Row.types';

const Row = (props: RowProps) => {
    const { className, ...othersProps } = props;

    const mergedCls = classNames(className, 'row');

    return <Flex className={mergedCls} wrap="wrap" {...othersProps} />;
};

export default Row;
