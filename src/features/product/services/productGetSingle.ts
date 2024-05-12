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

export const productGetSingleHandler = new Handler<{ productId: number }>({
    name: 'Получение деталей товара',
    defaultError: 'Ошибка при получении деталей товара',
    schema: v.object({
        productId: v.id(),
    }),

    async request(payload) {
        const product = await prisma.product.findUnique({
            where: {
                id: payload.productId,
            },
        });
        return new SuccessResponse({ data: product });
    },
});
