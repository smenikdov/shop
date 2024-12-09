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
import { includePagination } from '@/utils/prisma';

interface PayloadFilters {
    name: string;
    productId: number;
    page: number;
}

export const productGetAllHandler = new Handler({
    name: 'Получение списка товаров',
    errors: { default: 'Ошибка при получении списка товаров' },
    schema: v.object({
        page: v.page(),
        productId: v.id(),
        name: v.string(),
    }),

    async request(payload: PayloadFilters) {
        const products = await prisma.product.findMany({
            ...includePagination(payload.page),
            select: productScheme(),
            where: {
                id: payload.productId || undefined,
                name: {
                    contains: payload.name || undefined,
                    mode: 'insensitive',
                },
            },
        });

        const formatProducts = products.map((p) => formatProductScheme(p));
        return new SuccessResponse({ data: formatProducts });
    },
});