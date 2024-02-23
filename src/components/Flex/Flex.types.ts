import type React from 'react';

import type { AnyObject, CustomComponent } from '@/typings';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
    direction?: React.CSSProperties['flexDirection']
    wrap?: React.CSSProperties['flexWrap'];
    justify?: React.CSSProperties['justifyContent'];
    align?: React.CSSProperties['alignItems'];
    gap?: React.CSSProperties['gap'];
    children: React.ReactNode;
    component?: CustomComponent<AnyObject>;
}
