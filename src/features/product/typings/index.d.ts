export interface ProductItem {
    id: number;
    name: string;
    price: number;
    offer?: {
        id: number;
        discount: number;
    };
    images: Array<string>;
    rating: number;
}
