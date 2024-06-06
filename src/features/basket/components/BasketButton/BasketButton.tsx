'use client';

import React from 'react';

import styles from './BasketButton.module.scss';
import classNames from 'classnames';

import { useAppSelector } from '@/hooks/useStore';

import Flex from '@/components/Flex';
import Text from '@/components/typography/Text';
import Badge from '@/components/Badge';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Title from '@/components/typography/Title';
import Button from '@/components/Button';

import { MdOutlineShoppingBasket } from 'react-icons/md';

import type { BasketButtonProps } from './BasketButton.types';

const BasketButton = (props: BasketButtonProps) => {
    const { className, ...otherProps } = props;

    const basketItemsLength = useAppSelector((state) => state.basket.basketItems.length);

    const mergedCls = classNames(styles.container, className);

    return (
        <div className={mergedCls}>
            <Button
                {...otherProps}
                className={styles.button}
                href="/basket"
                shape="circle"
                variant="text"
                icon={<MdOutlineShoppingBasket />}
            />
            {basketItemsLength > 0 && (
                <Badge className={styles.badge} offset={[-1, 8]}>
                    {basketItemsLength}
                </Badge>
            )}
        </div>
    );
};

export default BasketButton;
