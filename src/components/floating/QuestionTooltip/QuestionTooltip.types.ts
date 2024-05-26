import type React from 'react';
import { BaseColors } from '@/typings';

export interface QuestionTooltipProps {
    className?: string;
    color?: BaseColors;
    style?: React.CSSProperties;
    content: React.ReactNode;
}
