export interface TotalResult {
    quantity: number;
    subtotal: number;
    shipping: number;
    total: number;
    discount: number;
}

export interface BasketItem {
    productId: number;
    quantity: number;
}
