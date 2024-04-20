import type React from 'react';
import { BaseColors } from '@/typings';

export type ButtonVariant = 'outlined' | 'filled' | 'dashed' | 'link' | 'text';
export type ButtonShape = 'squre' | 'circle' | 'round';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
    variant?: ButtonVariant;
    icon?: React.ReactNode;
    shape?: ButtonShape;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    color?: BaseColors;
    children?: React.ReactNode;
    href?: string;
    htmlType?: ButtonHTMLType;
}

export type ButtonProps = BaseButtonProps &
    Omit<React.HTMLAttributes<HTMLElement>, keyof BaseButtonProps> &
    Omit<React.ButtonHTMLAttributes<HTMLElement>, keyof BaseButtonProps> &
    Omit<React.AnchorHTMLAttributes<HTMLElement>, keyof BaseButtonProps>;
