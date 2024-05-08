import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { handleError } from '@/utils/actions/errors';

export const productGetAll = async (): Promise<Response> => {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                prevPrice: true,
                discount: true,
                images: true,
                rating: true,
            },
        });
        return new SuccessResponse({
            data: products,
        });
    } catch (error) {
        handleError(error);
        return new ServerErrorResponse({ message: 'Ошибка при получении списка проектов' });
    }
};
