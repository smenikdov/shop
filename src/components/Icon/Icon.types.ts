import type React from 'react';
import { BaseColors } from '@/typings';

export interface IconProps {
    className?: string;
    color?: BaseColors;
    style?: React.CSSProperties;
    icon: React.ReactNode;
    size?: string | number;
}
