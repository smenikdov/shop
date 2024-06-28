import React from 'react';
import styles from './ProductAdvantagesList.module.scss';

import type { ProductAdvantagesListProps } from './ProductAdvantagesList.types';

const ProductAdvantagesList = (props: ProductAdvantagesListProps) => {
    const { advantages } = props;

    return (
        <div className={styles.container}>
        </div>
    );
};

export default ProductAdvantagesList;
