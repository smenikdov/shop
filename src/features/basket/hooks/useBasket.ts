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

const useBasket = (product: Product) => {
    const { notifyError, notifySuccess } = useNotification();
    const [isLoadig, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const quantity =
        useAppSelector((state) => state.basket.basketItems.find((bi) => bi.id === product.id))
            ?.basketQuantity || 0;

    const basketAddItem = async () => {
        setIsLoading(true);
        const response = await basketAddItemServerAction({ productId: product.id });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketAddItemAction(product));
        setIsLoading(false);
    };

    const basketDeleteItem = async () => {
        setIsLoading(true);
        const response = await basketDeleteItemServerAction({ productId: product.id });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketDeleteItemAction({ productId: product.id }));
        setIsLoading(false);
    };

    const basketUpdateQuantity = async (quantity: number) => {
        setIsLoading(true);
        const response = await basketUpdateQuantityServerAction({
            productId: product.id,
            quantity,
        });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketUpdateQuantityAction({ productId: product.id, quantity }));
        setIsLoading(false);
    };

    return {
        isLoadig,
        quantity,
        basketAddItem,
        basketDeleteItem,
        basketUpdateQuantity,
    } as const;
};

export default useBasket;
