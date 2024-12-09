import type React from 'react';

export interface FormItemProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    label?: String;
    layout?: 'horizontal' | 'vertical';
    required?: boolean;
}
