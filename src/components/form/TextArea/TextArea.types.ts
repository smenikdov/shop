import { FieldProps } from '@/components/form/Field';
import type React from 'react';

export interface TextAreaProps
    extends FieldProps<'textarea'>,
        Omit<React.HTMLAttributes<HTMLTextAreaElement>, keyof FieldProps<'textarea'>> {
    // maxRows?: number;
    // minRows?: number;
    rows?: number;
}
