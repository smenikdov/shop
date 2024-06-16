import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import { SuccessResponse } from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import transporter from '@/lib/nodemailer';

export const emailSendMessageHandler = new Handler({
    name: 'Отправка сообщение по почте',
    defaultError: 'Ошибка при отправке сообщения по почте',
    schema: v.object({
        email: v.email(),
        message: v.string(),
    }),

    async request(payload: { email: string; message: string }) {
        const result = await transporter.sendMail({
            from: '"Node js" <nodejs@example.com>',
            to: payload.email,
            subject: 'Message from Node js',
            text: 'This message was sent from Node js server.',
            html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
        });
        return new SuccessResponse({ data: null });
    },
});
