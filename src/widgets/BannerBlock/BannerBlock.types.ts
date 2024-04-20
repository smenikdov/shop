import type React from 'react';

export interface ImageType {
    src: string;
    alt?: string;
}

export interface BannerBlockProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    image: ImageType;
    style?: React.CSSProperties;
    className?: string;
    reverse?: boolean;
}
