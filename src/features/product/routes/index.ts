'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import { productGetAllHandler } from '@/features/product/services/productGetAll';
import { productGetSingleHandler } from '@/features/product/services/productGetSingle';

export const productGetAll = createRoute({
    async handler() {
        return productGetAllHandler.execute({});
    },
});

export const productGetSingle = createRoute({
    async handler({ payload }: RouteData<{ productId: number }>) {
        return productGetSingleHandler.execute(payload);
    },
});
