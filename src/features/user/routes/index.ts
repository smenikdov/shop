'use server';
import 'server-only';
import { userGetAllHandler } from '@/features/user/services/userGetlAll';
import { createRoute } from '@/utils/actions/routes';
import * as v from '@/utils/validate';

export const _userGetAll = createRoute({
    // schema: v.object({
    //     password: v.password(),
    //     phone: v.phone(),
    // }),
    handler: userGetAllHandler,
});
