import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const basketGetOneItemHandler = new Handler({
    name: 'Получение определённого товара из корзины',
    defaultError: 'Ошибка при получении определённого товара из корзины',
    schema: v.object({
        userId: v.id(),
        productId: v.id(),
    }),

    async request(payload: { userId: number; productId: number }) {
        const existingBasketItem = await prisma.basketItem.findUnique({
            where: {
                productId_userId: {
                    productId: payload.productId,
                    userId: payload.userId,
                },
            },
        });

        return new SuccessResponse({ data: existingBasketItem });
    },
});
