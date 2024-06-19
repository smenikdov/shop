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

export const deliverySuggestCitiesHandler = new Handler({
    name: '',
    defaultError: '',
    schema: v.object({
        query: v.string(),
    }),

    async request(payload: { query: string }) {
        const cities = await prisma.city.findMany({
            select: {
                id: true,
                name: true,
            },
            where: {
                name: {
                    contains: payload.query,
                },
            },
            take: 10,
        });
        return new SuccessResponse({ data: cities });
    },
});
