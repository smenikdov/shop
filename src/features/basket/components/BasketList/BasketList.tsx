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

import type { BasketListProps } from './BasketList.types';

const BasketList = (props: BasketListProps) => {
    const { isLoadig, basketAddItem, basketDeleteItem, basketUpdateQuantity } = useBasket();
    const basketItems = useAppSelector((state) => state.basket.basketItems);

    if (basketItems.length === 0) {
        return (
            <div>
                <div className="mb-xs">
                    <Text>Воспользуйтесь поиском, чтобы найти всё, что нужно</Text>
                </div>
                <div>
                    <Button href="/product">Начать покупки</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {basketItems.map((product) => (
                <Row key={product.id}>
                    <Col md={7}>
                        <Flex wrap="nowrap">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={100}
                                height={100}
                            />
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
                                            basketDeleteItem(product.id);
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
            ))}
        </div>
    );
};

export default BasketList;
