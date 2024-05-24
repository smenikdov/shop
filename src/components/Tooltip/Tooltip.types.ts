import type React from 'react';
import { BaseColors } from '@/typings';

export type ActionType = 'hover' | 'focus'; // TODO: 'click' | 'dbclick' | 'contextMenu'

export interface TooltipProps {
    className?: string;
    color?: BaseColors;
    style?: React.CSSProperties;
    arrow?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    onChange?: (newValue: boolean) => void;
    open?: boolean;
    content: React.ReactNode;
    offset?: [number | string, number | string];
    trigger?: ActionType;
}
