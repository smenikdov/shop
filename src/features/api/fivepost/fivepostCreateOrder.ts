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
import { fivepost } from './fivepost';
import { SHOP_INFO, DELIVERY_INFO } from '@/constants';

import type { OrderFullInfo } from '@/features/order/typings';

interface FivepostCreateOrderRequest {
    partnerOrders: {
        senderOrderId: string;
        brandName: string;
        clientOrderId: string;
        clientName: string;
        clientEmail?: string;
        clientPhone: string;
        plannedReceiveDate?: Date;
        receiverLocation: string;
        senderCreateDate?: string;
        senderLocation: string;
        shipmentDate?: Date;
        undeliverableOption: string;
        cargoes: Array<{
            senderCargoId: string;
            barcodes: Array<{
                value: string;
            }>,
            currency: string;
            price: number;
            height: string;
            length: string;
            width: string;
            weight: string;
            vat?: number;
            productValues: Array<{
                barcode?: string;
                codeGTD?: string;
                codeTNVED?: string;
                currency?: string;
                name: string;
                originCountry?: string;
                price: number;
                value: number;
                vat: number;
                vendorCode?: string;
            }>,
        }>,
        cost: {
            deliveryCostCurrency?: string;
            paymentValue: number;
            paymentType: 'CASH' | 'CASHLESS' | 'PREPAYMENT';
            paymentCurrency: string;
            price: number;
            priceCurrency: 'RUB';
        },
    };
};

interface FivepostCreateOrderResponse {
    orderId: string;
    senderOrderId: string;
    cargoes: Array<{
        cargoId: string;
        senderCargoId: string;
        barcode: string;
    }>
    alreadyCreated: boolean;
};

export const fivepostCreateOrderHandler = new Handler({
    name: 'Создание заказа на доставку 5POST',
    errors: { default: 'Ошибка при создании заказа на доставку 5POST' },

    async request(payload: { order: OrderFullInfo }) {
        const { order } = payload;

        const request:FivepostCreateOrderRequest = {};

        const response = await fivepost.post<FivepostCreateOrderResponse>('/api/v1/createOrder', request);
        const data = response.data;
        return new SuccessResponse({ data: data });
    },
});
