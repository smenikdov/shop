import type React from 'react';
import { ReactNode } from 'react';

export interface PropertyProps extends React.HTMLAttributes<HTMLElement> {
    name: ReactNode;
    value: ReactNode;
}
