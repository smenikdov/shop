import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { authCreateSessionHandler } from '@/features/auth/services/authSession';
import { ServerErrorResponse, RequestErrorResponse, Response } from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

export const authRegistrationWithPhoneHandler = new Handler({
    name: 'Регистрация по номеру телефона',
    defaultError: 'Произошла ошибка при регистрации пользователя',
    schema: v.object({
        password: v.password(),
        phone: v.phone(),
        code: v.string(),
    }),

    async request(payload: { phone: string; password: string; code: string }) {
        const existingCode = await prisma.smsCode.findFirst({
            where: {
                phone: payload.phone,
                code: payload.code,
            },
        });

        if (!existingCode) {
            return new RequestErrorResponse({
                message: 'Неверный код',
            });
        }

        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const user = await prisma.user.create({
            data: {
                phone: payload.phone,
                password: hashedPassword,
                role: 'USER',
            },
        });
        const { isSuccess } = await authCreateSessionHandler.execute({
            userId: user.id,
            userRole: user.role,
        });
        // TODO
        if (isSuccess) {
            redirect('/product');
        } else {
            redirect('/login');
        }
    },
});
