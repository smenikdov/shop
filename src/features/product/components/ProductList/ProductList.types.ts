import type React from 'react';

export interface ProductType {
    id: number;
    title: string;
    rating: number;
    price: number;
    prevPrice: number;
    discount: number;
    image: string;
}

export interface ProductListProps {
    products: Array<ProductType>;
}
