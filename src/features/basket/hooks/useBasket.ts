import { useInitialData } from '@/context/InitialDataProvider';
import { useAppDispatch } from '@/hooks/useStore';
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

const useBasket = () => {
    const { notifyError, notifySuccess } = useNotification();
    const [isLoadig, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const basketAddItem = async (product: Product) => {
        setIsLoading(true);
        const response = await basketAddItemServerAction({ productId: product.id });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketAddItemAction(product));
        setIsLoading(false);
    };

    const basketDeleteItem = async (productId: number) => {
        setIsLoading(true);
        const response = await basketDeleteItemServerAction({ productId });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketDeleteItemAction({ productId }));
        setIsLoading(false);
    };

    const basketUpdateQuantity = async (productId: number, quantity: number) => {
        setIsLoading(true);
        const response = await basketUpdateQuantityServerAction({ productId, quantity });
        if (!response.isSuccess) {
            notifyError(response.message);
            return;
        }
        dispatch(basketUpdateQuantityAction({ productId, quantity }));
        setIsLoading(false);
    };

    return {
        isLoadig,
        basketAddItem,
        basketDeleteItem,
        basketUpdateQuantity,
    } as const;
};

export default useBasket;
