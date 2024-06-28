import React from 'react';
import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Chip from '@/components/Chip';
import { formatNumber } from '@/utils/number';
import { getProductPriceWithDiscount } from '@/features/product/utils';

import styles from './ProductPrice.module.scss';

import type { ProductPriceProps } from './ProductPrice.types';

const ProductPrice = (props: ProductPriceProps) => {
    const { price, offer, ...otherProps } = props;

    return (
        <div {...otherProps}>
            {offer ? (
                <Flex className={styles.container} align="center">
                    <Text className={styles.price} color="primary" bold>
                        {formatNumber(
                            getProductPriceWithDiscount({ price, discount: offer.discount })
                        )}
                        ₽
                    </Text>
                    <Text className={styles.prevprice} color="muted">
                        {formatNumber(price)}₽
                    </Text>
                    <Text className={styles.discount} color="primary">
                        -{formatNumber(offer.discount)}%
                    </Text>
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
