import 'server-only';
import prisma from '@/lib/prisma';
import type { UserUpdateDataPayload } from '../typings';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { USER_SEX } from '@/constants';
import logger from '@/lib/logger';

import type { UserSex } from '@prisma/client';

import { dadataParseFioHandler } from '@/features/api/dadata/dadataParseFio';

export const userUpdateDataHandler = new Handler({
    name: 'Сохранение данных пользователя',
    errors: {
        default: 'Ошибка при сохранении данных пользователя',
        dadata: 'Ошибка при распознавании имени пользователя',
    },
    schema: v.object({
        id: v.id(),
        userData: v.object({
            fio: v.sn(),
            birthday: v.date().past().nullable(),
            email: v.email().nullable(),
        }),
    }),

    async request(payload: { id: number; userData: UserUpdateDataPayload }, errors) {
        const userData: {
            email: string | null;
            lastName: string | null;
            firstName: string | null;
            patronymic: string | null;
            sex: UserSex;
            birthday: Date | null;
            qc: integer,
        } = {
            email: payload.userData.email,
            lastName: null,
            firstName: null,
            patronymic: null,
            sex: USER_SEX.MALE,
            birthday: payload.userData.birthday,
            qc: 0,
        };

        if (payload.userData.fio) {
            const response = await dadataParseFioHandler.execute({ fio: payload.userData.fio });
            if (!response.isSuccess) {
                throw new Error(errors.dadata);
            }
            const data = response.data;
            userData.lastName = data.surname;
            userData.firstName = data.name;
            userData.patronymic = data.patronymic;
            userData.qc = data.qc;
            if (data.gender === 'Ж') {
                userData.sex = USER_SEX.FEMALE;
            }
            if (data.gender === 'М') {
                userData.sex = USER_SEX.MALE;
            }
        }

        await prisma.user.update({
            data: userData,
            where: {
                id: payload.id,
            },
        });

        return new SuccessResponse({ data: null });
    },
});
