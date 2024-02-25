import type React from 'react';
import { BaseColors } from '@/typings';

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
    empty?: boolean;
    style?: React.CSSProperties;
    className?: string;
    color?: BaseColors;
    offset?: [number | string, number | string];
    children?: React.ReactNode;
}
