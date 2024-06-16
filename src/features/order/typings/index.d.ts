import { OrderStatus, DeliveryType, DeliveryCompany } from '@prisma/client';
import type { BaseProduct } from '@/features/product/typings';

interface OrderItem extends Product {
    quantity: true;
}
export interface OrderFullInfo {
    id: number;
    status: OrderStatus;
    total: number;
    deliveryType: DeliveryType;
    deliveryCompany: DeliveryCompany;
    orderItems: Array<OrderItem>;
    notice: string | null;
    user: {
        lastName: string;
        firstName: string;
        patronymic: string;
        phone: string;
        email: string | null;
    };
}
