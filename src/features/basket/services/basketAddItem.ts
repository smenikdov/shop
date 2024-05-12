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

export const basketAddItemHandler = new Handler({
    name: 'Добавление товара в корзину',
    defaultError: 'Ошибка при добавлении товара в корзину',
    schema: v.object({
        userId: v.id(),
        productId: v.id(),
    }),

    async request(payload: { userId: number; productId: number }) {
        const basketGetProductResponse = await basketGetOneItemHandler.execute(payload);
        if (!basketGetProductResponse.isSuccess) {
            throw new Error('Ошибка при проверке товара на наличие в корзине');
        }
        const existingBasketItem = basketGetProductResponse.data;
        if (existingBasketItem) {
            return new SuccessResponse();
        }

        await prisma.basketItem.create({
            data: {
                quantity: 1,
                productId: payload.productId,
                userId: payload.userId,
            },
        });
        return new SuccessResponse();
    },
});
