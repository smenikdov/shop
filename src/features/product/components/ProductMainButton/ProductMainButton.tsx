'use client';

import React, { useState } from 'react';
import styles from './ProductMainButton.module.scss';
import Property from '@/components/Property';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import type { ProductMainButtonProps } from './ProductMainButton.types';
import Title from '@/components/typography/Title';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import InputCounter from '@/components/form/InputCounter';

import useBasket from '@/features/basket/hooks/useBasket';

import { MdFavorite, MdDelete } from 'react-icons/md';

const ProductMainButton = (props: ProductMainButtonProps) => {
    const { product, ...otherProps } = props;

    const { isLoading, quantity, basketAddItem, basketDeleteItem, basketUpdateQuantity } =
        useBasket(product);

    const handleChangeQuantity = (newQuantity: number) => {
        if (newQuantity > 0) {
            basketUpdateQuantity(newQuantity);
        } else {
            basketDeleteItem();
        }
    };

    const AddButton = (
        <div>
            <Button onClick={basketAddItem}>Добавить в корзину</Button>
        </div>
    );

    const BasketButton = (
        <div>
            <Button href="/basket">
                В корзине
                <br />
                Перейти
            </Button>
        </div>
    );

    const ChangeButton = (
        <div>
            <InputCounter value={quantity} onChange={handleChangeQuantity} />
        </div>
    );

    const BasketAndChangeButton = (
        <>
            {BasketButton}
            {ChangeButton}
        </>
    );

    const FavoriteButton = (
        <div>
            <Button icon={<MdFavorite />} />
        </div>
    );

    return (
        <Flex align="center" gapX="md" {...otherProps}>
            {quantity > 0 ? BasketAndChangeButton : AddButton}
            {FavoriteButton}
        </Flex>
    );
};

export default ProductMainButton;