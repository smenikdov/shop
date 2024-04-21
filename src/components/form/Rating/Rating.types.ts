import type React from 'react';

export interface RatingProps {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    readonly?: boolean;
    max?: number;
    defaultRating?: number;
    rating?: number;
    onChange?: (rating: number) => void;
}

export interface RatingItemProps {
    itemValue: number;
    ratingValue: number;
    hoverValue: number;

    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
