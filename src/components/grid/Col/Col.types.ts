import type React from 'react';

type ColSize = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColBaseProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    xs?: ColSize;
    sm?: ColSize;
    md?: ColSize;
    lg?: ColSize;
    xl?: ColSize;
    xxl?: ColSize;
    component?: keyof JSX.IntrinsicElements;
}

export type ColProps = ColBaseProps & React.HTMLAttributes<HTMLOrSVGElement>;
