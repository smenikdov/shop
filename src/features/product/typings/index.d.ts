export interface ProductItem {
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
