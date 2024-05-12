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

export const productGetSingleHandler = new Handler({
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
            select: {
                id: true,
                name: true,
                price: true,
                shortDescription: true,
                longDescription: true,
                offer: {
                    select: {
                        id: true,
                        discount: true,
                    },
                    where: {
                        active: true,
                    },
                },
                images: true,
                rating: true,
            },
        });
        return new SuccessResponse({ data: product });
    },
});
