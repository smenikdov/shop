import type React from 'react';
import type { SingleLineInputProps } from '../Input/Input.types';

export interface InputNumberProps extends SingleLineInputProps {
    min?: number;
    max?: number;
    maxLength?: undefined;
}
