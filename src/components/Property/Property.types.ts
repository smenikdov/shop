import type React from 'react';

export interface PropertyProps extends React.HTMLAttributes<HTMLElement> {
    name: React.ReactNode;
    value: React.ReactNode;
}
