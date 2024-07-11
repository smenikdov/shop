import type { InputProps } from '@/components/form/Input';
import type React from 'react';
import type { Options } from '@/components/floating/OptionList';
import type { FieldVariant } from '../typings';
import type { BaseSizes } from '@/typings';

export interface BaseSelectProps {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    style?: React.CSSProperties;
    variant?: FieldVariant;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    name?: string;
    size?: BaseSizes;
    error?: React.ReactNode;
    options: Options;
    value?: string | number | null;
    onChange?: (value: string | number | null) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

export type SelectProps = BaseSelectProps;
