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

import { favoriteGetOneItemHandler } from './favoriteGetOneItem';

export const favoriteDeleteItemHandler = new Handler({
    name: 'Удаление товара из избранного',
    errors: { default: 'Ошибка при удалении товара из избранного' },
    schema: v.object({
        userId: v.id(),
        productId: v.id(),
    }),

    async request(payload: { userId: number; productId: number }) {
        const favoriteGetProductResponse = await favoriteGetOneItemHandler.execute(payload);
        if (!favoriteGetProductResponse.isSuccess) {
            throw new Error('Ошибка при проверке товара на наличие в избранном');
        }
        const existingFavoriteItem = favoriteGetProductResponse.data;
        if (!existingFavoriteItem) {
            return new SuccessResponse({ data: null });
        }

        await prisma.favoriteItem.delete({
            where: {
                productId_userId: {
                    productId: payload.productId,
                    userId: payload.userId,
                },
            },
        });
        return new SuccessResponse({ data: null });
    },
});
