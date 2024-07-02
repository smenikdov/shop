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

export const authLoginWithPhoneHandler = new Handler({
    name: 'Вход по номеру телефона',
    errors: { default: 'Произошла ошибка при входе по номеру телефона' },
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
    }),

    async request(payload: { phone: string; password: string }) {
        const user = await prisma.user.findUnique({
            where: { phone: payload.phone },
        });

        if (!user || !bcrypt.compareSync(payload.password, user.password)) {
            return new RequestErrorResponse({
                message: 'Неверный номер телефона или пароль',
            });
        }

        const { isSuccess } = await authCreateSessionHandler.execute({
            userId: user.id,
            userRole: user.role,
        });
        if (!isSuccess) {
            throw new Error('Ошибка при создании сессии');
        }

        return new SuccessResponse({ data: null });
    },
});
