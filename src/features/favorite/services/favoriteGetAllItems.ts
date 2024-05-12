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
import { baseProductScheme } from '@/features/product/utils';

export const favoriteGetAllItemsHandler = new Handler({
    name: 'Получение избранных товаров',
    defaultError: 'Ошибка при получении избранных товаров',
    schema: v.object({
        userId: v.id(),
    }),

    async request(payload: { userId: number }) {
        const favoriteItems = await prisma.favoriteItem.findMany({
            where: {
                userId: payload.userId,
            },
            select: {
                product: {
                    select: baseProductScheme,
                },
            },
        });
        return new SuccessResponse({ data: favoriteItems });
    },
});
