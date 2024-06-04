'use server';
import 'server-only';
import { userGetAllHandler } from '@/features/user/services/userGetlAll';
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
