import type React from 'react';

import type { AnyObject, CustomComponent } from '@/typings';

type ColSize = 'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface ColProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    xs?: ColSize;
    sm?: ColSize;
    md?: ColSize;
    lg?: ColSize;
    xl?: ColSize;
    xxl?: ColSize;
    component?: CustomComponent<AnyObject>;
}
