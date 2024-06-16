import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const checkoutGetProductSizesHandler = new Handler({
    name: 'Получение размеров упаковки товаров',
    defaultError: 'Ошибка при получении размеров упаковки товаров',
    schema: v.object({
        userId: v.id(),
    }),

    async request(payload: { userId: number }) {
        const sizes = await prisma.checkoutItem.findMany({
            where: {
                id: {
                    userId: payload.userId,
                },
            },
            select: {
                quantity: true,
                product: {
                    width: true,
                    height: true,
                    length: true,
                    weight: true,
                },
            },
        });
        const formatSizes = sizes.map((s) => ({
            ...s.product,
            quantity: s.quantity,
        }));
        return new SuccessResponse({ data: formatSizes });
    },
});
