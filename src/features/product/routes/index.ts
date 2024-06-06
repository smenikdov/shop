'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { productGetAllHandler } from '@/features/product/services/productGetAll';
import { productGetOneHandler } from '@/features/product/services/productGetOne';

export const productGetAll = createRoute({
    async handler({ accessTokenData }: RouteData) {
        return productGetAllHandler.execute({
            userId: accessTokenData?.userId,
        });
    },
});

export const productGetOne = createRoute({
    async handler({ payload, accessTokenData }: RouteData<{ productId: number }>) {
        return productGetOneHandler.execute({
            ...payload,
            userId: accessTokenData?.userId,
        });
    },
});
