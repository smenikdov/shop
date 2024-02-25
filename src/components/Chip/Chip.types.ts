import type React from 'react';
import { BaseColors } from '@/typings';

export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
    color?: BaseColors;
    style?: React.CSSProperties;
}
