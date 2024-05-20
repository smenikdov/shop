import type React from 'react';
import { BaseColors } from '@/typings';

export interface StylePaletteProps {
    color?: BaseColors;
    className?: string;
    style?: React.CSSProperties;
}
