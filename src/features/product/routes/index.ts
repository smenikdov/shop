'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { productGetAllHandler } from '@/features/product/services/productGetAll';
import { productGetOneHandler } from '@/features/product/services/productGetOne';
import { productGetAllPublishHandler } from '@/features/product/services/productGetAllPublish';

interface ProductGetAllPayload {
    page: number;
    productId: number;
    name: string;
}
export const productGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<ProductGetAllPayload>) {
        return productGetAllHandler.execute(payload);
    },
});

export const productGetAllPublish = createRoute({
    async handler({ accessTokenData }: RouteData) {
        return productGetAllPublishHandler.execute({
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
