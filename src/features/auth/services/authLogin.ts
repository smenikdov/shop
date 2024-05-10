import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { authCreateSessionHandler } from '@/features/auth/services/authSession';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';

export const authLoginWithPhoneHandler = new Handler({
    name: 'Вход по номеру телефона',
    defaultError: 'Произошла ошибка при входе по номеру телефона',

    async request(object: { phone: string; password: string }) {
        const user = await prisma.user.findUnique({
            where: { phone: object.phone },
        });

        if (!user || !bcrypt.compareSync(object.password, user.password)) {
            return new RequestErrorResponse({
                message: 'Неверный номер телефона или пароль',
            });
        }

        const { isSuccess } = await authCreateSessionHandler.execute(user.id, user.role);
        if (isSuccess) {
            return new SuccessResponse();
        } else {
            throw new Error('Ошибка при создании сессии');
        }
    },
});
