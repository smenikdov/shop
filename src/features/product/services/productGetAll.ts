import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';

export const productGetAllHandler = new Handler({
    name: 'Получение списка товаров',
    defaultError: 'Ошибка при получении списка товаров',

    async request() {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
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

        return new SuccessResponse({ data: products });
    },
});
