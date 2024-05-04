import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { createSession } from '@/features/auth/services/authSession';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import { handleError } from '@/utils/actions/errors';

export async function authLoginWithPhone(object: {
    phone: string;
    password: string;
}): Promise<Response> {
    try {
        const user = await prisma.user.findUnique({
            where: { phone: object.phone },
        });

        if (!user || !bcrypt.compareSync(object.password, user.password)) {
            return new RequestErrorResponse({
                message: 'Неверный номер телефона или пароль',
            });
        }

        const { isSuccess } = await createSession(user.id, user.role);
        if (isSuccess) {
            return new SuccessResponse();
        } else {
            throw new Error('Ошибка при создании сессии');
        }
    } catch (error) {
        handleError(error);
        return new ServerErrorResponse({
            message: 'Произошла ошибка при входе',
        });
    }
}

export async function authLoginWithEmail(object: {
    email: string;
    password: string;
}): Promise<Response> {
    try {
        const user = await prisma.user.findUnique({
            where: { email: object.email },
        });

        if (!user || !bcrypt.compareSync(object.password, user.password)) {
            return new RequestErrorResponse({
                message: 'Неверная почта или пароль',
            });
        }

        const { isSuccess } = await createSession(user.id, user.role);
        if (isSuccess) {
            return new SuccessResponse();
        } else {
            throw new Error('Ошибка при создании сессии');
        }
    } catch (error) {
        handleError(error);
        return new ServerErrorResponse({
            message: 'Произошла ошибка при входе',
        });
    }
}
