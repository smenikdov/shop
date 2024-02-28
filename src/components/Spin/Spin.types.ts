import type React from 'react';
import { IconType } from 'react-icons';
import { BaseColors } from '@/typings';

export interface SpinProps {
    className?: string;
    spinning?: boolean;
    style?: React.CSSProperties;
    size?: string | number;
    tip?: React.ReactNode;
    icon?: IconType;
    fullscreen?: boolean;
    children?: React.ReactNode;
}
