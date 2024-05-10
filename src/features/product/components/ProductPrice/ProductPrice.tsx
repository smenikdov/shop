import React from 'react';
import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Chip from '@/components/Chip';
import styles from './ProductPrice.module.scss';
import { formatNumber } from '@/utils/number';
import { getProductPrice } from '@/features/product/utils';

import type { ProductPriceProps } from './ProductPrice.types';

const ProductPrice = (props: ProductPriceProps) => {
    const { price, offer } = props;

    return (
        <div>
            {offer ? (
                <Flex className={styles.container} align="center">
                    <Text className={styles.price} color="primary" bold>
                        {formatNumber(getProductPrice({ price, discount: offer.discount }))}₽
                    </Text>
                    <Text className={styles.prevprice} color="grey">
                        {formatNumber(price)}₽
                    </Text>
                    <Chip className={styles.chip}>Скидка {formatNumber(offer.discount)}%</Chip>
                </Flex>
            ) : (
                <Flex className={styles.container} align="center">
                    <Text className={styles.price} color="primary" bold>
                        {formatNumber(price)}₽
                    </Text>
                </Flex>
            )}
        </div>
    );
};

export default ProductPrice;
