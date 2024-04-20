import type React from 'react';
import { BaseColors } from '@/typings';

export interface ResultProps {
    icon?: React.ReactNode;
    color?: BaseColors;
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
