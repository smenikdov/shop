import 'server-only';
import prisma from '@/lib/prisma';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';

export const userGetAllHandler = new Handler({
    name: 'Получение списка всех пользователей',
    defaultError: 'Ошибка при получении списка всех пользователей',

    async request() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                lastName: true,
                firstName: true,
                patronymic: true,
                email: true,
                phone: true,
            },
        });

        const formatUsers = users.map((user) => ({
            id: user.id,
            email: user.email,
            phone: user.phone,
            fio: [user.lastName, user.firstName, user.patronymic].join(' ').trim(),
        }));

        return new SuccessResponse({ data: formatUsers });
    },
});
