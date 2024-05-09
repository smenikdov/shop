import type React from 'react';

export interface FormItemProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    label?: String;
    layout?: 'horizontal' | 'vertical';
    name?: string;
    required?: boolean;
}

export interface FormItemContext {
    name?: string;
    required: boolean;
    isValid: boolean;
    error: string;
}
