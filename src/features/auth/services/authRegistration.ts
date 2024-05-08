import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { createSession } from '@/features/auth/services/authSession';
import { ServerErrorResponse, RequestErrorResponse, Response } from '@/utils/actions/responses';
import { handleError } from '@/utils/actions/errors';

export async function authRegistrationWithPhone(object: {
    phone: string;
    password: string;
}): Promise<Response> {
    try {
        const hashedPassword = await bcrypt.hash(object.password, 10);

        const user = await prisma.user.create({
            data: {
                phone: object.phone,
                password: hashedPassword,
                role: 'USER',
            },
        });
        const { isSuccess } = await createSession(user.id, user.role);
        // TODO
        if (isSuccess) {
            redirect('/product');
        } else {
            redirect('/login');
        }
    } catch (error) {
        handleError(error);
        return new ServerErrorResponse({
            message: 'Произошла ошибка при регистрации пользователя',
        });
    }
}
