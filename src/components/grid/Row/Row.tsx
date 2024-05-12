import React from 'react';
import './Row.scss';
import classNames from 'classnames';
import Flex from '@/components/Flex';

import type { RowProps } from './Row.types';

const Row = (props: RowProps) => {
    const { gapX = 'md', className, ...othersProps } = props;

    const mergedCls = classNames(className, 'row');

    return <Flex className={mergedCls} gapX={gapX} wrap="wrap" {...othersProps} />;
};

export default Row;
