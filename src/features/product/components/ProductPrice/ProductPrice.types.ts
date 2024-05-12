import type React from 'react';

export interface ProductPriceProps {
    price: number;
    offer: {
        id: number;
        discount: number;
    } | null;
}
