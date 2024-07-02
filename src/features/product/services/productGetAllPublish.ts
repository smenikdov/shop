import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import { productScheme, formatProductScheme } from '@/utils/prisma';
import * as v from '@/utils/validate';

import { PRODUCT_STATUS } from '@/constants';

export const productGetAllPublishHandler = new Handler({
    name: 'Получение списка товаров',
    errors: { default: 'Ошибка при получении списка товаров' },
    schema: v.object({
        userId: v.id().optional(),
    }),

    async request(payload: { userId?: number }) {
        const products = await prisma.product.findMany({
            select: productScheme(payload.userId),
            where: {
                status: PRODUCT_STATUS.PUBLISH
            },
        });

        const formatProducts = products.map((p) => formatProductScheme(p));
        return new SuccessResponse({ data: formatProducts });
    },
});
