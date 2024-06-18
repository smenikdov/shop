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

export const deliveryCreateIntake = new Handler({
    name: 'Вызов курьера',
    defaultError: 'Ошибка при вызове курьера',

    async request(payload: { id: number }) {
        const userData = await prisma.user.findUnique({});
        return new SuccessResponse({ data: userData });
    },
});
