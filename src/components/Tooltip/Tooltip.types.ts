import type React from 'react';
import { BaseColors } from '@/typings';

export type ActionType = 'hover' | 'focus'; // TODO: 'click' | 'dbclick' | 'contextMenu'

export interface TooltipProps {
    className?: string;
    color?: BaseColors;
    style?: React.CSSProperties;
    arrow?: boolean;
    disable?: boolean;
    children: React.ReactNode;
    enterDelay?: number;
    leaveDelay?: number;
    onChange?: (newValue: boolean) => void;
    open?: boolean;
    placement?:
        | 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start'
        | 'top';
    title: React.ReactNode;
    offset?: [number | string, number | string];
    trigger?: ActionType;
}
