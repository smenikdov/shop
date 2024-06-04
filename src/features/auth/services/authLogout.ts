import 'server-only';
import { redirect } from 'next/navigation';
import { cookies as getCookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { ServerErrorResponse, Response, SuccessResponse } from '@/utils/actions/responses';
import { Handler } from '@/utils/actions/routes';
import { authDeleteActiveSessionHandler } from './authSession';

export const authLogoutHandler = new Handler({
    name: 'Выход из аккаунта',
    defaultError: 'Произошла ошибка при выходе из аккаунта',

    async request() {
        const { isSuccess } = await authDeleteActiveSessionHandler.execute({});
        if (!isSuccess) {
            throw new Error('Ошибка при удалении сессии');
        }

        return new SuccessResponse({ data: null });
    },
});
