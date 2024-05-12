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
import * as v from '@/utils/validate';

export const authLoginWithPhoneHandler = new Handler<{ phone: string; password: string }>({
    name: 'Вход по номеру телефона',
    defaultError: 'Произошла ошибка при входе по номеру телефона',
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),

    async request({ phone, password }) {
        const user = await prisma.user.findUnique({
            where: { phone },
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return new RequestErrorResponse({
                message: 'Неверный номер телефона или пароль',
            });
        }

        const { isSuccess } = await authCreateSessionHandler.execute({
            userId: user.id,
            userRole: user.role,
        });
        if (isSuccess) {
            return new SuccessResponse();
        } else {
            throw new Error('Ошибка при создании сессии');
        }
    },
});
