import type React from 'react';
import { BaseColors } from '@/typings';

type StepStatus = 'active' | 'done' | 'error';

interface Step {
    value?: string | number;
    title: React.ReactNode;
    content: React.ReactNode;
    status?: StepStatus;
    disabled?: boolean;
}

export interface StepperProps {
    value?: string | number;
    onChange?: (stepName: string | number) => void;
    style?: React.CSSProperties;
    className?: string;
    items: Array<Step>;
    responsiveBreakPoint?: number;
    direction?: 'horizontal' |'vertical';
    defaultStep?: string | number;
}
