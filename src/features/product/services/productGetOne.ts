import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
    NotFoundResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';
import { productScheme, formatProductScheme } from '@/utils/prisma';

export const productGetOneHandler = new Handler({
    name: 'Получение деталей товара',
    defaultError: 'Ошибка при получении деталей товара',
    schema: v.object({
        productId: v.id(),
        userId: v.id().optional(),
    }),

    async request(payload: { userId?: number; productId: number }) {
        const product = await prisma.product.findUnique({
            where: {
                id: payload.productId,
            },
            select: {
                ...productScheme(payload.userId),
                shortDescription: true,
                longDescription: true,
                quantity: true,
                info: {
                    select: {
                        header: true,
                        content: true,
                    },
                },
                advantages: {
                    select: {
                        name: true,
                        description: true,
                        icon: true,
                    },
                },
            },
        });
        if (!product) {
            return new NotFoundResponse({ message: 'Товар не найден' });
        }
        const formatProduct = formatProductScheme(product);
        return new SuccessResponse({ data: formatProduct });
    },
});
