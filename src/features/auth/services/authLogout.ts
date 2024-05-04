import 'server-only';
import { redirect } from 'next/navigation';
import { cookies as getCookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { ServerErrorResponse, Response, SuccessResponse } from '@/utils/actions/responses';
import { handleError } from '@/utils/actions/errors';
import { deleteActiveSession } from './authSession';

export async function authLogout(): Promise<Response> {
    try {
        const { isSuccess } = await deleteActiveSession();
        if (isSuccess) {
            return new SuccessResponse();
        } else {
            throw new Error('Ошибка при удалении сессии');
        }
    } catch (error) {
        handleError(error);
        return new ServerErrorResponse({
            message: 'Произошла ошибка при выходе',
        });
    }
}
