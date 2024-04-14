import type React from 'react';

export interface ProductImage {
    src: string;
    alt: string;
}

export interface ProductImagesProps {
    images: Array<ProductImage>;
}
