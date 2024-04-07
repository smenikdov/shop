import { FieldProps } from '@/components/form/Field';
import type React from 'react';

export interface InputProps
    extends FieldProps<'input'>,
        Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof FieldProps<'input'>> {}
