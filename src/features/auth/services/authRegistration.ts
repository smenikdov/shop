import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { authCreateSessionHandler } from '@/features/auth/services/authSession';
import { ServerErrorResponse, RequestErrorResponse, Response } from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';

export const authRegistrationWithPhoneHandler = new Handler({
    name: 'Регистрация по номеру телефона',
    defaultError: 'Произошла ошибка при регистрации пользователя',

    async request(object: { phone: string; password: string }) {
        const hashedPassword = await bcrypt.hash(object.password, 10);
        const user = await prisma.user.create({
            data: {
                phone: object.phone,
                password: hashedPassword,
                role: 'USER',
            },
        });
        const { isSuccess } = await authCreateSessionHandler.execute(user.id, user.role);
        // TODO
        if (isSuccess) {
            redirect('/product');
        } else {
            redirect('/login');
        }
    },
});
