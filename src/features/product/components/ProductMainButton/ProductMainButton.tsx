'use client';

import React from 'react';
import styles from './ProductMainButton.module.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import type { ProductMainButtonProps } from './ProductMainButton.types';
import Title from '@/components/typography/Title';
import Button from '@/components/Button';

import useBasket from '@/features/basket/hooks/useBasket';

const ProductMainButton = (props: ProductMainButtonProps) => {
    const { product } = props;

    const { isLoadig, basketAddItem, basketDeleteItem, basketUpdateQuantity } = useBasket();

    return (
        <Button onClick={() => basketAddItem(product)} loading={isLoadig}>
            Добавить в корзину
        </Button>
    );
};

export default ProductMainButton;
