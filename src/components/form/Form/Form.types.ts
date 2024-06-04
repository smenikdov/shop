import type React from 'react';
import type { Response } from '@/utils/actions/responses';

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    readOnly?: boolean;
    action: (formData: FormData) => void;
}

export interface FormContext {
    disabled: boolean;
    readOnly: boolean;
}
