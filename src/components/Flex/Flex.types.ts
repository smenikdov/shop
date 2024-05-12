import type React from 'react';
import { BaseSizes } from '@/typings';

export interface FlexBaseProps extends React.HTMLAttributes<HTMLElement> {
    direction?: React.CSSProperties['flexDirection'];
    wrap?: React.CSSProperties['flexWrap'];
    justify?: React.CSSProperties['justifyContent'];
    align?: React.CSSProperties['alignItems'];
    gapX?: BaseSizes;
    gapY?: BaseSizes;
    gap?: React.CSSProperties['gap'];
    children: React.ReactNode;
    component?: keyof JSX.IntrinsicElements;
}

export type FlexProps = FlexBaseProps & React.HTMLAttributes<HTMLOrSVGElement>;
