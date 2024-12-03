import { OrderStatus, DeliveryType, DeliveryCompany, MeasureType } from '@prisma/client';
import type { BaseProduct } from '@/features/product/typings';

export interface MeasureUpdatePayload {
    measureId: integer;
    name: string;
    shortName: string;
    description: string | null;
}

export interface MeasureCreatePayload {
    name: string;
    shortName: string;
    description: string | null;
}

