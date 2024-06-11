'use client';

import React from 'react';

import { useAppSelector } from '@/hooks/useStore';

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

import BasketItem from '../BasketItem/BasketItem';

import type { BasketListProps } from './BasketList.types';

const BasketList = (props: BasketListProps) => {
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
                <BasketItem key={product.id} product={product} />
            ))}
        </div>
    );
};

export default BasketList;
