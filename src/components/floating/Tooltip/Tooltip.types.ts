import type React from 'react';
import { BaseColors } from '@/typings';

export type Trigger = 'hover' | 'click';

export type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';

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
    offset?: number;
    triggers?: Array<Trigger>;
    placement?: Placement;
}
