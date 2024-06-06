export interface BaseProduct {
    id: number;
    name: string;
    price: number;
    rating: number;
    images: Array<string>;
    offer: {
        id: number;
        discount: number;
    } | null;
}

export interface Product extends BaseProduct {
    basketQuantity: number;
}
