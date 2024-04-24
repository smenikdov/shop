export type BaseColors = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'grey';

export type FontFamily = 'plex-serif' | 'plex-sans';

export interface ProductItem {
    id: number;
    name: string;
    price: number;
    prevPrice: number;
    discount: number;
    image: string;
    rating: number;
}
