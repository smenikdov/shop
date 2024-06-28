import React from 'react';
import styles from './ProductInfoList.module.scss';
import Accordion from '@/components/Accordion';

import type { ProductInfoListProps } from './ProductInfoList.types';

const ProductInfoList = (props: ProductInfoListProps) => {
    const { info } = props;

    return (
        <div className={styles.container}>
            <Accordion items={info} />
        </div>
    );
};

export default ProductInfoList;
