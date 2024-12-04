import type { InputProps } from '@/components/form/Input';
import type React from 'react';
import type { Options } from '@/components/floating/OptionList';
import type { FieldVariant } from '../typings';
import type { BaseSizes } from '@/typings';

export interface BaseAutocompleteProps<T> {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    style?: React.CSSProperties;
    variant?: FieldVariant;
    name?: string;
    size?: BaseSizes;
    error?: React.ReactNode;
    options: Options;
    value?: T | null;
    onGetLabel?: (option: T) => React.ReactNode;
    onGetValue?: (option: T) => number | string;
    onChange?: (value: T | null) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type AutocompleteProps<T> = BaseAutocompleteProps<T>;
