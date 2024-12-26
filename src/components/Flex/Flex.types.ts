import type React from 'react';
import { BaseSizes } from '@/typings';

export interface FlexBaseProps extends React.HTMLAttributes<HTMLElement> {
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    gapX?: BaseSizes;
    gapY?: BaseSizes;
    gap?: React.CSSProperties['gap'];
    children: React.ReactNode;
    component?: keyof JSX.IntrinsicElements;
}

export type FlexProps = FlexBaseProps & React.HTMLAttributes<HTMLOrSVGElement>;
