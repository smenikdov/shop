import 'server-only';
import prisma from '@/lib/prisma';
import type { UserData } from '../typings';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';

export const userGetData = new Handler({
    name: 'Сохранение данных пользователя',
    defaultError: 'Ошибка при сохранении данных пользователя',
    schema: v.object({
        userId: v.id(),
        userData: v.object({
            email: v.email(),
            phone: v.phone(),
            lastName: v.string(),
            firstName: v.string(),
            patronymic: v.string(),
            sex: v.string(),
            birthday: v.date().past(),
        }),
    }),

    async request(payload: { userId: number; userData: UserData }) {
        await prisma.user.update({
            data: payload.userData,
            where: {
                id: payload.userId,
            },
        });
        return new SuccessResponse();
    },
});
