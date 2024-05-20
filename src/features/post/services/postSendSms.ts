import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import axios from 'axios';

export const postSendSmsHandler = new Handler({
    name: 'Отправка СМС по номеру телефон',
    defaultError: 'Ошибка при отправке СМС по номеру телефон',
    schema: v.object({
        phone: v.phone(),
        message: v.string(),
    }),

    async request(payload: { phone: string; message: string }) {
        const response = await axios.get('https://sms.ru/sms/send', {
            params: {
                api_id: process.env.SMS_ID,
                to: payload.phone,
                msg: payload.message,
                json: 1,
            },
        });
        const data = response.data;
        if (data.status !== 'OK') {
            throw new Error('Не удалось отправить сообщение');
        }

        return new SuccessResponse();
    },
});
