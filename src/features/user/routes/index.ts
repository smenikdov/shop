'use server';
import 'server-only';
import { userGetAllHandler } from '@/features/user/services/userGetlAll';
import { createRoute } from '@/utils/actions/routes';

export const userGetAll = createRoute({
    access: ['ADMIN'],
    async handler() {
        return userGetAllHandler.execute({});
    },
});
