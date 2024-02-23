import type React from 'react';

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    component?: keyof JSX.IntrinsicElements;
}
