import type React from 'react';

import type { AnyObject, CustomComponent } from '@/typings';

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    component?: CustomComponent<AnyObject>;
}
