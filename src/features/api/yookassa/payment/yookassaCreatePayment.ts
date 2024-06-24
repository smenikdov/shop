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

import type { OrderFullInfo } from '@/features/order/typings';
import type { AnyObject } from '@/typings';

interface Amount {
    value: number;
    currency: 'RUB';
};

interface IndustryDetails {
    federal_id: string;
    document_date: Date;
    document_number: string;
    value: string;
};

interface YooKassaCreatePaymentRequest {
    amount: Amount;
    description?: string;
    receipt: {
        customer?: {
            full_name?: string;
            inn?: string;
            email?: string;
            phone?: string;
        },
        items: Array<{
            description: string;
            amount: Amount;
            vat_code: number;
            quantity: number;
            measure?: string;
            mark_quantity?: {
                numerator: number;
                denominator: number;
            },
            payment_subject?: string;
            payment_mode?: string;
            country_of_origin_code?: string;
            customs_declaration_number?: string;
            excise?: string;
            product_code?: string;
            mark_code_info?: {
                mark_code_raw?: string;
                unknown?: string;
                ean_8?: string;
                ean_13?: string;
                itf_14?: string;
                gs_10?: string;
                gs_1m?: string;
                short?: string;
                fur?: string;
                egais_20?: string;
                egais_30?: string;
            };
            mark_mode?: string;
            payment_subject_industry_details?: Array<IndustryDetails>;
        }>,
        tax_system_code?: number;
        receipt_industry_details?: Array<IndustryDetails>,
        receipt_operational_details?: {
            operation_id: number;
            value: number;
            created_at: Date;
        },
    },
    recipient?: {
        gateway_id: string;
    },
    payment_token?: string;
    payment_method_id?: string;
    payment_method_data?: {
        type: string;
    };
    confirmation?: {}; // TODO
    save_payment_method?: boolean;
    capture?: boolean;
    client_ip?: string;
    metadata?: AnyObject;
    airline?: {
        ticket_number?: string;
        booking_reference?: string;
        passengers?: Array<{
            first_name: string;
            last_name: string;
        }>
        legs?: Array<{
            departure_airport: string;
            destination_airport: string;
            departure_date: string;
            carrier_code?: string;
        }>
    };
    transfers?: Array<{
        account_id: number;
        amoount: Amount;
        platform_fee_amount?: Amount;
        description?: string;
        metadata?: AnyObject;
    }>;
    deal?: {
        id: number;
        settlements: Array<{
            type: string;
            amount: Amount;
        }>;
    };
    fraud_data?: {
        topped_up_phone?: string;
        merchant_customer_bank_account?: {
            account_number?: string;
            bic?: string;
        };
    };
    merchant_customer_id?: number;
};

interface YooKassaCreatePaymentResponse {
    created_at?: {
        gte?: string;
        lte?: string;
        gt?: string;
        lt?: string;
    },
    captured_at?: {
        gte?: string;
        lte?: string;
        gt?: string;
        lt?: string;
    },
    payment_method?: string;
    status?: string;
    limit?: string;
    cursor?: string;
};

export const yookassaCreatePaymentHandler = new Handler({
    name: 'Создание платежа в ЮKassa',
    defaultError: 'Ошибка при создании платежа в ЮKassa',
    schema: v.object({
        orderId: v.id(),
        userId: v.id(),
    }),

    async request(payload: { orderId: number; userId: number }) {
        const order: OrderFullInfo = {};

        const request: YooKassaCreatePaymentRequest = {
            amount: {
                value: order.amount,
                currency: 'RUB',
            },
            description: `Оплата заказа №${ order.id }`, // TODO
            receipt: {
                customer: {
                    inn: undefined,
                    full_name: order.customer.fio,
                    email: order.customer.email,
                    phone: order.customer.phone,
                },
                items: order.orderItems.map(oi => ({ // TODO
                    description: oi.name,
                    quantity: oi.quantity,
                    measure: oi.measure,
                })),
                tax_system_code: 0, // TODO
                receipt_industry_details: [], // TODO
                receipt_operational_details: {}, // TODO
            },
            payment_method_data: {
                type: '',
            },
            confirmation: {},
            save_payment_method: false,
            capture: false, // TODO
            metadata: {
                orderId: order.id,
            },
            merchant_customer_id: order.userId,
        };

        const response = await yookassa.post<YooKassaCreatePaymentResponse>('/payments', request);
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
