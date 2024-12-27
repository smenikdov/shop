'use server';
import 'server-only';

import { createRoute } from '@/utils/actions/routes';
import { RouteData } from '@/utils/actions/routes';

import type { UserUpdateDataPayload, UserGetAllPayload } from '@/features/user/typings';

import { userGetAllHandler } from '@/features/user/services/userGetAll';
import { userInitializeHandler } from '@/features/user/services/userInitialize';
import { userUpdateDataHandler } from '@/features/user/services/userUpdateData';

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

export const userUpdateData = createRoute({
    async handler({ accessTokenData }: RouteData<UserUpdateDataPayload>) {
        return userInitializeHandler.execute({ userId: accessTokenData?.userId });
    },
});
