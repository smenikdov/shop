import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import { baseProductScheme } from '@/utils/prisma';

export const productGetAllHandler = new Handler({
    name: 'Получение списка товаров',
    defaultError: 'Ошибка при получении списка товаров',

    async request() {
        const products = await prisma.product.findMany({
            select: baseProductScheme(),
        });

        return new SuccessResponse({ data: products });
    },
});
