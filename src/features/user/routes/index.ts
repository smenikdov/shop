'use server';
import 'server-only';
import { userGetAllHandler } from '@/features/user/services/userGetlAll';
import { userInitializeHandler } from '@/features/user/services/userInitialize';
import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

interface UserGetAllPayload {
    page: number;
    userId: number;
    email: string;
    phone: string;
}
export const userGetAll = createRoute({
    access: ['ADMIN'],
    async handler({ payload }: RouteData<UserGetAllPayload>) {
        return userGetAllHandler.execute(payload);
    },
});

export const userInitialize = createRoute({
    async handler({ accessTokenData }: RouteData) {
        return userInitializeHandler.execute({ userId: accessTokenData?.userId });
    },
});
