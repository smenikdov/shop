import type React from 'react';
import { BaseColors, BaseSizes } from '@/typings';
import { HTMLInputTypeAttribute } from 'react';
import type { FieldVariant } from '../typings';

export interface BaseInputProps {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    style?: React.CSSProperties;
    variant?: FieldVariant;
    maxLength?: Number;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    name?: string;
    size?: BaseSizes;
    error?: React.ReactNode;
}

export type InputProps = BaseInputProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseInputProps>;
