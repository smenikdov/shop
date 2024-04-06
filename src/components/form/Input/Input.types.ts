import type React from 'react';
import { BaseColors } from '@/typings';

export type InputVariant = 'outlined' | 'filled' | 'borderless';

export interface BaseInputProps {
    className?: string;
    disabled?: boolean;
    color?: BaseColors;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    style?: React.CSSProperties;
    variant?: InputVariant;
    maxLength?: Number;
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface BaseSingleLineInputProps extends BaseInputProps {
    multiline?: false;
    // maxRows?: undefiend;
    // minRows?: undefiend;
    rows?: undefined;
    type?: React.HTMLInputTypeAttribute;
}

export interface BaseMultiLineInputProps extends BaseInputProps {
    multiline: true;
    // maxRows?: number;
    // minRows?: number;
    rows?: number;
    type?: undefined;
}

export type SingleLineInputProps = BaseSingleLineInputProps &
    Omit<React.HTMLAttributes<HTMLTextAreaElement>, keyof BaseSingleLineInputProps> &
    Omit<React.HTMLAttributes<HTMLInputElement>, keyof BaseSingleLineInputProps>;

export type MultiLineInputProps = BaseMultiLineInputProps &
    Omit<React.HTMLAttributes<HTMLTextAreaElement>, keyof BaseMultiLineInputProps> &
    Omit<React.HTMLAttributes<HTMLInputElement>, keyof BaseSingleLineInputProps>;

export type InputProps = SingleLineInputProps | MultiLineInputProps;
