import type React from 'react';

export type CheckboxValue = string | number;

export interface BaseCheckboxProps {
    className?: string;
    checked?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: CheckboxValue;
    name?: string;
    children?: React.ReactNode;
    indeterminate?: boolean;
}

export type CheckboxProps = BaseCheckboxProps &
    Omit<React.HTMLAttributes<HTMLInputElement>, keyof BaseCheckboxProps | 'type'>;

export interface CheckboxGroupContext {
    name?: string;
    onChange: (value: CheckboxValue) => void;
    value: Array<CheckboxValue>;
    disabled: boolean;
}

export interface CheckboxOption {
    label: React.ReactNode;
    value: CheckboxValue;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface CheckboxGroupProps {
    className?: string;
    options?: CheckboxOption[];
    disabled?: boolean;
    style?: React.CSSProperties;
    name?: string;
    value?: CheckboxValue[];
    onChange?: (checkedValue: CheckboxValue[]) => void;
    children?: React.ReactNode;
}
