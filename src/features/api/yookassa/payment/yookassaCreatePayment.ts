import 'server-only';
import prisma from '@/lib/prisma';
import { Handler } from '@/utils/actions/routes';
import {
    ServerErrorResponse,
    RequestErrorResponse,
    Response,
    SuccessResponse,
} from '@/utils/actions/responses';
import * as v from '@/utils/validate';
import { yookassa } from './../yookassa';

export const yookassaConfirmPaymentHandler = new Handler({
    name: 'Создание платежа в ЮKassa',
    defaultError: 'Ошибка при создании платежа в ЮKassa',

    async request(payload: {
        amount: number; 
        description: string;
    }) {
        const response = await yookassa.post('/payments', {
            amount: {
                value: payload.amount,
                currency: 'RUB',
            },
            description: payload.description,
            receipt: {
                customer: {},
                items: [],
                phone: '',
                email: '',
                tax_system_code: 0,
                receipt_industry_details: [],
                receipt_operational_details: {},
            },
            recipient: undefined,
            payment_token: undefined,
            payment_method_id: undefined,
            payment_method_data: {
                type: '',
            },
            metadata: {},
        });
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
