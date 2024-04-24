import type { ProductItem } from '@/typings';
import type { TotalResult } from '@/features/basket/typings';

export const calcTotalResult = (products: Array<ProductItem>): TotalResult => {
    const result: TotalResult = {
        count: products.length,
        subtotal: 0,
        postage: 0,
        total: 0,
        discountValue: 0,
    };

    for (let product of products) {
        if (product.discount) {
            result.subtotal += product.prevPrice;
            result.discountValue += product.prevPrice - product.price;
        } else {
            result.subtotal += product.price;
        }
    }

    result.postage = 300;
    result.total += result.subtotal + result.postage - result.discountValue;

    return result;
};
