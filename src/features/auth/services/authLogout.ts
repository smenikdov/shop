import 'server-only';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function authLogout() {
    const refreshToken = cookies().get('refreshToken')?.value;
    const accessToken = cookies().get('accessToken')?.value;

    // Проверка на наличие токена?
    const deletedSession = await prisma.session.delete({
        where: {
            accessToken,
            refreshToken,
        },
    });

    cookies().delete('refreshToken');
    cookies().delete('accessToken');

    redirect('/login');
}
