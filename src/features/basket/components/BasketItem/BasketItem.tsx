'use client';

import React from 'react';

import { useAppSelector } from '@/hooks/useStore';
import useBasket from '@/features/basket/hooks/useBasket';

import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Chip from '@/components/Chip';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import styles from './ProductList.module.scss';
import { formatNumber } from '@/utils/number';
import Title from '@/components/typography/Title';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Button from '@/components/Button';

import { MdFavorite, MdDelete } from 'react-icons/md';

import ProductPrice from '@/features/product/components/ProductPrice';

import type { BasketItemProps } from './BasketItem.types';

const BasketItem = (props: BasketItemProps) => {
    const { product } = props;
    const { isLoading, basketAddItem, basketDeleteItem, basketUpdateQuantity } = useBasket(product);
    const basketItems = useAppSelector((state) => state.basket.basketItems);

    return (
        <Row>
            <Col md={7}>
                <Flex wrap="nowrap">
                    <Image src={product.images[0]} alt={product.name} width={100} height={100} />
                    <div>
                        <div>
                            <Text bold>{product.name}</Text>
                        </div>
                        <div>
                            <Chip>TODO</Chip>
                        </div>
                        <Flex>
                            <Button icon={<MdFavorite />} size="sm" onClick={() => {}} />
                            <Button
                                icon={<MdDelete />}
                                size="sm"
                                onClick={() => {
                                    basketDeleteItem();
                                }}
                            />
                        </Flex>
                    </div>
                </Flex>
            </Col>
            <Col md={3}>
                <ProductPrice price={product.price} offer={product.offer} />
            </Col>
            <Col md={2}>
                {/* <ProductCount
                        id={product.id}
                        quantity={product.quantity}
                        onChange={(newQuantity) => (product.quantity = newQuantity)}
                    /> */}
            </Col>
        </Row>
    );
};

export default BasketItem;