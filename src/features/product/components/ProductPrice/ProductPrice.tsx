import React from 'react';
import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Chip from '@/components/Chip';
import styles from './ProductPrice.module.scss';
import { formatNumber } from '@/utils/number';

import type { ProductPriceProps } from './ProductPrice.types';

const ProductPrice = (props: ProductPriceProps) => {
    const { price, prevPrice, discount } = props;

    return (
        <div>
            <Flex className={styles.container} align="center">
                <Text className={styles.price} color="primary" bold>
                    {formatNumber(price)}₽
                </Text>
                <Text className={styles.prevprice} color="grey">
                    {formatNumber(prevPrice)}₽
                </Text>
                <Chip className={styles.chip}>Скидка {formatNumber(discount)}%</Chip>
            </Flex>
        </div>
    );
};

export default ProductPrice;
