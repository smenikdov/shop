'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';
import { AccessDeniedResponse } from '@/utils/actions/responses';

import { basketAddItemHandler } from '@/features/basket/services/basketAddItem';
import { basketDeleteItemHandler } from '@/features/basket/services/basketDeleteItem';
import { basketGetAllItemsHandler } from '@/features/basket/services/basketGetAllItems';
import { basketUpdateQuantityHandler } from '@/features/basket/services/basketUpdateQuantity';

export const basketAddItem = createRoute({
    async handler({ payload, accessTokenData }: RouteData<{ productId: number }>) {
        if (!accessTokenData?.userId) {
            return new AccessDeniedResponse();
        }
        return basketAddItemHandler.execute({
            userId: accessTokenData.userId,
            productId: payload.productId,
        });
    },
});

export const basketDeleteItem = createRoute({
    async handler({ payload, accessTokenData }: RouteData<{ productId: number }>) {
        if (!accessTokenData?.userId) {
            return new AccessDeniedResponse();
        }
        return basketDeleteItemHandler.execute({
            userId: accessTokenData.userId,
            productId: payload.productId,
        });
    },
});

export const basketGetAllItems = createRoute({
    async handler({ accessTokenData }: RouteData) {
        if (!accessTokenData?.userId) {
            return new AccessDeniedResponse();
        }
        return basketGetAllItemsHandler.execute({
            userId: accessTokenData.userId,
        });
    },
});

export const basketUpdateQuantity = createRoute({
    async handler({
        payload,
        accessTokenData,
    }: RouteData<{ productId: number; quantity: number }>) {
        if (!accessTokenData?.userId) {
            return new AccessDeniedResponse();
        }
        return basketUpdateQuantityHandler.execute({
            userId: accessTokenData.userId,
            productId: payload.productId,
            quantity: payload.quantity,
        });
    },
});
