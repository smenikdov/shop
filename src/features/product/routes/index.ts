'use server';
import 'server-only';
import { productGetAllHandler } from '@/features/product/services/productGetAll';
import { productGetSingleHandler } from '@/features/product/services/productGetSingle';
import { createRoute } from '@/utils/actions/routes';

export const productGetAll = createRoute({
    async handler() {
        return productGetAllHandler.execute({});
    },
});

export const productGetSingle = createRoute<{ productId: number }>({
    async handler({ payload }) {
        return productGetSingleHandler.execute(payload);
    },
});
