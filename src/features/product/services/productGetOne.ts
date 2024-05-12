import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';
import { baseProductScheme } from '@/features/product/utils';

export const productGetOneHandler = new Handler({
    name: 'Получение деталей товара',
    defaultError: 'Ошибка при получении деталей товара',
    schema: v.object({
        productId: v.id(),
    }),

    async request(payload: { productId: number }) {
        const product = await prisma.product.findUnique({
            where: {
                id: payload.productId,
            },
            select: baseProductScheme,
        });
        return new SuccessResponse({ data: product });
    },
});
