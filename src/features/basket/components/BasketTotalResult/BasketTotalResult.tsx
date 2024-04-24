import React from 'react';
import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Chip from '@/components/Chip';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import styles from './ProductList.module.scss';
import Title from '@/components/typography/Title';
import { MdStarRate } from 'react-icons/md';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import ProductPrice from '@/features/product/components/ProductPrice';
import { declineWord } from '@/utils/text';
import { formatNumber } from '@/utils/number';

import type { BasketTotalResultProps } from './BasketTotalResult.types';
import Divider from '@/components/Divider';
import Button from '@/components/Button';

const BasketTotalResult = ({ result }: BasketTotalResultProps) => {
    const { count, subtotal, postage, total, discountValue } = result;

    return (
        <div>
            <Title level={2}>Итого</Title>
            <div>
                <Text color="grey">
                    {count} {declineWord(count, 'товар', 'товара', 'товаров')}
                </Text>
            </div>
            <Flex justify="space-between">
                <Text>Subtotal</Text>
                <Text bold>{formatNumber(subtotal)}</Text>
            </Flex>
            <Flex justify="space-between">
                <Text>Postage</Text>
                <Text bold>{formatNumber(postage)}₽</Text>
            </Flex>
            {discountValue && (
                <Flex justify="space-between">
                    <Text>Discount</Text>
                    <Text color="danger" bold>
                        -{formatNumber(discountValue)}₽
                    </Text>
                </Flex>
            )}
            <Divider />
            <Flex justify="space-between">
                <Text>Total</Text>
                <Text bold>{formatNumber(total)}₽</Text>
            </Flex>
            <div>
                <Button href="/checkout">Перейти к оформлению</Button>
            </div>
            <Text color="grey">Способ оплата и доставки можно выбрать при оформление заказа</Text>
        </div>
    );
};

export default BasketTotalResult;
