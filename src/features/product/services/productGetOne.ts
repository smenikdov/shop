import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
    NotFoundResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

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
                        isActive: true,
                    },
                },
                images: true,
                rating: true,
            },
        });
        if (!product) {
            return new NotFoundResponse({ message: 'Товар не найден' });
        }
        return new SuccessResponse({ data: product });
    },
});
