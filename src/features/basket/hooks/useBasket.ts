import { useInitialData } from '@/context/InitialDataProvider';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import useNotification from '@/features/notification/hooks/useNotification';
import React, { useState } from 'react';

import {
    basketAddItem as basketAddItemServerAction,
    basketDeleteItem as basketDeleteItemServerAction,
    basketUpdateQuantity as basketUpdateQuantityServerAction,
} from '../routes';

import {
    basketAddItem as basketAddItemAction,
    basketDeleteItem as basketDeleteItemAction,
    basketUpdateQuantity as basketUpdateQuantityAction,
} from '../store';

import type { Product } from '@/features/product/typings';

import useBoolean from '@/hooks/useBoolean';

const useBasket = (product: Product) => {
    const { notifyError, notifySuccess } = useNotification();
    const isLoading = useBoolean(false);
    const dispatch = useAppDispatch();
    const quantity =
        useAppSelector((state) => state.basket.basketItems.find((bi) => bi.id === product.id))
            ?.basketQuantity || 0;

    const basketAddItem = async () => {
        isLoading.setTrue();
        const response = await basketAddItemServerAction({ productId: product.id });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketAddItemAction(product));
        isLoading.setFalse();
    };

    const basketDeleteItem = async () => {
        isLoading.setTrue();
        const response = await basketDeleteItemServerAction({ productId: product.id });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketDeleteItemAction({ productId: product.id }));
        isLoading.setFalse();
    };

    const basketUpdateQuantity = async (quantity: number) => {
        isLoading.setTrue();
        const response = await basketUpdateQuantityServerAction({
            productId: product.id,
            quantity,
        });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketUpdateQuantityAction({ productId: product.id, quantity }));
        isLoading.setFalse();
    };

    return {
        isLoading: isLoading.value,
        quantity,
        basketAddItem,
        basketDeleteItem,
        basketUpdateQuantity,
    } as const;
};

export default useBasket;