import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { postSendPhoneMessageHandler } from './postSendPhoneMessage';
import { getRandomNumber } from '@/utils/number';

const isTestSms = true;
const ttlSms = Number(process.env.TTL_SMS);

export const postSendPhoneCodeHandler = new Handler({
    name: 'Отправка кода по номеру телефон',
    defaultError: 'Ошибка при отправке кода по номеру телефон',
    schema: v.object({
        phone: v.phone(),
    }),

    async request(payload: { phone: string }) {
        let code;
        if (isTestSms) {
            code = '1234';
        } else {
            code = getRandomNumber(1000, 9999).toString();
            const { isSuccess } = await postSendPhoneMessageHandler.execute({
                phone: payload.phone,
                message: `Пароль для регистрации: ${code}`,
            });
            if (!isSuccess) {
                throw new Error('Не удалось отправить сообщение');
            }
        }
        const expiresAt = new Date(Date.now() + ttlSms * 1000);
        const smsCode = await prisma.smsCodes.create({
            data: {
                phone: payload.phone,
                isActive: true,
                code,
                expiresAt,
            },
        });

        return new SuccessResponse({ data: null });
    },
});
