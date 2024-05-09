import type React from 'react';
import { BaseColors } from '@/typings';

export type InputVariant = 'outlined' | 'filled' | 'borderless';

export interface FieldProps<C extends keyof JSX.IntrinsicElements> {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    color?: BaseColors;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    style?: React.CSSProperties;
    variant?: InputVariant;
    maxLength?: Number;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    name?: string;
    component?: C;
}
