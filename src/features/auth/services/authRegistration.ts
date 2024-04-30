import 'server-only';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSession } from '@/features/auth/services/authSession';

export async function authRegistrationWithPhone(object: { phone: string; password: string }) {
    const hashedPassword = await bcrypt.hash(object.password, 10);

    const user = await prisma.user.create({
        data: {
            phone: object.phone,
            password: hashedPassword,
        },
    });
    await createSession(user.id);
    redirect('/products');
}

export async function authRegistrationWithEmail(object: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(object.password, 10);

    const user = await prisma.user.create({
        data: {
            email: object.email,
            password: hashedPassword,
        },
    });

    await createSession(user.id);
    redirect('/products');
}
