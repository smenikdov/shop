import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import telegrafBot from '@/lib/telegraf';

export const telegramSendMessageHandler = new Handler({
    name: 'Отправка сообщение через телеграм',
    errors: { default: 'Ошибка при отправке сообщения через телеграм' },
    schema: v.object({
        message: v.string(),
    }),

    async request(payload: { message: string }) {
        telegrafBot.sendMessage({ message: payload.message });
        return new SuccessResponse({ data: null });
    },
});
