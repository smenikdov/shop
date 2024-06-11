import type React from 'react';

export interface InputCounterProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (newValue: number) => void;
    className?: string;
    style?: React.CSSProperties;
}
