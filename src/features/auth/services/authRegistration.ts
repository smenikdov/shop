import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { authCreateSessionHandler } from '@/features/auth/services/authSession';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

export const authRegistrationWithPhoneHandler = new Handler({
    name: 'Регистрация по номеру телефона',
    errors: { default: 'Произошла ошибка при регистрации пользователя' },
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
        code: v.string(),
    }),

    async request(payload: { phone: string; password: string; code: string }) {
        // const existingCode = await prisma.smsCode.findFirst({
        //     where: {
        //         phone: payload.phone,
        //         code: payload.code,
        //     },
        // });

        // if (!existingCode) {
        //     return new RequestErrorResponse({
        //         message: 'Неверный код',
        //     });
        // }

        // const hashedPassword = await bcrypt.hash(payload.password, 10);
        // const user = await prisma.user.create({
        //     data: {
        //         phone: payload.phone,
        //         password: hashedPassword,
        //         role: 'USER',
        //     },
        // });
        // const { isSuccess } = await authCreateSessionHandler.execute({
        //     userId: user.id,
        //     userRole: user.role,
        // });

        // if (!isSuccess) {
        //     throw new Error('Ошибка при создании сессии');
        // }

        return new SuccessResponse({ data: null });
    },
});
