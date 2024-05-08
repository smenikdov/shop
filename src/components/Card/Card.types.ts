import type React from 'react';

export interface CardProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    clickable?: boolean;
}
