import type React from 'react';
import type { InputProps } from '../Input';
import type FactoryOpts from 'imask';

export interface BaseInputMaskProps {
    mask: string;
    onChange?: (value: string) => void;
    value?: string;
}

export type InputMaskProps = BaseInputMaskProps & InputProps;
