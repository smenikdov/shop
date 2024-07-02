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

import { basketGetOneItemHandler } from './basketGetOneItem';
import { basketAddItemHandler } from './basketAddItem';

export const basketUpdateQuantityHandler = new Handler({
    name: 'Измнение количества товара в корзине',
    errors: { default: 'Ошибка при измнении количества товара в корзине' },
    schema: v.object({
        userId: v.id(),
        productId: v.id(),
        quantity: v.quantity(),
    }),

    async request(payload: { userId: number; productId: number; quantity: number }) {
        const basketGetProductResponse = await basketGetOneItemHandler.execute(payload);
        if (!basketGetProductResponse.isSuccess) {
            throw new Error('Ошибка при проверке товара на наличие в корзине');
        }
        const existingBasketItem = basketGetProductResponse.data;
        if (!existingBasketItem) {
            const basketAddProductResponse = await basketAddItemHandler.execute(payload);
            if (!basketAddProductResponse.isSuccess) {
                throw new Error('Ошибка при добавлении товара в корзину');
            }
        }

        await prisma.basketItem.update({
            where: {
                productId_userId: {
                    productId: payload.productId,
                    userId: payload.userId,
                },
            },
            data: {
                quantity: payload.quantity,
            },
        });
        return new SuccessResponse({ data: null });
    },
});
