import React from 'react';
import styles from './ProductAdvantagesList.module.scss';
import Accordion from '@/components/Accordion';

import type { ProductAdvantagesListProps } from './ProductAdvantagesList.types';

const ProductAdvantagesList = (props: ProductAdvantagesListProps) => {
    const { advantages } = props;

    return (
        <div className={styles.container}>
            <Accordion items={advantages} />
        </div>
    );
};

export default ProductAdvantagesList;
