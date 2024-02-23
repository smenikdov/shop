import type React from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
    direction?: React.CSSProperties['flexDirection'];
    wrap?: React.CSSProperties['flexWrap'];
    justify?: React.CSSProperties['justifyContent'];
    align?: React.CSSProperties['alignItems'];
    gap?: React.CSSProperties['gap'];
    children: React.ReactNode;
    component?: keyof JSX.IntrinsicElements;
}
