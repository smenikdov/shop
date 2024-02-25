import type React from 'react';
import { IconType } from 'react-icons';
import { BaseColors } from '@/typings';

export interface IconProps {
    className?: string;
    color?: BaseColors;
    style?: React.CSSProperties;
    icon: IconType;
    size?: string | number;
}
