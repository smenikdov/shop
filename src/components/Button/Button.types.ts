import type React from 'react';
import { BaseColors, BaseSizes } from '@/typings';

export type ButtonVariant = 'outlined' | 'filled' | 'text' | 'link';
export type ButtonShape = 'squre' | 'circle' | 'round';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';
export type ButtonSize = BaseSizes;

export interface BaseButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
    shape?: ButtonShape;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    color?: BaseColors;
    children?: React.ReactNode;
    href?: string;
    type?: ButtonHTMLType;
}

export type ButtonProps = BaseButtonProps &
    Omit<React.ButtonHTMLAttributes<HTMLElement>, keyof BaseButtonProps> &
    Omit<React.AnchorHTMLAttributes<HTMLElement>, keyof BaseButtonProps>;
