import type React from 'react';
import { BaseColors, BaseSizes } from '@/typings';
import { HTMLInputTypeAttribute } from 'react';

export type InputVariant = 'outlined' | 'filled' | 'borderless';
export type InputSize = BaseSizes;

export interface BaseInputProps {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    style?: React.CSSProperties;
    variant?: InputVariant;
    maxLength?: Number;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    name?: string;
    size?: InputSize;
    error?: React.ReactNode;
}
export type InputProps = BaseInputProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps>;
