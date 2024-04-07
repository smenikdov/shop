import type React from 'react';
import type { InputProps } from '../Input';

export interface BaseInputNumberProps {
    min?: number;
    max?: number;
    step?: number;
    onChange?: (newValue: number) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

    maxLength?: undefined;
}

export type InputNumberProps = BaseInputNumberProps & Omit<InputProps, 'change'>;
