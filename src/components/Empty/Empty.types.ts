import type React from 'react';
import { BaseColors } from '@/typings';

export interface EmptyProps {
    className?: string;
    style?: React.CSSProperties;
    description?: React.ReactNode;
    children?: React.ReactNode;
}
