import type { ProductItem } from '@/features/product/typings';
import type { TotalResult } from '@/features/basket/typings';

export const basketCalcTotalResult = (products: Array<ProductItem>): TotalResult => {
    const result: TotalResult = {
        quantity: products.length,
        subtotal: 0,
        shipping: 0,
        total: 0,
        discount: 0,
    };

    for (let product of products) {
        if (product.discount) {
            result.subtotal += product.prevPrice;
            result.discount += product.prevPrice - product.price;
        } else {
            result.subtotal += product.price;
        }
    }

    result.shipping = 300;
    result.total += result.subtotal + result.shipping - result.discount;

    return result;
};
