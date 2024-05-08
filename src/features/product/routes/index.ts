'use server';
import 'server-only';
import { productGetAll } from '@/features/product/services/productGetAll';
import { createRoute } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

export const _productGetAll = createRoute({
    handler: productGetAll,
});
