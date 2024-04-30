import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSession } from '@/features/auth/services/authSession';

export async function authLoginWithPhone(object: { phone: string; password: string }) {
    const user = await prisma.user.findUnique({
        where: { phone: object.phone },
    });

    if (!user || !bcrypt.compareSync(object.password, user.password)) {
        return {
            message: 'Неверный номер телефона или пароль',
        };
    }

    await createSession(user.id);
    redirect('/products');
}

export async function authLoginWithEmail(object: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
        where: { email: object.email },
    });

    if (!user || !bcrypt.compareSync(object.password, user.password)) {
        return {
            message: 'Неверная почта или пароль',
        };
    }

    await createSession(user.id);
    redirect('/products');
}
