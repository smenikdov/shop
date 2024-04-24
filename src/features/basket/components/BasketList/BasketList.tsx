'use client';

import React from 'react';
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
import ProductPrice from '@/features/product/components/ProductPrice';
import { MdFavorite, MdDelete } from 'react-icons/md';

import type { BasketListProps } from './BasketList.types';
import Button from '@/components/Button';

const BasketList = (props: BasketListProps) => {
    const { products } = props;

    if (products.length === 0) {
        return (
            <div>
                <Text>Воспользуйтесь поиском, чтобы найти всё, что нужно</Text>
                <Button href="/products">Начать покупки</Button>
            </div>
        );
    }

    return (
        <div>
            {products.map((product) => (
                <Row key={product.id}>
                    <Col md={7}>
                        <Flex wrap="nowrap">
                            <Image
                                src={product.image}
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
                                    <Button icon={<MdFavorite />} onClick={() => {}} />
                                    <Button icon={<MdDelete />} onClick={() => {}} />
                                </Flex>
                            </div>
                        </Flex>
                    </Col>
                    <Col md={3}>
                        <ProductPrice
                            price={product.price}
                            prevPrice={product.prevPrice}
                            discount={product.discount}
                        />
                    </Col>
                    <Col md={2}>
                        {/* <ProductCount
                            id={product.id}
                            count={product.count}
                            onChange={(newCount) => (product.count = newCount)}
                        /> */}
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default BasketList;
