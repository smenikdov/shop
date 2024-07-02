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

export const favoriteGetOneItemHandler = new Handler({
    name: 'Получение определённого товара из избранного',
    errors: { default: 'Ошибка при получении определённого товара из избранного' },
    schema: v.object({
        userId: v.id(),
        productId: v.id(),
    }),

    async request(payload: { userId: number; productId: number }) {
        const existingFavoriteItem = await prisma.favoriteItem.findUnique({
            where: {
                productId_userId: {
                    productId: payload.productId,
                    userId: payload.userId,
                },
            },
        });

        return new SuccessResponse({ data: existingFavoriteItem });
    },
});
