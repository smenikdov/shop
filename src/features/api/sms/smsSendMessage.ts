import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { sms } from './sms';

export const smsSendMessageHandler = new Handler({
    name: 'Отправка СМС по номеру телефон',
    defaultError: 'Ошибка при отправке СМС по номеру телефон',
    schema: v.object({
        phone: v.phone(),
        message: v.string(),
    }),

    async request(payload: { phone: string; message: string }) {
        const response = await sms.get('/send', {
            params: {
                to: payload.phone,
                msg: payload.message,
            },
        });
        const data = response.data;
        if (data.status !== 'OK') {
            throw new Error('Не удалось отправить сообщение');
        }

        return new SuccessResponse({ data: null });
    },
});
