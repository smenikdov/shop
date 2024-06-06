import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import { productScheme, formatProductScheme } from '@/utils/prisma';
import * as v from '@/utils/validate';

export const productGetAllHandler = new Handler({
    name: 'Получение списка товаров',
    defaultError: 'Ошибка при получении списка товаров',
    schema: v.object({
        userId: v.id().optional(),
    }),

    async request(payload: { userId?: number }) {
        const products = await prisma.product.findMany({
            select: productScheme(payload.userId),
        });

        const formatProducts = products.map((p) => formatProductScheme(p));
        return new SuccessResponse({ data: formatProducts });
    },
});
