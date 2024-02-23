import type React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    fluid?: boolean;
    component?: keyof JSX.IntrinsicElements;
}
