import type React from 'react';
import { BaseColors } from '@/typings';
import type { Alignment, Side } from '@/hooks/useFloating';

export type Trigger = 'hover' | 'click';

export interface TooltipProps {
    className?: string;
    color?: BaseColors;
    style?: React.CSSProperties;
    arrow?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    onOpenChange?: (newValue: boolean) => void;
    open?: boolean;
    content: React.ReactNode;
    offset?: number;
    // triggers?: Array<Trigger>;
    alignment?: Alignment;
    side?: Side;
}
