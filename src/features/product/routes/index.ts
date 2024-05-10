'use server';
import 'server-only';
import { productGetAllHandler } from '@/features/product/services/productGetAll';
import { createRoute } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

export const _productGetAll = createRoute({
    handler: productGetAllHandler,
});
