import type React from 'react';

export type RadioValue = string | number;

export interface BaseRadioProps {
    className?: string;
    checked?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: RadioValue;
    name?: string;
    children?: React.ReactNode;
}

export type RadioProps = BaseRadioProps &
    Omit<React.HTMLAttributes<HTMLInputElement>, keyof BaseRadioProps | 'type'>;

export interface RadioGroupContext {
    name?: string;
    onChange: (value: RadioValue) => void;
    value: RadioValue | null;
    disabled: boolean;
}

export interface RadioOption {
    label: React.ReactNode;
    value: RadioValue;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
    className?: string;
    options?: RadioOption[];
    disabled?: boolean;
    style?: React.CSSProperties;
    name?: string;
    value?: RadioValue | null;
    onChange?: (checkedValue: RadioValue) => void;
    children?: React.ReactNode;
}
