import type { InputProps } from '@/components/form/Input';
import type React from 'react';

export interface Option {
    label: React.ReactNode;
    value: string | number;
}

export interface SelectProps extends InputProps {
    options: Array<Option>;
}
