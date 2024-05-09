import type React from 'react';
import type { Response } from '@/utils/actions/responses';
import { IObjectValidator } from '@/utils/validate/typings';

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    readOnly?: boolean;
    action: (formData: FormData) => Promise<Response>;
    schema?: IObjectValidator;
}

export interface FormContext {
    schema?: IObjectValidator;
    response?: Response;
    disabled: boolean;
    readOnly: boolean;
}
